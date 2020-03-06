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
    // Delete any existing chart
    if (this.barChartChart) {
      this.barChartChart.destroy();
    }

    //Initialize dataset object
    let data = {
      barThickness: 8,
      labels: ["LU", "MA", "MI", "JU", "VI", "SA", "DO"],
      datasets: [
        {
          label: "Venta por día",
          data: [504, 345, 656, 765, 97, 767, 0],
          backgroundColor: "#e22126",
          hoverBackgroundColor: "#f5b207"
        }
      ]
    };

    this.barChartChart = new Chart(this.barChart.nativeElement, {
      // Chart Type
      type: "bar",
      // Dataset
      data: data,
      // Config options of chart
      options: {
        // Hide or show leyend of dataset
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              // Hide X axes grid
              gridLines: {
                display: false
              },
              ticks: {
                min: 0 // Edit the value according to what you need
              }
            }
          ],
          yAxes: [
            {
              // Hide Y axis labels
              ticks: {
                display: false
              },
              // Hide Y axes grid
              gridLines: {
                display: false
              },
              stacked: false
            }
          ]
        }
      }
    });
  }
}
