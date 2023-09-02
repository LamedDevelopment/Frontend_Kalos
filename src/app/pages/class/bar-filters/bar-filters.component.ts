import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { ServiceCategoryService } from '../../services/service-category.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-bar-filters',
  templateUrl: './bar-filters.component.html',
  styleUrls: ['./bar-filters.component.scss']
})
export class BarFiltersComponent implements OnInit {

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    data: any[];

    @ViewChildren(MatCardModule, { read: ElementRef }) private _Cards: QueryList<ElementRef>

    filters: string[] = ['Peluqueria', 'Spa de Uñas', 'Barberia', 'Peluqueria Infantil'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';
    goToNegocio = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private dataService: ServiceCategoryService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
     }

    ngOnInit() {
        this.data = this.dataService.getData();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    private _calcNumberOfCards(): void
    {
        // Prepare the numberOfCards object
        this.numberOfCards = {};

        // Prepare the count
        let count = 0;

        // Go through the filters
        this.filters.forEach((filter) => {

            // For each filter, calculate the card count
            if ( filter === 'all' )
            {
                count = this._Cards.length;
            }
            else
            {
                count = this.numberOfCards[filter] = this._Cards.filter(lamedCard => lamedCard.nativeElement.classList.contains('filter-' + filter)).length;
            }

            // Fill the numberOfCards object with the counts
            this.numberOfCards[filter] = count;
        });
    }

    /**
     * Filter the cards based on the selected filter
     *
     * @private
     */
    private _filterCards(): void
    {
        // Go through all fuse-cards
        this._Cards.forEach((lamedCard) => {

            // If the 'all' filter is selected...
            if ( this.selectedFilter === 'all' )
            {
                // Remove hidden class from all cards
                lamedCard.nativeElement.classList.remove('hidden');
            }
            // Otherwise...
            else
            {
                // If the card has the class name that matches the selected filter...
                if ( lamedCard.nativeElement.classList.contains('filter-' + this.selectedFilter) )
                {
                    // Remove the hidden class
                    lamedCard.nativeElement.classList.remove('hidden');
                }
                // Otherwise
                else
                {
                    // Add the hidden class
                    lamedCard.nativeElement.classList.add('hidden');
                }
            }
        });
    }

}
