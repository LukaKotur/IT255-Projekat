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
var LoginComponent = (function () {
    function LoginComponent(builder, http, router) {
        this.http = http;
        this.router = router;
        this.loginForm = builder.group({
            username: ["", common_1.Validators.none],
            password: ["", common_1.Validators.none],
        });
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['./']);
        }
    }
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        var data = "username=" + this.loginForm.value.username + "&password=" + this.loginForm.value.password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost/it255-projekat/php/loginservice.php', data, { headers: headers })
            .map(function (res) { return res; })
            .subscribe(function (data) { return _this.postResponse = data; }, function (err) {
            var obj = JSON.parse(err._body);
            document.getElementsByClassName("alert")[0].style.display = "block";
            document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
        }, function () {
            var obj = JSON.parse(_this.postResponse._body);
            localStorage.setItem('token', obj.token);
            _this.router.navigate(['./']);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'LoginPage',
            templateUrl: 'app/login/login.html',
            directives: [common_1.FORM_DIRECTIVES],
            viewBindings: [common_1.FORM_BINDINGS]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map