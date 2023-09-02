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
import { PagesModule } from './pages/pages.module';



const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/forgot-password', component: ForgotPasswordComponent},
    { path: 'auth/reset-password', component: ResetPasswordComponent},
    { path: 'auth/register', component: RegisterComponent},
    { path: 'auth/signin-signup', component: SigninSignupComponent},
    { path: 'auth/logout', component: LogoutComponent},
    { path: 'auth/confirm-mail', component: ConfirmMailComponent},
    { path: 'auth/lock-screen', component: LockScreenComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        PagesModule,
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
