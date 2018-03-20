import { Component } from '@angular/core';

/**
 * Generated class for the CameraDialogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'camera-dialog',
  templateUrl: 'camera-dialog.html'
})
export class CameraDialogComponent {

  text: string;

  constructor() {
    console.log('Hello CameraDialogComponent Component');
    this.text = 'Hello World';
  }

}
