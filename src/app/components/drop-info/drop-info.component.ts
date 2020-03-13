import { Component, OnInit, Input } from "@angular/core";
import { UserIndicators } from "src/app/models/UserIndicators";

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
  // Receive the user data
  @Input() userIndicators: UserIndicators = new UserIndicators();
  // Remaining sales to goal
  salesToGoal: number = 0;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log("changed!");
    this.calculateWayToGoal();
  }

  calculateWayToGoal() {
    if (this.userIndicators.totalCustomers > this.userIndicators.totalVisits) {
      this.salesToGoal =
        //Gets the amount of extra sales needded to achieve to the drop goal
        (this.dropGoal *
          (this.userIndicators.effectiveVisits +
            this.userIndicators.totalCustomers -
            this.userIndicators.totalVisits) -
          this.userIndicators.sales) /
        //Divides by the remaining visits to calculate how much sales is needed in each visit
        (this.userIndicators.totalCustomers - this.userIndicators.totalVisits);
    } else {
      this.salesToGoal =
        //Gets the amount of extra sales needded to achieve to the drop goal
        this.dropGoal * (this.userIndicators.effectiveVisits + 1) -
        this.userIndicators.sales;
    }
    console.log(this.salesToGoal);
  }
}
