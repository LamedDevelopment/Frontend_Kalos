import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode(); // Habilita el modo de producción
    if (window) {
        window.console.log = () => {}; // Deshabilita los console.log en producción
    }
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
