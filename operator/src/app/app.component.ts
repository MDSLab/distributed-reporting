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
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SegChiusePage } from '../pages/seg_chiuse/seg_chiuse';
import { SegAnnullatePage } from '../pages/seg_annullate/seg_annullate';
import { ListPage } from '../pages/list/list';
import { AssegnatePage } from '../pages/assegnate/assegnate';
import { ProfiloPage } from '../pages/profilo/profilo';
import { SplashLogPage } from '../pages/splashlog/splashlog';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  capiRef: AngularFireList<any>;
  capi: Observable<any []>;

  sorvegliantiRef: AngularFireList<any>;
  sorveglianti: Observable<any []>;
  itemsRef: AngularFireList<any>;

  email: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afDatabase: AngularFireDatabase, public fire: AngularFireAuth, public events: Events, public menuCtrl: MenuController) {
    this.initializeApp();

    const unsubscribe = fire.auth.onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = SplashLogPage;
        unsubscribe();
      } else {
        this.email = fire.auth.currentUser.email;
        this.capiRef = this.afDatabase.list('/capi_servizio', ref => ref.orderByChild('id').equalTo(this.email));
        this.sorvegliantiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('id').equalTo(this.email));
        this.events.publish('user:logged', fire.auth.currentUser.email);
        this.controllaTipoUtente();
        unsubscribe();
      }
    });

    events.subscribe('user:registrato', (user,pass,nome,cognome,ruolo,referente) => {
      console.log('Primo login');
      this.firstSignIn(user,pass,nome,cognome,ruolo,referente);
    });

    events.subscribe('user:login', (nome,cognome,ruolo,referente) => {
      this.email = fire.auth.currentUser.email;
      this.capiRef = this.afDatabase.list('/capi_servizio', ref => ref.orderByChild('id').equalTo(this.email));
      this.sorvegliantiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('id').equalTo(this.email));

      if(nome){
        if(ruolo==0){
          const newItemRef = this.capiRef.push({});
          newItemRef.set({
            id: this.email,
            nome: nome,
            cognome: cognome,
            ref: newItemRef.key
          });
        }else{
          const newItemRef = this.sorvegliantiRef.push({});
          newItemRef.set({
            id: this.email,
            nome: nome,
            cognome: cognome,
            referente: referente + '@messinaservizibenecomune.it',
            ref: newItemRef.key
          });
        }
      };
      this.controllaTipoUtente();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  controllaTipoUtente(){
    let capo: number;
    let sorvegliante: number;

    capo = 0;
    sorvegliante = 0;

    //Essendo le chiamate asincrone, sono a catena: appena finisce una, viene avviata l'altra, e solo dopo aver ottenuto i valori
    //dai database effettua il controllo
    this.capiRef.valueChanges().subscribe(snapshots =>{
      capo = snapshots.length
      this.sorvegliantiRef.valueChanges().subscribe(snapshots =>{
        sorvegliante = snapshots.length
        if (capo > 0){
          console.log('È un capo servizio');
          this.pages = [
            { title: 'Aperte', component: HomePage },
            { title: 'Mappa', component: ListPage },
            { title: 'Assegnate', component: AssegnatePage },
            { title: 'Chiuse', component: SegChiusePage },
            { title: 'Annullate', component: SegAnnullatePage }
          ];
          this.nav.setRoot(HomePage);
        }else if (sorvegliante > 0){
          console.log('È un sorvegliante');
          this.pages = [
            { title: 'Assegnate', component: AssegnatePage },
            { title: 'Profilo', component: ProfiloPage }
          ];
          this.nav.setRoot(AssegnatePage, {tipo_utente: 2});
        }else{
          console.log('È un utente');
          this.nav.setRoot(HomePage);
        };
      })
    ;
    });


  }

  firstSignIn(user,pass,nome,cognome,ruolo,referente){
    this.fire.auth.signInWithEmailAndPassword(user,pass)
      .then( data => {
        //this.navCtrl.setRoot(HomePage);
        this.events.publish('user:login',nome,cognome,ruolo,referente);
      }).catch(error => {
      console.log('Errore: ',error);
    });
  }

  logout(){
    this.fire.auth.signOut();
    console.log("Logout")
    this.menuCtrl.toggle();
    this.nav.setRoot(SplashLogPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,{sorveglianti: this.sorvegliantiRef});
  }
}
