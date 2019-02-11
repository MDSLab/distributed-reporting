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
import {AlertController, IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';

import { MainElenco } from '../elenco/elenco';

import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user;
  @ViewChild('password') pass;

  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public fire: AngularFireAuth, public events: Events, public loadingCtrl: LoadingController) {
  }

  alert(message:string) {
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  recuperaPass(){
    if(this.user.value != '') {
      this.fire.auth.sendPasswordResetEmail(this.user.value).then(data => alert("Abbiamo inviato un'email per resettare la password all'indirizzo " + this.user.value
      )).catch(error => alert(error));
    }else{
      alert("Inserire un indirizzo email valido per procedere al reset della password");
    }
  }

  async signIn(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.fire.auth.signInWithEmailAndPassword(this.user.value, this.pass.value)
      .then( data => {
        console.log('Dati: ', this.fire.auth.currentUser.email)
        //Utente loggato
        //this.alert('Accesso eseguito correttamente');
        if(this.fire.auth.currentUser.emailVerified){
          this.events.publish('user:logged', this.fire.auth.currentUser.email);
          //this.afDatabase.database.goOnline();
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(MainElenco);
          });
        }else{
          this.loading.dismiss().then( () => {
            alert("Controlla la posta e verifica il tuo indirizzo email")
          });
        }

      }).catch(error => {
      this.loading.dismiss().then( () => {
        //console.log('Errore: ', error)
        //this.alert(error.message)
        if (error === 'auth/wrong-password'){
          this.alert("Password errata");
        } else if (error === 'auth/user-not-found'){
          this.alert("Utente non trovato");
        } else if (error === 'auth/user-disabled'){
          this.alert("Utente bloccato");
        }else if (error === 'auth/invalid-email'){
          this.alert("Email non trovata");
        } else{
          this.alert(error.message);
        }
      })
    });

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

}
