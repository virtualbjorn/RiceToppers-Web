export class FacebookAppReport {
    fbNetworkAdRevenue: number;
    fbAdNetworkCPM: number;
    fbAdNetworkImpressions: number;
    fbAdNetworkCTR: number;
    fbAdNetworkClick: number;

    constructor(revenue?: number, cpm?: number, impressions?: number, ctr?: number, clicks?: number) {
        this.fbNetworkAdRevenue = revenue;
        this.fbAdNetworkCPM = cpm;
        this.fbAdNetworkImpressions = impressions;
        this.fbAdNetworkCTR = ctr;
        this.fbAdNetworkClick = clicks;
    }
}