import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";

@Injectable({
  providedIn: "root"
})
export class IndicatorsService {
  // Server's Host domain
  private API_URI = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // Sends the requests to get all active users from database
  getUsers() {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(`${this.API_URI}/api/users/getUsers`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      })
    );
  }

  // Sends request to get the total sales
  getSales(userCode: string, daysAgo: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
          `${this.API_URI}/api/users/getDailyTotalSales/${userCode}/${daysAgo}`,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  // Sends request to get the current drop
  getCurrentDrop(userCode: string, daysAgo: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
          `${this.API_URI}/api/users/getCurrentDrop/${userCode}/${daysAgo}`,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  //Sends request to get total visits
  getTotalVisits(userCode: string, daysAgo: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
          `${this.API_URI}/api/users/getEffectiveVisits/${userCode}/${daysAgo}`,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );
      })
    );
  }
}
