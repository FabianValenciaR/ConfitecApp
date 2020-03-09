import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  @ViewChild("f", null) form: NgForm;
  isNewPasswordRequested: boolean = false;
  cognitoUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.isNewPasswordRequested = false;
  }

  /**
   * Validate the from and send a specific request
   *
   * @param {NgForm} form
   * @returns
   * @memberof AuthPage
   */
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const user = form.value.user;
    const pass = form.value.password;
    this.onLogin(user, pass);
  }

  /**
   *Validate the completed passwordand send the complete request
   *
   * @param {NgForm} form
   * @returns
   * @memberof AuthPage
   */
  onComplete(form: NgForm) {
    if (form.value.newPassword !== form.value.newPasswordConfirm) {
      return;
    }
    const newPassword = form.value.newPassword;
    const email = form.value.email;
    this.completeNewPassword(this.cognitoUser, newPassword, email);
  }

  /**
   * Sends the login request to the service and receive the response
   *
   * @param {string} email
   * @param {string} password
   * @memberof AuthPage
   */
  onLogin(email: string, password: string) {
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Iniciando Sesión..."
      })
      .then(loadingEl => {
        loadingEl.present();
        this.authService
          .login(email, password)
          .then(response => {
            if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
              const header = "Cambio de contraseña requerido";
              const bodyMessage =
                "Es necesario cambiar la contraseña para continuar";
              this.showAlert(header, bodyMessage);
              this.isNewPasswordRequested = true;
            }
            this.cognitoUser = response;
            loadingEl.dismiss();
            this.router.navigateByUrl("/home");
          })
          .catch(error => {
            const header = "Error al iniciar sesión";
            const bodyMessage =
              "El usuario o la contraseña no son válidos, por favor intente nuevamente.";
            this.showAlert(header, bodyMessage);
            this.form.reset();
            loadingEl.dismiss();
          });
      });
  }

  /**
   *Complete the new password
   *
   * @param {string} user
   * @param {string} password
   * @param {string} email
   * @memberof AuthPage
   */
  completeNewPassword(user: string, password: string, email: string) {
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Cambiando contraseña..."
      })
      .then(loadingEl => {
        loadingEl.present();
        this.authService
          .completePassword(user, password, {
            email: email
          })
          .then(response => {
            loadingEl.dismiss();
            this.router.navigateByUrl("/home");
          })
          .catch(error => {
            loadingEl.dismiss();
          });
      });
  }

  /**
   * Shows an alert given an specific message
   *
   * @private
   * @param {string} message
   * @memberof AuthPage
   */
  private showAlert(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: ["Aceptar"]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
