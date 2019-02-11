webpackJsonp([7],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChiudiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(193);
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
 * Generated class for the ChiudiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChiudiPage = /** @class */ (function () {
    function ChiudiPage(navCtrl, navParams, afDatabase, fire, camera, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.fire = fire;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.dati = navParams.get('dettaglio');
        this.items = navParams.get('items');
        this.email = fire.auth.currentUser.email;
        this.itemsRef = afDatabase.list('/segnalazioni');
    }
    ChiudiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChiudiPage');
    };
    ChiudiPage.prototype.alert = function (message) {
        this.alertCtrl.create({
            title: 'Info',
            subTitle: message,
            buttons: ['OK']
        }).present();
    };
    ChiudiPage.prototype.scattaFoto = function () {
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
    ChiudiPage.prototype.apriGalleria = function () {
        var _this = this;
        var cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 60,
            targetWidth: 900,
            targetHeight: 900,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.foto = _this.base64Image;
        }, function (err) {
            console.log(err);
        });
    };
    ChiudiPage.prototype.invia = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        var stato;
        //let data;
        //let ora;
        //data = new Date().toLocaleDateString();
        //ora = new Date().toLocaleTimeString();
        var dateobj = new Date();
        function pad(n) { return n < 10 ? "0" + n : n; }
        var data = pad(dateobj.getDate()) + "/" + pad(dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();
        var ora = pad(dateobj.getHours()) + ":" + pad(dateobj.getUTCMinutes());
        if (this.selectedLeave == 1) {
            stato = "annullata";
        }
        else {
            stato = "chiusa";
        }
        if (typeof this.foto !== "undefined" && this.selectedLeave == 0) {
            //alert(this.dati.id + '\n' + data + '\n' + ora + '\n' + this.selectedLeave + '\n' + this.note_chiusura);
            var newItemRef = this.itemsRef.update(this.dati.id, { img_out: this.foto, data_out: data, ora_out: ora, stato: Number(this.selectedLeave), note_chiusura: this.note_chiusura.value });
            this.navCtrl.remove(2, 1);
            this.loading.dismiss().then(function () {
                _this.navCtrl.pop();
            });
        }
        else if (this.selectedLeave == 1) {
            var newItemRef = this.itemsRef.update(this.dati.id, { data_out: data, ora_out: ora, stato: Number(this.selectedLeave), note_chiusura: this.note_chiusura.value });
            this.navCtrl.remove(2, 1);
            this.loading.dismiss().then(function () {
                _this.navCtrl.pop();
            });
        }
        else {
            this.loading.dismiss().then(function () {
                alert("Non è possibile chiudere segnalazioni senza foto e senza selezionare lo stato.\nRiprovare");
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('note_chiusura'),
        __metadata("design:type", Object)
    ], ChiudiPage.prototype, "note_chiusura", void 0);
    ChiudiPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chiudi',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/chiudi/chiudi.html"*/'<!--\n  Generated template for the ChiudiPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Chiudi segnalazione</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n      <ion-item class="item-leave-height">\n        <ion-label>Seleziona:</ion-label>\n        <ion-select [(ngModel)]="selectedLeave" interface="popover">\n          <ion-option value="0">Chiudi</ion-option>\n          <ion-option value="1">Annulla</ion-option>\n        </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Note chiusura</ion-label>\n      <ion-textarea #note_chiusura></ion-textarea>\n    </ion-item>\n    <button ion-button full (click)="scattaFoto()" icon-start>\n      <ion-icon name="camera"></ion-icon>Scatta una foto\n    </button>\n    <button ion-button full (click)="apriGalleria()" icon-start>\n      <ion-icon name="camera"></ion-icon>Scegli dalla galleria\n    </button>\n    <img [src]="foto" *ngIf="foto">\n    <br>\n    <button ion-button full (click)="invia()" icon-start>\n      <ion-icon name="mail"></ion-icon>Invia\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/chiudi/chiudi.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ChiudiPage);
    return ChiudiPage;
}());

//# sourceMappingURL=chiudi.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(17);
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
    LoginPage.prototype.signIn = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.fire.auth.signInWithEmailAndPassword(this.user.value + '@messinaservizibenecomune.it', this.pass.value)
            .then(function (data) {
            //this.navCtrl.setRoot(HomePage);
            _this.loading.dismiss().then(function () {
                _this.events.publish('user:login');
            });
        }).catch(function (error) {
            _this.loading.dismiss().then(function () {
                console.log('Errore: ', error);
                _this.alert(error.message);
            });
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
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
            selector: 'page-login',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Login\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>N.° di telefono aziendale</ion-label>\n      <ion-input type="text" #username></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" #password></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button color="primary" block (click)="signIn();">Login</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registrazione_registrazione__ = __webpack_require__(115);
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
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
            selector: 'page-privacy',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/privacy/privacy.html"*/'<!--\n  Generated template for the PrivacyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Informativa sulla privacy</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h4 style="text-align: center;"><strong>INFORMATIVA PRIVACY AI SENSI DEL REGOLAMENTO EUROPEO 2016/679</strong></h4>\n  <h4 style="text-align: center;"><strong>ART – 13 e 14 (C60-62 )</strong></h4>\n  <span style="font-weight: 400;">Ai sensi del Regolamento UE 2016/679 denominato “</span><i><span style="font-weight: 400;">Regolamento Europeo in materia di protezione dei dati personali</span></i><span style="font-weight: 400;">” (GDPR) informiamo gli utenti che i dati personali immessi nel sito sono trattati con le modalità e le finalità descritte di seguito</span>\n\n  <span style="font-weight: 400;">In osservanza delle prescrizioni previste dal nuovo Regolamento in materia di protezione dei dati personali, si comunica quanto segue:</span>\n  <h4><b>Titolare del Trattamento</b></h4>\n  <span style="font-weight: 400;">Ai sensi dell’articolo 13 e 14 del Regolamento Europeo 2016/679, La informiamo che la Messinaservizi Bene Comune SpA in House Providing con CF e P.I. 034590800838 è il titolare del trattamento (di seguito “Titolare”) e che la sede legale è in Piazza Unione Europea 98122 Messina.</span>\n  <h4><b>Il Responsabile della Protezione dei Dati</b></h4>\n  <span style="font-weight: 400;">Il Responsabile della protezione dei dati è il Dott. Armando Bressan ed è possibile contattarlo attraverso la mail: </span><span style="font-weight: 400;">privacy@messinaservizibenecomune.it</span><span style="font-weight: 400;"> . Secondo la legge indicata tale trattamento sarà improntato ai principi di correttezza, liceità e trasparenza e di tutela della Sua riservatezza e dei Suoi diritti.</span>\n  <h4><b>Oggetto del Trattamento</b></h4>\n  <span style="font-weight: 400;">I dati personali limitatamente alla (email) da noi raccolti vengono forniti dall\'utente in fase di registrazione dal sito web www.messinaservizibenecomune.it, all\'invio di una richiesta di download gratuito dell’App Servizi denominata (MSBC), dove sarà possibile una volta dato il consenso, istallarla sul proprio device. L’App permetterà all’utenza di segnalare un disservizio relativo alla attività di igiene ambientale gestite dalla Messinaservizi Bene Comune, effettuando una foto che automaticamente verrà inviata al server di Google Firebase il quale custodirà la tua immagine e la tua mail, fino a quanto   un capo servizio od un operatore della Messinasevizi bene comune non la prenderà in carico. Una volta che l’operatore elimina il disservizio segnalato provvederà ad inoltrare una foto che rappresenti l’eliminazione del disservizio. Si precisa che il capo servizio e/o l’operatore non vengono a conoscenza della mail dell’utente che ha effettuato la segnalazione, in quanto per loro la segnalazione è anonima, nel rispetto del principio di minimizzazione dei dati.</span>\n  <h4><b>Finalità del Trattamento</b></h4>\n  <span style="font-weight: 400;">I dati personali in particolar modo le mail e le immagini che ritraggono i disservizi sono trattati per finalità connesse o strumentali all\'attività della Messinaservizi Bene Comune</span>\n  <ul>\n    <li><span style="font-weight: 400;">Con il consenso espresso dall\'interessato per il download gratuito dell’App Servizi denominata (MSBC)  </span></li>\n  </ul>\n  <h4><b>Modalità di Trattamento</b></h4>\n  <span style="font-weight: 400;">Per trattamento di dati personali ai sensi della norma, si intende qualunque operazione o complesso di operazioni, svolti con o senza l\'ausilio di mezzi elettronici o comunque automatizzati, concernenti la raccolta, la registrazione, l\'organizzazione, la conservazione, l\'elaborazione, la modificazione, la selezione, l\'estrazione, il raffronto, l\'utilizzo, l\'interconnessione, il blocco, la comunicazione, la diffusione, la cancellazione e la distribuzione di dati. La società assicura che il trattamento dei dati sarà effettuato tramite l\'utilizzo di idonee procedure che evitino il rischio di perdita, accesso non autorizzato, uso illecito e diffusione, nel rispetto dei limiti e delle condizioni posti dal Regolamento UE 2016/679. Il trattamento dei dati avviene su server che sono di proprietà di Google e più specificatamente dai server di Firebase di Google il quale al momento dell’invio della  segnalazione potrebbe acquisire:</span>\n\n  <span style="font-weight: 400;">La tua posizione che può essere determinata con vari gradi di accuratezza, tramite:</span>\n  <ul>\n    <li><span style="font-weight: 400;">G</span><span style="font-weight: 400;">PS</span></li>\n    <li>Indirizzo IP</li>\n    <li>Dati dai sensori del tuo dispositivo</li>\n    <li>Informazioni su ciò che si trova nelle vicinanze del tuo dispositivo, ad esempio sui punti di accesso Wi-Fi e sui ripetitori di segnale dei cellulari, nonché sui dispositivi dotati di Bluetooth</li>\n  </ul>\n  <span style="font-weight: 400;">L’</span><span style="font-weight: 400;">indirizzo IP</span><span style="font-weight: 400;">, rapporti sulle interruzioni anomale, attività di sistema e la data, l\'ora e l\'URL referrer della tua richiesta</span>\n\n  <span style="font-weight: 400;">Richiedere l’accesso alle immagini.</span>\n\n  <span style="font-weight: 400;">Per qualsiasi altra informazione sul trattamento e conservazione dei tuoi dati puoi consultare </span><a href="https://policies.google.com/privacy"><span style="font-weight: 400;">https://policies.google.com/privacy</span></a>\n  <h5><b>Si raccomanda inoltre all’utente di utilizzare l’App anche nel rispetto delle norme civili e panali dell’ordinamento giuridico Italiano, pertanto si raccomanda che nel segnalare un eventuale disservizio ritraendolo effettuando una foto, di non riprendere e/o fotografare persone, targhe automobilistiche ed ogni altro particolare che renda riconoscibile un soggetto terzo.</b></h5>\n  <h5><b>Si precisa inoltre che l’utente che effettua il download dell’App e la istalla sul proprio device, accettando di dare il consenso al trattamento,  dichiara contestualmente di esonerare da ogni responsabilità la Messinaservizi Bene Comune SpA da ogni eventuale uso vietato e/o illecito che l’utente possa fare dell’App. </b></h5>\n  <h4><b>Accesso ai Dati</b></h4>\n  <span style="font-weight: 400;">I soggetti che possono venire a conoscenza dei dati personali dell\'utente in qualità di responsabili o autorizzati (in base all\'Articolo 13 Comma 1 del GDPR) sono: </span>\n  <ul>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Il Titolare del trattamento</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Il Responsabile del Trattamento</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Il personale del Titolare e/o Responsabile del trattamento, nominato per iscritto con l’attribuzione delle user e password da amministratore del sistema APP </span></li>\n  </ul>\n  <span style="font-weight: 400;">I dati personali non saranno oggetto di diffusione a terzi. </span>\n  <h4><b>Comunicazione dei dati</b></h4>\n  <span style="font-weight: 400;">I dati potranno essere comunicati a Organismi di vigilanza, Autorità giudiziarie ed altri soggetti terzi ai quali la comunicazione sia obbligatoria in forza di legge, ivi incluso l\'ambito di prevenzione/repressione di qualsiasi attività illecita connessa all\'accesso al sito  e/o all\' APP</span><span style="font-weight: 400;">.</span>\n  <h4><b>Trasferimento dei dati</b></h4>\n  <span style="font-weight: 400;">La gestione e la conservazione dei dati personali avverrà su server di proprietà di Google Firebase  nominate quali Amministratori di Sistema e/o Responsabile del Trattamento.</span>\n\n  <span style="font-weight: 400;">I dati non saranno oggetto di trasferimento al di fuori dell\'Unione Europea. </span><span style="font-weight: 400;">\n</span>\n  <h4><b>Periodo di Conservazione dei Dati</b></h4>\n  <span style="font-weight: 400;">I dati personali degli utenti dell’APP che inviano una comunicazione di disservizio tramite l’App, saranno conservati per i tempi strettamente necessari all\'espletamento dell’attività descritta nella presente informativa. Tuttavia gli stessi dati resi anonimi potranno essere conservati per un periodo maggiore al fine di poter individuare le performance dell’App e del servizio offerto all’utenza, al termine del quale saranno cancellati  entro i tempi stabiliti dalla norma di legge</span>\n\n  <span style="font-weight: 400;">Qualora intervenga la revoca del consenso al trattamento specifico da parte dell\'interessato, i dati verranno cancellati o resi anonimi entro 72 ore dalla ricezione della revoca. </span><span style="font-weight: 400;">\n</span><span style="font-weight: 400;">\n</span><span style="font-weight: 400;">Ai sensi dell\'Art. 13, comma 2, lettera (f) del Regolamento, si informa che tutti i dati raccolti non saranno comunque oggetto di alcun processo decisionale automatizzato, compresa la profilazione</span><span style="font-weight: 400;">.</span>\n  <h4><b>Diritti dell’interessato</b></h4>\n  <span style="font-weight: 400;">Gli utenti possono sempre esercitare i diritti esplicitati negli articoli 13 (Comma 2), 15, 17, 18, 19 e 21 del GDPR, qui riassunti nei seguenti punti: </span>\n  <ul>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">L\'interessato ha il diritto di ottenere la conferma dell\'esistenza di dati che lo riguardano, anche se non ancora comunicati, e di avere la loro comunicazione in forma intelligibile;</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">L\'interessato ha il diritto di chiedere al Titolare del trattamento l\'accesso ai dati personali, l\'integrazione, la rettifica, la cancellazione degli stessi o la limitazione dei trattamenti che lo riguardano o di opporsi al loro trattamento, oltre al diritto alla portabilità dei dati;</span></li>\n    <li style="font-weight: 400;"><span style="font-weight: 400;">Ha il diritto di proporre un reclamo al Garante per la protezione dei dati personali, seguendo le procedure e le indicazioni pubblicate sul sito web ufficiale dell\'Autorità su </span><a href="http://www.garanteprivacy.it/"><span style="font-weight: 400;">www.garanteprivacy.it</span></a><span style="font-weight: 400;">;</span></li>\n  </ul>\n  L\'esercizio dei diritti non è soggetto ad alcun vincolo di forma ed è gratuito.\n\n  <span style="font-weight: 400;">Al momento del download dell’App, verrà proposta la lettura della presente informativa e solo scorrendola fino alla fine comparirà il tasto “do il consenso” “ Nego il consenso”. La mancata manifestazione o la negazione del consenso renderà impossibile l’utilizzo dell’App.</span>\n  <h4><b>Modalità di esercizio dei diritti</b></h4>\n  <span style="font-weight: 400;">Gli utenti possono esercitare i propri diritti in qualsiasi momento, inviando una mail all\'indirizzo </span><a href="mailto:privacy@messinaservizibenecomune.it"><span style="font-weight: 400;">privacy@messinaservizibenecomune.it</span></a><b>\n</b><span style="font-weight: 400;">Oppure scrivendo a mezzo posta a: Messinaservizi Bene Comune Piazza Unione Europea 98122 Messina</span>\n  <ion-infinite-scroll (ionInfinite)="attiva($event)">\n    <ion-infinite-scroll-content>\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n\n<ion-footer no-shadow>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6>\n        <button ion-button full (click)="indietro();">\n          Annulla\n        </button>\n      </ion-col>\n      <ion-col col-6>\n        <button ion-button full (click)="registrazione();" [disabled]="!pulsante_attivo">\n          Accetta\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/privacy/privacy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], PrivacyPage);
    return PrivacyPage;
}());

//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrazionePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(17);
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
 * Generated class for the RegistrazionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistrazionePage = /** @class */ (function () {
    function RegistrazionePage(navCtrl, navParams, alertCtrl, fire, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.events = events;
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
        if (this.pass.value != this.pass2.value) {
            alert("Le password non coincidono");
        }
        else if (this.selectedLeave == null) {
            alert('Selezionare un ruolo');
        }
        else if (this.nome.value == '' || this.cognome.value == '') {
            alert('Inserire nome e cognome');
        }
        else if (this.user.value.length < 10) {
            alert('Inserire il numero di telefono corretto');
        }
        else if (this.selectedLeave == 1 && this.referente.value.lenght < 10) {
            alert('Inserire il numero di telefono del capo servizio');
        }
        else {
            this.fire.auth.createUserWithEmailAndPassword(this.user.value + '@messinaservizibenecomune.it', this.pass.value)
                .then(function (data) {
                //se non facessi il controllo e passassi this.referente.value, mi darebbe errore "undefined"
                if (_this.selectedLeave == 1) {
                    //così chiamo la funzione in app.component.ts
                    _this.events.publish('user:registrato', _this.user.value + '@messinaservizibenecomune.it', _this.pass.value, _this.nome.value, _this.cognome.value, _this.selectedLeave, _this.referente.value);
                }
                else {
                    _this.events.publish('user:registrato', _this.user.value + '@messinaservizibenecomune.it', _this.pass.value, _this.nome.value, _this.cognome.value, _this.selectedLeave, 0);
                }
            })
                .catch(function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Errore',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
                console.log('Errore ', error);
            });
        }
    };
    RegistrazionePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistrazionePage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('nome'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "nome", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cognome'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "cognome", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('referente'),
        __metadata("design:type", Object)
    ], RegistrazionePage.prototype, "referente", void 0);
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
    RegistrazionePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registrazione',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/registrazione/registrazione.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Registrazione\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item class="item-leave-height">\n      <ion-label>Ruolo:</ion-label>\n      <ion-select [(ngModel)]="selectedLeave" interface="popover">\n        <ion-option value="0">Coordinatore</ion-option>\n        <ion-option value="1">Referente</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="selectedLeave == 1">\n      <ion-label floating>N.° telefono coordinatore di riferimento</ion-label>\n      <ion-input type="text" #referente></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Nome</ion-label>\n      <ion-input type="text" #nome></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Cognome</ion-label>\n      <ion-input type="text" #cognome></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>N.° di telefono aziendale</ion-label>\n      <ion-input type="text" #username></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" #password></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password - verifica</ion-label>\n      <ion-input type="password" #password2></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button color="primary" block (click)="registraUtente();">Registrati</button>\n  </div>\n</ion-content>\n\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/registrazione/registrazione.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], RegistrazionePage);
    return RegistrazionePage;
}());

//# sourceMappingURL=registrazione.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfiloPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assegnate_assegnate__ = __webpack_require__(49);
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
 * Generated class for the ProfiloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfiloPage = /** @class */ (function () {
    function ProfiloPage(navCtrl, navParams, loadingCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.riferimento = navParams.get('sorveglianti');
        this.dati = this.riferimento.valueChanges();
    }
    ProfiloPage.prototype.aggiornaReferente = function (dato) {
        var _this = this;
        //Aggiorna il numero del capo servizio a cui fa riferimento il sorvegliante
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        var newItemRef = this.riferimento.update(dato.ref, { referente: this.referente.value + "@messinaservizibenecomune.it" });
        this.loading.dismiss().then(function () {
            alert("Numero del Capo Servizio di riferimento aggiornato!");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__assegnate_assegnate__["a" /* AssegnatePage */]);
        });
    };
    ProfiloPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad ProfiloPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('referente'),
        __metadata("design:type", Object)
    ], ProfiloPage.prototype, "referente", void 0);
    ProfiloPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profilo',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/profilo/profilo.html"*/'<!--\n  Generated template for the ProfiloPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Profilo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngFor="let dato of dati | async">\n    <ion-card-content>\n      <p>Nome: {{ dato.nome }}</p>\n      <p>Cognome: {{ dato.cognome }}</p>\n      <p>Cambia Coordinatore:</p>\n      <ion-input type="text" placeholder="{{ dato.referente.split(\'@\')[0] }} (attuale)" #referente></ion-input>\n      <div padding>\n        <button ion-button color="primary" block (click)="aggiornaReferente(dato);">Aggiorna</button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/profilo/profilo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], ProfiloPage);
    return ProfiloPage;
}());

//# sourceMappingURL=profilo.js.map

/***/ }),

/***/ 127:
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
webpackEmptyAsyncContext.id = 127;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/assegnate/assegnate.module": [
		364,
		6
	],
	"../pages/chiudi/chiudi.module": [
		358,
		5
	],
	"../pages/dettagli/dettagli.module": [
		359,
		4
	],
	"../pages/login/login.module": [
		360,
		3
	],
	"../pages/privacy/privacy.module": [
		361,
		2
	],
	"../pages/profilo/profilo.module": [
		362,
		1
	],
	"../pages/registrazione/registrazione.module": [
		363,
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
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(23);
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
    function HomePage(navCtrl, fire, afDatabase, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.fire = fire;
        this.afDatabase = afDatabase;
        this.loadingCtrl = loadingCtrl;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        //Tutte le segnalazioni
        //this.itemsRef = afDatabase.list('/segnalazioni');
        //Solo le segnalazioni aperte
        this.itemsRef = afDatabase.list('/segnalazioni', function (ref) { return ref.orderByChild('stato').equalTo(2); });
        this.items = this.itemsRef.valueChanges();
        this.personaleRef = afDatabase.list('/capi_servizio');
        this.personale = this.personaleRef.valueChanges();
        //this.email = '3911234567@messinaservizibenecomune.it';
        this.email = fire.auth.currentUser.email;
        this.loading.dismiss();
    }
    HomePage.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: this.items, sorveglianti: this.sottopostiRef });
    };
    HomePage.prototype.prendiCarico = function (item) {
        var _this = this;
        console.log('Presa in carico');
        //Aggiorna il record della segnalazione indicando il capo servizio che l'ha presa in carico, ed apre la pagina
        //con i dettagli della segnalazione per poterla assegnare ad un sorvegliante (ma va aggiornata manualmente, perché la chiamata al database è asincrona e non aggiorna in tempo reale)
        var newItemRef = this.itemsRef.update(item.id, { capo: this.email }).then(function (_) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: _this.items, sorveglianti: _this.sottopostiRef }); });
    };
    HomePage.prototype.lasciaSegnalazione = function (item) {
        var newItemRef = this.itemsRef.update(item.id, { capo: '', sorvegliante: '' });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.personale.subscribe(function (snapshots) { snapshots.forEach(function (snapshot) { _this.ricercaSorveglianti(_this.email); }); });
        console.log('');
    };
    HomePage.prototype.ricercaSorveglianti = function (riferimento) {
        //Solo i sorveglianti registrati "sotto" un certo capo servizio
        //this.sottopostiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('referente').equalTo(riferimento));
        //Tutti i capi servizio possono vedere tutti i sorveglianti
        this.sottopostiRef = this.afDatabase.list('/sorveglianti', function (ref) { return ref.orderByChild('cognome'); });
        this.sottoposti = this.sottopostiRef.valueChanges();
        //this.sottopostiRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaOperatori(riferimento,snapshot.id)})})
    };
    //Gli operatori non avranno dispositivi, quindi non serve (tabella cancellata dal database, lasciato solo come riferimento)
    HomePage.prototype.ricercaOperatori = function (riferimentoCapi, riferimentoSorveglianti) {
        this.operatoriRef = this.afDatabase.list('/operatori', function (ref) { return ref.orderByChild('referente').equalTo(riferimentoSorveglianti); });
        this.operatoriRef.valueChanges().subscribe(function (snapshots) { snapshots.forEach(function (snapshot) { console.log(riferimentoCapi, riferimentoSorveglianti, snapshot.id); }); });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Segnalazioni aperte</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-list>\n\n  <ion-item *ngFor="let item of items | async">\n    <ion-thumbnail item-start (click)="itemSelected(item);">\n\n      <img [src]="item.img_in" *ngIf="item.img_in">\n    </ion-thumbnail>\n    <h2 (click)="itemSelected(item);">{{ item.data_in }} - {{ item.ora_in }}</h2>\n    <p (click)="itemSelected(item);">Stato: <a *ngIf="item.stato == 0" ion-text color="secondary">chiusa</a><a *ngIf="item.stato == 1" ion-text color="alert">annullata</a><a *ngIf="item.stato == 2" ion-text color="danger">aperta</a></p>\n      <button ion-button clear item-end (click)="prendiCarico(item);" *ngIf="item.capo == \'\' && item.stato >= 2">Prendi</button>\n      <button ion-button clear item-end (click)="lasciaSegnalazione(item);" *ngIf="item.capo == email && item.stato >= 2">Lascia</button>\n\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SegChiusePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SegChiusePage = /** @class */ (function () {
    function SegChiusePage(navCtrl, fire, afDatabase, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.fire = fire;
        this.afDatabase = afDatabase;
        this.loadingCtrl = loadingCtrl;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        //Tutte le segnalazioni
        //this.itemsRef = afDatabase.list('/segnalazioni');
        //Solo le segnalazioni aperte
        this.itemsRef = afDatabase.list('/segnalazioni', function (ref) { return ref.orderByChild('stato').equalTo(0); });
        this.items = this.itemsRef.valueChanges();
        //this.email = '3911234567@messinaservizibenecomune.it';
        this.email = fire.auth.currentUser.email;
        this.loading.dismiss();
    }
    SegChiusePage.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: this.items });
    };
    SegChiusePage.prototype.prendiCarico = function (item) {
        var _this = this;
        console.log('Presa in carico');
        //Aggiorna il record della segnalazione indicando il capo servizio che l'ha presa in carico, ed apre la pagina
        //con i dettagli della segnalazione per poterla assegnare ad un sorvegliante (ma va aggiornata manualmente, perché la chiamata al database è asincrona e non aggiorna in tempo reale)
        var newItemRef = this.itemsRef.update(item.id, { capo: this.email }).then(function (_) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: _this.items, sorveglianti: _this.sottopostiRef }); });
    };
    SegChiusePage.prototype.lasciaSegnalazione = function (item) {
        var newItemRef = this.itemsRef.update(item.id, { capo: '', sorvegliante: '' });
    };
    SegChiusePage.prototype.ionViewDidLoad = function () {
        //this.personale.subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaSorveglianti(this.email)})});
        console.log('');
    };
    SegChiusePage.prototype.ricercaSorveglianti = function (riferimento) {
        //Solo i sorveglianti registrati "sotto" un certo capo servizio
        //this.sottopostiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('referente').equalTo(riferimento));
        //Tutti i capi servizio possono vedere tutti i sorveglianti
        this.sottopostiRef = this.afDatabase.list('/sorveglianti', function (ref) { return ref.orderByChild('referente'); });
        this.sottoposti = this.sottopostiRef.valueChanges();
        //this.sottopostiRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaOperatori(riferimento,snapshot.id)})})
    };
    //Gli operatori non avranno dispositivi, quindi non serve (tabella cancellata dal database, lasciato solo come riferimento)
    SegChiusePage.prototype.ricercaOperatori = function (riferimentoCapi, riferimentoSorveglianti) {
        this.operatoriRef = this.afDatabase.list('/operatori', function (ref) { return ref.orderByChild('referente').equalTo(riferimentoSorveglianti); });
        this.operatoriRef.valueChanges().subscribe(function (snapshots) { snapshots.forEach(function (snapshot) { console.log(riferimentoCapi, riferimentoSorveglianti, snapshot.id); }); });
    };
    SegChiusePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-seg_chiuse',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/seg_chiuse/seg_chiuse.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Segnalazioni chiuse</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-list>\n\n  <ion-item *ngFor="let item of items | async">\n    <ion-thumbnail item-start (click)="itemSelected(item);">\n\n      <img [src]="item.img_in" *ngIf="item.img_in">\n    </ion-thumbnail>\n    <h2 (click)="itemSelected(item);">{{ item.data_in }} - {{ item.ora_in }}</h2>\n    <p (click)="itemSelected(item);">Stato: <a *ngIf="item.stato == 0" ion-text color="secondary">chiusa</a><a *ngIf="item.stato == 1" ion-text color="alert">annullata</a><a *ngIf="item.stato == 2" ion-text color="danger">aperta</a></p>\n      <button ion-button clear item-end (click)="prendiCarico(item);" *ngIf="item.capo == \'\' && item.stato >= 2">Prendi</button>\n      <button ion-button clear item-end (click)="lasciaSegnalazione(item);" *ngIf="item.capo == email && item.stato >= 2">Lascia</button>\n\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/seg_chiuse/seg_chiuse.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], SegChiusePage);
    return SegChiusePage;
}());

//# sourceMappingURL=seg_chiuse.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SegAnnullatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SegAnnullatePage = /** @class */ (function () {
    function SegAnnullatePage(navCtrl, fire, afDatabase, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.fire = fire;
        this.afDatabase = afDatabase;
        this.loadingCtrl = loadingCtrl;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        //Tutte le segnalazioni
        //this.itemsRef = afDatabase.list('/segnalazioni');
        //Solo le segnalazioni aperte
        this.itemsRef = afDatabase.list('/segnalazioni', function (ref) { return ref.orderByChild('stato').equalTo(1); });
        this.items = this.itemsRef.valueChanges();
        //this.email = '3911234567@messinaservizibenecomune.it';
        this.email = fire.auth.currentUser.email;
        this.loading.dismiss();
    }
    SegAnnullatePage.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: this.items });
    };
    SegAnnullatePage.prototype.prendiCarico = function (item) {
        var _this = this;
        console.log('Presa in carico');
        //Aggiorna il record della segnalazione indicando il capo servizio che l'ha presa in carico, ed apre la pagina
        //con i dettagli della segnalazione per poterla assegnare ad un sorvegliante (ma va aggiornata manualmente, perché la chiamata al database è asincrona e non aggiorna in tempo reale)
        var newItemRef = this.itemsRef.update(item.id, { capo: this.email }).then(function (_) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: _this.items, sorveglianti: _this.sottopostiRef }); });
    };
    SegAnnullatePage.prototype.lasciaSegnalazione = function (item) {
        var newItemRef = this.itemsRef.update(item.id, { capo: '', sorvegliante: '' });
    };
    SegAnnullatePage.prototype.ionViewDidLoad = function () {
        //this.personale.subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaSorveglianti(this.email)})});
        console.log('');
    };
    SegAnnullatePage.prototype.ricercaSorveglianti = function (riferimento) {
        //Solo i sorveglianti registrati "sotto" un certo capo servizio
        //this.sottopostiRef = this.afDatabase.list('/sorveglianti', ref => ref.orderByChild('referente').equalTo(riferimento));
        //Tutti i capi servizio possono vedere tutti i sorveglianti
        this.sottopostiRef = this.afDatabase.list('/sorveglianti', function (ref) { return ref.orderByChild('referente'); });
        this.sottoposti = this.sottopostiRef.valueChanges();
        //this.sottopostiRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaOperatori(riferimento,snapshot.id)})})
    };
    //Gli operatori non avranno dispositivi, quindi non serve (tabella cancellata dal database, lasciato solo come riferimento)
    SegAnnullatePage.prototype.ricercaOperatori = function (riferimentoCapi, riferimentoSorveglianti) {
        this.operatoriRef = this.afDatabase.list('/operatori', function (ref) { return ref.orderByChild('referente').equalTo(riferimentoSorveglianti); });
        this.operatoriRef.valueChanges().subscribe(function (snapshots) { snapshots.forEach(function (snapshot) { console.log(riferimentoCapi, riferimentoSorveglianti, snapshot.id); }); });
    };
    SegAnnullatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-seg_annullate',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/seg_annullate/seg_annullate.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Segnalazioni annullate</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-list>\n\n  <ion-item *ngFor="let item of items | async">\n    <ion-thumbnail item-start (click)="itemSelected(item);">\n\n      <img [src]="item.img_in" *ngIf="item.img_in">\n    </ion-thumbnail>\n    <h2 (click)="itemSelected(item);">{{ item.data_in }} - {{ item.ora_in }}</h2>\n    <p (click)="itemSelected(item);">Stato: <a *ngIf="item.stato == 0" ion-text color="secondary">chiusa</a><a *ngIf="item.stato == 1" ion-text color="alert">annullata</a><a *ngIf="item.stato == 2" ion-text color="danger">aperta</a></p>\n      <button ion-button clear item-end (click)="prendiCarico(item);" *ngIf="item.capo == \'\' && item.stato >= 2">Prendi</button>\n      <button ion-button clear item-end (click)="lasciaSegnalazione(item);" *ngIf="item.capo == email && item.stato >= 2">Lascia</button>\n\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/seg_annullate/seg_annullate.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], SegAnnullatePage);
    return SegAnnullatePage;
}());

//# sourceMappingURL=seg_annullate.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assegnate_assegnate__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dettagli_dettagli__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, afDatabase, fire, elementRef) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.fire = fire;
        this.elementRef = elementRef;
        this.menuTendina = 0;
        this.itemsRef = afDatabase.list('/segnalazioni', function (ref) { return ref.orderByChild('capo').equalTo(''); });
        this.items = this.itemsRef.valueChanges();
        this.personaleRef = afDatabase.list('/capi_servizio');
        this.personale = this.personaleRef.valueChanges();
        this.email = fire.auth.currentUser.email;
    }
    ListPage.prototype.addInfoWindow = function (latitudine, longitudine, immagine, dataora, snapshot) {
        var _this = this;
        var latLng = new google.maps.LatLng(latitudine, longitudine);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
        });
        var content = "<p>Segnalazione del " + dataora + "</p><img height=\"125\" width=\"160\" src=\"" + immagine + "\"><p id=\"prendi\"><a>Prendi</a></p>";
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListenerOnce(infoWindow, 'domready', function () {
            document.getElementById('prendi').addEventListener('click', function () {
                _this.prendiCarico(snapshot);
            });
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    ListPage.prototype.loadMap = function () {
        var _this = this;
        var latLng = new google.maps.LatLng(38.193095, 15.556339);
        var mapOptions = {
            center: latLng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'cooperative'
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.items.subscribe(function (snapshots) { snapshots.forEach(function (snapshot) { _this.addInfoWindow(snapshot.latitudine, snapshot.longitudine, snapshot.img_in, snapshot.data_in + ' - ' + snapshot.ora_in, snapshot); }); });
    };
    ListPage.prototype.mostraSubordinato = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__assegnate_assegnate__["a" /* AssegnatePage */], { tipo_utente: this.menuTendina });
    };
    ListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.personale.subscribe(function (snapshots) { snapshots.forEach(function (snapshot) { _this.ricercaSorveglianti(_this.email); }); });
        this.loadMap();
    };
    ListPage.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: this.items, sorveglianti: this.sottopostiRef });
    };
    ListPage.prototype.prendiCarico = function (item) {
        var _this = this;
        console.log('Presa in carico');
        //Aggiorna il record della segnalazione indicando il capo servizio che l'ha presa in carico, ed apre la pagina
        //con i dettagli della segnalazione per poterla assegnare ad un sorvegliante (ma va aggiornata manualmente, perché la chiamata al database è asincrona e non aggiorna in tempo reale)
        var newItemRef = this.itemsRef.update(item.id, { capo: this.email }).then(function (_) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: _this.items, sorveglianti: _this.sottopostiRef }); });
    };
    ListPage.prototype.lasciaSegnalazione = function (item) {
        var newItemRef = this.itemsRef.update(item.id, { capo: '', sorvegliante: '' });
    };
    ListPage.prototype.ricercaSorveglianti = function (riferimento) {
        this.sottopostiRef = this.afDatabase.list('/sorveglianti', function (ref) { return ref.orderByChild('referente').equalTo(riferimento); });
        this.sottoposti = this.sottopostiRef.valueChanges();
        //this.sottopostiRef.valueChanges().subscribe(snapshots =>{snapshots.forEach(snapshot => {this.ricercaOperatori(riferimento,snapshot.id)})})
    };
    //Gli operatori non avranno dispositivi, quindi non serve (tabella cancellata dal database, lasciato solo come riferimento)
    ListPage.prototype.ricercaOperatori = function (riferimentoCapi, riferimentoSorveglianti) {
        this.operatoriRef = this.afDatabase.list('/operatori', function (ref) { return ref.orderByChild('referente').equalTo(riferimentoSorveglianti); });
        this.operatoriRef.valueChanges().subscribe(function (snapshots) { snapshots.forEach(function (snapshot) { console.log(riferimentoCapi, riferimentoSorveglianti, snapshot.id); }); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ListPage.prototype, "mapElement", void 0);
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Mappa segnalazioni</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div style="width:100%; height:80%" #map="" id="map"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashLogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__privacy_privacy__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SplashLogPage = /** @class */ (function () {
    function SplashLogPage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
    }
    SplashLogPage.prototype.signIn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    SplashLogPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__privacy_privacy__["a" /* PrivacyPage */]);
    };
    SplashLogPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splashlog',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/splashlog/splashlog.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      MessinaServizi Bene Comune\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-img src="assets/imgs/logo.png" class="center" width="240" height="186"></ion-img>\n  <div padding>\n    <button ion-button color="primary" block (click)="signIn();">Accedi</button>\n  </div>\n  <div padding>\n    <button ion-button color="primary" block (click)="register();">Registrati</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/splashlog/splashlog.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SplashLogPage);
    return SplashLogPage;
}());

//# sourceMappingURL=splashlog.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(262);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_seg_chiuse_seg_chiuse__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_seg_annullate_seg_annullate__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_dettagli_dettagli__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chiudi_chiudi__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_assegnate_assegnate__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_registrazione_registrazione__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_splashlog_splashlog__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_privacy_privacy__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_profilo_profilo__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_camera__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2_database__ = __webpack_require__(23);
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
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_dettagli_dettagli__["a" /* DettagliPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_chiudi_chiudi__["a" /* ChiudiPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_assegnate_assegnate__["a" /* AssegnatePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_registrazione_registrazione__["a" /* RegistrazionePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_splashlog_splashlog__["a" /* SplashLogPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_profilo_profilo__["a" /* ProfiloPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_seg_chiuse_seg_chiuse__["a" /* SegChiusePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_seg_annullate_seg_annullate__["a" /* SegAnnullatePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/chiudi/chiudi.module#ChiudiPageModule', name: 'ChiudiPage', segment: 'chiudi', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dettagli/dettagli.module#DettagliPageModule', name: 'DettagliPage', segment: 'dettagli', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/privacy/privacy.module#PrivacyPageModule', name: 'PrivacyPage', segment: 'privacy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profilo/profilo.module#ProfiloPageModule', name: 'ProfiloPage', segment: 'profilo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registrazione/registrazione.module#RegistrazionePageModule', name: 'RegistrazionePage', segment: 'registrazione', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/assegnate/assegnate.module#AssegnatePageModule', name: 'AssegnatePage', segment: 'assegnate', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_20_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth),
                __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_22_angularfire2_database__["b" /* AngularFireDatabaseModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_dettagli_dettagli__["a" /* DettagliPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_chiudi_chiudi__["a" /* ChiudiPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_assegnate_assegnate__["a" /* AssegnatePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_registrazione_registrazione__["a" /* RegistrazionePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_splashlog_splashlog__["a" /* SplashLogPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_profilo_profilo__["a" /* ProfiloPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_seg_chiuse_seg_chiuse__["a" /* SegChiusePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_seg_annullate_seg_annullate__["a" /* SegAnnullatePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DettagliPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chiudi_chiudi__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(17);
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
 * Generated class for the DettagliPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//position: absolute; top: 85%; left:25px;right:20px;bottom:0;height: 80%
var DettagliPage = /** @class */ (function () {
    function DettagliPage(navCtrl, navParams, geolocation, afDatabase, fire) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.afDatabase = afDatabase;
        this.fire = fire;
        this.itemsRef = afDatabase.list('/segnalazioni');
        this.dati = navParams.get('dettaglio');
        this.items = navParams.get('items');
        //this.sorvegliantiRef = afDatabase.list('/capi_servizio');
        if (navParams.get('sorveglianti')) {
            this.sorvegliantiRef = navParams.get('sorveglianti');
            this.sorveglianti = this.sorvegliantiRef.valueChanges();
        }
        this.selectedLeave = this.dati.sorvegliante;
        //this.email = '3911234567@messinaservizibenecomune.it';
        this.email = fire.auth.currentUser.email;
    }
    DettagliPage.prototype.ionViewDidLoad = function () {
        console.log('Posizione: ', this.dati.latitudine, this.dati.longitudine);
        this.loadMap(this.dati.latitudine, this.dati.longitudine);
    };
    DettagliPage.prototype.chiudiSegnalazione = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__chiudi_chiudi__["a" /* ChiudiPage */], { dettaglio: item, items: this.items });
    };
    DettagliPage.prototype.lasciaSegnalazione = function (item) {
        var newItemRef = this.itemsRef.update(item.id, { capo: '', sorvegliante: '' });
        this.navCtrl.pop();
    };
    DettagliPage.prototype.selezionaSorvegliante = function (sorvegliante, item) {
        var newItemRef = this.itemsRef.update(item.id, { sorvegliante: sorvegliante.id });
        console.log("Segnalazione aggiunta al sorvegliante: ", sorvegliante.id, item.id);
    };
    DettagliPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.mappa, marker);
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
        this.mappa = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            map: this.mappa,
            animation: google.maps.Animation.DROP,
            position: this.mappa.getCenter()
        });
        var content = "<h4>Luogo segnalazione</h4>";
        this.addInfoWindow(marker, content);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mappa'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], DettagliPage.prototype, "mapElement", void 0);
    DettagliPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dettagli',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/dettagli/dettagli.html"*/'<!--\n  Generated template for the DettagliPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Dettagli segnalazione</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n  <button *ngIf="dati.stato == 2" ion-button full (click)="chiudiSegnalazione(dati)" icon-start>\n    <ion-icon name="camera"></ion-icon>Chiudi la segnalazione\n  </button>\n    </ion-item>\n    <ion-item>\n  <button *ngIf="dati.capo == email && dati.stato >= 2" ion-button full (click)="lasciaSegnalazione(dati)" icon-start>\n    <ion-icon name="exit"></ion-icon>Lascia la segnalazione\n  </button>\n    </ion-item>\n    <ion-item *ngIf="dati.capo == email && dati.stato >= 2">\n\n  <ion-label>Seleziona referente:</ion-label>\n  <ion-select [(ngModel)]="selectedLeave" interface="popover">\n    <ion-option *ngFor="let sorvegliante of sorveglianti | async" value="{{sorvegliante.id}}" (ionSelect)="selezionaSorvegliante(sorvegliante,dati)">{{ sorvegliante.cognome }} {{ sorvegliante.nome }}</ion-option>\n  </ion-select>\n    </ion-item>\n    </ion-list>\n\n  <ion-card>\n    <ion-card-header>\n      Stato segnalazione\n    </ion-card-header>\n    <ion-card-content>\n      <a *ngIf="dati.stato == 0" ion-text color="secondary">chiusa</a><a *ngIf="dati.stato == 1" ion-text color="annullata">annullata</a><a *ngIf="dati.stato == 2" ion-text color="danger">aperta</a>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header>\n      Data apertura\n    </ion-card-header>\n    <ion-card-content>\n      {{ dati.data_in }} - {{dati.ora_in}}\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      Data chiusura\n    </ion-card-header>\n    <ion-card-content>\n      {{ dati.data_out }} - {{dati.ora_out}}\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      Descrizione\n    </ion-card-header>\n    <ion-card-content>\n      {{ dati.descrizione }}\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      Foto prima dell\'intervento\n    </ion-card-header>\n    <ion-card-content>\n      <img [src]="dati.img_in" *ngIf="dati.img_in">\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      Foto dopo l\'intervento\n    </ion-card-header>\n    <ion-card-content>\n      <img [src]="dati.img_out" *ngIf="dati.img_out">\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      Note coordinatore\n    </ion-card-header>\n    <ion-card-content>\n      {{ note_chiusura }}\n    </ion-card-content>\n  </ion-card>\n  <ion-card class="transparent-card">\n    <ion-card-header>\n      Posizione\n    </ion-card-header>\n    <ion-card-content>\n      <div #mappa id="mappa" style="height:300px"></div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/dettagli/dettagli.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], DettagliPage);
    return DettagliPage;
}());

//# sourceMappingURL=dettagli.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_seg_chiuse_seg_chiuse__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_seg_annullate_seg_annullate__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_assegnate_assegnate__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_profilo_profilo__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_splashlog_splashlog__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(17);
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
    function MyApp(platform, statusBar, splashScreen, afDatabase, fire, events, menuCtrl) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afDatabase = afDatabase;
        this.fire = fire;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.initializeApp();
        //Assegnazione statica fatta solo per i test durante lo sviluppo
        //this.email = '3911234567@messinaservizibenecomune.it';
        var unsubscribe = fire.auth.onAuthStateChanged(function (user) {
            if (!user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_splashlog_splashlog__["a" /* SplashLogPage */];
                unsubscribe();
            }
            else {
                _this.email = fire.auth.currentUser.email;
                _this.capiRef = _this.afDatabase.list('/capi_servizio', function (ref) { return ref.orderByChild('id').equalTo(_this.email); });
                _this.sorvegliantiRef = _this.afDatabase.list('/sorveglianti', function (ref) { return ref.orderByChild('id').equalTo(_this.email); });
                _this.events.publish('user:logged', fire.auth.currentUser.email);
                _this.controllaTipoUtente();
                unsubscribe();
            }
        });
        events.subscribe('user:registrato', function (user, pass, nome, cognome, ruolo, referente) {
            console.log('Primo login');
            _this.firstSignIn(user, pass, nome, cognome, ruolo, referente);
        });
        events.subscribe('user:login', function (nome, cognome, ruolo, referente) {
            _this.email = fire.auth.currentUser.email;
            _this.capiRef = _this.afDatabase.list('/capi_servizio', function (ref) { return ref.orderByChild('id').equalTo(_this.email); });
            _this.sorvegliantiRef = _this.afDatabase.list('/sorveglianti', function (ref) { return ref.orderByChild('id').equalTo(_this.email); });
            if (nome) {
                if (ruolo == 0) {
                    var newItemRef = _this.capiRef.push({});
                    newItemRef.set({
                        id: _this.email,
                        nome: nome,
                        cognome: cognome,
                        ref: newItemRef.key
                    });
                }
                else {
                    var newItemRef = _this.sorvegliantiRef.push({});
                    newItemRef.set({
                        id: _this.email,
                        nome: nome,
                        cognome: cognome,
                        referente: referente + '@messinaservizibenecomune.it',
                        ref: newItemRef.key
                    });
                }
            }
            ;
            _this.controllaTipoUtente();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.controllaTipoUtente = function () {
        var _this = this;
        var capo;
        var sorvegliante;
        capo = 0;
        sorvegliante = 0;
        //Essendo le chiamate asincrone, sono a catena: appena finisce una, viene avviata l'altra, e solo dopo aver ottenuto i valori
        //dai database effettua il controllo
        this.capiRef.valueChanges().subscribe(function (snapshots) {
            capo = snapshots.length;
            _this.sorvegliantiRef.valueChanges().subscribe(function (snapshots) {
                sorvegliante = snapshots.length;
                if (capo > 0) {
                    console.log('È un capo servizio');
                    _this.pages = [
                        { title: 'Aperte', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
                        { title: 'Mappa', component: __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */] },
                        { title: 'Assegnate', component: __WEBPACK_IMPORTED_MODULE_8__pages_assegnate_assegnate__["a" /* AssegnatePage */] },
                        { title: 'Chiuse', component: __WEBPACK_IMPORTED_MODULE_5__pages_seg_chiuse_seg_chiuse__["a" /* SegChiusePage */] },
                        { title: 'Annullate', component: __WEBPACK_IMPORTED_MODULE_6__pages_seg_annullate_seg_annullate__["a" /* SegAnnullatePage */] }
                    ];
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
                }
                else if (sorvegliante > 0) {
                    console.log('È un sorvegliante');
                    _this.pages = [
                        { title: 'Assegnate', component: __WEBPACK_IMPORTED_MODULE_8__pages_assegnate_assegnate__["a" /* AssegnatePage */] },
                        { title: 'Profilo', component: __WEBPACK_IMPORTED_MODULE_9__pages_profilo_profilo__["a" /* ProfiloPage */] }
                    ];
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_assegnate_assegnate__["a" /* AssegnatePage */], { tipo_utente: 2 });
                }
                else {
                    console.log('È un utente');
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
                }
                ;
            });
        });
    };
    MyApp.prototype.firstSignIn = function (user, pass, nome, cognome, ruolo, referente) {
        var _this = this;
        this.fire.auth.signInWithEmailAndPassword(user, pass)
            .then(function (data) {
            //this.navCtrl.setRoot(HomePage);
            _this.events.publish('user:login', nome, cognome, ruolo, referente);
        }).catch(function (error) {
            console.log('Errore: ', error);
        });
    };
    MyApp.prototype.logout = function () {
        this.fire.auth.signOut();
        console.log("Logout");
        this.menuCtrl.toggle();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_splashlog_splashlog__["a" /* SplashLogPage */]);
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component, { sorveglianti: this.sorvegliantiRef });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <ion-list-header>\n        {{ email }}\n      </ion-list-header>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <button ion-item (click)="logout()">Logout</button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssegnatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dettagli_dettagli__ = __webpack_require__(33);
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
 * Generated class for the AssegnatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AssegnatePage = /** @class */ (function () {
    function AssegnatePage(navCtrl, navParams, fire, afDatabase, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.afDatabase = afDatabase;
        this.loadingCtrl = loadingCtrl;
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.email = fire.auth.currentUser.email;
        //this.email = "3911234567@messinaservizibenecomune.it";
        //this.tipo_utente = navParams.get('tipo_utente'); //voglio utilizzare la stessa pagina sia per i capi servizio che per i sorveglianti
        if (navParams.get('tipo_utente')) {
            this.tipo_utente = navParams.get('tipo_utente');
            if (this.tipo_utente == 0) {
                this.items = this.afDatabase.list('/segnalazioni', function (ref) { return ref.orderByChild('user').equalTo(_this.email); }).valueChanges();
            }
            else {
                this.items = this.afDatabase.list('/segnalazioni', function (ref) { return ref.orderByChild('sorvegliante').equalTo(_this.email); }).valueChanges();
            }
        }
        else {
            this.tipo_utente = 1;
            this.items = this.afDatabase.list('/segnalazioni', function (ref) { return ref.orderByChild('capo').equalTo(_this.email); }).valueChanges();
            this.personaleRef = afDatabase.list('/capi_servizio');
            this.personale = this.personaleRef.valueChanges();
        }
        this.loading.dismiss();
    }
    AssegnatePage.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dettagli_dettagli__["a" /* DettagliPage */], { dettaglio: item, items: this.items, sorveglianti: this.sottopostiRef });
    };
    AssegnatePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //console.log('ionViewDidLoad AssegnatePage');
        if (!this.navParams.get('tipo_utente')) {
            this.personale.subscribe(function (snapshots) {
                snapshots.forEach(function (snapshot) {
                    _this.ricercaSorveglianti(_this.email);
                });
            });
        }
    };
    AssegnatePage.prototype.ricercaSorveglianti = function (riferimento) {
        this.sottopostiRef = this.afDatabase.list('/sorveglianti', function (ref) { return ref.orderByChild('referente').equalTo(riferimento); });
        this.sottoposti = this.sottopostiRef.valueChanges();
    };
    AssegnatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-assegnate',template:/*ion-inline-start:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/assegnate/assegnate.html"*/'<!--\n  Generated template for the AssegnatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Assegnate</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item *ngFor="let item of items | async" (click)="itemSelected(item);">\n      <ion-thumbnail item-start>\n\n        <img [src]="item.img_in" *ngIf="item.img_in">\n      </ion-thumbnail>\n      <h2>{{ item.data_in }} - {{item.ora_in}}</h2>\n      <p>Stato: <a *ngIf="item.stato == 0" ion-text color="secondary">chiusa</a><a *ngIf="item.stato == 1" ion-text color="alert">annullata</a><a *ngIf="item.stato == 2" ion-text color="danger">aperta</a></p>\n      <button ion-button clear item-end>Vai</button>\n\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/chronocento/WebstormProjects/MSBC_Operatori/src/pages/assegnate/assegnate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], AssegnatePage);
    return AssegnatePage;
}());

//# sourceMappingURL=assegnate.js.map

/***/ })

},[242]);
//# sourceMappingURL=main.js.map