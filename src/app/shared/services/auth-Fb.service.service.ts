import { Injectable } from '@angular/core';

declare var FB: any;

@Injectable({
  providedIn: 'root',
})
export class FacebookAuthService {
  constructor() {
    this.initLogin();
  }

  async initLogin() {
    // Cargar e inicializar el SDK de Facebook
      return await FB.init({
        appId: '2291263627940351',  // Reemplaza con tu App ID de Facebook
        cookie: true,
        xfbml: true,
        version: 'v21.0', // Versión de la API de Facebook
      });
  }

  async loginWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.login(
        (response: any) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject('El usuario canceló el inicio de sesión o no autorizó la app.');
          }
        },
        { scope: 'email,public_profile' } // Permisos solicitados
      );
    });
  }

  logout() {
    return new Promise((resolve) => {
      FB.logout((response: any) => {
        resolve(response);
      });
    });
  }

  getUserDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.api('/me', { fields: 'name,email,first_name,last_name,gender,picture' }, (response: any) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject('No se pudo obtener la información del usuario.');
        }
      });
    });
  }
}
