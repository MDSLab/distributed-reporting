webpackJsonp([6],{

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DettagliPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(68);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DettagliPage = /** @class */ (function () {
    function DettagliPage(navCtrl, navParams, geolocation, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.dati = navParams.get('dettaglio');
        this.riferimento = navParams.get('riferimento');
    }
    DettagliPage.prototype.ionViewDidLoad = function () {
        //console.log('Posizione: ', this.dati.latitudine,this.dati.longitudine);
        this.loadMap(this.dati.latitudine, this.dati.longitudine);
    };
    DettagliPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    DettagliPage.prototype.loadMap = function (lat, longi) {
        var latLng = new google.maps.LatLng(lat, longi);
        var mapOptions = {
            center: latLng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'cooperative'
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        var content = "<h4>Luogo segnalazione</h4>";
        this.addInfoWindow(marker, content);
    };
    DettagliPage.prototype.annullaSegnalazione = function () {
        var _this = this;
        //Se la segnalazione è ancora "aperta" e viene nel frattempo risolta, permette all'utente di annullarla per alleggerire il carico sugli operatori
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        var newItemRef = this.riferimento.update(this.dati.id, { stato: 1 });
        this.loading.dismiss().then(function () {
            alert("Segnalazione annullata.");
            _this.navCtrl.pop();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], DettagliPage.prototype, "mapElement", void 0);
    DettagliPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dettagli',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/pages/dettagli/dettagli.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Dettagli segnalazione</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n   <ion-card-header>\n     Stato segnalazione\n   </ion-card-header>\n   <ion-card-content>\n     <a *ngIf="dati.stato == 0" ion-text color="secondary">chiusa</a><a *ngIf="dati.stato == 1" ion-text color="annullata">annullata</a><a *ngIf="dati.stato == 2" ion-text color="danger">aperta</a>\n     <div padding>\n       <button *ngIf="dati.stato == 2" ion-button color="primary" block (click)="annullaSegnalazione();">Annulla segnalazione</button>\n     </div>\n   </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      Data invio\n    </ion-card-header>\n    <ion-card-content>\n      {{ dati.data_in }} - {{dati.ora_in}}\n    </ion-card-content>\n  </ion-card>\n  <!--\n  <ion-card>\n    <ion-card-header>\n      Data chiusura\n    </ion-card-header>\n    <ion-card-content>\n      {{ dati.data_out }} - {{dati.ora_out}}\n    </ion-card-content>\n  </ion-card>\n  -->\n  <ion-card>\n    <ion-card-header>\n      Descrizione\n    </ion-card-header>\n    <ion-card-content>\n      {{ dati.descrizione }}\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      Foto inviata\n    </ion-card-header>\n    <ion-card-content>\n      <img [src]="dati.img_in" *ngIf="dati.img_in">\n    </ion-card-content>\n  </ion-card>\n  <!--\n  <ion-card>\n    <ion-card-header>\n      Foto dopo l\'intervento\n    </ion-card-header>\n    <ion-card-content>\n      <img [src]="dati.img_out" *ngIf="dati.img_out">\n    </ion-card-content>\n  </ion-card>\n    -->\n  <ion-card>\n    <ion-card-header>\n      Eventuali note dell\'operatore\n    </ion-card-header>\n    <ion-card-content>\n      {{ note_chiusura }}\n    </ion-card-content>\n  </ion-card>\n  <ion-card class="transparent-card">\n    <ion-card-header>\n      Posizione\n    </ion-card-header>\n    <ion-card-content>\n      <div #map id="map" style="height:300px"></div>\n    </ion-card-content>\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/pages/dettagli/dettagli.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], DettagliPage);
    return DettagliPage;
}());

//# sourceMappingURL=dettagli.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(120);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the FotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FotoPage = /** @class */ (function () {
    function FotoPage(navCtrl, navParams, geolocation, afDatabase, fire, camera, alertCtrl, loadingCtrl, locationAccuracy, diagnostic, plt, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.afDatabase = afDatabase;
        this.fire = fire;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.locationAccuracy = locationAccuracy;
        this.diagnostic = diagnostic;
        this.plt = plt;
        this.storage = storage;
        //alert(fire.auth.currentUser.email);
        this.email = fire.auth.currentUser.email;
        this.itemsRef = afDatabase.list('/segnalazioni');
    }
    FotoPage.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    FotoPage.prototype.scattaFoto = function () {
        var _this = this;
        var options = {
            quality: 60,
            targetWidth: 900,
            targetHeight: 900,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.foto = _this.base64Image;
        }, function (err) {
            console.log(err);
        });
    };
    FotoPage.prototype.invia = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        var dateobj = new Date();
        function pad(n) { return n < 10 ? "0" + n : n; }
        var data = pad(dateobj.getDate()) + "/" + pad(dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();
        var ora = pad(dateobj.getHours()) + ":" + pad(dateobj.getUTCMinutes());
        if (this.plt.is('android')) {
            this.diagnostic.isGpsLocationEnabled().then(function (GPS) {
                if (GPS) {
                    if (typeof _this.foto !== "undefined") {
                        var newItemRef_1 = _this.itemsRef.push({});
                        _this.geolocation.getCurrentPosition().then(function (position) {
                            _this.lat = position.coords.latitude;
                            _this.longi = position.coords.longitude;
                            newItemRef_1.set({
                                id: newItemRef_1.key,
                                user: _this.email,
                                //data_in: new Date().toLocaleDateString(),
                                //ora_in: new Date().toLocaleTimeString(),
                                data_in: data,
                                ora_in: ora,
                                data_out: '',
                                ora_out: '',
                                latitudine: _this.lat,
                                longitudine: _this.longi,
                                img_in: _this.foto,
                                img_out: '',
                                descrizione: _this.descrizione.value,
                                stato: 2,
                                capo: '',
                                sorvegliante: '',
                                note_chiusura: ''
                            });
                            _this.incrementaSegnalazioni();
                            _this.loading.dismiss().then(function () {
                                alert("Segnalazione inviata correttamente.\nIn attesa di riorganizzare i servizi, riscontreremo a breve la sua richiesta.\nGrazie per la collaborazione!");
                                _this.navCtrl.pop();
                            });
                        }).catch(function (err) {
                            _this.loading.dismiss().then(function () {
                                console.error('Errore: ', JSON.stringify(err));
                            });
                        });
                    }
                    else {
                        _this.loading.dismiss().then(function () {
                            alert("Non è possibile inviare segnalazioni senza foto.\nScattarne una e riprovare");
                        });
                    }
                    ;
                }
                else {
                    _this.loading.dismiss().then(function () {
                        _this.locationAccuracy.canRequest().then(function (canRequest) {
                            if (!canRequest) {
                                alert("Posizione disattivata. Attivarla dalle Impostazioni e reinviare la segnalazione");
                            }
                            else {
                                // the accuracy option will be ignored by iOS
                                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () { return console.log('Request successful'); }, function (error) { return console.log('Error requesting location permissions', error); });
                            }
                            ;
                        });
                    });
                }
            });
        }
        else if (this.plt.is('ios')) {
            this.diagnostic.isLocationEnabled().then(function (GPS) {
                if (GPS) {
                    if (typeof _this.foto !== "undefined") {
                        var newItemRef_2 = _this.itemsRef.push({});
                        _this.geolocation.getCurrentPosition().then(function (position) {
                            _this.lat = position.coords.latitude;
                            _this.longi = position.coords.longitude;
                            newItemRef_2.set({
                                id: newItemRef_2.key,
                                user: _this.email,
                                //data_in: new Date().toLocaleDateString(),
                                //ora_in: new Date().toLocaleTimeString(),
                                data_in: data,
                                ora_in: ora,
                                data_out: '',
                                ora_out: '',
                                latitudine: _this.lat,
                                longitudine: _this.longi,
                                img_in: _this.foto,
                                img_out: '',
                                descrizione: _this.descrizione.value,
                                stato: 2,
                                capo: '',
                                sorvegliante: '',
                                note_chiusura: ''
                            });
                            _this.incrementaSegnalazioni();
                            _this.loading.dismiss().then(function () {
                                alert("Segnalazione inviata correttamente.\nIn attesa di riorganizzare i servizi, riscontreremo a breve la sua richiesta.\nGrazie per la collaborazione!");
                                _this.navCtrl.pop();
                            });
                        }).catch(function (err) {
                            _this.loading.dismiss().then(function () {
                                console.error('Errore: ', JSON.stringify(err));
                            });
                        });
                    }
                    else {
                        _this.loading.dismiss().then(function () {
                            alert("Non è possibile inviare segnalazioni senza foto.\nScattarne una e riprovare");
                        });
                    }
                    ;
                }
                else {
                    _this.loading.dismiss().then(function () {
                        _this.locationAccuracy.canRequest().then(function (canRequest) {
                            if (canRequest) {
                                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () { return alert("Servizio di Localizzazione disattivato. Andare su Impostazioni>Privacy>Localizzazione, attivarlo, e reinviare la segnalazione."); }, function (error) { return console.log('Posizione Ok'); });
                            }
                            ;
                        });
                    });
                }
            });
        }
        ;
    };
    FotoPage.prototype.controllaNumeroSegnalazioni = function () {
        var _this = this;
        var numeroMaxSegnalazioniGiornaliere = 1;
        var dateobj = new Date();
        var giornoCorrente = dateobj.getDate();
        //Inizializza lo storage locale nel caso in cui sia la prima installazione
        this.storage.get('segnalazioni').then(function (val) {
            if (!val) {
                _this.storage.set('segnalazioni', JSON.stringify(0));
                _this.storage.set('giorno', JSON.stringify(giornoCorrente));
            }
        });
        //Se è un giorno diverso dall'ultimo registrato, resetta a 0 le segnalazioni e salva il nuovo giorno
        this.storage.get('giorno').then(function (val2) {
            var valore2 = JSON.parse(val2);
            if (valore2 != giornoCorrente) {
                //alert("Resetto valori");
                _this.storage.set('segnalazioni', JSON.stringify(0));
                _this.storage.set('giorno', JSON.stringify(giornoCorrente));
            }
            _this.storage.get('segnalazioni').then(function (val) {
                var valore = parseInt(JSON.parse(val));
                if (valore < numeroMaxSegnalazioniGiornaliere) {
                    //alert("Numero segnalazioni: " + valore);
                }
                else {
                    alert("Raggiunto il numero massimo di segnalazioni giornaliere.\nRiprovare domani");
                    _this.navCtrl.pop();
                }
            });
        });
    };
    FotoPage.prototype.incrementaSegnalazioni = function () {
        var _this = this;
        this.storage.get('segnalazioni').then(function (val) {
            var valore = parseInt(JSON.parse(val));
            _this.storage.set('segnalazioni', JSON.stringify(valore + 1));
        });
    };
    FotoPage.prototype.ionViewDidLoad = function () {
        this.controllaNumeroSegnalazioni();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('descrizione'),
        __metadata("design:type", Object)
    ], FotoPage.prototype, "descrizione", void 0);
    FotoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-foto',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/pages/foto/foto.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Invia segnalazione</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label>Descrizione</ion-label>\n      <ion-textarea #descrizione></ion-textarea>\n    </ion-item>\n  <button ion-button full (click)="scattaFoto()" icon-start>\n    <ion-icon name="camera"></ion-icon>Scatta una foto\n  </button>\n  <img [src]="foto" *ngIf="foto">\n  <br>\n  <button ion-button full (click)="invia()" icon-start>\n    <ion-icon name="mail"></ion-icon>Invia segnalazione\n  </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/pages/foto/foto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__["a" /* LocationAccuracy */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]])
    ], FotoPage);
    return FotoPage;
}());

//# sourceMappingURL=foto.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elenco_elenco__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(48);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, fire, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
    }
    LoginPage.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    LoginPage.prototype.recuperaPass = function () {
        var _this = this;
        if (this.user.value != '') {
            this.fire.auth.sendPasswordResetEmail(this.user.value).then(function (data) { return alert("Abbiamo inviato un'email per resettare la password all'indirizzo " + _this.user.value); }).catch(function (error) { return alert(error); });
        }
        else {
            alert("Inserire un indirizzo email valido per procedere al reset della password");
        }
    };
    LoginPage.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.loading = this.loadingCtrl.create();
                this.loading.present();
                this.fire.auth.signInWithEmailAndPassword(this.user.value, this.pass.value)
                    .then(function (data) {
                    console.log('Dati: ', _this.fire.auth.currentUser.email);
                    //Utente loggato
                    //this.alert('Accesso eseguito correttamente');
                    if (_this.fire.auth.currentUser.emailVerified) {
                        _this.events.publish('user:logged', _this.fire.auth.currentUser.email);
                        //this.afDatabase.database.goOnline();
                        _this.loading.dismiss().then(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__elenco_elenco__["a" /* MainElenco */]);
                        });
                    }
                    else {
                        _this.loading.dismiss().then(function () {
                            alert("Controlla la posta e verifica il tuo indirizzo email");
                        });
                    }
                }).catch(function (error) {
                    _this.loading.dismiss().then(function () {
                        //console.log('Errore: ', error)
                        //this.alert(error.message)
                        if (error === 'auth/wrong-password') {
                            _this.alert("Password errata");
                        }
                        else if (error === 'auth/user-not-found') {
                            _this.alert("Utente non trovato");
                        }
                        else if (error === 'auth/user-disabled') {
                            _this.alert("Utente bloccato");
                        }
                        else if (error === 'auth/invalid-email') {
                            _this.alert("Email non trovata");
                        }
                        else {
                            _this.alert(error.message);
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad LoginPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "pass", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/pages/login/login.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Login\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="text" #username></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" #password></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button color="primary" block (click)="signIn();">Login</button>\n  </div>\n  <div padding>\n    <button ion-button color="primary" block (click)="recuperaPass();">Recupera password</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registrazione_registrazione__ = __webpack_require__(151);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PrivacyPage = /** @class */ (function () {
    function PrivacyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pulsante_attivo = false;
    }
    PrivacyPage.prototype.registrazione = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__registrazione_registrazione__["a" /* RegistrazionePage */]);
        //this.contenuto.scroll
    };
    PrivacyPage.prototype.indietro = function () {
        this.navCtrl.pop();
    };
    PrivacyPage.prototype.attiva = function (scrolling) {
        var _this = this;
        setTimeout(function () {
            console.log("Attiva");
            _this.pulsante_attivo = true;
            scrolling.complete();
        }, 500);
    };
    PrivacyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PrivacyPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], PrivacyPage.prototype, "contenuto", void 0);
    PrivacyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-privacy',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/pages/privacy/privacy.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Informativa sulla privacy</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h4 style="text-align: center;"><strong>INFORMATIVA PRIVACY AI SENSI DEL REGOLAMENTO EUROPEO 2016/679</strong></h4>\n  <h4 style="text-align: center;"><strong>ART – 13 e 14 (C60-62 )</strong></h4>\n  <span style="font-weight: 400;">Ai sensi del Regolamento UE 2016/679 denominato “</span><i><span style="font-weight: 400;">Regolamento Europeo in materia di protezione dei dati personali</span></i><span style="font-weight: 400;">” (GDPR) informiamo gli utenti che i dati personali immessi nel sito sono trattati con le modalità e le finalità descritte di seguito</span>\n\n  <span style="font-weight: 400;">In osservanza delle prescrizioni previste dal nuovo Regolamento in materia di protezione dei dati personali, si comunica quanto segue:</span>\n  <h4><b>Titolare del Trattamento</b></h4>\n  <span style="font-weight: 400;">Ai sensi dell’articolo 13 e 14 del Regolamento Europeo 2016/679, La informiamo che la Messinaservizi Bene Comune SpA in House Providing con CF e P.I. 034590800838 è il titolare del trattamento (di seguito “Titolare”) e che la sede legale è in Piazza Unione Europea 98122 Messina.</span>\n  <h4><b>Il Responsabile della Protezione dei Dati</b></h4>\n  <span style="font-weight: 400;">Il Responsabile della protezione dei dati è il Dott. Armando Bressan ed è possibile contattarlo attraverso la mail: </span><span style="font-weight: 400;">privacy@messinaservizibenecomune.it</span><span style="font-weight: 400;"> . Secondo la legge indicata tale trattamento sarà improntato ai principi di correttezza, liceità e trasparenza e di tutela della Sua riservatezza e dei Suoi diritti.</span>\n  <h4><b>Oggetto del Trattamento</b></h4>\n  <span style="font-weight: 400;">I dati personali limitatamente alla (email) da noi raccolti vengono forniti dall\'utente in fase di registrazione dal sito web www.messinaservizibenecomune.it, all\'invio di una richiesta di download gratuito dell’App Servizi denominata (MSBC), dove sarà possibile una volta dato il consenso, istallarla sul proprio device. L’App permetterà all’utenza di segnalare un disservizio relativo alla attività di igiene ambientale gestite dalla Messinaservizi Bene Comune, effettuando una foto che automaticamente verrà inviata al server di Google Firebase il quale custodirà la tua immagine e la tua mail, fino a quanto   un capo servizio od un operatore della Messinasevizi bene comune non la prenderà in carico. Una volta che l’operatore elimina il disservizio segnalato provvederà ad inoltrare una foto che rappresenti l’eliminazione del disservizio. Si precisa che il capo servizio e/o l’operatore non vengono a conoscenza della mail dell’utente che ha effettuato la segnalazione, in quanto per loro la segnalazione è anonima, nel rispetto del principio di minimizzazione dei dati.</span>\n  <h4><b>Finalità del Trattamento</b></h4>\n  <span style="font-weight: 400;">I dati personali in particolar modo le mail e le immagini che ritraggono i disservizi sono trattati per finalità connesse o strumentali all\'attività della Messinaservizi Bene Comune</span>\n  <ul>\n    <li><span style="font-weight: 400;">Con il consenso espresso dall\'interessato per il download gratuito dell’App Servizi denominata (MSBC)  </span></li>\n  </ul>\n  <h4><b>Modalità di Trattamento</b></h4>\n  <span style="font-weight: 400;">Per trattamento di dati personali ai sensi della norma, si intende qualunque operazione o complesso di operazioni, svolti con o senza l\'ausilio di mezzi elettronici o comunque automatizzati, concernenti la raccolta, la registrazione, l\'organizzazione, la conservazione, l\'elaborazione, la modificazione, la selezione, l\'estrazione, il raffronto, l\'utilizzo, l\'interconnessione, il blocco, la comunicazione, la diffusione, la cancellazione e la distribuzione di dati. La società assicura che il trattamento dei dati sarà effettuato tramite l\'utilizzo di idonee procedure che evitino il rischio di perdita, accesso non autorizzato, uso illecito e diffusione, nel rispetto dei limiti e delle condizioni posti dal Regolamento UE 2016/679. Il trattamento dei dati avviene su server che sono di proprietà di Google e più specificatamente dai server di Firebase di Google il quale al momento dell’invio della  segnalazione potrebbe acquisire:</span>\n\n  <span style="font-weight: 400;">La tua posizione che può essere determinata con vari gradi di accuratezza, tramite:</span>\n  <ul>\n    <li><span style="font-weight: 400;">G</span><span style="font-weight: 400;">PS</span></li>\n    <li>Indirizzo IP</li>\n    <li>Dati dai sensori del tuo dispositivo</li>\n    <li>Informazioni su ciò che si trova nelle vicinanze del tuo dispositivo, ad esempio sui punti di accesso Wi-Fi e sui ripetitori di segnale dei cellulari, nonché sui dispositivi dotati di Bluetooth</li>\n  </ul>\n  <span style="font-weight: 400;">L’</span><span style="font-weight: 400;">indirizzo IP</span><span style="font-weight: 400;">, rapporti sulle interruzioni anomale, attività di sistema e la data, l\'ora e l\'URL referrer della tua richiesta</span>\n\n  <span style="font-weight: 400;">Richiedere l’accesso alle immagini.</span>\n\n  <span style="font-weight: 400;">Per qualsiasi altra informazione sul trattamento e conservazione dei tuoi dati puoi consultare </span><a href="https://policies.google.com/privacy"><span style="font-weight: 400;">https://policies.google.com/privacy</span></a>\n  <h5><b>Si raccomanda inoltre all’utente di utilizzare l’App anche nel rispetto delle norme civili e panali dell’ordinamento giuridico Italiano, pertanto si raccomanda che nel segnalare un eventuale disservizio ritraendolo effettuando una foto, di non riprendere e/o fotografare persone, targhe automobilistiche ed ogni altro particolare che renda riconoscibile un soggetto terzo.</b></h5>\n  <h5><b>Si precisa inoltre che l’utente che effettua il download dell’App e la istalla sul proprio device, accettando di dare il consenso al trattamento,  dichiara contestualmente di esonerare da ogni responsabilità la Messinaservizi Bene Comune SpA da ogni eventuale uso vietato e/o illecito che l’utente possa fare dell’App. </b></h5>\n  <h4><b>Accesso ai Dati</b></h4>\n  <span style="font-weight: 400;">I soggetti che possono venire a conoscenza dei dati personali dell\'utente in qualità di responsabili o autorizzati (in base all\'Articolo 13 Comma 1 del GDPR) sono: </span>\n  <ul>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Il Titolare del trattamento</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Il Responsabile del Trattamento</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Il personale del Titolare e/o Responsabile del trattamento, nominato per iscritto con l’attribuzione delle user e password da amministratore del sistema APP </span></li>\n  </ul>\n  <span style="font-weight: 400;">I dati personali non saranno oggetto di diffusione a terzi. </span>\n  <h4><b>Comunicazione dei dati</b></h4>\n  <span style="font-weight: 400;">I dati potranno essere comunicati a Organismi di vigilanza, Autorità giudiziarie ed altri soggetti terzi ai quali la comunicazione sia obbligatoria in forza di legge, ivi incluso l\'ambito di prevenzione/repressione di qualsiasi attività illecita connessa all\'accesso al sito  e/o all\' APP</span><span style="font-weight: 400;">.</span>\n  <h4><b>Trasferimento dei dati</b></h4>\n  <span style="font-weight: 400;">La gestione e la conservazione dei dati personali avverrà su server di proprietà di Google Firebase  nominate quali Amministratori di Sistema e/o Responsabile del Trattamento.</span>\n\n  <span style="font-weight: 400;">I dati non saranno oggetto di trasferimento al di fuori dell\'Unione Europea. </span><span style="font-weight: 400;">\n</span>\n  <h4><b>Periodo di Conservazione dei Dati</b></h4>\n  <span style="font-weight: 400;">I dati personali degli utenti dell’APP che inviano una comunicazione di disservizio tramite l’App, saranno conservati per i tempi strettamente necessari all\'espletamento dell’attività descritta nella presente informativa. Tuttavia gli stessi dati resi anonimi potranno essere conservati per un periodo maggiore al fine di poter individuare le performance dell’App e del servizio offerto all’utenza, al termine del quale saranno cancellati  entro i tempi stabiliti dalla norma di legge</span>\n\n  <span style="font-weight: 400;">Qualora intervenga la revoca del consenso al trattamento specifico da parte dell\'interessato, i dati verranno cancellati o resi anonimi entro 72 ore dalla ricezione della revoca. </span><span style="font-weight: 400;">\n</span><span style="font-weight: 400;">\n</span><span style="font-weight: 400;">Ai sensi dell\'Art. 13, comma 2, lettera (f) del Regolamento, si informa che tutti i dati raccolti non saranno comunque oggetto di alcun processo decisionale automatizzato, compresa la profilazione</span><span style="font-weight: 400;">.</span>\n  <h4><b>Diritti dell’interessato</b></h4>\n  <span style="font-weight: 400;">Gli utenti possono sempre esercitare i diritti esplicitati negli articoli 13 (Comma 2), 15, 17, 18, 19 e 21 del GDPR, qui riassunti nei seguenti punti: </span>\n  <ul>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">L\'interessato ha il diritto di ottenere la conferma dell\'esistenza di dati che lo riguardano, anche se non ancora comunicati, e di avere la loro comunicazione in forma intelligibile;</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">L\'interessato ha il diritto di chiedere al Titolare del trattamento l\'accesso ai dati personali, l\'integrazione, la rettifica, la cancellazione degli stessi o la limitazione dei trattamenti che lo riguardano o di opporsi al loro trattamento, oltre al diritto alla portabilità dei dati;</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Ha il diritto di proporre un reclamo al Garante per la protezione dei dati personali, seguendo le procedure e le indicazioni pubblicate sul sito web ufficiale dell\'Autorità su </span><a href="http://www.garanteprivacy.it/"><span style="font-weight: 400;">www.garanteprivacy.it</span></a><span style="font-weight: 400;">;</span></li>\n  </ul>\n  L\'esercizio dei diritti non è soggetto ad alcun vincolo di forma ed è gratuito.\n\n  <span style="font-weight: 400;">Al momento del download dell’App, verrà proposta la lettura della presente informativa e solo scorrendola fino alla fine comparirà il tasto “do il consenso” “ Nego il consenso”. La mancata manifestazione o la negazione del consenso renderà impossibile l’utilizzo dell’App.</span>\n  <h4><b>Modalità di esercizio dei diritti</b></h4>\n  <span style="font-weight: 400;">Gli utenti possono esercitare i propri diritti in qualsiasi momento, inviando una mail all\'indirizzo </span><a href="mailto:privacy@messinaservizibenecomune.it"><span style="font-weight: 400;">privacy@messinaservizibenecomune.it</span></a><b>\n</b><span style="font-weight: 400;">Oppure scrivendo a mezzo posta a: Messinaservizi Bene Comune Piazza Unione Europea 98122 Messina</span>\n  <ion-infinite-scroll (ionInfinite)="attiva($event)">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n\n<ion-footer no-shadow>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6>\n        <button ion-button full (click)="indietro();">\n          Annulla\n        </button>\n      </ion-col>\n      <ion-col col-6>\n        <button ion-button full (click)="registrazione();" [disabled]="!pulsante_attivo">\n          Accetta\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/pages/privacy/privacy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], PrivacyPage);
    return PrivacyPage;
}());

//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrazionePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(55);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegistrazionePage = /** @class */ (function () {
    function RegistrazionePage(navCtrl, navParams, alertCtrl, fire, afDatabase, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.afDatabase = afDatabase;
        this.loadingCtrl = loadingCtrl;
        this.itemsRef = afDatabase.list('/anagrafica_utenti');
    }
    RegistrazionePage.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    RegistrazionePage.prototype.registraUtente = function () {
        var _this = this;
        //console.log('Would register user with ',this.user.value, this.pass.value);
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        if (this.pass.value != this.pass2.value) {
            this.loading.dismiss().then(function () {
                alert("Le password non coincidono.");
            });
        }
        else if (this.nome.value === "" || this.cognome.value === "" || this.indirizzo.value === "" || this.telefono.value === "") {
            this.loading.dismiss().then(function () {
                _this.alert("Compilare tutti i campi.");
            });
        }
        else if (this.codicefiscale.value === "" || !this.controllaCF()) {
            this.loading.dismiss().then(function () {
                _this.alert("Inserire Codice Fiscale corretto.");
            });
        }
        else {
            this.fire.auth.createUserWithEmailAndPassword(this.user.value.trim(), this.pass.value)
                .then(function (data) {
                console.log('Dati acquisiti ', data);
                _this.fire.auth.currentUser.sendEmailVerification();
                _this.aggiungiCodiceFiscale();
                _this.fire.auth.signOut();
                _this.loading.dismiss().then(function () {
                    alert('Registrazione eseguita\nControlla la posta');
                    _this.navCtrl.remove(2, 1);
                    _this.navCtrl.pop();
                });
            })
                .catch(function (error) {
                if (error.code === 'auth/email-already-in-use') {
                    _this.loading.dismiss().then(function () {
                        _this.alert("Email già registrata");
                    });
                }
                else if (error.code === 'auth/invalid-email') {
                    _this.loading.dismiss().then(function () {
                        _this.alert("Email non valida");
                    });
                }
                else if (error.code === 'operation-not-allowed') {
                    _this.loading.dismiss().then(function () {
                        _this.alert("Operazione non permessa");
                    });
                }
                else if (error.code === 'auth/weak-password') {
                    _this.loading.dismiss().then(function () {
                        _this.alert("Password poco sicura");
                    });
                }
                else {
                    _this.loading.dismiss().then(function () {
                        _this.alert(error.message);
                    });
                }
            });
        }
    };
    RegistrazionePage.prototype.controllaCF = function () {
        // Definisco un pattern per il confronto
        var pattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;
        // utilizzo il metodo search per verificare che il valore inserito nel campo
        // di input rispetti la stringa di verifica (pattern)
        if (this.codicefiscale.value.search(pattern) == -1) {
            // In caso di errore stampo un avviso
            //alert("Il Codifce Fiscale inserito è errato");
            return 0;
        }
        else {
            // ...in caso contrario stampo un avviso di successo!
            //alert("Il Codice Fiscale è corretto!");
            return 1;
        }
    };
    RegistrazionePage.prototype.aggiungiCodiceFiscale = function () {
        //this.alert("Salvo il CF nel database");
        var newItemRef = this.itemsRef.push({});
        newItemRef.set({
            utente: this.user.value.toLowerCase(),
            codice_fiscale: this.codicefiscale.value.toUpperCase(),
            nome: this.nome.value,
            cognome: this.cognome.value,
            indirizzo: this.indirizzo.value,
            telefono: this.telefono.value
        }).catch(function (err) {
            console.error('Errore: ', JSON.stringify(err));
        });
    };
    RegistrazionePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistrazionePage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "pass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password2'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "pass2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('codicefiscale'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "codicefiscale", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('nome'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "nome", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cognome'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "cognome", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('indirizzo'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "indirizzo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('telefono'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "telefono", void 0);
    RegistrazionePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registrazione',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/pages/registrazione/registrazione.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Registrazione\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>Indirizzo email</ion-label>\n      <ion-input type="text" #username></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" #password></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password - verifica</ion-label>\n      <ion-input type="password" #password2></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Nome</ion-label>\n      <ion-input type="text" #nome></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Cognome</ion-label>\n      <ion-input type="text" #cognome></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Indirizzo</ion-label>\n      <ion-input type="text" #indirizzo></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Telefono fisso/cellulare</ion-label>\n      <ion-input type="tel" #telefono></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Codice Fiscale</ion-label>\n      <ion-input type="text" #codicefiscale></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button color="primary" block (click)="registraUtente();">Registrati</button>\n  </div>\n</ion-content>\n\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/pages/registrazione/registrazione.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], RegistrazionePage);
    return RegistrazionePage;
}());

//# sourceMappingURL=registrazione.js.map

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/dettagli/dettagli.module": [
		478,
		5
	],
	"../pages/elenco/elenco.module": [
		479,
		4
	],
	"../pages/foto/foto.module": [
		483,
		3
	],
	"../pages/login/login.module": [
		480,
		2
	],
	"../pages/privacy/privacy.module": [
		481,
		1
	],
	"../pages/registrazione/registrazione.module": [
		482,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 207;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__privacy_privacy__ = __webpack_require__(150);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
    }
    HomePage.prototype.signIn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__privacy_privacy__["a" /* PrivacyPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/pages/home/home.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      MessinaServizi Bene Comune\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-img src="assets/imgs/logo.png" class="center" width="240" height="186"></ion-img>\n  <div padding>\n    <button ion-button color="primary" block (click)="signIn();">Accedi</button>\n  </div>\n  <div padding>\n    <button ion-button color="primary" block (click)="register();">Registrati</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FcmProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FcmProvider = /** @class */ (function () {
    function FcmProvider(firebaseNative, afs, platform) {
        this.firebaseNative = firebaseNative;
        this.afs = afs;
        this.platform = platform;
    }
    // Get permission from the user
    FcmProvider.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.platform.is('android')) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.firebaseNative.getToken()];
                    case 1:
                        _a.token = _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!this.platform.is('ios')) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.firebaseNative.getToken()];
                    case 3:
                        _b.token = _c.sent();
                        return [4 /*yield*/, this.firebaseNative.grantPermission()];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: 
                    //this.itemsRef.set(user,{token: token});
                    return [2 /*return*/, this.saveTokenToFirestore(this.token)];
                }
            });
        });
    };
    // Save the token to firestore
    FcmProvider.prototype.saveTokenToFirestore = function (token) {
        if (!token)
            return;
        //this.afDatabase.object('/token/' + user).set({token: token});
        var devicesRef = this.afs.collection('dispositivi');
        var docData = {
            token: token
        };
        //this.itemsRef.set(user,{token: token})
        /*
        const newItemRef = this.itemsRef.push({});
        newItemRef.set({
          user: user,
          token: token
        }).then(msg => alert("Token inserito " + msg));
        */
        return devicesRef.doc(token).set(docData);
    };
    // Listen to incoming FCM messages
    FcmProvider.prototype.listenToNotifications = function () {
        return this.firebaseNative.onNotificationOpen();
    };
    FcmProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__["a" /* Firebase */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */]])
    ], FcmProvider);
    return FcmProvider;
}());

//# sourceMappingURL=fcm.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(303);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_registrazione_registrazione__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_elenco_elenco__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_dettagli_dettagli__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_foto_foto__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_privacy_privacy__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_firebase__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_firestore__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_database__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_diagnostic__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_location_accuracy__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_fcm_fcm__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_storage__ = __webpack_require__(120);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var firebaseAuth = {
    apiKey: "AIzaSyCLgHW4JHGbKmaIMDaz1u94VgG7qap000o",
    authDomain: "aiutame-84f72.firebaseapp.com",
    databaseURL: "https://aiutame-84f72.firebaseio.com",
    projectId: "aiutame-84f72",
    storageBucket: "aiutame-84f72.appspot.com",
    messagingSenderId: "400182942859"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_registrazione_registrazione__["a" /* RegistrazionePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_elenco_elenco__["a" /* MainElenco */],
                __WEBPACK_IMPORTED_MODULE_10__pages_dettagli_dettagli__["a" /* DettagliPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_foto_foto__["a" /* FotoPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_privacy_privacy__["a" /* PrivacyPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/dettagli/dettagli.module#DettagliPageModule', name: 'DettagliPage', segment: 'dettagli', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/elenco/elenco.module#ElencoPageModule', name: 'MainElenco', segment: 'elenco', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/privacy/privacy.module#PrivacyPageModule', name: 'PrivacyPage', segment: 'privacy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registrazione/registrazione.module#RegistrazionePageModule', name: 'RegistrazionePage', segment: 'registrazione', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/foto/foto.module#FotoPageModule', name: 'FotoPage', segment: 'foto', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_17_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth),
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_19_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_registrazione_registrazione__["a" /* RegistrazionePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_elenco_elenco__["a" /* MainElenco */],
                __WEBPACK_IMPORTED_MODULE_10__pages_dettagli_dettagli__["a" /* DettagliPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_foto_foto__["a" /* FotoPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_privacy_privacy__["a" /* PrivacyPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_19_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_firebase__["a" /* Firebase */],
                __WEBPACK_IMPORTED_MODULE_22__providers_fcm_fcm__["a" /* FcmProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_elenco_elenco__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_fcm_fcm__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators__);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, fire, menuCtrl, events, afDatabase, fcm, toastCtrl) {
        //this.itemsRef = afDatabase.list('/token');
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.fire = fire;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.afDatabase = afDatabase;
        this.fcm = fcm;
        this.toastCtrl = toastCtrl;
        this.initializeApp();
        var unsubscribe = fire.auth.onAuthStateChanged(function (user) {
            if (!user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
                unsubscribe();
            }
            else {
                _this.email = fire.auth.currentUser.email;
                _this.events.publish('user:logged', fire.auth.currentUser.email);
                //alert(this.email + " " + this.fcm.token);
                //this.itemsRef = afDatabase.list('/token', ref => ref.orderByChild('user').equalTo(this.email));
                /*const newItemRef = this.itemsRef.push({});
                newItemRef.set({
                  user: this.email,
                  token: this.fcm.token
                }).then(msg => alert("Token inserito " + msg));
                */
                //this.itemsRef.set(this.email,{token: this.fcm.token});
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_elenco_elenco__["a" /* MainElenco */];
                unsubscribe();
            }
        });
        events.subscribe('user:logged', function (user) {
            _this.email = user;
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        var token;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // Get a FCM token
            _this.fcm.getToken();
            // Listen to incoming messages
            _this.fcm.listenToNotifications().pipe(Object(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators__["tap"])(function (msg) {
                // show a toast
                var toast = _this.toastCtrl.create({
                    message: msg.body,
                    duration: 3000
                });
                toast.present();
            })).subscribe();
        });
    };
    MyApp.prototype.logout = function () {
        //this.afDatabase.database.goOffline();
        this.fire.auth.signOut();
        console.log("Logout");
        this.menuCtrl.toggle();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.apriSito = function () {
        window.open("http://www.messinaservizibenecomune.it", '_system', 'location=yes');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/app/app.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n\n<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <ion-list-header>\n        {{ email }}\n      </ion-list-header>\n\n      <button ion-item (click)="logout()">Logout</button>\n      <button ion-item (click)="apriSito()">Visita sito</button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_8__providers_fcm_fcm__["a" /* FcmProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainElenco; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dettagli_dettagli__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foto_foto__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(120);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MainElenco = /** @class */ (function () {
    function MainElenco(navCtrl, navParams, alertCtrl, fire, afDatabase, geolocation, loadingCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.afDatabase = afDatabase;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.email = fire.auth.currentUser.email;
        //this.itemsRef = afDatabase.list('segnalazioni')
        this.riferimento = afDatabase.list('segnalazioni', function (ref) { return ref.orderByChild('user').equalTo(_this.email); });
        this.items = this.riferimento.valueChanges();
        this.loading.dismiss();
        this.benvenuto();
    }
    MainElenco.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    MainElenco.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, riferimento: this.riferimento });
    };
    MainElenco.prototype.fabClick = function () {
        //alert(this.fire.auth.currentUser.email);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__foto_foto__["a" /* FotoPage */]);
    };
    MainElenco.prototype.benvenuto = function () {
        var _this = this;
        //Inizializza lo storage locale nel caso in cui sia la prima installazione
        this.storage.get('benvenuto').then(function (val) {
            if (!val) {
                _this.storage.set('benvenuto', JSON.stringify(0));
            }
        });
        //Mostra
        this.storage.get('benvenuto').then(function (val2) {
            var valore2 = JSON.parse(val2);
            if (valore2 != 1) {
                alert("Benvenuto su MSBC!\nTramite il pulsante '+' potrai inviare le tue segnalazioni direttamente a MessinaServizi Bene Comune.\n" +
                    "Puoi inviare una segnalazione al giorno.");
                _this.storage.set('benvenuto', JSON.stringify(1));
            }
        });
    };
    MainElenco.prototype.ionViewDidLoad = function () {
        var dateobj = new Date();
        function pad(n) { return n < 10 ? "0" + n : n; }
        var data = pad(dateobj.getDate()) + "/" + pad(dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();
        var ora = pad(dateobj.getHours()) + ":" + pad(dateobj.getUTCMinutes());
        console.log(data + " - " + ora);
    };
    MainElenco = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-elenco',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/login/src/pages/elenco/elenco.html"*/'<!--\n# SPDX-license-identifier: Apache-2.0\n#\n# Copyright (c) 2019 UniME - MDSLab\n#\n# Authors:  Andrea Centorrino <andrea.centorrino@gmail.com>\n#\n# Licensed under the Apache License, Version 2.0 (the "License"); you may\n# not use this file except in compliance with the License. You may obtain\n# a copy of the License at\n#\n# http://www.apache.org/licenses/LICENSE-2.0\n#\n# Unless required by applicable law or agreed to in writing, software\n# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n# License for the specific language governing permissions and limitations\n# under the License.\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Segnalazioni</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-item *ngFor="let item of items | async" (click)="itemSelected(item);">\n      <ion-thumbnail item-start>\n\n        <img [src]="item.img_in" *ngIf="item.img_in">\n      </ion-thumbnail>\n      <h2>{{ item.data_in }} - {{item.ora_in}}</h2>\n      <p>Stato: <a *ngIf="item.stato == 0" ion-text color="secondary">chiusa</a><a *ngIf="item.stato == 1" ion-text color="annullata">annullata</a><a *ngIf="item.stato == 2" ion-text color="danger">aperta</a></p>\n      <button ion-button clear item-end>Vai</button>\n    </ion-item>\n  </ion-list>\n\n  <ion-fab bottom right>\n    <button ion-fab color="primary" (click)="fabClick();"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/login/src/pages/elenco/elenco.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], MainElenco);
    return MainElenco;
}());

//# sourceMappingURL=elenco.js.map

/***/ })

},[296]);
//# sourceMappingURL=main.js.map