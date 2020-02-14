import { Component, OnInit } from "@angular/core";
import { IndicatorsService } from "../services/indicators/indicators.service";
import { TotalSales } from "../models/TotalSales";
import { AuthService } from "../auth/auth.service";
import { zip } from "rxjs";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-indicators",
  templateUrl: "./indicators.page.html",
  styleUrls: ["./indicators.page.scss"]
})
export class IndicatorsPage implements OnInit {
  constructor(
    private indicatorSvc: IndicatorsService,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}
  // Max Date possible to choose
  maxDate: Date = new Date();
  // The selected date to filter the user data
  filterDate: string = new Date().toISOString();
  // Total Sales of a given user
  totalSales: TotalSales = new TotalSales();
  // Effective visits of a given user
  visitasEfectivas: number = 0;
  // Total visits of a given user
  visitasTotales: number = 0;
  // User code used to request specific information to database
  userCode: string = "";
  // Flag that indicates whether the page is loading

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
      this.presentLoadingSpinner();
    });
  }

  /**
   *Creates and present a loading spinner and invokes the getUserData method
   *
   * @memberof IndicatorsPage
   */
  presentLoadingSpinner() {
    // Create the spinner
    this.loadingCtrl
      .create({
        message: "Espere por favor...",
        keyboardClose: true
      })
      //Show the spinner
      .then(loadingEl => {
        loadingEl.present();
        // Getting user data
        this.getUserData(null, loadingEl);
      });
  }

  /**
   *Get all the data for a specific user
   *
   * @memberof IndicatorsPage
   */
  getUserData(event?, spinner?: HTMLIonLoadingElement) {
    //Create constast for each Observable request
    const retrieveUsers = this.indicatorSvc.getUsers();
    const retrieveSales = this.indicatorSvc.getSales(
      this.userCode,
      `"${this.filterDate.slice(0, 10)}"`
    );
    const retrieveTotalVisits = this.indicatorSvc.getTotalVisits(
      this.userCode,
      `"${this.filterDate.slice(0, 10)}"`
    );
    const retrieveDrop = this.indicatorSvc.getCurrentDrop(
      this.userCode,
      `"${this.filterDate.slice(0, 10)}"`
    );
    // Combine all the created requests
    const combinedRequest = zip(
      retrieveUsers,
      retrieveSales,
      retrieveTotalVisits,
      retrieveDrop
    );
    // Subscribe to the response of all the observables combined
    combinedRequest.subscribe(
      ([users, sales, totalVisits, effectiveVisits]) => {
        this.totalSales = sales[0];
        this.visitasEfectivas = effectiveVisits[0]["visitasEfectivas"];
        this.visitasTotales = totalVisits[0]["visitasTotales"];
        // Stops the refresh page spinner
        if (event) {
          event.target.complete();
        }
        // Stops the loading element spinner
        if (spinner) {
          spinner.dismiss();
        }
      }
    );
  }
}
