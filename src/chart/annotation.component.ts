import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ILoadedEventArgs, IMouseEventArgs, ChartComponent, IAccLoadedEventArgs,
    SelectionMode
} from '@syncfusion/ej2-ng-charts';
import {
    AccumulationChart, AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationDataLabel);


/**
 * Area Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'annotation.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class AnnotationChartComponent {
    public pie: AccumulationChart;
    public render: boolean = false;
    @ViewChild('chart')
    public chart: ChartComponent;
    public legend: Object = {
        visible: false
    };
    public dataSource: Object = [
        { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
        { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
        { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
        { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
    ];
    public pieDataSource: Object[] = [
        { x: 'UK', y: 111 }, { x: 'Germany', y: 76 },
        { x: 'France', y: 66 }, { x: 'Italy', y: 34 }
    ];
    public primaryXAxis: Object = {
        title: 'Years',
        majorGridLines: { width: 0 }, minorGridLines: { width: 1 },
        minorTickLines: { width: 1 }, interval: 1,
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    };
    public chartArea: Object = { border: { width: 0 } };
    public primaryYAxis: Object = {
        title: 'Sales in Billions', lineStyle: { width: 0 },
        minimum: 0, maximum: 700, interval: 100,
        majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
        majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}B',
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    };
    public title: string = 'Mobile Game Market by Country';
    public selectedDataIndexes: any[] = [{ series: 0, point: 0 }];
    public selectionMode: SelectionMode = 'Cluster';

    public chartMouseUp(args: IMouseEventArgs): void {
        if (args.target.indexOf('Point') > -1) {
            let pointIndex: number = parseInt(args.target[args.target.length - 1], 10);
            this.pieDataSource = [];
            for (let series of this.chart.visibleSeries) {
                this.pieDataSource.push({
                    'x': series.name,
                    'y': series.points[pointIndex].y
                });
            }
            this.pie.series[0].dataSource = this.pieDataSource;
            this.pie.series[0].xName = 'x';
            this.pie.series[0].yName = 'y';
            this.pie.refresh();
        }
    }

    public loaded(args: ILoadedEventArgs): void {
        if (this.render) {
            this.pie.destroy();
            this.pie = new AccumulationChart({
                background: 'transparent',
                series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: this.pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
                }],
                load: (args: IAccLoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    args.accumulation.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
                },
                legendSettings: { visible: false }
            });
            this.pie.appendTo('#chart_annotation');
        }


    }
    public animationComplete(args: ILoadedEventArgs): void {
        this.render = true;
        this.pie = new AccumulationChart({
            background: 'transparent',
            series: [{
                radius: '65%', animation: { enable: false },
                dataSource: this.pieDataSource,
                xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
            }],
            load: (args: IAccLoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                args.accumulation.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
            },
            legendSettings: { visible: false }
        });
        this.pie.appendTo('#chart_annotation');
    }
    constructor() {
        // code
    };
}