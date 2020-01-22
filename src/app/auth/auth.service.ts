import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";

import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private _userCode = new BehaviorSubject<string>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get userCode() {
    return this._userCode.asObservable().pipe(
      map(user => {
        if (user) {
          return user.toString();
        } else {
          return null;
        }
      })
    );
  }

  get onMemoryCode() {
    return Plugins.Storage.get({ key: "userCode" });
  }

  constructor(private http: HttpClient) {}

  autoLogin() {
    return from(Plugins.Storage.get({ key: "userData" })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({ key: "userData" });
    Plugins.Storage.remove({ key: "userCode" });
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    Plugins.Storage.set({
      key: "userData",
      value: data
    });
    this.getUserCode(userId).subscribe(response => {
      this._userCode.next(response["fields"]["code"]["stringValue"]);
      Plugins.Storage.set({
        key: "userCode",
        value: response["fields"]["code"]["stringValue"]
      });
    });
  }

  private getUserCode(userId: string) {
    return this.http.get(
      `https://firestore.googleapis.com/v1/projects/dev-confitecapp/databases/(default)/documents/Users/${userId}`
    );
  }
}
