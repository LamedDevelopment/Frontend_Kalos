import { Component, ViewChild } from "@angular/core";

import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "src/app/pages/services/auth/auth.service";
import { AuthGoogleService } from "src/app/shared/services/auth-google.service.service";
import { CustomizerSettingsService } from "src/app/shared/services/customizer-settings.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-registerqr",
  templateUrl: "./registerqr.component.html",
  styleUrls: ["./registerqr.component.scss"],
})
export class RegisterqrComponent {
  @ViewChild("signUpNgForm") signUpNgForm: NgForm;
  hide = true;
  signUpForm: FormGroup;
  showAlert: boolean = false;
  validar: boolean = false;
  dataqr: string = "";
  progress3: number;

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  durationInSeconds = 5;

  constructor(
    public themeService: CustomizerSettingsService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private authGoogleService: AuthGoogleService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      movil: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      document: [""],
      img: [""],
      terms: [false, Validators.requiredTrue],
    });

    this.route.queryParams.subscribe((params) => {
      // 'd' es el nombre del parámetro en tu URL
      if(params["d"]){
          this.dataqr = params["d"];
          localStorage.setItem('qr', this.dataqr);
          console.log("log registerqr", this.dataqr);
      }
    });
    setTimeout(() => {
        this.showData();
    }, 500);
  }

  /**
   * Register
   */
  signUp(): void {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    if (!this.validateClient()) {
      return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;
    const body = this.signUpForm.getRawValue();
    body.movil = body.movil.toString();
    body.terms = body.terms.toString();
    delete body.emailConfirm;
    const data = {
      name: body.name,
      lastName: body.lastName,
      movil: body.movil.toString(),
      email: body.email,
      document: body.document,
      img: body.img,
      loginType: 'Google',
      terms: body.terms.toString(),
    };
    // Sign up
    this._authService.signUpQR(`usr/qr?d=${this.dataqr}`, data).subscribe(
      (res: any) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        if (res.ok) {
          this._snackBar.open(res.msg, "", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
          setTimeout(() => {
            this._router.navigateByUrl("/usr/login");
          }, 3000);
        }
      },
      (error) => {
        this._snackBar.open(error.error.msg, "", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      }
    );
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleCardBorderTheme() {
    this.themeService.toggleCardBorderTheme();
  }

  toggleCardBorderRadiusTheme() {
    this.themeService.toggleCardBorderRadiusTheme();
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  validateClient() {
    const confirmPassword = this.signUpForm.get("confirmPassword")?.value;
    const emailConfirm = this.signUpForm.get("emailConfirm")?.value;
    if (!this.validar) {
      this.validar = true;
      /* this.validate(
                this.validar,
                this.signUpForm.get('email')?.value === emailConfirm,
                'Los emails no coinciden',
                'confirmEmail'
            ); */
      /* this.validate(
        this.validar,
        this.PasswordOk(),
        "La contraseña no es segura",
        "confirmPassword"
      ); */
      this.validate(
        this.validar,
        this.signUpForm.get("pass")?.value === confirmPassword,
        "Las contraseñas no coinciden",
        "confirmPassword"
      );
    }
    return this.validar;
  }

  validate(validate: any, condition: any, msg: any, id: any) {
    if (validate) {
      if (!condition) {
        this.validar = false;
        this.fireToast(msg);
        return false;
      }
    }
  }

  validarNumber() {
    const regex = /\d/;
    return regex.test(this.signUpForm.get("pass")?.value.trim());
  }

  validarMayus() {
    const regex = /[A-Z]/;
    return regex.test(this.signUpForm.get("pass")?.value.trim());
  }

  validarChar() {
    const regex = /\W/;
    return regex.test(this.signUpForm.get("pass")?.value.trim());
  }

  MatchPassword() {
    if (
      this.signUpForm.get("pass")?.value == "" &&
      this.signUpForm.get("confirmPassword")?.value == ""
    ) {
      return null;
    }
    this.progress3 = 100;
    return (
      this.signUpForm.get("pass")?.value ==
      this.signUpForm.get("confirmPassword")?.value
    );
  }

  fireToast(msg: any) {
    Swal.fire("Información", msg, "info");
  }

  PasswordOk() {
    const regex = /\d/;
    const regex1 = /[A-Z]/;
    const regex2 = /\W/;

    return (
      regex.test(this.signUpForm.get("pass")?.value.trim()) &&
      regex1.test(this.signUpForm.get("pass")?.value.trim()) &&
      // regex2.test(this.signUpForm?.get('pass')?.value.trim()) &&
      this.signUpForm.get("pass")?.value.trim().length >= 8
    );
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.signUpForm.get("email")?.setValue(input.value.toLowerCase());
  }

  showData() {
    const data = this.authGoogleService.getProfile();
    console.log(data)
    if(data){
        this.signUpForm.controls['name'].setValue(data['given_name']);
        this.signUpForm.controls['lastName'].setValue(data['family_name']);
        this.signUpForm.controls['email'].setValue(data['email']);
        this.signUpForm.controls['name'].setValue(data['given_name']);
        this.signUpForm.controls['img'].setValue(data['picture']);
        this.dataqr = localStorage.getItem('qr') ?? '';
        console.log(this.dataqr);
    }
  }

  loginOauth() {
        console.log('entro a Oauth')
        this.authGoogleService.login();
    }

  logOut() {
    this.authGoogleService.logout();
  }
}
