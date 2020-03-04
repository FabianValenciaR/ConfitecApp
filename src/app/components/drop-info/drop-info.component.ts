import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-drop-info",
  templateUrl: "./drop-info.component.html",
  styleUrls: ["./drop-info.component.scss"]
})
export class DropInfoComponent implements OnInit {
  // Receive the title of the chart
  @Input() title: string = "";
  // Receive the subtitle of the chart
  @Input() subtitle: string = "";
  // Receive the drop goal
  @Input() dropGoal: number = 30;
  // Receive the total sales value
  @Input() totalSales: number = 0;
  // Receive the effective visits 
  @Input() effectiveVisits: number = 0;


  constructor() {}

  ngOnInit() {}
}
