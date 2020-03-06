import { Component, OnInit, Input, ViewChild } from "@angular/core";
import * as Chart from "chart.js";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"]
})
export class BarChartComponent implements OnInit {
  // Receive tthe subtitle of the chart
  @Input() data: number[] = [];
  // Receive the variable of the sold amount
  @Input() sold: number = 2000;
  // Receive the variable of the remain amount to be sold
  @Input() goal: number = 2043;
  // Receive the title of the Chart
  @Input() title: string = "Test Bar Chart";
  // Receive tthe subtitle of the chart
  @Input() subtitle: string = "This is a test";
  // References the chart created
  @ViewChild("barChart", null) barChart;
  barChartChart: any;

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
    if (this.barChartChart) {
      this.barChartChart.destroy();
    }
    let data = {
      barThickness: 8,
      labels: ["LU", "MA", "MI", "JU", "VI", "SA", "DO"],
      datasets: [
        {
          label: "Venta por día",
          data: [504, 345, 656, 765, 97, 767, 0],
          backgroundColor: "#e22126",
          hoverBackgroundColor: "#66A2EB"
        }
      ]
    };

    this.barChartChart = new Chart(this.barChart.nativeElement, {
      type: "bar",
      data: data,
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0 // Edit the value according to what you need
              }
            }
          ],
          yAxes: [
            {
              stacked: false
            }
          ]
        }
      }
    });
  }
}
