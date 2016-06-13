import { Component, Directive } from '@angular/core';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from '@angular/common'
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from '@angular/router'



@Component({
    selector: 'AllVehiclesPage',
    templateUrl: 'app/allvehicles/allvehicles.html',
    providers: [HTTP_PROVIDERS],
})

export class AllVehiclesComponent {
    private data: Object[];
    isAuth: String;
    

    constructor(private http: Http) {

        var headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));

        http.get('http://localhost/it255-projekat/php/getvehiclestable.php', { headers: headers })
            .map(res => res.json()).share()
            .subscribe(data => {
			this.data = data.vehiclestable; 
			setInterval(function(){
			$('table').DataTable();
			},200);
		},
		err => {
			 this.router.parent.navigate(['./Home']);
		}
		);
    }



    ngOnInit() {
        if (localStorage.getItem('token') !== null) {
            this.isAuth = "yes";
        } else {
            this.isAuth = "no";
        }
    }

    private sortByWordLength = (a: any) => {
        return a.name.length;
    }

    public removeItem(item: Number) {
        console.log("Remove: ", item);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
        this.http.get('http://localhost/it255-projekat/php/deletevehicle.php?id=' + item, { headers: headers }).subscribe(data => this.postResponse = data);
        alert("Uspesno obrisano vozilo" + item);
        location.reload();
    }



}

