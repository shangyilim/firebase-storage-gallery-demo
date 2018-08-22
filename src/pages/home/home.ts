import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { CameraDialogPage } from '../camera-dialog/camera-dialog';

import { Observable } from 'rxjs/Observable';
import uuidv4 from 'uuid/v4';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  items: Observable<any[]>;
  constructor(public navCtrl: NavController, private camera: Camera, public storage: AngularFireStorage,
    private database: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController) {

    this.items = this.database.list('images',ref=> ref.orderByChild('timestamp')).valueChanges();

  }

  takeAnother() {
    let modal = this.modalCtrl.create(CameraDialogPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.upload(data);
      }
    })
    modal.present();
  }

  upload(data) {
    const filename = Math.floor(Date.now() / 1000);
    let storageRef = this.storage.ref(`images/${filename}.jpg`);
    const id = uuidv4();

    this.database.database.ref(`images/${id}`)
      .set({
        offline: true,
        data,
        timestamp: (new Date()).getTime(),
      })
      .then(() => {
        storageRef.putString(data, firebase.storage.StringFormat.DATA_URL, {
          customMetadata: {
            id
          }
        });
      });

  }

  download(file) {
    if (file.downloading) {
      return;
    }
    console.log(file);
    file.downloading = true;
    return this.storage.storage.ref().child(file.url + '').getDownloadURL();

  }



}
