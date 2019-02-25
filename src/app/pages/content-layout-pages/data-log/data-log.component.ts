import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-data-log',
    templateUrl: './data-log.component.html',
    styleUrls: ['./data-log.component.scss']
})
export class DataLogComponent implements OnInit {
    dataLogs: string[] = new Array<string>();
    reversedDataLogs: string[] = new Array<string>();

    startDateTime: string = "2019/02/07-17";
    endDateTime: string = "2019/02/08-17";

    timeData: TimeData[] = new Array<TimeData>(3);
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
    }

    onFileUpload(nodeIndex: number) {
        this.currentNodeIndex = nodeIndex;
        $('input[name=file-input]').trigger('click');
    }

    onFileSelected(event: any) {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onloadend = () => {
            this.dataLogs = reader.result.toString().split(/\r?\n/g);
            let startIndex = this.dataLogs.findIndex((data) => {
                return data.includes(this.startDateTime);
            });
            let endIndex = this.dataLogs.findIndex((data) => {
                return data.includes(this.endDateTime);
            });
            this.dataLogs = this.dataLogs.slice(startIndex, endIndex);
            $('input[name=file-input]').val(null);
        }
    }

    calculateTimeDuration() {
        let dimModeTimestamp: Date = new Date();
        let brightModeTmestamp: Date = new Date();
        let oldLEDStatus: string = '';
        this.dataLogs.reverse();

        this.dataLogs.forEach((data, index) => {
            let dataSplit = data.split(', ');
            index == 0 ? oldLEDStatus = dataSplit[3] : null;
            dataSplit[3] == 'Dim Mode' ? dimModeTimestamp = new Date(dataSplit[0].replace('-', ' ')) : null;
            if ((dataSplit[3] == 'Bright Mode' && oldLEDStatus == 'Dim Mode') || (index + 1 == this.dataLogs.length) && dataSplit[3] == 'Dim Mode') {
                let diff = Math.abs(brightModeTmestamp.getTime() - dimModeTimestamp.getTime());
                this.timeData[this.currentNodeIndex].dimModeDuration += diff;
            }
            dataSplit[3] == 'Bright Mode' ? brightModeTmestamp = new Date(dataSplit[0].replace('-', ' ')) : dimModeTimestamp = new Date(dataSplit[0].replace('-', ' '));
            oldLEDStatus = dataSplit[3];
        });

        let endTime = this.dataLogs[0].split(', ')[0].replace('-', ' ');
        let startTime = this.dataLogs[this.dataLogs.length - 1].split(', ')[0].replace('-', ' ');
        let msTotalRuntime = Math.abs(new Date(endTime).getTime() - new Date(startTime).getTime());
        let totalTime = new Date(msTotalRuntime);
        this.timeData[this.currentNodeIndex].totalDateTime = totalTime;
        this.timeData[this.currentNodeIndex].totalTime = `${totalTime.getUTCHours()}:${totalTime.getUTCMinutes()}:${totalTime.getUTCSeconds()}.${totalTime.getUTCMilliseconds()}`;
        let dimTime = new Date(this.timeData[this.currentNodeIndex].dimModeDuration);
        this.timeData[this.currentNodeIndex].dimModeDateTime = dimTime;
        this.timeData[this.currentNodeIndex].dimModeTime = `${dimTime.getUTCHours()}:${dimTime.getUTCMinutes()}:${dimTime.getUTCSeconds()}.${dimTime.getUTCMilliseconds()}`;
        let brightTime = new Date(Math.abs(totalTime.getTime() - dimTime.getTime()));
        this.timeData[this.currentNodeIndex].brightModeDateTime = brightTime;
        this.timeData[this.currentNodeIndex].brightModeTime = `${brightTime.getUTCHours()}:${brightTime.getUTCMinutes()}:${brightTime.getUTCSeconds()}.${brightTime.getUTCMilliseconds()}`;
        this.dataLogs.reverse();
    }

    calculateAverageTime() {
        let avgTotalTime = new Date(Math.abs(new Date(this.timeData[0].totalDateTime).getTime() + new Date(this.timeData[1].totalDateTime).getTime() + new Date(this.timeData[2].totalDateTime).getTime()) / 3);
        let avgDimTime = new Date(Math.abs(new Date(this.timeData[0].dimModeDateTime).getTime() + new Date(this.timeData[1].dimModeDateTime).getTime() + new Date(this.timeData[2].dimModeDateTime).getTime()) / 3);
        let avgBrightTime = new Date(Math.abs(new Date(this.timeData[0].brightModeDateTime).getTime() + new Date(this.timeData[1].brightModeDateTime).getTime() + new Date(this.timeData[2].brightModeDateTime).getTime()) / 3);

        this.averageTimeData.totalTime = `${avgTotalTime.getUTCHours()}:${avgTotalTime.getUTCMinutes()}:${avgTotalTime.getUTCSeconds()}.${avgTotalTime.getUTCMilliseconds()}`;
        this.averageTimeData.dimModeTime = `${avgDimTime.getUTCHours()}:${avgDimTime.getUTCMinutes()}:${avgDimTime.getUTCSeconds()}.${avgDimTime.getUTCMilliseconds()}`;
        this.averageTimeData.brightModeTime = `${avgBrightTime.getUTCHours()}:${avgBrightTime.getUTCMinutes()}:${avgBrightTime.getUTCSeconds()}.${avgBrightTime.getUTCMilliseconds()}`;
        console.log(this.averageTimeData);
    }
}

class TimeData {
    dimModeDuration: number = 0;
    dimModeTime: string = '';
    dimModeDateTime: Date = new Date();
    brightModeTime: string = '';
    brightModeDateTime: Date = new Date();
    totalTime: string = '';
    totalDateTime: Date = new Date();
}

class Node {
    nodeIndex: number = 0;
    nodeLetter: string = '';
    constructor(index: number, letter: string) {
        this.nodeIndex = index;
        this.nodeLetter = letter;
    }
}