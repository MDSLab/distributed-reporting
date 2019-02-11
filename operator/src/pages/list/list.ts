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

import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from "rxjs/Observable";
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AssegnatePage } from "../assegnate/assegnate";
import {DettagliPage} from "../dettagli/dettagli";
import {AngularFireAuth} from "angularfire2/auth";

declare var google;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  menuTendina : number = 0;

  itemsRef: AngularFireList<any>;
  items: Observable<any []>;

  email: string;

  personaleRef: AngularFireList<any>;
  personale: Observable<any []>;

  sottopostiRef: AngularFireList<any>;
  sottoposti: Observable<any []>;
  operatoriRef: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, private fire: AngularFireAuth, public elementRef: ElementRef) {

    this.itemsRef = afDatabase.list('/segnalazioni', ref => ref.orderByChild('capo').equalTo(''));
    this.items = this.itemsRef.valueChanges();

    this.personaleRef = afDatabase.list('/capi_servizio');
    this.personale = this.personaleRef.valueChanges();

    this.email = fire.auth.currentUser.email;
  }

  addInfoWindow(latitudine,longitudine,immagine,dataora,snapshot){
    let latLng = new google.maps.LatLng(latitudine, longitudine);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      //title: "Segnalazione del " + dataora,
      //icon: immagine
    });

    let content = `<p>Segnalazione del ${dataora}</p><img height="125" width="160" src="${immagine}"><p id="prendi"><a>Prendi</a></p>`;

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('prendi').addEventListener('click', () => {
        this.prendiCarico(snapshot);
      });
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  loadMap(){
    //Messina
    let latLng = new google.maps.LatLng(38.193095, 15.556339);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'cooperative'
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.items.subscribe(snapshots =>{snapshots.forEach(snapshot => {this.addInfoWindow(snapshot.latitudine,snapshot.longitudine,snapshot.img_in,snapshot.data_in + ' - ' + snapshot.ora_in, snapshot)})});
  }

  mostraSubordinato(item: Observable<any>) {
    this.navCtrl.push(AssegnatePage, {tipo_utente: this.menuTendina});
  }

  ionViewDidLoad() {
    this.personale.subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaSorveglianti(this.email)})});
    this.loadMap();
  }

  itemSelected(item: Observable<any>) {
    this.navCtrl.push(DettagliPage, {dettaglio: item, items: this.items, sorveglianti: this.sottopostiRef});
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

  ricercaSorveglianti(riferimento) {
    this.sottopostiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('referente').equalTo(riferimento));
    this.sottoposti = this.sottopostiRef.valueChanges();
    //this.sottopostiRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaOperatori(riferimento,snapshot.id)})})
  }

  //Gli operatori non avranno dispositivi, quindi non serve (tabella cancellata dal database, lasciato solo come riferimento)
  ricercaOperatori(riferimentoCapi,riferimentoSorveglianti){
    this.operatoriRef = this.afDatabase.list('/operatori', ref => ref.orderByChild('referente').equalTo(riferimentoSorveglianti));
    this.operatoriRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {console.log(riferimentoCapi,riferimentoSorveglianti,snapshot.id)})});
  }


}
