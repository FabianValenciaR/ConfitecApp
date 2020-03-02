import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";
import { UserIndicators } from 'src/app/models/UserIndicators';

@Injectable({
  providedIn: "root"
})
export class IndicatorsService {

  constructor(private http: HttpClient) {}

  // Sends the requests to get all active users from database
  getUsers() {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
          `https://nfbpnz5bva.execute-api.us-east-1.amazonaws.com/Development`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  // Sends request to get the total sales
  getIndicators(userCode: string, date: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get<UserIndicators>(
          `https://cgwpjvxsjc.execute-api.us-east-1.amazonaws.com/Dev`,
          {
            headers: {
              authorization: `Bearer ${token}`
            },
            params: {
              code: userCode,
              date: date
            }
          }
        );
      })
    );
  }
}
