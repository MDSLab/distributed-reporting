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

import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Loading, Events} from 'ionic-angular';
import { AngularFireList } from "angularfire2/database";
import { Observable} from "rxjs/Observable";
import { AssegnatePage } from "../assegnate/assegnate";

@IonicPage()
@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {

  riferimento: AngularFireList<any>;
  dati: Observable<any []>;
  @ViewChild('referente') referente;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public events: Events) {
    this.riferimento = navParams.get('sorveglianti');
    this.dati = this.riferimento.valueChanges();
  }

  aggiornaReferente(dato){
    //Aggiorna il numero del capo servizio a cui fa riferimento il sorvegliante
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    const newItemRef = this.riferimento.update(dato.ref, {referente: this.referente.value + "@messinaservizibenecomune.it"});

    this.loading.dismiss().then(() => {
      alert("Numero del Capo Servizio di riferimento aggiornato!");
      this.navCtrl.setRoot(AssegnatePage);
    });
  }

  ionViewDidLoad() {
  }

}
