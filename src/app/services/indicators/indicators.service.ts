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
  getSales(userCode: string, date: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
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

  // Sends request to get the current drop
  getCurrentDrop(userCode: string, date: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
          `https://xfd1tml4hd.execute-api.us-east-1.amazonaws.com/Dev`,
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

  //Sends request to get total visits
  getTotalVisits(userCode: string, date: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
          `https://v7rdiy7tsb.execute-api.us-east-1.amazonaws.com/Dev`,
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

  //Sends request to get the sequence break
  getSequenceBreak(userCode: string, date: string) {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      switchMap(data => {
        let token = JSON.parse(data.value).token;
        return this.http.get(
          `https://aml9ms75y2.execute-api.us-east-1.amazonaws.com/Dev`,
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
