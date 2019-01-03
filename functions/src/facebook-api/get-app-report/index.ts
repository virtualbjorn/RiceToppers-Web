import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as requestPromiseModule from 'request-promise';
import { FacebookAppReport } from '../../models/facebook-app-report';

import * as cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    // origin: API_URL,
    preflightContinue: false,
    origin: true
};


interface AsyncQueryResult {
    query_id: string;
}

interface ResolvedResult {
    data: ResolvedResultData[];
}

interface ResolvedResultData {
    query_id: string;
    status: string;
    results: any[];
}

const COMPLETE_STATUS = 'complete';

let _appId: string,
    _accessToken: string,
    _sinceDate: string,
    _untilDate: string,
    _placementId: string;
const _aggregationPeriod = 'total';
const _metrics = "['fb_ad_network_revenue','fb_ad_network_cpm','fb_ad_network_imp', 'fb_ad_network_ctr', 'fb_ad_network_click']";

// appId: 732834693591683
// placementId: 732834693591683_732834713591681


export const listener = functions.https.onRequest(async (req, res) => {
    const corsFn = cors(corsOptions);

    corsFn(req, res, async () => {
        let resolvedResult: ResolvedResult;

        // App ID
        if (req.query.appId) {
            _appId = req.query.appId;
        } else {
            res.status(504).send(`There's an error in the request: appId not found!`);
            return;
        }

        // Placement ID
        if (req.query.placementId) {
            _placementId = req.query.placementId;
        } else {
            res.status(504).send(`There's an error in the request: placementId not found!`);
            return;
        }

        // Month and Year is given, then use it instead of Since and Until Dates
        if (req.query.month && req.query.year) {
            _sinceDate = getFirstDayOfMonthWithYearFormattedDate(Number.parseInt(req.query.month) - 1, Number.parseInt(req.query.year));
            console.log(_sinceDate);
            _untilDate = getLastDayOfMonthWithYearFormattedDate(Number.parseInt(req.query.month) - 1, Number.parseInt(req.query.year));
            console.log(_untilDate);
        } else {
            // Since Date
            if (req.query.sinceDate) {
                _sinceDate = req.query.sinceDate;
            } else { // else use current month's first day
                // _sinceDate = '2018-03-01';
                _sinceDate = getFirsDayOfCurrentMonthFormattedDate();
                console.log(_sinceDate);
            }

            // Until Date
            if (req.query.untilDate) {
                _untilDate = req.query.untilDate;
            } else { // else use current month's last day
                // _untilDate = '2018-03-31';
                _untilDate = getLastDayOfCurrentMonthFormattedDate();
                console.log(_untilDate);
            }
        }


        // Get Acccess Token Securely
        // const accessTokenSnapshot: FirebaseFirestore.DocumentSnapshot = await admin.firestore().collection("accessTokens").doc("732834693591683").get();
        const accessTokenSnapshot: FirebaseFirestore.DocumentSnapshot = await admin.firestore().collection("accessTokens").doc(_appId).get();
        if (!accessTokenSnapshot.exists) {
            res.status(504).send(`There's an error in the API: Access Token Does not found`);
            return;
        }

        _accessToken = accessTokenSnapshot.data().value;

        try {
            const analyticsInitialResult = await requestPromiseModule.post(`https://graph.facebook.com/v2.12/${_appId}/adnetworkanalytics?metrics=${_metrics}&placement_id=${_placementId}&since=${_sinceDate}&until=${_untilDate}&aggregation_period=${_aggregationPeriod}&access_token=${_accessToken}`)
            const queryResult: AsyncQueryResult = JSON.parse(analyticsInitialResult);

            resolvedResult = await requestQueryResult(queryResult);

            if (!resolvedResult) {
                res.status(504).send(`Empty Result for query`); // Create a Custom Error Class for this
                return;
            }

            while (resolvedResult && (resolvedResult.data[0].status !== COMPLETE_STATUS)) {
                console.log("Resolving Query . . .");
                resolvedResult = await requestQueryResult(queryResult);
            }
        } catch (error) {
            console.log("Error: ", error);
            res.status(504).json(error);
            return;
        } finally {
            const revenue: number = resolvedResult.data[0].results[0].value,
                cpm: number = resolvedResult.data[0].results[1].value,
                impressions: number = resolvedResult.data[0].results[2].value,
                ctr: number = resolvedResult.data[0].results[3].value,
                clicks: number = resolvedResult.data[0].results[4].value;

            const newFacebookAppreport: FacebookAppReport = new FacebookAppReport(revenue, cpm, impressions, ctr, clicks);

            res.json(newFacebookAppreport);
        }
    });
});

async function requestQueryResult(queryResult: AsyncQueryResult): Promise<ResolvedResult> {
    try {
        const resultData = await requestPromiseModule.get(`https://graph.facebook.com/v2.12/${_appId}/adnetworkanalytics_results/?query_ids=['${queryResult.query_id}']&access_token=${_accessToken}`);
        const resolvedData: ResolvedResult = JSON.parse(resultData);
        return resolvedData;
    } catch (err) {
        return null;
    }
}

// async function wait(timeout: number): Promise<any> {
//     timeout *= 1e3;
//     console.log(timeout);
//     return new Promise(resolve => {
//         setTimeout(resolve, timeout);
//     });
// }

function formatDate(date: Date): string {
    const d = new Date(date),
        year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate();


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function getFirsDayOfCurrentMonthFormattedDate(): string {
    const date = new Date();
    return getFirstDayOfMonthWithYearFormattedDate(date.getMonth(), date.getFullYear());
}

function getLastDayOfCurrentMonthFormattedDate(): string {
    const date = new Date();
    return getLastDayOfMonthWithYearFormattedDate(date.getMonth(), date.getFullYear());
}

function getFirstDayOfMonthWithYearFormattedDate(month: number, year: number): string {
    const date = new Date(year, month, 1);
    return formatDate(date);
}

function getLastDayOfMonthWithYearFormattedDate(month: number, year: number): string {
    const date = new Date(year, month + 1, 0);
    return formatDate(date);
}