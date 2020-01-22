import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { take, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  userCode: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getUserCode();
    this.getOnMemoryCode();
  }

  getUserCode() {
    this.authService.userCode.subscribe(response => {
      if (!response || response == null) {
        return;
      }
      this.userCode = response;
    });
  }

  getOnMemoryCode() {
    this.authService.onMemoryCode.then(code => {
      this.userCode = code["value"];
    });
  }
}
