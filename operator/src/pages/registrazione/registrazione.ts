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
import { AlertController, IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {

  @ViewChild('nome') nome;
  @ViewChild('cognome') cognome;
  @ViewChild('referente') referente;
  @ViewChild('username') user;
  @ViewChild('password') pass;
  @ViewChild('password2') pass2;

  selectedLeave : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fire: AngularFireAuth, public events: Events) {
  }

  alert(message:string) {
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registraUtente(){
    if(this.pass.value != this.pass2.value){
      alert("Le password non coincidono");
    }else if(this.selectedLeave == null){
      alert('Selezionare un ruolo');
    }else if(this.nome.value == '' || this.cognome.value == ''){
      alert('Inserire nome e cognome');
    }else if(this.user.value.length < 10){
      alert('Inserire il numero di telefono corretto');
    }else if( this.selectedLeave == 1 && this.referente.value.lenght < 10){
      alert('Inserire il numero di telefono del capo servizio');
    }else {

      this.fire.auth.createUserWithEmailAndPassword(this.user.value + '@messinaservizibenecomune.it', this.pass.value)
        .then(data => {
          //se non facessi il controllo e passassi this.referente.value, mi darebbe errore "undefined"
          if (this.selectedLeave == 1) {
            //così chiamo la funzione in app.component.ts
            this.events.publish('user:registrato', this.user.value + '@messinaservizibenecomune.it', this.pass.value, this.nome.value, this.cognome.value, this.selectedLeave, this.referente.value);
          }else{
            this.events.publish('user:registrato', this.user.value + '@messinaservizibenecomune.it', this.pass.value, this.nome.value, this.cognome.value, this.selectedLeave, 0);
          }
        })
        .catch(error => {
          let alert = this.alertCtrl.create({
            title: 'Errore',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
          console.log('Errore ', error);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrazionePage');
  }

}
