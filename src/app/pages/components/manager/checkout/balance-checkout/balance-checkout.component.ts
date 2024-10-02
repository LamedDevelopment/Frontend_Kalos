import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ManagerService } from 'src/app/pages/services/manager.service';

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
  
  constructor(
    private managerService: ManagerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getInfoDia();
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

  

  processBalanceData(data: any) {
    // Variables controladas para escenarios simulados
    const totalDia = 5950000; // Ingresos totales
    const totalEgresos = -80000; // Gastos totales (no incluye productos)
    const totalEgresosAnticipos = -100000; // Gastos totales (no incluye productos)
    // const totalComisiones = -2687250; // Comisiones generadas por los colaboradores en el dia
    const valorSuministros = -225500; // Costos de suministros
    const totalProductosVendidos = 350000; // Valor pagado por los clientes por los productos
    const costoProductos = -250000; // Costo de los productos vendidos
    const balanceNeto = totalDia + totalEgresos + valorSuministros + totalEgresosAnticipos ; // Ingresos menos egresos
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
      { name: 'Margen de Ganancia Bruta (%)', value: ((totalDia + (totalEgresos + valorSuministros +  totalEgresosAnticipos)) / totalDia) * 100 || 0 },
      { name: 'Rentabilidad Neta (%)', value: (balanceNeto / totalDia) * 100 || 0 },
      { name: 'Cuentas por Cobrar Prestamos', value: totalEgresosAnticipos || 0 },
      // { name: 'Ratio de Liquidez', value: activosCorrientes / pasivosCorrientes || 0 },
      // { name: 'Capacidad de Pago de Deuda (%)', value: (pagosDeuda / totalDia) * 100 || 0 },
      // { name: 'Endeudamiento (%)', value: (totalDeudas / totalActivos) * 100 || 0 },
      { name: 'Saldo en Caja', value: totalDia + (totalEgresos + valorSuministros + totalEgresosAnticipos) || 0 },
    ];
  }
  

  getBalanceClass(value: number): string {
    return value >= 0 ? 'positive' : 'negative';
  }
}