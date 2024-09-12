import { Component, ViewChild } from "@angular/core";
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexGrid,
    ApexLegend,
    ApexStroke,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexYAxis,
    ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: any;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
    colors: any;
};

@Component({
    selector: 'app-analytics-audience-overview',
    templateUrl: './analytics-audience-overview.component.html',
    styleUrls: ['./analytics-audience-overview.component.scss']
})
export class AnalyticsAudienceOverviewComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Pedro Sanchez",
                    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51]
                },
                {
                    name: "Juan Pablo",
                    data: [50, 57, 74, 99, 75, 38, 62, 47, 82, 56]
                },
                {
                    name: "Jaime Ramirez",
                    data: [8, 57, 62, 47, 82, 56, 74, 99, 75, 38]
                },
                {
                    name: "Roberto Benitez",
                    data: [5, 11, 22, 32, 33, 48, 9, 17, 26, 15]
                },
                {
                    name: "Luisa Botero",
                    data: [15, 54, 79, 92, 68, 35, 64, 52, 87, 59]
                },
                {
                    name: "Alejandro Rodriguez",
                    data: [55, 63, 81, 98, 84, 50, 72, 57, 90, 64]
                }
            ],
            chart: {
                height: 287,
                type: "line",
                toolbar: {
                    show: false,
                }
            },
            colors: [
                "#2DB6F5", "#F765A3", "#757FEF", "#FF9F43", "#2DB600", "#F76800", "#757B00",
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 3,
                curve: "straight",
            },
            legend: {
                offsetY: 3,
                position: "top",
                fontSize: "14px",
                horizontalAlign: "center",
                labels: {
                    colors: '#5B5B98',
                }
            },
            yaxis: {
                tickAmount: 4,
                labels: {
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "14px",
                    }
                },
                axisBorder: {
                    show: false,
                }
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                labels: {
                    trim: false,
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "14px",
                    }
                },
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                ]
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#EDEFF5"
            }
        };
    }

}
