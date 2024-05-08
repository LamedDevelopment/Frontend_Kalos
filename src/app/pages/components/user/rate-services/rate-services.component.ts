import {
    AfterViewInit,
    Component,
    NgModule,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarModule,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEditorModule } from 'ngx-editor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/pages/services/user/user.service';
import { LoungService } from 'src/app/pages/services/user/loung.service';

@Component({
  selector: 'app-rate-services',
  templateUrl: './rate-services.component.html',
  styleUrls: ['./rate-services.component.scss']
})
export class RateServicesComponent {
    displayedColumns: string[] = [
        'product',
        'service',
        'price',
        'date',
        'peluqueria',
        'nombre',
        'rate',
    ];
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ELEMENT_DATA: Array<any>[];
    dataSource: any;
    rating: number = 5;
    starts:Array<any>;

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {}

    get stars() {
        return Array(Math.floor(this.rating)).fill(0);
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.GetServices();
        this.starts = Array(Math.floor(this.rating)).fill(0)
    }


    GetServices(){


        this._getAppointment
        .getAppointmentDayOrWeek('qs/usr')
        .subscribe((appo: any) => {
            this.ELEMENT_DATA = appo.msg.filter((el:any) => el.globalStatus.statusCod == 8);
            this.ELEMENT_DATA.map((el: any) => {
                el.rating = Array(Math.floor(this.rating)).fill(0);
            });
            this.dataSource = new MatTableDataSource<any>(
                this.ELEMENT_DATA
            );
            this.dataSource.paginator = this.paginator;
        });
    }

    rateService(element: any, index:number) {

        // element.rating[i] = (element.rating[i] === 1) ? 0 : 1;
        for (let i = 0; i <= index; i++) {
            element.rating[i] = 1;
        }
        for (let i = index + 1; i < element.rating.length; i++) {
            element.rating[i] = 0;
        }

        element.userRating = {
            questionOne: "¿Cómo califica el servicio prestado en el establecimiento?",
            ratingOne: element.rating.filter( (r:any) => r == 1).length,
            questionTwo: "¿Cómo califica el servicio prestado en el establecimiento?",
            ratingTwo: element.rating.filter( (r:any) => r == 1).length,
            questionThree: "¿Cómo califica el servicio prestado en el establecimiento?",
            ratingThree: element.rating.filter( (r:any) => r == 1).length,
            observation:""
        }

        element.appointmentID = element._id;
         console.log(element)
        setTimeout(() => {
            // delete element.rating;
            delete element._id
            this._getAppointment.ratingServices(element).subscribe(
                (response) => {
                    this._snackBar.open('Servicio eliminado exitosamente!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.ngOnInit();
                },
                (response) => {
                    this._snackBar.open(`${response.error.msg}!!!`, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.ngOnInit();
                }
            );
        }, 800);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
