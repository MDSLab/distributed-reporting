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
import { AlertController, IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user;
  @ViewChild('password') pass;

  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fire: AngularFireAuth, public events: Events, public loadingCtrl: LoadingController) {

  }

  alert(message:string) {
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signIn(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.fire.auth.signInWithEmailAndPassword(this.user.value + '@messinaservizibenecomune.it', this.pass.value)
      .then( data => {
          //this.navCtrl.setRoot(HomePage);
        this.loading.dismiss().then( () => {
          this.events.publish('user:login');
        });
      }).catch(error => {
      this.loading.dismiss().then( () => {
        console.log('Errore: ', error)
        this.alert(error.message);
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
