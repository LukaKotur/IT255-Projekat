"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var router_1 = require('@angular/router');
var AddComponent = (function () {
    function AddComponent(builder, http, router) {
        var _this = this;
        this.select = 1;
        this.selectedItem = '';
        this.selectedItem2 = '';
        this.selectedItem3 = '';
        console.clear();
        this.http = http;
        this.router = router;
        this.registerForm = builder.group({
            proizvodjacNaziv: ["", common_1.Validators.required]
        });
        this.mySlikaForm = builder.group({
            voziloId: ["", common_1.Validators.required],
            putanja: ["", common_1.Validators.required]
        });
        this.myModelForm = builder.group({
            proizvodjacId: ["", common_1.Validators.required],
            modelNaziv: ["", common_1.Validators.required],
            vrsta: ["", common_1.Validators.required]
        });
        this.myServiserForm = builder.group({
            imeServisa: ["", common_1.Validators.required],
            brojTelefona: ["", common_1.Validators.required]
        });
        this.myServisForm = builder.group({
            serviserId: ["", common_1.Validators.required],
            voziloId: ["", common_1.Validators.required],
            datum: ["", common_1.Validators.required],
            brojKilometara: ["", common_1.Validators.required],
            opis: ["", common_1.Validators.required],
            cena: ["", common_1.Validators.required],
        });
        this.myVoziloForm = builder.group({
            proizvodjacId: ["", common_1.Validators.required],
            modelId: ["", common_1.Validators.required],
            brojSasije: ["", common_1.Validators.required],
            registracija: ["", common_1.Validators.required],
            kubikaza: ["", common_1.Validators.required],
            kilometraza: ["", common_1.Validators.required],
            kategorija: ["", common_1.Validators.required],
            cena: ["", common_1.Validators.required]
        });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
        http.get('http://localhost/it255-projekat/php/getvehicles.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (data) {
            _this.data = data.vehicles;
        }, function (err) {
            _this.router.navigate(['./app']);
        });
        http.get('http://localhost/it255-projekat/php/getproizvodjaci.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (dataP) {
            _this.dataP = dataP.proizvodjaci;
        }, function (err) {
            _this.router.navigate(['./app']);
        });
        http.get('http://localhost/it255-projekat/php/getmodel.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (dataM) {
            _this.dataM = dataM.modeli;
        }, function (err) {
            _this.router.navigate(['./Home']);
        });
        http.get('http://localhost/it255-projekat/php/getvrstamodel.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (dataVM) {
            _this.dataVM = dataVM.vrstamodel;
        }, function (err) {
            _this.router.navigate(['./app']);
        });
        http.get('http://localhost/it255-projekat/php/getserviser.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (dataS) {
            _this.dataS = dataS.serviser;
        }, function (err) {
            _this.router.navigate(['./app']);
        });
        http.get('http://localhost/it255-projekat/php/getvehiclestable.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (dataVozT) {
            _this.dataVozT = dataVozT.vehiclestable;
        }, function (err) {
            _this.router.parent.navigate(['./']);
        });
    }
    AddComponent.prototype.onChange = function (newValue) {
        console.log(newValue);
        this.selectedItem = newValue;
    };
    AddComponent.prototype.onChange2 = function (newValue) {
        console.log(newValue);
        this.selectedItem2 = newValue;
    };
    AddComponent.prototype.onChange3 = function (newValue) {
        console.log(newValue);
        this.selectedItem3 = newValue;
    };
    AddComponent.prototype.onAddProizvodjac = function () {
        var _this = this;
        var data = "proizvodjacNaziv=" + this.registerForm.value.proizvodjacNaziv;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/it255-projekat/php/addproizvodjac.php', data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return console.error(err); }, function () {
            if (_this.postResponse._body.indexOf("error") === -1) {
                alert("Uspesno dodavanje proizvodjaca");
                location.reload();
            }
            else {
                alert("Neuspesno dodavanje proizvodjaca");
            }
        });
    };
    AddComponent.prototype.onAddModel = function () {
        var _this = this;
        var data = "proizvodjacId=" + this.myModelForm.value.proizvodjacId + "&modelNaziv=" + this.myModelForm.value.modelNaziv + "&vrsta=" + this.myModelForm.value.vrsta;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/it255-projekat/php/addmodel.php', data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return console.error(err); }, function () {
            if (_this.postResponse._body.indexOf("error") === -1) {
                alert("Uspesno dodavanje modela");
                location.reload();
            }
            else {
                alert("Neuspesno dodavanje modela");
            }
        });
    };
    AddComponent.prototype.onAddServiser = function () {
        var _this = this;
        var data = "imeServisa=" + this.myServiserForm.value.imeServisa + "&brojTelefona=" + this.myServiserForm.value.brojTelefona;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/it255-projekat/php/addserviser.php', data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return console.error(err); }, function () {
            if (_this.postResponse._body.indexOf("error") === -1) {
                alert("Uspesno dodavanje servisera");
                location.reload();
            }
            else {
                alert("Neuspesno dodavanje servisera");
            }
        });
    };
    AddComponent.prototype.onAddServis = function () {
        var _this = this;
        var data = "serviserId=" + this.myServisForm.value.serviserId + "&voziloId=" + this.myServisForm.value.voziloId + "&datum=" + this.myServisForm.value.datum + "&brojKilometara=" + this.myServisForm.value.brojKilometara + "&opis=" + this.myServisForm.value.opis + "&cena=" + this.myServisForm.value.cena;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/it255-projekat/php/addservis.php', data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return console.error(err); }, function () {
            if (_this.postResponse._body.indexOf("error") === -1) {
                alert("Uspesno dodavanje servisa");
                location.reload();
            }
            else {
                alert("Neuspesno dodavanje servisa");
            }
        });
    };
    AddComponent.prototype.onAddVozilo = function () {
        var _this = this;
        var data = "proizvodjacId=" + this.myVoziloForm.value.proizvodjacId + "&modelId=" + this.myVoziloForm.value.modelId + "&brojSasije=" + this.myVoziloForm.value.brojSasije + "&registracija=" + this.myVoziloForm.value.registracija + "&kubikaza=" + this.myVoziloForm.value.kubikaza + "&kilometraza=" + this.myVoziloForm.value.kilometraza + "&kategorija=" + this.myVoziloForm.value.kategorija + "&cena=" + this.myVoziloForm.value.cena;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/it255-projekat/php/addvozilo.php', data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return console.error(err); }, function () {
            if (_this.postResponse._body.indexOf("error") === -1) {
                alert("Uspesno dodavanje vozila. Da bi se vozilo prikazalo na glavnoj stranici potrebno je i staviti putanju do slike u sledecem tabu.");
                location.reload();
            }
            else {
                alert("Neuspesno dodavanje vozila");
            }
        });
    };
    AddComponent.prototype.onAddSlika = function () {
        var _this = this;
        var data = "voziloId=" + this.mySlikaForm.value.voziloId + "&putanja=" + this.mySlikaForm.value.putanja;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/it255-projekat/php/addslika.php', data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return console.error(err); }, function () {
            if (_this.postResponse._body.indexOf("error") === -1) {
                alert("Uspesno dodavanje slike");
                location.reload();
            }
            else {
                alert("Neuspesno dodavanje vozila");
            }
        });
    };
    AddComponent = __decorate([
        core_1.Component({
            selector: 'add',
            templateUrl: 'app/addproizvodjac/add.html',
            directives: [common_1.FORM_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS],
            viewBindings: [common_1.FORM_BINDINGS]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, router_1.Router])
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map