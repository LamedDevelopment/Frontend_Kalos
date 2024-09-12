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
    selector: 'app-sessions-device',
    templateUrl: './sessions-device.component.html',
    styleUrls: ['./sessions-device.component.scss'],
})
export class SessionsDeviceComponent {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor(public themeService: CustomizerSettingsService) {
        this.chartOptions = {
            series: [5],
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
            colors: ['#FF8A54'],
            labels: ['Mobile & Laptop'],
        };
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
