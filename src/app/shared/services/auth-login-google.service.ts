import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGoogleService {

  constructor(private oauthService: OAuthService) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.clientIdLogin,
      redirectUri: 'http://localhost:4200/auth/login',
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
