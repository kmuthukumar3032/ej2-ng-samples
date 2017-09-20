import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, IAccAnimationCompleteEventArgs, AccPoints,
         IAccTextRenderEventArgs, IAccLoadedEventArgs } from '@syncfusion/ej2-ng-charts';

/**
 * Doughnut Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default-doughnut.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultDoughnutComponent {
    public data: Object[] = [
        { 'x': 'Net-tution and Fees', y: 21, text: '21%' },
        { 'x': 'Self-supporting Operations', y: 21, text: '21%' },
        { 'x': 'Private Gifts', y: 8, text: '8%' },
        { 'x': 'All Other', y: 8, text: '8%' },
        { 'x': 'Local Revenue', y: 4, text: '4%' },
        { 'x': 'State Revenue', y: 21, text: '21%' },
        { 'x': 'Federal Revenue', y: 16, text: '16%' }
    ];
    @ViewChild('pie')
    public pie: AccumulationChartComponent | AccumulationChart;
    public onAnimationComplete(args: IAccAnimationCompleteEventArgs) : void {
        let centerTitle: HTMLDivElement = document.getElementById('center_title') as HTMLDivElement;
        centerTitle.style.fontSize = this.getFontSize(args.accumulation.initialClipRect.width);
        let rect: ClientRect = centerTitle.getBoundingClientRect();
        centerTitle.style.top = (args.accumulation.center.y + args.accumulation.element.offsetTop - (rect.height / 2)) + 'px';
        centerTitle.style.left = (args.accumulation.center.x + args.accumulation.element.offsetLeft - (rect.width / 2))  + 'px';
        centerTitle.style.visibility = 'visible';
        let points: AccPoints[] = args.accumulation.visibleSeries[0].points;
        for (let point of points) {
            if (point.labelPosition === 'Outside' && point.labelVisible) {
                let label: Element = document.getElementById('container_datalabel_Series_0_text_' + point.index);
                label.setAttribute('fill', 'black');
            }
        }
    };
    public getFontSize(width: number): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '8px';
        } else {
            return '6px';
        }
    };
    public onTextRender(args: IAccTextRenderEventArgs): void {
        args.series.dataLabel.font.size = this.getFontSize(this.pie.initialClipRect.width);
        this.pie.animateSeries = true;
    }
    public legendSettings: Object = {
            visible: true,
            toggleVisibility: false,
            position: 'Right',
            height: '28%',
            width: '44%'
    };
    public dataLabel: Object = {
        visible: true, position: 'Inside',
        name: 'text',
        font: {
            color: 'white',
            fontWeight: 'Bold',
            size: '14px'
        }
    };
    public load(args: IAccLoadedEventArgs): void {
            let selectedTheme: string = location.hash.split('/')[1];
            args.accumulation.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
    }
    public startAngle: number = 0;
    public endAngle: number = 360;
    public tooltip: Object = { enable: true, format: '${point.x} <br> Composition: ${point.y}%' };
    public title: string = 'Education Institutional Revenue';
    constructor() {
        //code
    };

}