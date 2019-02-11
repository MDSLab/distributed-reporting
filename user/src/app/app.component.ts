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
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import { HomePage } from '../pages/home/home';
import { MainElenco } from '../pages/elenco/elenco';

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  itemsRef: AngularFireList<any>;
  email: string;
  rootPage:any;
  pagine_utente: Array<{title: string, component: any}>;
  pagine_operatore: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public fire: AngularFireAuth, public menuCtrl: MenuController, public events: Events,
              public afDatabase: AngularFireDatabase, public fcm: FcmProvider, public toastCtrl: ToastController) {

    this.initializeApp();

    const unsubscribe = fire.auth.onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = HomePage;
        unsubscribe();
      } else {
        this.email = fire.auth.currentUser.email;
        this.events.publish('user:logged', fire.auth.currentUser.email);
        this.rootPage = MainElenco;
        unsubscribe();
      }
    });

    events.subscribe('user:logged', (user) => {
      this.email = user;
    });
  }

  initializeApp() {
    //Notifications basics
    let token;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Get a FCM token
      this.fcm.getToken();

      // Listen to incoming messages
      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe()
    });
  }

  logout(){
    this.fire.auth.signOut();
    console.log("Logout")
    this.menuCtrl.toggle();
    this.nav.setRoot(HomePage);
  }

  apriSito(){
    window.open("http://",'_system', 'location=yes');
  }
}
