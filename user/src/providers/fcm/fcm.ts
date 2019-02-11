import { Injectable } from '@angular/core';

import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import {AngularFireDatabase, AngularFireList } from "angularfire2/database";

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {


  token;

  constructor(public firebaseNative: Firebase, public afs: AngularFirestore, private platform: Platform) {

  }

  // Get permission from the user
  async getToken() {
    //let token;

    if (this.platform.is('android')) {
      this.token = await this.firebaseNative.getToken();
    }

    if (this.platform.is('ios')) {
      this.token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    //this.itemsRef.set(user,{token: token});
    return this.saveTokenToFirestore(this.token)
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    //this.afDatabase.object('/token/' + user).set({token: token});

    const devicesRef = this.afs.collection('dispositivi')

    const docData = {
      token
    }

    //this.itemsRef.set(user,{token: token})

    /*
    const newItemRef = this.itemsRef.push({});
    newItemRef.set({
      user: user,
      token: token
    }).then(msg => alert("Token inserito " + msg));
    */

    return devicesRef.doc(token).set(docData)
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

}
