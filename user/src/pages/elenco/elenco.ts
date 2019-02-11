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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { DettagliPage } from "../dettagli/dettagli";
import { FotoPage } from "../foto/foto";

import { Observable } from "rxjs/Observable";

import { Geolocation } from '@ionic-native/geolocation';

import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-elenco',
  templateUrl: 'elenco.html',
})
export class MainElenco {

  public loading: Loading;
  email: string;

    itemsRef: AngularFireList<any>;
    items: Observable<any []>;
    riferimento: AngularFireList<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public fire: AngularFireAuth, public afDatabase: AngularFireDatabase, public geolocation: Geolocation, public loadingCtrl: LoadingController, private storage: Storage) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.email = fire.auth.currentUser.email;
      //this.itemsRef = afDatabase.list('segnalazioni')
      this.riferimento = afDatabase.list('segnalazioni', ref => ref.orderByChild('user').equalTo(this.email));
      this.items = this.riferimento.valueChanges();
      this.loading.dismiss();
      this.benvenuto();
  }

  alert(message:string) {
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  itemSelected(item: Observable<any>) {
    this.navCtrl.push(DettagliPage, {dettaglio: item, riferimento: this.riferimento});
  }

  fabClick(){
      this.navCtrl.push(FotoPage);
  }

  benvenuto(){
    //Inizializza lo storage locale nel caso in cui sia la prima installazione
    this.storage.get('benvenuto').then((val) => {
      if (!val) {
        this.storage.set('benvenuto', JSON.stringify(0));
      }
    });

    //Mostra
    this.storage.get('benvenuto').then((val2) => {
      let valore2 = JSON.parse(val2);

      if (valore2 != 1) {
        alert("Benvenuto su NomeApp!\nTramite il pulsante '+' potrai inviare le tue segnalazioni direttamente a NomeSocietà.\n" +
          "Puoi inviare una segnalazione al giorno.");
        this.storage.set('benvenuto', JSON.stringify(1));
      }
    });

  }

  ionViewDidLoad() {
    let dateobj = new Date();
    function pad(n) {return n < 10 ? "0"+n : n;}
    let data = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
    let ora = pad(dateobj.getHours()) + ":" + pad(dateobj.getUTCMinutes());

    console.log(data + " - " + ora);
  }

}
