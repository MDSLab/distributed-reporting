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

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { ChiudiPage } from '../chiudi/chiudi';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

declare var google;

@IonicPage()
@Component({
  selector: 'page-dettagli',
  templateUrl: 'dettagli.html',
})
export class DettagliPage {

  @ViewChild('mappa') mapElement: ElementRef;
  mappa: any
  itemsRef: AngularFireList<any>;
  dati: any;
  items: Observable<any []>;
  sorvegliantiRef: AngularFireList<any>;
  sorveglianti: Observable<any []>;
  indirizzo: string;
  selectedLeave : string;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public afDatabase: AngularFireDatabase, public fire: AngularFireAuth) {
    this.itemsRef = afDatabase.list('/segnalazioni');
    this.dati = navParams.get('dettaglio');
    this.items = navParams.get('items');

    if (navParams.get('sorveglianti')) {
      this.sorvegliantiRef = navParams.get('sorveglianti');
      this.sorveglianti = this.sorvegliantiRef.valueChanges();
    }

    this.selectedLeave = this.dati.sorvegliante;
    this.email = fire.auth.currentUser.email;
  }

  ionViewDidLoad() {
    console.log('Posizione: ', this.dati.latitudine,this.dati.longitudine);
    this.loadMap(this.dati.latitudine,this.dati.longitudine);

  }

  chiudiSegnalazione(item){
    this.navCtrl.push(ChiudiPage, {dettaglio: item, items: this.items});
  }

  lasciaSegnalazione(item){
    const newItemRef = this.itemsRef.update(item.id,{capo: '', sorvegliante: ''});
    this.navCtrl.pop();
  }

  selezionaSorvegliante(sorvegliante,item){
    const newItemRef = this.itemsRef.update(item.id,{sorvegliante: sorvegliante.id});
    console.log("Segnalazione aggiunta al sorvegliante: ", sorvegliante.id, item.id);
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.mappa, marker);
    });

  }

  loadMap(lat: number, longi: number){

    let latLng = new google.maps.LatLng(lat, longi);

    let mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'cooperative'
    }
    this.mappa = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.mappa,
      animation: google.maps.Animation.DROP,
      position: this.mappa.getCenter()
    });

    let content = "<h4>Luogo segnalazione</h4>";

    this.addInfoWindow(marker, content);
  }

}
