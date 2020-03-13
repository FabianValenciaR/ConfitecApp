import { Component, OnInit } from "@angular/core";
import { IndicatorsService } from "../services/indicators/indicators.service";
import { AuthService } from "../auth/auth.service";
import { LoadingController } from "@ionic/angular";
import { UserIndicators } from "../models/UserIndicators";

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
  userIndicators: UserIndicators = new UserIndicators();
  // Effective visits of a given user
  visitasEfectivas: number = 0;
  // Total visits of a given user
  visitasTotales: number = 0;
  // User code used to request specific information to database
  userCode: string = "";
  // Stores the monthly user budget goal
  userBudget: number = 600;
  // The drop goal
  dropGoal: number = 30;
  // The effective visit goal (%)
  effectiveVisitGoal: number = 0.65;

  ngOnInit() {}

  /**
   *Executes the getUserData function to refresh the information according to the selected date
   *
   * @memberof IndicatorsPage
   */
  onDateChange() {
    this.presentLoadingSpinner();
  }

  /**
   *Executes the getUserData function when enters to the view
   *
   * @memberof IndicatorsPage
   */
  ionViewWillEnter() {
    this.authService.userData.then(response => {
      if (!response || response == null) {
        return;
      }
      const userData = JSON.parse(response.value);
      this.userCode = `"${userData.userId}"`;
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
   *Gets the user data
   *
   * @param {*} [event]
   * @param {HTMLIonLoadingElement} [spinner]
   * @memberof IndicatorsPage
   */
  getUserData(event?, spinner?: HTMLIonLoadingElement) {
    const retrieveSales = this.indicatorSvc.getIndicators(
      this.userCode,
      `"${this.filterDate.slice(0, 10)}"`
    );
    retrieveSales.subscribe(
      indicators => {
        this.userIndicators = indicators;
        //Stops the refresh page spinner
        if (event) {
          event.target.complete();
        }
        // Stops the loading element spinner
        if (spinner) {
          spinner.dismiss();
        }
      },
      error => {
        //ERROR HANDLING
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
