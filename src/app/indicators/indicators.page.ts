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
  }

  retrieveUsers() {
    this.indicatorSvc.getUsers().subscribe(response => {});
  }
}
