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

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SegChiusePage } from '../pages/seg_chiuse/seg_chiuse';
import { SegAnnullatePage } from '../pages/seg_annullate/seg_annullate';
import { ListPage } from '../pages/list/list';
import { DettagliPage } from '../pages/dettagli/dettagli';
import { ChiudiPage } from '../pages/chiudi/chiudi';
import { AssegnatePage } from '../pages/assegnate/assegnate';
import { LoginPage } from '../pages/login/login';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { SplashLogPage } from '../pages/splashlog/splashlog';
import { PrivacyPage } from '../pages/privacy/privacy';
import { ProfiloPage } from '../pages/profilo/profilo';

import { Geolocation } from '@ionic-native/geolocation';

import { Camera } from '@ionic-native/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseAuth = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DettagliPage,
    ChiudiPage,
    AssegnatePage,
    LoginPage,
    RegistrazionePage,
    SplashLogPage,
    PrivacyPage,
    ProfiloPage,
    SegChiusePage,
    SegAnnullatePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DettagliPage,
    ChiudiPage,
    AssegnatePage,
    LoginPage,
    RegistrazionePage,
    SplashLogPage,
    PrivacyPage,
    ProfiloPage,
    SegChiusePage,
    SegAnnullatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
