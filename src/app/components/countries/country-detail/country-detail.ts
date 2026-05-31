import { Component, input } from '@angular/core';
import { Country } from '@models/country.interface';

@Component({
  selector: 'app-country-detail',
  imports: [],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css',
})
export class CountryDetail {
  country = input.required<Country>();
}
