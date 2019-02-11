/*
# SPDX-license-identifier: Apache-2.0
#
# Copyright (c) 2019 UniME - MDSLab
#
# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
  #
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
*/

import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-chiudi',
  templateUrl: 'chiudi.html',
})
export class ChiudiPage {
  @ViewChild('note_chiusura') note_chiusura;
  selectedLeave : number;

  email: string;
  lat: number;
  longi: number;
  itemsRef: AngularFireList<any>;
  public foto : any;
  public base64Image : string;
  public loading: Loading;

  dati: any;
  items: Observable<any []>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, public fire: AngularFireAuth, public camera: Camera, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.dati = navParams.get('dettaglio');
    this.items = navParams.get('items');

    this.email = fire.auth.currentUser.email;
    this.itemsRef = afDatabase.list('/segnalazioni');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChiudiPage');
  }

  alert(message:string) {
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  scattaFoto(){
    const options : CameraOptions = {
      quality: 60, // qualità dell'immagine
      targetWidth: 900,
      targetHeight: 900,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.foto = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  apriGalleria() {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 60,
      targetWidth: 900,
      targetHeight: 900,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.foto = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  invia(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let stato: string;

    let dateobj = new Date();
    function pad(n) {return n < 10 ? "0"+n : n;}
    let data = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
    let ora = pad(dateobj.getHours()) + ":" + pad(dateobj.getUTCMinutes());


    if(this.selectedLeave == 1){
      stato = "annullata";
    }else{
      stato = "chiusa"
    }

    if(typeof this.foto !== "undefined" && this.selectedLeave == 0){
      const newItemRef = this.itemsRef.update(this.dati.id,{img_out: this.foto, data_out: data, ora_out: ora, stato: Number(this.selectedLeave), note_chiusura: this.note_chiusura.value});
      this.navCtrl.remove(2,1);
      this.loading.dismiss().then(() => {
        this.navCtrl.pop();
      });
    }else if(this.selectedLeave == 1){
      const newItemRef = this.itemsRef.update(this.dati.id,{data_out: data, ora_out: ora, stato: Number(this.selectedLeave), note_chiusura: this.note_chiusura.value});
      this.navCtrl.remove(2,1);
      this.loading.dismiss().then(() => {
        this.navCtrl.pop();
      });
    }else{
      this.loading.dismiss().then(() => {
        alert("Non è possibile chiudere segnalazioni senza foto e senza selezionare lo stato.\nRiprovare");
      });
    }

  }

}
