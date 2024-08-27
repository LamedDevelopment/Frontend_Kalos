import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/pages/services/auth/auth.service";
import { CustomizerSettingsService } from "src/app/shared/services/customizer-settings.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  @ViewChild("signUpNgForm") signUpNgForm: NgForm;
  hide = true;
  signUpForm: FormGroup;
  showAlert: boolean = false;
  validar: boolean = false;
  progress3: number;

  constructor(
    public themeService: CustomizerSettingsService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
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
      emailConfirm: ["", [Validators.required, Validators.email]],
      pass: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      terms: [false, Validators.requiredTrue],
    });
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
    delete body.confirmPassword;
    const data = {
      name: body.name,
      lastName: body.lastName,
      movil: body.movil.toString(),
      email: body.email,
      pass: body.pass,
      terms: body.terms.toString(),
    };
    console.log(data);
    // Sign up
    this._authService.signUp(data).subscribe(
      (response) => {
        // Navigate to the confirmation required page
        this._router.navigateByUrl("/auth/login");
      },
      (response) => {
        // Re-enable the form
        this.signUpForm.enable();

        // Reset the form
        this.signUpNgForm.resetForm();

        // Set the alert

        // Show the alert
        this.showAlert = true;
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
    const confirmPassword = this.signUpForm.controls["confirmPassword"].value;
    const emailConfirm = this.signUpForm.controls["emailConfirm"].value;
    if (!this.validar) {
      this.validar = true;
      this.validate(
        this.validar,
        this.signUpForm.controls["email"].value === emailConfirm,
        "Los emails no coinciden",
        "confirmEmail"
      );
      this.validate(
        this.validar,
        this.PasswordOk(),
        "La contraseña no es segura",
        "confirmPassword"
      );
      this.validate(
        this.validar,
        this.signUpForm.controls["pass"].value === confirmPassword,
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
      //   regex2.test(this.signUpForm?.get('pass')?.value.trim()) &&
      this.signUpForm.get("pass")?.value.trim().length >= 8
    );
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.signUpForm.get("email")?.setValue(input.value.toLowerCase());
  }
}
