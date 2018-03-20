import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { CameraDialogPage } from '../camera-dialog/camera-dialog';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  items = [];
  constructor(public navCtrl: NavController, private camera: Camera, public storage: AngularFireStorage,
    private database: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController) {

this.database.database.ref('images').on('child_added', (data)=>{
    const file = { ...data.val(), downloadUrl:''};
    file.downloadUrl =  this.storage.ref(file.url).getDownloadURL();

    this.items.push(file);
})
    // this.items = this.database.list('images').valueChanges();

    // this.items.subscribe(s=> {
    //   s.forEach(i => {

    //   this.storage.ref(i.url).getDownloadURL().subscribe(test => {
    //     console.log(test);
    //     i.downloadUrl = test;
    //   });
    //   })
    // });

    
  }

  takeAnother() {
    let modal = this.modalCtrl.create(CameraDialogPage);
    modal.onDidDismiss(data => {
      this.upload(data);
    })
    modal.present();
  }

  upload(data) {
    let loader = this.loadingCtrl.create({
      content: "Uploading ...",
    });
    loader.present();
    const filename = Math.floor(Date.now() / 1000);
    let storageRef = this.storage.ref(`images/${filename}.jpg`);


    storageRef.putString(data, firebase.storage.StringFormat.DATA_URL)
      .then(snapshot => {
        return this.database.database.ref('images').push({ url: `images/${filename}.jpg` });
      })
      .then((snapshot) => {
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Uploaded successfully',
          duration: 3000
        });
        toast.present();
      });
  }
  
  download(file){
    if(file.downloading){
      return;
    }
    console.log(file);
    file.downloading = true;
    return this.storage.storage.ref().child(file.url+'').getDownloadURL();
    
  }



}
