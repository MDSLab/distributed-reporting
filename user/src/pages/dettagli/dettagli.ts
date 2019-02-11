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
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireList } from "angularfire2/database";

declare var google;

@IonicPage()
@Component({
  selector: 'page-dettagli',
  templateUrl: 'dettagli.html',
})
export class DettagliPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  dati: any;
  riferimento: AngularFireList<any>;
  indirizzo: string;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public loadingCtrl: LoadingController) {
    this.dati = navParams.get('dettaglio');
    this.riferimento = navParams.get('riferimento');
  }



  ionViewDidLoad() {
    this.loadMap(this.dati.latitudine,this.dati.longitudine);
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
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
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Luogo segnalazione</h4>";

    this.addInfoWindow(marker, content);
  }

  annullaSegnalazione(){
    //Se la segnalazione è ancora "aperta" e viene nel frattempo risolta, permette all'utente di annullarla per alleggerire il carico sugli operatori
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    const newItemRef = this.riferimento.update(this.dati.id, {stato: 1});

    this.loading.dismiss().then(() => {
      alert("Segnalazione annullata.");
      this.navCtrl.pop();
    });
  }


}
