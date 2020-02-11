import { Component, OnInit } from "@angular/core";
import { IndicatorsService } from "../services/indicators/indicators.service";
import { TotalSales } from "../models/TotalSales";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-indicators",
  templateUrl: "./indicators.page.html",
  styleUrls: ["./indicators.page.scss"]
})
export class IndicatorsPage implements OnInit {
  constructor(
    private indicatorSvc: IndicatorsService,
    private authService: AuthService
  ) {}
  maxDate: Date = new Date();
  filterDate: string = new Date().toISOString();
  totalSales: TotalSales = new TotalSales();
  visitasEfectivas: number = 0;
  visitasTotales: number = 0;
  userCode: string = "";

  ngOnInit() {}

  /**
   *Executes the getUserData function to refresh the information according to the selected date
   *
   * @memberof IndicatorsPage
   */
  onDateChange() {
    this.getUserData();
  }

  /**
   *Executes the getUserData function when enters to the view
   *
   * @memberof IndicatorsPage
   */
  ionViewWillEnter() {
    this.authService.onMemoryCode.then(code => {
      this.userCode = `"${code["value"]}"`;
      this.getUserData();
    });
  }

  /**
   *Get all the data for a specific user
   *
   * @memberof IndicatorsPage
   */
  getUserData() {
    this.retrieveUsers();
    this.retrieveSales(this.userCode);
    this.retrieveTotalVisits(this.userCode);
    this.retrieveDrop(this.userCode);
  }

  /**
   *Get all the active users
   *
   * @memberof IndicatorsPage
   */
  retrieveUsers() {
    this.indicatorSvc.getUsers().subscribe(response => {});
  }

  /**
   *Get the current sales given a specific userCode and Date
   *
   * @memberof IndicatorsPage
   */
  retrieveSales(userCode: string) {
    this.indicatorSvc.getSales(this.userCode, "0").subscribe(response => {
      this.totalSales = response[0];
    });
  }

  /**
   *Get the current drop given a specific userCode and Date
   *
   * @memberof IndicatorsPage
   */
  retrieveDrop(iuserCode: string) {
    this.indicatorSvc.getCurrentDrop(this.userCode, "0").subscribe(response => {
      this.visitasEfectivas = response[0]["visitasEfectivas"];
    });
  }

  /**
   *Get the total visits given a specific userCode and date
   *
   * @memberof IndicatorsPage
   */
  retrieveTotalVisits(userCode: string) {
    this.indicatorSvc.getTotalVisits(this.userCode, "0").subscribe(response => {
      this.visitasTotales = response[0]["visitasTotales"];
    });
  }
}
