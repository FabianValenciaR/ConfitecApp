import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";

import { User } from "./user.model";
import { Auth } from "aws-amplify";

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

  get userData() {
    return Plugins.Storage.get({ key: "userData" });
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

  // login(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true
  //       }
  //     )
  //     .pipe(tap(this.setUserData.bind(this)));
  // }

  login(email: string, password: string) {
    return Auth.signIn(email, password).then(response => {
      if (!response.challengeName) {
        const userId = response.username;
        const jwtToken = response.signInUserSession.idToken.jwtToken;
        const userEmail = response.attributes.email;
        const expirationDateToken = new Date(
          new Date().getTime() + 3600 * 1000
        );
        this.storeAuthData(
          userId,
          jwtToken,
          expirationDateToken.toISOString(),
          userEmail
        );
      }
      return response;
    });
  }

  completePassword(user: any, password: string, attributes?: any) {
    return Auth.completeNewPassword(user, password, attributes).then(
      response => {
        const userId = response.username;
        const jwtToken = response.signInUserSession.idToken.jwtToken;
        const userEmail = attributes.email;
        const expirationDateToken = new Date(
          new Date().getTime() + 3600 * 1000
        );
        this.storeAuthData(
          userId,
          jwtToken,
          expirationDateToken.toISOString(),
          userEmail
        );
        return response;
      }
    );
  }

  logout() {
    this._user.next(null);
    Auth.signOut({ global: true })
      .then(response => {
      })
      .catch(error => {
      });
    Plugins.Storage.clear();
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
  }
}
