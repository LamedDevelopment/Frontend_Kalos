import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {NgIf} from '@angular/common';
import { HomeService } from '../../services/home.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ServicesService } from '../../services/services.service';
import { ServiceCategoryService } from '../../services/service-category.service';
import { AuthService } from '../../services/auth/auth.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [HomeService],
})
export class HomeComponent {

    longText = `Cuando ingresas a cualquiera de Nuestros Servicios, Exteriorizamos tu belleza interna.`;
    salones: any[] = [];
    salon: any[] = [];
    servicios: any[] = [];

    constructor(
        public themeService: CustomizerSettingsService,
        private services: ServicesService,
        private hair: HomeService,
        private authService:AuthService
    ) {
        console.log(this.salones);
      }

      async ngOnInit() {

          this.salones = this.hair.getData();
          this.servicios = this.services.getData();
          await this.authService.InfoUserApi().subscribe((data:any)=> {
          });
        // Aquí puedes realizar cualquier procesamiento adicional con los datos de salones
      }
//     getServiceIcon(type: string) {
//     const service = this.servicios.find(item => item.type === type);
//     return service ? service.icono : '';
//   }

}
