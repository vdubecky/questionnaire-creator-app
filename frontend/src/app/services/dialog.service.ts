import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../components/dialogs/confirm-dialog/confirm-dialog.component";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }


  /**
   * Opens a confirmation dialog with the specified title and description.
   * Confirmation dialog contains title, description and Yes/no buttons. See {@link ConfirmDialogComponent}
   * @param title
   * @param description
   */
  public openConfirmationDialog(title: string, description: string): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        message: description,
      }
    }).afterClosed()
  }
}
