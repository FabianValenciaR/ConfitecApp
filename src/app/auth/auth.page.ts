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
  logoPath: string = "../../assets/confiteca_logo.png";

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

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
        this.authService.login(email, password).subscribe(
          response => {
            this.form.reset();
            this.router.navigateByUrl("/home");
            loadingEl.dismiss();
          },
          error => {
            this.form.reset();
            loadingEl.dismiss();

            const code = error.error.error.message;
            let message =
              "Ocurrió un problema al iniciar sesión, por favor intente nuevamente.";
            if (code == "EMAIL_NOT_FOUND") {
              message = "El correo electrónico ingresado no existe.";
            } else if (code == "INVALID_PASSWORD") {
              message = "La contraseña ingresada no es válida.";
            } else if (code == "USER_DISABLED") {
              message = "La cuenta ha sido desabilitada por el administrador.";
            }
            this.showAlert(message);
          }
        );
      });
  }

  /**
   * Shows an alert given an specific message
   *
   * @private
   * @param {string} message
   * @memberof AuthPage
   */
  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "No se pudo iniciar sesión.",
        message: message,
        buttons: ["Aceptar"]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
