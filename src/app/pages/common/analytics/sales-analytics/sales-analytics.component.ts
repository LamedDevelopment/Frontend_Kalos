import { Component, ViewChild } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexPlotOptions,
    ApexResponsive,
    ApexXAxis,
    ApexYAxis,
    ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    grid: ApexGrid;
    chart: ApexChart;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
    colors: any;
};

@Component({
    selector: 'app-sales-analyticsUno',
    templateUrl: './sales-analytics.component.html',
    styleUrls: ['./sales-analytics.component.scss']
})
export class SalesAnalyticsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Peluqueria",
                    data: [30, 20, 40, 25, 18, 43, 15]
                },
                {
                    name: "Peinados",
                    data: [20, 10, 20, 20, 12, 27, 28]
                },
                {
                    name: "Barberia",
                    data: [50, 45, 60, 15, 15, 14, 15]
                },
                {
                    name: "Colorimetria",
                    data: [10, 10, 35, 15, 15, 14, 15]
                },
                {
                    name: "Spa de Uñas",
                    data: [10, 10, 36, 15, 15, 14, 15]
                }
            ],
            chart: {
                type: "bar",
                height: 350,
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            xaxis: {
                type: "category",
                axisBorder: {
                    show: false,
                },
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul"
                ],
                labels: {
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "14px",
                    }
                }
            },
            colors: [
                "#165BAA", "#A155B9", "#F765A3", "#ffc8ff", "#a390eb", "#5a5e9c"
            ],
            legend: {
                offsetY: 0,
                position: "top",
                fontSize: "14px",
                horizontalAlign: "left",
                labels: {
                    colors: '#5B5B98'
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "14px",
                    },
                },
                axisBorder: {
                    show: false,
                }
            },
            fill: {
                opacity: 1
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#EDEFF5"
            }
        };
    }

}
