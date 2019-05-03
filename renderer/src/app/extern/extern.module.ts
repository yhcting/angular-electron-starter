import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    HttpClientModule
} from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import * as mat from '@angular/material';
// NG Translate
import { TranslateModule } from '@ngx-translate/core';

//////////////////////////////////////////////////////////////////////////////
//
// Application common(shared) module.
//
//////////////////////////////////////////////////////////////////////////////
// Module groups
const ANGULAR_MODULES = [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule
];

const MAT_MODULES = [
    mat.MatAutocompleteModule,
    mat.MatBadgeModule,
    mat.MatButtonModule,
    mat.MatButtonToggleModule,
    mat.MatCardModule,
    mat.MatCheckboxModule,
    mat.MatChipsModule,
    mat.MatStepperModule,
    mat.MatDatepickerModule,
    mat.MatDialogModule,
    mat.MatExpansionModule,
    mat.MatGridListModule,
    mat.MatIconModule,
    mat.MatInputModule,
    mat.MatListModule,
    mat.MatMenuModule,
    mat.MatNativeDateModule,
    mat.MatPaginatorModule,
    mat.MatProgressBarModule,
    mat.MatProgressSpinnerModule,
    mat.MatRadioModule,
    mat.MatRippleModule,
    mat.MatSelectModule,
    mat.MatSidenavModule,
    mat.MatSliderModule,
    mat.MatSlideToggleModule,
    mat.MatSnackBarModule,
    mat.MatSortModule,
    mat.MatTableModule,
    mat.MatTabsModule,
    mat.MatToolbarModule,
    mat.MatTooltipModule,
];


const NPM_MODULES = [
];

// AoT requires an exported function for factories

/**
 * External modules having sharing modules.
 */
@NgModule({
    declarations: [
    ],
    imports: [
        ANGULAR_MODULES,
        MAT_MODULES,
        NPM_MODULES
    ],
    exports: [
        ANGULAR_MODULES,
        MAT_MODULES,
        NPM_MODULES,

        //
        // [ Exporting 'forRoot' modules! ]
        // These are already imported at root module via forRoot()
        //
        TranslateModule,
    ]
})
export class ExternModule { }
