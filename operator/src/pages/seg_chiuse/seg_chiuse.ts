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
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { DettagliPage } from '../dettagli/dettagli';

import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'page-seg_chiuse',
  templateUrl: 'seg_chiuse.html'
})
export class SegChiusePage {
  public loading: Loading;

  itemsRef: AngularFireList<any>;
  items: Observable<any []>;

  email: string;

  personaleRef: AngularFireList<any>;
  personale: Observable<any []>;

  sottopostiRef: AngularFireList<any>;
  sottoposti: Observable<any []>;
  operatoriRef: AngularFireList<any>;

  constructor(public navCtrl: NavController, private fire: AngularFireAuth, public afDatabase: AngularFireDatabase, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    //Tutte le segnalazioni
    //this.itemsRef = afDatabase.list('/segnalazioni');
    //Solo le segnalazioni aperte
    this.itemsRef = afDatabase.list('/segnalazioni', ref => ref.orderByChild('stato').equalTo(0));
    this.items = this.itemsRef.valueChanges();

    this.email = fire.auth.currentUser.email;
    this.loading.dismiss();
  }
  itemSelected(item: Observable<any>) {
    this.navCtrl.push(DettagliPage, {dettaglio: item, items: this.items});
  }

  prendiCarico(item) {
    console.log('Presa in carico');
    //Aggiorna il record della segnalazione indicando il capo servizio che l'ha presa in carico, ed apre la pagina
    //con i dettagli della segnalazione per poterla assegnare ad un sorvegliante (ma va aggiornata manualmente, perché la chiamata al database è asincrona e non aggiorna in tempo reale)
    const newItemRef = this.itemsRef.update(item.id,{capo: this.email}).then(_ => this.navCtrl.push(DettagliPage, {dettaglio: item, items: this.items, sorveglianti: this.sottopostiRef}));
  }

  lasciaSegnalazione(item){
    const newItemRef = this.itemsRef.update(item.id,{capo: '', sorvegliante: ''});
  }

  ionViewDidLoad() {
    //this.personale.subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaSorveglianti(this.email)})});
    console.log('');
  }

  ricercaSorveglianti(riferimento) {
    //Solo i sorveglianti registrati "sotto" un certo capo servizio
    //this.sottopostiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('referente').equalTo(riferimento));
    //Tutti i capi servizio possono vedere tutti i sorveglianti
    this.sottopostiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('referente'));
    this.sottoposti = this.sottopostiRef.valueChanges();
    //this.sottopostiRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaOperatori(riferimento,snapshot.id)})})
  }

  //Gli operatori non avranno dispositivi, quindi non serve (tabella cancellata dal database, lasciato solo come riferimento)
  ricercaOperatori(riferimentoCapi,riferimentoSorveglianti){
    this.operatoriRef = this.afDatabase.list('/operatori', ref => ref.orderByChild('referente').equalTo(riferimentoSorveglianti));
    this.operatoriRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {console.log(riferimentoCapi,riferimentoSorveglianti,snapshot.id)})});
  }

}
