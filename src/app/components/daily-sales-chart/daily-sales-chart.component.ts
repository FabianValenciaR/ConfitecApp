import { Component, OnInit, Input, ViewChild } from "@angular/core";
import * as Chart from "chart.js";

@Component({
  selector: "app-daily-sales-chart",
  templateUrl: "./daily-sales-chart.component.html",
  styleUrls: ["./daily-sales-chart.component.scss"]
})
export class DailySalesChartComponent implements OnInit {
  // Receive the variable of the sold amount
  @Input() sold: number = 0;
  // Receive the variable of the remain amount to be sold
  @Input() goal: number = 0;
  // Receive the title of the Chart
  @Input() title: string = "";
  // Receive tthe subtitle of the chart
  @Input() subtitle: string = "";
  // References the chart created
  @ViewChild("ventasDiarias", null) ventasDiarias;
  ventasDiariasChart: any;

  constructor() {}

  ngOnInit() {
    this.showDialySales();
  }

  ngOnChanges() {
    this.showDialySales();
  }

  /**
   *Draws the chart with the parameters detailed below
   *
   * @memberof DailySalesChartComponent
   */
  showDialySales() {
    if (this.ventasDiariasChart) {
      this.ventasDiariasChart.destroy();
    }
    let remain = 0;
    if (this.goal - this.sold > 0) {
      remain = this.goal - this.sold;
    }
    this.ventasDiariasChart = new Chart(this.ventasDiarias.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Vendido", "Restante"],
        datasets: [
          {
            data: [this.sold, remain],
            backgroundColor: ["rgba(226, 33, 38, 1)", "rgba(226, 33, 38, 0.1)"],
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        tooltips: {
          enabled: true
        }
      }
    });
  }
}
