import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraDialogPage } from './camera-dialog';

@NgModule({
  declarations: [
    CameraDialogPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraDialogPage),
  ],
})
export class CameraDialogPageModule {}
