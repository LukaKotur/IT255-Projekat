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
var datatable_1 = require('angular2-datatable/datatable');
var search_pipe_1 = require('./pipe/search.pipe');
var AllVehiclesComponent = (function () {
    function AllVehiclesComponent(http) {
        var _this = this;
        this.http = http;
        this.proizvodjac_naziv = "";
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
        http.get('http://localhost/it255-projekat/php/getvehiclestable.php', { headers: headers })
            .map(function (res) { return res.json(); }).share()
            .subscribe(function (data) {
            _this.data = data.vehiclestable;
        }, function (err) {
            _this.router.parent.navigate(['./']);
        });
    }
    AllVehiclesComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('token') !== null) {
            this.isAuth = "yes";
        }
        else {
            this.isAuth = "no";
        }
    };
    AllVehiclesComponent.prototype.removeItem = function (item) {
        var _this = this;
        console.log("Remove: ", item);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
        this.http.get('http://localhost/it255-projekat/php/deletevehicle.php?id=' + item, { headers: headers }).subscribe(function (data) { return _this.postResponse = data; });
        alert("Uspesno obrisano vozilo" + item);
        location.reload();
    };
    AllVehiclesComponent = __decorate([
        core_1.Component({
            pipes: [search_pipe_1.SearchPipe],
            selector: 'AllVehiclesPage',
            templateUrl: 'app/allvehicles/allvehicles.html',
            providers: [http_1.HTTP_PROVIDERS],
            directives: [datatable_1.DataTableDirectives],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AllVehiclesComponent);
    return AllVehiclesComponent;
}());
exports.AllVehiclesComponent = AllVehiclesComponent;
//# sourceMappingURL=allvehicles.component.js.map