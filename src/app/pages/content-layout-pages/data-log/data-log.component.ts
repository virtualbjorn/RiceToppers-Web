import { Component, OnInit } from '@angular/core';

declare const _: any;
@Component({
    selector: 'app-data-log',
    templateUrl: './data-log.component.html',
    styleUrls: ['./data-log.component.scss']
})
export class DataLogComponent implements OnInit {
    dataLogs: string[] = new Array<string>();
    testLogs: any = [[]];
    reversedDataLogs: string[] = new Array<string>();
    testDuration: any[] = [];
    fromToDates: any[] = [];

    startDateTime: string = "2019/02/07-17";
    endDateTime: string = "2019/02/08-17";

    timeData: TimeData[] = new Array<TimeData>(3);
    // timeData: any = [[]];
    nodes: Node[] = new Array<Node>(3);
    currentNodeIndex: number = 0;
    averageTimeData: TimeData = new TimeData();

    constructor() { }

    ngOnInit(): void {
        this.timeData[0] = new TimeData();
        this.timeData[1] = new TimeData();
        this.timeData[2] = new TimeData();
        this.nodes[0] = new Node(0, 'A');
        this.nodes[1] = new Node(1, 'B');
        this.nodes[2] = new Node(2, 'C');
        for (let d = new Date('February 7, 2019'); d <= new Date('March 1, 2019'); d.setDate(d.getDate() + 1)) {
            this.testDuration.push(new Date(d));
        }
        this.testDuration.forEach(date => {
            console.log(date);
        })
    }

    onFileUpload(nodeIndex: number) {
        this.currentNodeIndex = nodeIndex;
        $('input[name=file-input]').trigger('click');
    }

    onFileSelected(event: any) {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onloadend = () => {
            let logs = reader.result.toString().split(/\r?\n/g);
            logs = _.uniq(logs);
            // console.log(logs.length);
            this.testLogs = [];
            this.testDuration.forEach((date: Date) => {
                let startTimePerDay = `${date.getFullYear()}/${(date.getMonth() + 1) >= 10 ? '' : '0'}${date.getMonth() + 1}/${(date.getDate()) >= 10 ? '' : '0'}${date.getDate()}-17`;
                let tomorrow = new Date(date.setDate(date.getDate() + 1));
                let endTimePerDay = `${tomorrow.getFullYear()}/${(tomorrow.getMonth() + 1) >= 10 ? '' : '0'}${tomorrow.getMonth() + 1}/${(tomorrow.getDate()) >= 10 ? '' : '0'}${tomorrow.getDate()}-17`;
                let startIndex = logs.findIndex((data) => {
                    return data.includes(startTimePerDay);
                });
                let endIndex = logs.findIndex((data) => {
                    return data.includes(endTimePerDay);
                });
                let datalogSlice = logs.slice(startIndex, endIndex);
                if (datalogSlice.length > 0) {
                    this.testLogs.push(datalogSlice);
                    this.fromToDates.push({ from: startTimePerDay, to: endTimePerDay });
                }
            });
            $('input[name=file-input]').val(null);
        }
    }

    calculateTimeDurationV2() {
        console.log(this.testLogs)
        this.testLogs.forEach((data, dayIndex) => {
            console.log(data.length);
            let dimModeTimestamp: Date = new Date();
            let brightModeTmestamp: Date = new Date();
            let oldLEDStatus: string = '';
            data.reverse();
            data.forEach((data, index) => {
                let dataSplit = data.split(', ');
                if (dataSplit.length < 3) {
                    data.splice(index, 1);
                }
            });
            data.forEach((data, index) => {
                let dataSplit = data.split(', ');
                index == 0 ? oldLEDStatus = dataSplit[3] : null;
                dataSplit[3] == 'Dim Mode' ? dimModeTimestamp = new Date(dataSplit[0].replace('-', ' ')) : null;
                if ((dataSplit[3] == 'Bright Mode' && oldLEDStatus == 'Dim Mode') || (index + 1 == data.length) && dataSplit[3] == 'Dim Mode') {
                    let diff = Math.abs(brightModeTmestamp.getTime() - dimModeTimestamp.getTime());
                    if (!isNaN(diff)) {
                        this.timeData[dayIndex][this.currentNodeIndex].dimModeDuration += diff;
                    }
                }
                dataSplit[3] == 'Bright Mode' ? brightModeTmestamp = new Date(dataSplit[0].replace('-', ' ')) : dimModeTimestamp = new Date(dataSplit[0].replace('-', ' '));
                oldLEDStatus = dataSplit[3];
            });

            let endTime = data[0].split(', ')[0].replace('-', ' ');
            let startTime = data[data.length - 1].split(', ')[0].replace('-', ' ');
            // console.log('end time' + new Date(endTime).getDate(), ' start time' + new Date(startTime).getDate());
            let msTotalRuntime = Math.abs(new Date(endTime).getTime() - new Date(startTime).getTime());
            let totalTime = new Date(msTotalRuntime);
            this.timeData[dayIndex][this.currentNodeIndex].totalDateTime = totalTime;
            this.timeData[dayIndex][this.currentNodeIndex].totalTime = Math.abs(totalTime.getTime()) / 36e5;
            // this.timeData[dayIndex][this.currentNodeIndex].totalTime = `${totalTime.getUTCHours()}:${totalTime.getUTCMinutes()}:${totalTime.getUTCSeconds()}.${totalTime.getUTCMilliseconds()}`;
            let dimTime = new Date(this.timeData[dayIndex][this.currentNodeIndex].dimModeDuration);
            console.log(Math.abs(dimTime.getTime()) / 36e5);
            this.timeData[dayIndex][this.currentNodeIndex].dimModeDateTime = dimTime;
            this.timeData[dayIndex][this.currentNodeIndex].dimModeTime = Math.abs(dimTime.getTime()) / 36e5;
            // this.timeData[dayIndex][this.currentNodeIndex].dimModeTime = `${dimTime.getUTCHours()}:${dimTime.getUTCMinutes()}:${dimTime.getUTCSeconds()}.${dimTime.getUTCMilliseconds()}`;
            let brightTime = new Date(Math.abs(totalTime.getTime() - dimTime.getTime()));
            this.timeData[dayIndex][this.currentNodeIndex].brightModeDateTime = brightTime;
            this.timeData[dayIndex][this.currentNodeIndex].brightModeTime = Math.abs(brightTime.getTime()) / 36e5;
            // this.timeData[dayIndex][this.currentNodeIndex].brightModeTime = `${brightTime.getUTCHours()}:${brightTime.getUTCMinutes()}:${brightTime.getUTCSeconds()}.${brightTime.getUTCMilliseconds()}`;
            // console.log(this.timeData[dayIndex][this.currentNodeIndex]);
            data.reverse();
        });

    }

    calculateTimeDuration() {
        let dimModeTimestamp: Date = new Date();
        let brightModeTmestamp: Date = new Date();
        let oldLEDStatus: string = '';
        this.dataLogs.reverse();
        this.dataLogs.forEach((data, index) => {
            let dataSplit = data.split(', ');
            if (dataSplit.length < 3) {
                this.dataLogs.splice(index, 1);
            }
        });
        this.dataLogs.forEach((data, index) => {
            let dataSplit = data.split(', ');
            index == 0 ? oldLEDStatus = dataSplit[3] : null;
            dataSplit[3] == 'Dim Mode' ? dimModeTimestamp = new Date(dataSplit[0].replace('-', ' ')) : null;
            if ((dataSplit[3] == 'Bright Mode' && oldLEDStatus == 'Dim Mode') || (index + 1 == this.dataLogs.length) && dataSplit[3] == 'Dim Mode') {
                let diff = Math.abs(brightModeTmestamp.getTime() - dimModeTimestamp.getTime());
                if (!isNaN(diff)) {
                    this.timeData[this.currentNodeIndex].dimModeDuration += diff;
                }
            }
            dataSplit[3] == 'Bright Mode' ? brightModeTmestamp = new Date(dataSplit[0].replace('-', ' ')) : dimModeTimestamp = new Date(dataSplit[0].replace('-', ' '));
            oldLEDStatus = dataSplit[3];
        });

        let endTime = this.dataLogs[0].split(', ')[0].replace('-', ' ');
        let startTime = this.dataLogs[this.dataLogs.length - 1].split(', ')[0].replace('-', ' ');
        // console.log('end time' + new Date(endTime).getDate(), ' start time' + new Date(startTime).getDate());
        let msTotalRuntime = Math.abs(new Date(endTime).getTime() - new Date(startTime).getTime());
        let totalTime = new Date(msTotalRuntime);
        this.timeData[this.currentNodeIndex].totalDateTime = totalTime;
        this.timeData[this.currentNodeIndex].totalTime = Math.abs(totalTime.getTime()) / 36e5;
        // this.timeData[this.currentNodeIndex].totalTime = `${totalTime.getUTCHours()}:${totalTime.getUTCMinutes()}:${totalTime.getUTCSeconds()}.${totalTime.getUTCMilliseconds()}`;
        let dimTime = new Date(this.timeData[this.currentNodeIndex].dimModeDuration);
        console.log(Math.abs(dimTime.getTime()) / 36e5);
        this.timeData[this.currentNodeIndex].dimModeDateTime = dimTime;
        this.timeData[this.currentNodeIndex].dimModeTime = Math.abs(dimTime.getTime()) / 36e5;
        // this.timeData[this.currentNodeIndex].dimModeTime = `${dimTime.getUTCHours()}:${dimTime.getUTCMinutes()}:${dimTime.getUTCSeconds()}.${dimTime.getUTCMilliseconds()}`;
        let brightTime = new Date(Math.abs(totalTime.getTime() - dimTime.getTime()));
        this.timeData[this.currentNodeIndex].brightModeDateTime = brightTime;
        this.timeData[this.currentNodeIndex].brightModeTime = Math.abs(brightTime.getTime()) / 36e5;
        // this.timeData[this.currentNodeIndex].brightModeTime = `${brightTime.getUTCHours()}:${brightTime.getUTCMinutes()}:${brightTime.getUTCSeconds()}.${brightTime.getUTCMilliseconds()}`;
        // console.log(this.timeData[this.currentNodeIndex]);
        this.dataLogs.reverse();
    }

    calculateAverageTime() {
        let avgTotalTime = new Date(Math.abs(new Date(this.timeData[0].totalDateTime).getTime() + new Date(this.timeData[1].totalDateTime).getTime() + new Date(this.timeData[2].totalDateTime).getTime()) / 3);
        let avgDimTime = new Date(Math.abs(new Date(this.timeData[0].dimModeDateTime).getTime() + new Date(this.timeData[1].dimModeDateTime).getTime() + new Date(this.timeData[2].dimModeDateTime).getTime()) / 3);
        let avgBrightTime = new Date(Math.abs(new Date(this.timeData[0].brightModeDateTime).getTime() + new Date(this.timeData[1].brightModeDateTime).getTime() + new Date(this.timeData[2].brightModeDateTime).getTime()) / 3);

        // this.averageTimeData.totalTime = `${avgTotalTime.getUTCHours()}:${avgTotalTime.getUTCMinutes()}:${avgTotalTime.getUTCSeconds()}.${avgTotalTime.getUTCMilliseconds()}`;
        // this.averageTimeData.dimModeTime = `${avgDimTime.getUTCHours()}:${avgDimTime.getUTCMinutes()}:${avgDimTime.getUTCSeconds()}.${avgDimTime.getUTCMilliseconds()}`;
        // this.averageTimeData.brightModeTime = `${avgBrightTime.getUTCHours()}:${avgBrightTime.getUTCMinutes()}:${avgBrightTime.getUTCSeconds()}.${avgBrightTime.getUTCMilliseconds()}`;
        console.log(this.averageTimeData);
    }
}

class TimeData {
    dimModeDuration: number = 0;
    brightModeDuration: number = 0;
    dimModeTime: number = 0;
    dimModeDateTime: Date = new Date();
    brightModeTime: number = 0;
    brightModeDateTime: Date = new Date();
    totalTime: number = 0;
    totalDateTime: Date = new Date();
    durationTotalTime: number = 0;
    durationDimTime: number = 0;
    durationBrightTime: number = 0;
}

class Node {
    nodeIndex: number = 0;
    nodeLetter: string = '';
    constructor(index: number, letter: string) {
        this.nodeIndex = index;
        this.nodeLetter = letter;
    }
}