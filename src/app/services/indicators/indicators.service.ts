import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class IndicatorsService {
  // Server's Host domain
  private API_URI = "http://localhost:3000";
  token = "";

  constructor(private http: HttpClient,) {
    this.token = "testToken";
  }



  // Sends the requests to get all active users from database
  getUsers() {
    return this.http.get(`${this.API_URI}/api/users/getUsers`, {
      headers: {
        authorization: `Bearer ${this.token}`
      }
    });
  }

  // Sends request to get the total sales
  getSales(userCode: string, daysAgo: string) {
    return this.http.get(
      `${this.API_URI}/api/users/getDailyTotalSales/${userCode}/${daysAgo}`
    );
  }

  // Sends request to get the current drop
  getCurrentDrop(userCode: string, daysAgo: string) {
    return this.http.get(
      `${this.API_URI}/api/users/getCurrentDrop/${userCode}/${daysAgo}`
    );
  }

  //Sends request to get total visits
  getTotalVisits(userCode: string, daysAgo: string) {
    return this.http.get(
      `${this.API_URI}/api/users/getEffectiveVisits/${userCode}/${daysAgo}`
    );
  }
}
