import { Component, computed, inject, signal } from '@angular/core';
import { Country } from '@models/country.interface';
import { CountriesService } from '@services/countries.service';
import { CountryDetail } from "../country-detail/country-detail";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-country-list',
  imports: [CountryDetail],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css',
})
export class CountryList {
  private readonly countriesService = inject(CountriesService);

  countries = signal<Country[]>([]);
  searchTerm = signal<string>('');
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  constructor() {
    this.countriesService.getCountries()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) => {
          this.countries.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.message);
          this.isLoading.set(false);
        },
      });
  }

  filteredCountries = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.countries();

    return this.countries().filter(country => 
      country.name.common.toLowerCase().includes(term) || 
      country.capital?.[0]?.toLowerCase().includes(term)
    );
  });
}
