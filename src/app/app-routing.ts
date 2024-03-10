import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { SigninSignupComponent } from './components/authentication/signin-signup/signin-signup.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ConfirmMailComponent } from './components/authentication/confirm-mail/confirm-mail.component';
import { LockScreenComponent } from './components/authentication/lock-screen/lock-screen.component';
import { NoAuthGuard } from './components/authentication/auth/guards/noAuth.guard';
import { AuthGuard } from './components/authentication/auth/guards/auth.guard';
import { PagesComponent } from './pages/pages.component';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { LoginComponentFun } from './components/authentication/loginFuncionarios/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterqrComponent } from './components/authentication/registerqr/registerqr.component';

const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'home', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'usr/qr', component: RegisterqrComponent },
    { path: 'auth/login-fun', component: LoginComponentFun },
    { path: 'auth/forgot-password', component: ForgotPasswordComponent },
    { path: 'auth/reset-password', component: ResetPasswordComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/signin-signup', component: SigninSignupComponent },
    { path: 'auth/logout', component: LogoutComponent },
    { path: 'auth/confirm-mail', component: ConfirmMailComponent },
    { path: 'auth/lock-screen', component: LockScreenComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        PagesModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
