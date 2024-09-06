import { Component, ViewChild } from '@angular/core';

import {
    ApexChart,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ChartComponent,
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
    selector: 'app-new-vs-returing',
    templateUrl: './new-vs-returing.component.html',
    styleUrls: ['./new-vs-returing.component.scss'],
})
export class NewVsReturingComponent {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor(public themeService: CustomizerSettingsService) {
        this.chartOptions = {
            series: [50],
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
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: 5,
                            fontSize: '15px',
                            fontWeight: '700',
                        },
                    },
                },
            },
            colors: ['#757FEF'],
            labels: ['New vs Returning'],
        };
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
