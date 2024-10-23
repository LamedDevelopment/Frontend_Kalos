import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGoogleService {

  constructor(private readonly oauthService: OAuthService) {
    this.initLogin();
  }

  initLogin() {
    console.log('environment.clientIdQr: ', environment.clientIdQr)
    console.log('environment.urlFront: ', environment.urlFront);
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.clientIdQr,
      redirectUri: `${environment.urlFront}auth/login`,
      scope: 'openid profile email',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    console.log('Oauth')
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

}
