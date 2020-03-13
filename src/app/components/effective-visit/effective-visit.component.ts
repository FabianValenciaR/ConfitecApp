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
  // Receive the percent of effective visit
  @Input() effectiveVisits: number = 0;
  // Receive the percent of effective visit
  @Input() totalVisited: number = 0;
  // Recieve the effective visiter goal (%)
  @Input() effectiveVisitGoal: number = 0.65;
  // Recieve all the user indicators
  @Input() userIndicators: UserIndicators = new UserIndicators();

  constructor() {}

  ngOnInit() {}
}
