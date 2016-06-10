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
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var contact_component_1 = require('./contact/contact.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var allvehicles_component_1 = require('./allvehicles/allvehicles.component');
var add_component_1 = require('./addproizvodjac/add.component');
var AppComponent = (function () {
    function AppComponent(router, routeSerializer) {
        this.router = router;
        this.routeSerializer = routeSerializer;
        this.showStyle = false;
        this.router = router;
        this.currentUrl = '';
        this.routeSerializer = routeSerializer;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.changes.subscribe(function (next) {
            _this.currentUrl = JSON.stringify(_this.router.urlTree);
            if (localStorage.getItem('token') !== null) {
                _this.isAuth = "yes";
            }
            else {
                _this.isAuth = "no";
            }
            if (location.pathname == '/') {
                _this.isHome = "yes";
            }
            else {
                _this.isHome = "no";
            }
        });
    };
    AppComponent.prototype.isCurrentRoute = function (route) {
        return this.currentUrl === route;
    };
    AppComponent.prototype.onLogout = function () {
        localStorage.removeItem("token");
        this.router.navigate(['./']);
        if (localStorage.getItem('token') !== null) {
            this.isAuth = "yes";
        }
        else {
            this.isAuth = "no";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'moja-aplikacija',
            templateUrl: 'app/router.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [router_1.ROUTER_PROVIDERS]
        }),
        router_1.Routes([
            { path: '/', name: 'Home', component: home_component_1.HomePageComponent, useAsDefault: true },
            { path: '/contact', name: 'Contact Page', component: contact_component_1.ContactComponent },
            { path: '/login', name: 'Login Page', component: login_component_1.LoginComponent },
            { path: '/register', name: 'Register Page', component: register_component_1.RegisterComponent },
            { path: '/add', name: 'Add', component: add_component_1.AddComponent },
            { path: '/allvehicles', name: 'AllRoomsPage', component: allvehicles_component_1.AllVehiclesComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouterUrlSerializer])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map