import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ManagerService } from 'src/app/pages/services/manager.service';
import * as moment from 'moment';

// Definición de la interfaz para los datos del balance
interface BalanceDataItem {
    name: string;
    value: number;
    children?: BalanceDataItem[]; // Propiedad opcional para permitir hijos
}

@Component({
    selector: 'app-balance-checkout',
    templateUrl: './balance-checkout.component.html',
    styleUrls: ['./balance-checkout.component.scss']
})
export class BalanceCheckoutComponent implements OnInit {
    // balanceData: { name: string; value: number }[] = [];

    balanceData: BalanceDataItem[] = [];
    totalEgresos: any;
    valorSuministros: any;

    constructor(
        private managerService: ManagerService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getInfoDia();
        this.getEgresos();
        this.getSuministros();
        // TODO Cambiar e.p de comisiones
        // this.getComisiones();
    }

    getInfoDia() {
        this.managerService.getSalesofDay().subscribe(
            (response) => {
                this.processBalanceData(response.msg);
            },
            (error) => {
                this.snackBar.open('Error al consultar información', 'Cerrar', {
                    duration: 3000,
                });
            }
        );
    }

    getEgresos() {

        let fecha = moment().format('DD/MM/YYYY');
        const dataUser = this.getDataUser();
        let body = {

            "business": {
                "business": dataUser?.business,
                "nit": dataUser?.nit,
                "nameBusiness": dataUser?.businessName,
                "tradename": dataUser?.branchOffices[0]?.tradeName
            },
            "dateOutflow": fecha
        }

        this.managerService.getEgresos(body).subscribe(
            (response) => {
                console.log("🚀 ~ BalanceCheckoutComponent ~ getEgresos ~ response:", response);
                this.totalEgresos = response.msg.totalEgresos;
            },
            (error) => {
                this.snackBar.open('Error al consultar información', 'Cerrar', {
                    duration: 3000,
                });
            }
        );
    }

    getDataUser() {
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        return datauser;
    }

    processBalanceData(data: any) {
        console.log("🚀 ~ BalanceCheckoutComponent ~ data:", data);
        // Variables controladas para escenarios simulados
        const totalDia = data.TotalVentas?.totalSales; // Ingresos totales
        const totalEgresos = -(this.totalEgresos); // Gastos totales (no incluye productos)
        const valorSuministros = this.valorSuministros; // Costos de suministros

        const totalEgresosAnticipos = -100000; // Gastos totales (no incluye productos)
        // const totalComisiones = -2687250; // Comisiones generadas por los colaboradores en el dia

        const totalProductosVendidos = 350000; // Valor pagado por los clientes por los productos
        const costoProductos = -250000; // Costo de los productos vendidos
        const balanceNeto = totalDia + totalEgresos + valorSuministros + totalEgresosAnticipos; // Ingresos menos egresos
        // const activosCorrientes = 3000000;
        // const pasivosCorrientes = 1000000;
        // const pagosDeuda = 500000;
        // const totalDeudas = 1000000;
        // const totalActivos = 7000000;
        // const gastosOperativos = 1000000;

        this.balanceData = [
            { name: 'Ingresos Totales', value: totalDia || 0 },
            { name: 'Egresos Totales', value: totalEgresos || 0 },
            // { name: 'Comisiones del día', value: | 0 },
            { name: 'Valor Total Suministros', value: valorSuministros || 0 },
            {
                name: 'Total Productos Vendidos',
                value: totalProductosVendidos || 0,
                children: [
                    { name: 'Costo de Productos Vendidos', value: costoProductos || 0 }, // Subparámetro bajo Total Productos Vendidos
                    { name: 'Ganancia Bruta de Productos', value: totalProductosVendidos + costoProductos || 0 }, // Ganancia bruta de la venta de productos
                ]
            },
            { name: 'Balance Neto', value: balanceNeto },
            { name: 'Margen de Ganancia Bruta (%)', value: ((totalDia + (totalEgresos + valorSuministros + totalEgresosAnticipos)) / totalDia) * 100 || 0 },
            { name: 'Rentabilidad Neta (%)', value: (balanceNeto / totalDia) * 100 || 0 },
            { name: 'Cuentas por Cobrar Prestamos', value: totalEgresosAnticipos || 0 },
            // { name: 'Ratio de Liquidez', value: activosCorrientes / pasivosCorrientes || 0 },
            // { name: 'Capacidad de Pago de Deuda (%)', value: (pagosDeuda / totalDia) * 100 || 0 },
            // { name: 'Endeudamiento (%)', value: (totalDeudas / totalActivos) * 100 || 0 },
            { name: 'Saldo en Caja', value: totalDia + (totalEgresos + valorSuministros + totalEgresosAnticipos) || 0 },
        ];
    }

    getSuministros() {

        let fecha = moment().format('DD/MM/YYYY');
        const dataUser = this.getDataUser();
        let body = {

            "business": {
                "business": dataUser?.business,
                "nit": dataUser?.nit,
                "nameBusiness": dataUser?.businessName,
                "tradename": dataUser?.branchOffices[0]?.tradeName
            },
            "dateSupply": fecha
        }
        this.managerService.getSuministros(body).subscribe(
            (response) => {
                console.log("🚀 ~ BalanceCheckoutComponent ~ response:", response);
                this.valorSuministros = response.msg.totalAmount;
            },
            (error) => {
                this.snackBar.open('Error al consultar información', 'Cerrar', {
                    duration: 3000,
                });
            }
        );
    }

    getComisiones() {

        let fecha = moment().format('DD/MM/YYYY');
        const dataUser = this.getDataUser();
        let body = {

            "business": {
                "business": dataUser?.business,
                "nit": dataUser?.nit,
                "nameBusiness": dataUser?.businessName,
                "tradename": dataUser?.branchOffices[0]?.tradeName
            },
            // TODO Validar con backend y e.p
            "dateCommissions": fecha
        }
        this.managerService.getComisiones(body).subscribe(
            (response) => {
                console.log("🚀 ~ BalanceCheckoutComponent ~ response:", response);
                // TODO Crear variable nueva y asignar valor
                this.valorSuministros = response.msg.totalAmount;
            },
            (error) => {
                this.snackBar.open('Error al consultar información', 'Cerrar', {
                    duration: 3000,
                });
            }
        );
    }

    getBalanceClass(value: number): string {
        return value >= 0 ? 'positive' : 'negative';
    }
}
