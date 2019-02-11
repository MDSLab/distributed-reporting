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

import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

import { Camera, CameraOptions } from '@ionic-native/camera';

import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {
  @ViewChild('descrizione') descrizione;

  public loading: Loading;
  email: string;
  lat: number;
  longi: number;
  itemsRef: AngularFireList<any>;
  public foto : any;
  public base64Image : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private afDatabase: AngularFireDatabase, private fire: AngularFireAuth, private camera: Camera, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private locationAccuracy: LocationAccuracy, private diagnostic: Diagnostic, public plt: Platform, private storage: Storage) {
    this.email = fire.auth.currentUser.email;
    this.itemsRef = afDatabase.list('/segnalazioni');
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
      quality: 60, // picture quality
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

  invia(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    let dateobj = new Date();
    function pad(n) {return n < 10 ? "0"+n : n;}
    let data = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
    let ora = pad(dateobj.getHours()) + ":" + pad(dateobj.getUTCMinutes());

    if (this.plt.is('android')){
      this.diagnostic.isGpsLocationEnabled().then((GPS)=> {
        if (GPS) {
          if (typeof this.foto !== "undefined") {
            const newItemRef = this.itemsRef.push({});
            this.geolocation.getCurrentPosition().then((position) => {
              this.lat = position.coords.latitude;
              this.longi = position.coords.longitude;
              newItemRef.set({
                id: newItemRef.key,
                user: this.email,
                data_in: data,
                ora_in: ora,
                data_out: '',
                ora_out: '',
                latitudine: this.lat,
                longitudine: this.longi,
                img_in: this.foto,
                img_out: '',
                descrizione: this.descrizione.value,
                stato: 2,
                capo: '',
                sorvegliante: '',
                note_chiusura: ''
              });
              this.incrementaSegnalazioni();
              this.loading.dismiss().then(() => {
                alert("Segnalazione inviata correttamente.\nIn attesa di riorganizzare i servizi, riscontreremo a breve la sua richiesta.\nGrazie per la collaborazione!");
                this.navCtrl.pop();
              });
            }).catch(
              (err) => {
                this.loading.dismiss().then(() => {
                  console.error('Errore: ', JSON.stringify(err));
                });
              });
          } else {
            this.loading.dismiss().then(() => {
              alert("Non è possibile inviare segnalazioni senza foto.\nScattarne una e riprovare");
            });
          };

        }else {
          this.loading.dismiss().then(() => {
            this.locationAccuracy.canRequest().then((canRequest: boolean) => {

              if (!canRequest) {
                alert("Posizione disattivata. Attivarla dalle Impostazioni e reinviare la segnalazione");
              }else{
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                  () => console.log('Request successful'),
                  error => console.log('Error requesting location permissions', error)
                );
              };

            });
          });
        }
      });
    }else if (this.plt.is('ios')){
      this.diagnostic.isLocationEnabled().then((GPS)=> {
        if (GPS) {
          if (typeof this.foto !== "undefined") {
            const newItemRef = this.itemsRef.push({});
            this.geolocation.getCurrentPosition().then((position) => {
              this.lat = position.coords.latitude;
              this.longi = position.coords.longitude;
              newItemRef.set({
                id: newItemRef.key,
                user: this.email,
                //data_in: new Date().toLocaleDateString(),
                //ora_in: new Date().toLocaleTimeString(),
                data_in: data,
                ora_in: ora,
                data_out: '',
                ora_out: '',
                latitudine: this.lat,
                longitudine: this.longi,
                img_in: this.foto,
                img_out: '',
                descrizione: this.descrizione.value,
                stato: 2,
                capo: '',
                sorvegliante: '',
                note_chiusura: ''
              });
              this.incrementaSegnalazioni();
              this.loading.dismiss().then(() => {
                alert("Segnalazione inviata correttamente.\nIn attesa di riorganizzare i servizi, riscontreremo a breve la sua richiesta.\nGrazie per la collaborazione!");
                this.navCtrl.pop();
              });
            }).catch(
              (err) => {
                this.loading.dismiss().then(() => {
                  console.error('Errore: ', JSON.stringify(err));
                });
              });
          } else {
            this.loading.dismiss().then(() => {
              alert("Non è possibile inviare segnalazioni senza foto.\nScattarne una e riprovare");
            });
          };

        }else {
          this.loading.dismiss().then(() => {
            this.locationAccuracy.canRequest().then((canRequest: boolean) => {

              if (canRequest) {
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                  () => alert("Servizio di Localizzazione disattivato. Andare su Impostazioni>Privacy>Localizzazione, attivarlo, e reinviare la segnalazione."),
                  error => console.log('Posizione Ok')
                );

              };

            });
          });
        }
      });
    };


  }

  controllaNumeroSegnalazioni(){
    //Modificare in funzione del numero di segnalazioni giornaliere ammesse
    let numeroMaxSegnalazioniGiornaliere = 1;

    let dateobj = new Date();
    let giornoCorrente = dateobj.getDate();

    //Inizializza lo storage locale nel caso in cui sia la prima installazione
    this.storage.get('segnalazioni').then((val) => {
      if (!val) {
        this.storage.set('segnalazioni', JSON.stringify(0));
        this.storage.set('giorno', JSON.stringify(giornoCorrente));
      }
    });

    //Se è un giorno diverso dall'ultimo registrato, resetta a 0 le segnalazioni e salva il nuovo giorno
    this.storage.get('giorno').then((val2) => {
      let valore2 = JSON.parse(val2);

      if (valore2 != giornoCorrente){
        //alert("Resetto valori");
        this.storage.set('segnalazioni', JSON.stringify(0));
        this.storage.set('giorno', JSON.stringify(giornoCorrente));
      }

      this.storage.get('segnalazioni').then((val) => {
        let valore = parseInt(JSON.parse(val));
        if (valore < numeroMaxSegnalazioniGiornaliere){
          //alert("Numero segnalazioni: " + valore);
        }else {
          alert("Raggiunto il numero massimo di segnalazioni giornaliere.\nRiprovare domani");
          this.navCtrl.pop();
        }
      });

    });
  }

  incrementaSegnalazioni(){
    this.storage.get('segnalazioni').then((val) => {
      let valore = parseInt(JSON.parse(val));
      this.storage.set('segnalazioni',JSON.stringify(valore+1));
    });
  }

  ionViewDidLoad() {
    this.controllaNumeroSegnalazioni();
  }

}
