import { Component, ViewChild } from "@angular/core";

import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "src/app/pages/services/auth/auth.service";
import { FacebookAuthService } from "src/app/shared/services/auth-Fb.service.service";
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
  googleData: any = {};
  facebookData: any = {};

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
    private authGoogleService: AuthGoogleService,
    private authServiceFB: FacebookAuthService,
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
    // No hacer nada si el formulario es inválido
    if (this.signUpForm.invalid || !this.validateClient()) {
        return;
    }

    // Deshabilitar el formulario
    this.signUpForm.disable();

    // Ocultar la alerta
    this.showAlert = false;

    // Obtener los datos del formulario
    const body = this.signUpForm.getRawValue();
    body.movil = body.movil.toString();
    body.terms = body.terms.toString();
    delete body.emailConfirm;

    let loginData: any = null;

    // Verificar si los datos son de Google o de Facebook
    const googleData = this.authGoogleService.getProfile();
    if (googleData) {
        loginData = {
            name: googleData["given_name"],
            lastName: googleData["family_name"],
            email: googleData["email"],
            img: googleData["picture"],
            loginType: 'Google'
        };
    } else {
        // Obtener los datos de Facebook si no se encontró Google
        this.authServiceFB.loginWithFacebook().then((response) => {
            this.authServiceFB.getUserDetails().then((facebookData) => {
                loginData = {
                    name: facebookData.first_name,
                    lastName: facebookData.last_name,
                    email: facebookData.email,
                    img: facebookData.picture.data.url, // URL de la imagen de perfil
                    loginType: 'Facebook'
                };

                // Una vez que tenemos los datos de Facebook, llamamos al backend
                this.completeSignUp(loginData, body);
            }).catch((error) => {
                console.error('Error al obtener detalles del usuario de Facebook:', error);
            });
        }).catch((error) => {
            console.error('Error al iniciar sesión con Facebook:', error);
        });
        return; // Detener aquí para esperar el callback de Facebook
    }

    // Si los datos provienen de Google, se completa el registro directamente
    if (loginData) {
        this.completeSignUp(loginData, body);
    }
}
/**
 * Método auxiliar para realizar el registro en el backend
 */
completeSignUp(loginData: any, body: any): void {
  // Construir el objeto final a enviar al backend
  const data = {
      name: loginData.name,
      lastName: loginData.lastName,
      movil: body.movil.toString(),
      email: loginData.email,
      document: body.document,
      img: body.img,
      loginType: loginData.loginType,
      terms: body.terms.toString(),
  };

  // Llamada al backend para registrar al usuario
  this._authService.signUpQR(`usr/qr?d=${this.dataqr}`, data).subscribe(
      (res: any) => {
          console.log(res);
          if (res.ok) {
              this._snackBar.open(res.msg, "", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: this.durationInSeconds * 1000,
              });
              setTimeout(() => {
                  this._router.navigateByUrl("/");
              }, 2000);
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
  // signUp(): void {
  //   // Do nothing if the form is invalid
  //   if (this.signUpForm.invalid) {
  //     return;
  //   }
  //   if (!this.validateClient()) {
  //     return;
  //   }

  //   const googleData = this.authGoogleService.getProfile();

  //   // Disable the form
  //   this.signUpForm.disable();

  //   // Hide the alert
  //   this.showAlert = false;
  //   const body = this.signUpForm.getRawValue();
  //   body.movil = body.movil.toString();
  //   body.terms = body.terms.toString();
  //   delete body.emailConfirm;
  //   const data = {
  //     name: googleData["given_name"],
  //     lastName: googleData["family_name"],
  //     movil: body.movil.toString(),
  //     email: googleData["email"],
  //     document: body.document,
  //     img: body.img,
  //     loginType: 'Google',
  //     terms: body.terms.toString(),
  //   };
  //   // Sign up
  //   this._authService.signUpQR(`usr/qr?d=${this.dataqr}`, data).subscribe(
  //     (res: any) => {
  //       console.log("====================================");
  //       console.log(res);
  //       console.log("====================================");
  //       if (res.ok) {
  //         this._snackBar.open(res.msg, "", {
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           duration: this.durationInSeconds * 1000,
  //         });
  //         setTimeout(() => {
  //           this._router.navigateByUrl("/");
  //         }, 2000);
  //       }
  //     },
  //     (error) => {
  //       this._snackBar.open(error.error.msg, "", {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         duration: this.durationInSeconds * 1000,
  //       });
  //     }
  //   );
  // }

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

  // showData() {
  //   const dataGoogle = this.authGoogleService.getProfile();
    
  //   if (dataGoogle) {
  //     this.googleData = {
  //       name: dataGoogle["given_name"],
  //       lastName: dataGoogle["family_name"],
  //       email: dataGoogle["email"],
  //       img: dataGoogle["picture"],
  //     };

  //     this.signUpForm.controls["name"].setValue(this.googleData.name);
  //     this.signUpForm.controls["lastName"].setValue(this.googleData.lastName);
  //     this.signUpForm.controls["email"].setValue(this.googleData.email);
  //     this.signUpForm.controls["img"].setValue(this.googleData.img);
  //     this.dataqr = localStorage.getItem("qr") ?? "";
  //   } else {
  //     this.authServiceFB.loginWithFacebook().then((response) => {
  //         this.authServiceFB.getUserDetails().then((userData) => {
  //           // Aquí obtienes los datos de usuario de Facebook
  //           console.log(userData);
  //           if (userData) {
  //             this.facebookData = {
  //               name: userData.first_name,
  //               lastName: userData.last_name,
  //               email: userData.email,
  //               img: userData.picture,
  //             };
  //           }
  //           this.signUpForm.controls["name"].setValue(this.facebookData.name);
  //           this.signUpForm.controls["lastName"].setValue(this.facebookData.lastName);
  //           this.signUpForm.controls["email"].setValue(this.facebookData.email);
  //           this.signUpForm.controls["img"].setValue(this.facebookData.img);
  //           this.dataqr = localStorage.getItem("qr") ?? "";

  //           // Llama al método postLogin para enviar los datos al backend
            
  //       });
  //     }).catch((error) => {
  //         console.error('Error al iniciar sesión con Facebook: ', error);
  //     }); 
  //   }

  // }


  showData() {
    // Verificar si hay datos de Google
    const googleData = this.authGoogleService.getProfile();
    
    if (googleData) {
        this.googleData = {
            name: googleData["given_name"],
            lastName: googleData["family_name"],
            email: googleData["email"],
            img: googleData["picture"],
        };

        this.fillFormWithData(this.googleData);
    } else {
        // Si no hay datos de Google, verificar si hay datos de Facebook
        this.authServiceFB.loginWithFacebook().then((response) => {
            this.authServiceFB.getUserDetails().then((userData) => {
                console.log(userData);
                if (userData) {
                    this.facebookData = {
                        name: userData.first_name,
                        lastName: userData.last_name,
                        email: userData.email,
                        img: userData.picture.data.url, // Obtener la imagen desde el campo correcto
                    };

                    this.fillFormWithData(this.facebookData);
                }
            }).catch((error) => {
                console.error('Error al obtener detalles del usuario de Facebook:', error);
            });
        }).catch((error) => {
            console.error('Error al iniciar sesión con Facebook:', error);
        });
    }

    // Obtener el QR desde el localStorage
    this.dataqr = localStorage.getItem("qr") ?? "";
}

/**
 * Método auxiliar para rellenar el formulario con los datos de Google o Facebook
 */
fillFormWithData(data: { name: string; lastName: string; email: string; img: string }) {
    this.signUpForm.controls["name"].setValue(data.name);
    this.signUpForm.controls["lastName"].setValue(data.lastName);
    this.signUpForm.controls["email"].setValue(data.email);
    this.signUpForm.controls["img"].setValue(data.img);
    
    // Llama al método postLogin para enviar los datos al backend si es necesario
    // this.postLogin(data);
}

  // showDataFB() {
     
  // }

  // showData() {
  //   const data = this.authGoogleService.getProfile();
  //   console.log(data)
  //   if(data){
  //       this.signUpForm.controls['name'].setValue(data['given_name']);
  //       this.signUpForm.controls['lastName'].setValue(data['family_name']);
  //       this.signUpForm.controls['email'].setValue(data['email']);
  //       this.signUpForm.controls['name'].setValue(data['given_name']);
  //       this.signUpForm.controls['img'].setValue(data['picture']);
  //       this.dataqr = localStorage.getItem('qr') ?? '';
  //       console.log(this.dataqr);
  //   }
  // }

  loginOauth() {
        console.log('entro a Oauth')
        this.authGoogleService.login();
    }

  logOut() {
    this.authGoogleService.logout();
  }
}
