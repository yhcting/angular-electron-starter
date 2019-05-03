import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import * as home from './@home';

/*
 * NOTE: string value of loadChildren looks evaluated before typescript compilation.
 * So, something like `/path/${expression}/path`, is NOT allowed
 *   => leads to angular compilation error.
 * it should be pure string.
 */
export const ROUTES: Routes = [
    {
        path: 'home',
        component: home.ROOT_COMPONENT
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, {
            useHash: true,
            // enableTracing: true
        }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
