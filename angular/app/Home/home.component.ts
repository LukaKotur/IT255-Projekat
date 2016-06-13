import { Component, Directive } from '@angular/core';
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from '@angular/common'
import 'rxjs/Rx';
import { FilterPipe } from '../pipe/search.pipe';

@Component({
    pipes: [FilterPipe ],
    selector: 'Home',
    templateUrl: 'app/home/home.html',
    directives: [FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS],
    viewBindings: [FORM_BINDINGS]
})

export class HomePageComponent {
    name: String = "";
    private data;
    private dataS;
    private dataServis;
    isAuth: String;
    servisSearchForm: ControlGroup;


    constructor(builder: FormBuilder, private http: Http) {
        var headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));

        http.get('http://localhost/it255-projekat/php/getvehicles.php', { headers: headers })
            .map(res => res.json()).share()
            .subscribe(data => {
                this.data = data.vehicles;
            },
            err => {
                this.router.navigate(['./']);
            }
            );


        http.get('http://localhost/it255-projekat/php/getvozilo.php', { headers: headers })
            .map(res => res.json()).share()
            .subscribe(dataS => {
                this.dataS = dataS.serviser;
            },
            err => {
                this.router.navigate(['./']);
            }
            );

        http.get('http://localhost/it255-projekat/php/getservis.php', { headers: headers })
            .map(res => res.json()).share()
            .subscribe(dataServis => {
			this.dataServis = dataServis.servis; 
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


    public removeItem(item: Number) {
        console.log("Remove: ", item);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
        this.http.get('http://localhost/it255-projekat/php/deleteservis.php?id=' + item, { headers: headers }).subscribe(data => this.postResponse = data);
        alert("Uspesno obrisan servis" + item);
        location.reload();
    }


}

