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
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase , AngularFireList} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {

  @ViewChild('username') user;
  @ViewChild('password') pass;
  @ViewChild('password2') pass2;
  @ViewChild('codicefiscale') codicefiscale;
  @ViewChild('nome') nome;
  @ViewChild('cognome') cognome;
  @ViewChild('indirizzo') indirizzo;
  @ViewChild('telefono') telefono;

  public loading: Loading;

  itemsRef: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fire: AngularFireAuth, private afDatabase: AngularFireDatabase, public loadingCtrl: LoadingController) {
    this.itemsRef = afDatabase.list('/anagrafica_utenti');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registraUtente() {
    //console.log('Would register user with ',this.user.value, this.pass.value);
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if (this.pass.value != this.pass2.value) {
      this.loading.dismiss().then(() => {
        alert("Le password non coincidono.");
      });
    } else if (this.nome.value === "" || this.cognome.value === "" || this.indirizzo.value === "" || this.telefono.value === "") {
      this.loading.dismiss().then(() => {
        this.alert("Compilare tutti i campi.");
      });
    } else if (this.codicefiscale.value === "" || !this.controllaCF()) {
      this.loading.dismiss().then(() => {
        this.alert("Inserire Codice Fiscale corretto.");
      });
    } else {
      this.fire.auth.createUserWithEmailAndPassword(this.user.value.trim(), this.pass.value)
        .then(data => {
          console.log('Dati acquisiti ', data);
          this.fire.auth.currentUser.sendEmailVerification()
          this.aggiungiCodiceFiscale();
          this.fire.auth.signOut();
          this.loading.dismiss().then(() => {
            alert('Registrazione eseguita\nControlla la posta');
            this.navCtrl.remove(2, 1);
            this.navCtrl.pop();
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            this.loading.dismiss().then(() => {
              this.alert("Email già registrata");
            });
          } else if (error.code === 'auth/invalid-email') {
            this.loading.dismiss().then(() => {
              this.alert("Email non valida");
            });
          } else if (error.code === 'operation-not-allowed') {
            this.loading.dismiss().then(() => {
              this.alert("Operazione non permessa");
            });
          } else if (error.code === 'auth/weak-password') {
            this.loading.dismiss().then(() => {
              this.alert("Password poco sicura");
            });
          } else {
            this.loading.dismiss().then(() => {
              this.alert(error.message);
            });
          }
        });
    }
  }

  controllaCF() {
    // Definisco un pattern per il confronto
    let pattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;

    // utilizzo il metodo search per verificare che il valore inserito nel campo
    // di input rispetti la stringa di verifica (pattern)
    if (this.codicefiscale.value.search(pattern) == -1) {
      // In caso di errore stampo un avviso
      //alert("Il Codifce Fiscale inserito è errato");
      return 0
    } else {
      // ...in caso contrario stampo un avviso di successo!
      //alert("Il Codice Fiscale è corretto!");
      return 1
    }
  }

  aggiungiCodiceFiscale() {
    //this.alert("Salvo il CF nel database");
    const newItemRef = this.itemsRef.push({});
    newItemRef.set({
      utente: this.user.value.toLowerCase(),
      codice_fiscale: this.codicefiscale.value.toUpperCase(),
      nome: this.nome.value,
      cognome: this.cognome.value,
      indirizzo: this.indirizzo.value,
      telefono: this.telefono.value
    }).catch((err) => {
      console.error('Errore: ', JSON.stringify(err));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrazionePage');
  }
}
