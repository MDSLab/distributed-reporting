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
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DettagliPage } from "../dettagli/dettagli";

@IonicPage()
@Component({
  selector: 'page-assegnate',
  templateUrl: 'assegnate.html',
})
export class AssegnatePage {
  public loading: Loading;

  tipo_utente: number;
  items: Observable<any []>;
  email: string;

  personaleRef: AngularFireList<any>;
  personale: Observable<any []>;
  sottopostiRef: AngularFireList<any>;
  sottoposti: Observable<any []>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: AngularFireAuth, public afDatabase: AngularFireDatabase, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.email = fire.auth.currentUser.email;

    if (navParams.get('tipo_utente')){
      this.tipo_utente = navParams.get('tipo_utente');
      if(this.tipo_utente == 0){
        this.items = this.afDatabase.list('/segnalazioni', ref => ref.orderByChild('user').equalTo(this.email)).valueChanges();
      }else {
        this.items = this.afDatabase.list('/segnalazioni', ref => ref.orderByChild('sorvegliante').equalTo(this.email)).valueChanges();
      }
    }else{
      this.tipo_utente = 1;
      this.items = this.afDatabase.list('/segnalazioni', ref => ref.orderByChild('capo').equalTo(this.email)).valueChanges();
      this.personaleRef = afDatabase.list('/capi_servizio');
      this.personale = this.personaleRef.valueChanges();
    }
    this.loading.dismiss();
  }

  itemSelected(item: Observable<any>) {
    this.navCtrl.push(DettagliPage, {dettaglio: item, items: this.items, sorveglianti: this.sottopostiRef});
  }

  ionViewDidLoad() {
    if (!this.navParams.get('tipo_utente')) {
      this.personale.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.ricercaSorveglianti(this.email)
        })
      });
    }
  }

  ricercaSorveglianti(riferimento) {
    this.sottopostiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('referente').equalTo(riferimento));
    this.sottoposti = this.sottopostiRef.valueChanges();
  }

}
