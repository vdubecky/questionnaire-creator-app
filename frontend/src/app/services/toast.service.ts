import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

export enum ToastDuration {
  SHORT = 2000,
  LONG = 4000
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }


  /**
   * Shows a toast with the provided text and duration.
   * @param text
   * @param duration
   */
  public show(text: string, duration: ToastDuration): void {
    this.snackBar.open(text, undefined, {
      duration: duration,
    });
  }
}
