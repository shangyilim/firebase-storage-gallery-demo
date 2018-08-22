import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImageCapture } from 'image-capture';
/**
 * Generated class for the CameraDialogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-dialog',
  templateUrl: 'camera-dialog.html',
})
export class CameraDialogPage {

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  imageCapture: any;
  hideVideo = false;
  cameras = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        this.video.nativeElement.srcObject = mediaStream;
        const track = mediaStream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(track);

      })
      .catch(error => console.error('getUserMedia() error:', error));

    navigator.mediaDevices.enumerateDevices().then(all => {
      this.cameras = [all.find(c => c.kind === 'videoinput')];
    })
  }

  test() {
    this.hideVideo = true;
    this.imageCapture.grabFrame()
      .then(imageBitmap => {
        this.canvas.nativeElement.width = imageBitmap.width;
        this.canvas.nativeElement.height = imageBitmap.height;
        this.canvas.nativeElement.getContext('2d').drawImage(imageBitmap, 0, 0);

      })
      .catch(error => console.log(error));
  }

  submit() {
    const dataurl = this.canvas.nativeElement.toDataURL();
    this.viewController.dismiss(dataurl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraDialogPage');
  }

  switch(cam) {
    var constraints = {
      video: { deviceId: cam.deviceId }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        this.video.nativeElement.srcObject = mediaStream;
        const track = mediaStream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(track);

      })
      .catch(error => console.error('getUserMedia() error:', error));

  }


}
