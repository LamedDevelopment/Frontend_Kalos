import {
    CUSTOM_ELEMENTS_SCHEMA,
    LOCALE_ID,
    NgModule,
    isDevMode,
} from '@angular/core';

import {
    FormsModule,
    ReactiveFormsModule,
    FormControl,
    Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
    DatePipe,
    HashLocationStrategy,
    LocationStrategy,
    APP_BASE_HREF,
} from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgChartsModule } from 'ng2-charts';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ColorPickerModule } from 'ngx-color-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/componentsShared/header/header.module';
import { SidebarModule } from './shared/componentsShared/sidebar/sidebar.module';
import { FooterModule } from './shared/componentsShared/footer/footer.module';

import { CustomizerSettingsModule } from './shared/componentsShared/customizer-settings/customizer-settings.module';

import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { ConfirmMailComponent } from './components/authentication/confirm-mail/confirm-mail.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { LockScreenComponent } from './components/authentication/lock-screen/lock-screen.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { SigninSignupComponent } from './components/authentication/signin-signup/signin-signup.component';
import { AuthService } from './pages/services/auth/auth.service';
import { AuthInterceptor } from './components/authentication/auth/auth.interceptor';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ApiServiceHttp } from './pages/services/api.service';
import { LoginComponentFun } from './components/authentication/loginFuncionarios/login.component';
import { RegisterqrComponent } from './components/authentication/registerqr/registerqr.component';

registerLocaleData(localeEs, 'es');

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        SigninSignupComponent,
        LogoutComponent,
        ConfirmMailComponent,
        LockScreenComponent,
        LoginComponentFun,
        RegisterqrComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatMenuModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        NgApexchartsModule,
        MatProgressBarModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgScrollbarModule,
        FormsModule,
        FullCalendarModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        CarouselModule,
        NgxEditorModule,
        DragDropModule,
        HttpClientModule,
        CdkAccordionModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        NgxGaugeModule,
        NgChartsModule,
        NgxMatTimepickerModule,
        QuillModule.forRoot(),
        NgxDropzoneModule,
        ColorPickerModule,
        CustomizerSettingsModule,
        ScrollingModule,
        PagesModule,
        HeaderModule,
        SidebarModule,
        FooterModule,
    ],
    providers: [
        DatePipe,
        AuthService,
        ApiServiceHttp,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useValue: 'es',
        },
        /* { provide: LocationStrategy, useClass: HashLocationStrategy }, */
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [],
})
export class AppModule {}
