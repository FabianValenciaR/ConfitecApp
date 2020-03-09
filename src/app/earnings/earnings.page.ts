import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-earnings",
  templateUrl: "./earnings.page.html",
  styleUrls: ["./earnings.page.scss"]
})
export class EarningsPage implements OnInit {
  // Tab selected by default
  selectedTab: string = "daily";
  dailyEarnings: number = 65.43;

  constructor() {}

  selectTab(tab: string) {
    // Assign the selected tab to the variable
    this.selectedTab = tab;

    //Remove all the active classes
    document.getElementById("daily").classList.remove("active-tab");
    document.getElementById("weekly").classList.remove("active-tab");
    // document.getElementById("monthly").classList.remove("active-tab");

    //Add the active class to the selected tab
    document.getElementById(tab).classList.add("active-tab");
  }

  ngOnInit() {
    document.getElementById("daily").classList.add("active-tab");
  }
}
