import { Component, OnInit, Input } from "@angular/core";
import { UserIndicators } from "src/app/models/UserIndicators";

@Component({
  selector: "app-effective-visit",
  templateUrl: "./effective-visit.component.html",
  styleUrls: ["./effective-visit.component.scss"]
})
export class EffectiveVisitComponent implements OnInit {
  // Receive the title of the chart
  @Input() title: string = "";
  // Receive the subtitle of the chart
  @Input() subtitle: string = "";
  // Recieve the effective visiter goal (%)
  @Input() effectiveVisitGoal: number = 0.65;
  // Recieve all the user indicators
  @Input() userIndicators: UserIndicators = new UserIndicators();
  currentVisitPercentage: number = 0;
  extraVisitsNeeded: number = 0;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.calculateEffectiveVisitGoal();
  }

  /**
   *Calculate the remaining effective visit to achieve the percentage goal
   *
   * @memberof EffectiveVisitComponent
   */
  calculateEffectiveVisitGoal() {
    this.extraVisitsNeeded = 0;
    if (
      this.userIndicators.effectiveVisits / this.userIndicators.totalVisits <
      this.effectiveVisitGoal
    ) {
      do {
        this.extraVisitsNeeded++;
        this.currentVisitPercentage =
          (this.userIndicators.effectiveVisits + this.extraVisitsNeeded) /
          (this.userIndicators.totalVisits + this.extraVisitsNeeded);
      } while (this.currentVisitPercentage < this.effectiveVisitGoal);
    }
    console.log(this.userIndicators);
  }
}
