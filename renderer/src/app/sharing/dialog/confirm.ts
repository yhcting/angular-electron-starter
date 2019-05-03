import {
    Component,
    Inject
} from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material';

export interface DialogData {
    title: string;
    message: string;
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm.html',
    styleUrls: ['./confirm.scss']
})
export class ConfirmDialogComponent {
    constructor(
        public ref: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onCancel(): void {
        this.ref.close();
    }
}
