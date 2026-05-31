import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Home | NG-Countries',
        loadComponent: () =>
            import('@components/countries/country-list/country-list').then(m => m.CountryList)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
