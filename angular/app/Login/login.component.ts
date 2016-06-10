import { Component, Directive } from '@angular/core';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from '@angular/common'
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import 'rxjs/Rx';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  selector: 'LoginPage',
  templateUrl: 'app/login/login.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class LoginComponent {

  loginForm: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;

  constructor(builder: FormBuilder, http: Http, router: Router) {
    this.http = http;
    this.router = router;
    this.loginForm = builder.group({
      username: ["", Validators.none],
      password: ["", Validators.none],
    });

    if (localStorage.getItem('token') != null) {
      this.router.navigate(['./']);
    }

  }
  onLogin(): void {
    var data = "username=" + this.loginForm.value.username + "&password=" + this.loginForm.value.password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/loginservice.php', data, { headers: headers })
      .map(res => res)
      .subscribe(data => this.postResponse = data,
      err => {
        var obj = JSON.parse(err._body);
        document.getElementsByClassName("alert")[0].style.display = "block";
        document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
      },
      () => {
        var obj = JSON.parse(this.postResponse._body);
        localStorage.setItem('token', obj.token);
        this.router.navigate(['./']);
      }
      );
      
  }
}
