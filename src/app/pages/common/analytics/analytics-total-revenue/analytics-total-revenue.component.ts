import { Component, ViewChild } from '@angular/core';

import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
} from 'ng-apexcharts';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: any;
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-analytics-total-revenue',
    templateUrl: './analytics-total-revenue.component.html',
    styleUrls: ['./analytics-total-revenue.component.scss'],
})
export class AnalyticsTotalRevenueComponent {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    constructor(public themeService: CustomizerSettingsService) {
        this.chartOptions = {
            series: [65],
            chart: {
                height: 230,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '50%',
                    },
                    dataLabels: {
                        value: {
                            offsetY: 5,
                            fontSize: '15px',
                            fontWeight: '700',
                        },
                    },
                },
            },
            colors: ['#757FEF'],
            labels: ['Calificaciones'],
        };
    }
}
