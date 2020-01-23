import { Component, OnInit } from "@angular/core";
import { IndicatorsService } from "../services/indicators/indicators.service";

@Component({
  selector: "app-indicators",
  templateUrl: "./indicators.page.html",
  styleUrls: ["./indicators.page.scss"]
})
export class IndicatorsPage implements OnInit {
  constructor(private indicatorSvc: IndicatorsService) {}
  maxDate: Date = new Date();

  ngOnInit() {}

  ionViewWillEnter() {
    this.retrieveUsers();
    this.retrieveSales();
    this.retrieveTotalVisits();
    this.retrieveDrop();
  }

  retrieveUsers() {
    this.indicatorSvc.getUsers().subscribe(response => {});
  }

  retrieveSales() {
    this.indicatorSvc.getSales("1102126735", "0").subscribe(response => {
      console.log(response);
    });
  }

  retrieveDrop() {
    this.indicatorSvc.getCurrentDrop("1102126735", "0").subscribe(response => {
      console.log(response);
    });
  }

  retrieveTotalVisits() {
    this.indicatorSvc.getTotalVisits("1102126735", "0").subscribe(response => {
      console.log(response);
    });
  }
}
