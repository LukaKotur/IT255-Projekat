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
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
require('rxjs/Rx');
var search_pipe_1 = require('../pipe/search.pipe');
var HomePageComponent = (function () {
    function HomePageComponent(builder, http) {
        var _this = this;
        this.http = http;
        this.name = "";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
        http.get('http://localhost/it255-projekat/php/getvehicles.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (data) {
            _this.data = data.vehicles;
        }, function (err) {
            _this.router.navigate(['./']);
        });
        http.get('http://localhost/it255-projekat/php/getvozilo.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (dataS) {
            _this.dataS = dataS.serviser;
        }, function (err) {
            _this.router.navigate(['./']);
        });
        http.get('http://localhost/it255-projekat/php/getservis.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (dataServis) {
            _this.dataServis = dataServis.servis;
            setInterval(function () {
                $('table').DataTable();
            }, 200);
        }, function (err) {
            _this.router.parent.navigate(['./Home']);
        });
    }
    HomePageComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('token') !== null) {
            this.isAuth = "yes";
        }
        else {
            this.isAuth = "no";
        }
    };
    HomePageComponent.prototype.removeItem = function (item) {
        var _this = this;
        console.log("Remove: ", item);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
        this.http.get('http://localhost/it255-projekat/php/deleteservis.php?id=' + item, { headers: headers }).subscribe(function (data) { return _this.postResponse = data; });
        alert("Uspesno obrisan servis" + item);
        location.reload();
    };
    HomePageComponent = __decorate([
        core_1.Component({
            pipes: [search_pipe_1.FilterPipe],
            selector: 'Home',
            templateUrl: 'app/home/home.html',
            directives: [common_1.FORM_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS],
            viewBindings: [common_1.FORM_BINDINGS]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=home.component.js.map