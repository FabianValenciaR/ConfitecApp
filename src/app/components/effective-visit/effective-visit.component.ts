import { Component, OnInit, Input } from "@angular/core";

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
  @Input() visitaEfectiva: number = 0;

  constructor() {}

  ngOnInit() {}
}
