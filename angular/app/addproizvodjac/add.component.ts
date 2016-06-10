import { Component, Directive } from '@angular/core';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from '@angular/common'
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import 'rxjs/Rx';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  selector: 'add',
  templateUrl: 'app/addproizvodjac/add.html',
  directives: [FORM_DIRECTIVES],
  providers: [HTTP_PROVIDERS],
  viewBindings: [FORM_BINDINGS]
})

export class AddComponent {
  private data;
  private dataP;
  private dataM;
  private dataVM;
  private dataVoz;
  private dataS;
  private dataVozT;
  registerForm: ControlGroup;
  myModelForm: ControlGroup;
  myServiserForm: ControlGroup;
  myServisForm: ControlGroup;
  myVoziloForm: ControlGroup;
  mySlikaForm: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  select: number = 1;
  selectedItem = '';
  selectedItem2 = '';
  selectedItem3 = '';

  constructor(builder: FormBuilder, http: Http, router: Router) {
    console.clear();
    this.http = http;
    this.router = router;
    this.registerForm = builder.group({
      proizvodjacNaziv: ["", Validators.required]
    });
    this.mySlikaForm = builder.group({
      voziloId: ["", Validators.required],
      putanja: ["", Validators.required]
    })
    this.myModelForm = builder.group({
      proizvodjacId: ["", Validators.required],
      modelNaziv: ["", Validators.required],
      vrsta: ["", Validators.required]
    });
    this.myServiserForm = builder.group({
      imeServisa: ["", Validators.required],
      brojTelefona: ["", Validators.required]
    });
    this.myServisForm = builder.group({
      serviserId: ["", Validators.required],
      voziloId: ["", Validators.required],
      datum: ["", Validators.required],
      brojKilometara: ["", Validators.required],
      opis: ["", Validators.required],
      cena: ["", Validators.required],
    });
    this.myVoziloForm = builder.group({
      proizvodjacId: ["", Validators.required],
      modelId: ["", Validators.required],
      brojSasije: ["", Validators.required],
      registracija: ["", Validators.required],
      kubikaza: ["", Validators.required],
      kilometraza: ["", Validators.required],
      kategorija: ["", Validators.required],
      cena: ["", Validators.required]
    })

    var headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    http.get('http://localhost/it255-projekat/php/getvehicles.php', { headers: headers })
      .map(res => res.json()).share()
      .subscribe(data => {
        this.data = data.vehicles;
      },
      err => {
        this.router.navigate(['./app']);
      }
      );

    http.get('http://localhost/it255-projekat/php/getproizvodjaci.php', { headers: headers })
      .map(res => res.json()).share()
      .subscribe(dataP => {
        this.dataP = dataP.proizvodjaci;
      },
      err => {
        this.router.navigate(['./app']);
      }
      );

    http.get('http://localhost/it255-projekat/php/getmodel.php', { headers: headers })
      .map(res => res.json()).share()
      .subscribe(dataM => {
        this.dataM = dataM.modeli;
      },
      err => {
        this.router.navigate(['./Home']);
      }
      );

    http.get('http://localhost/it255-projekat/php/getvrstamodel.php', { headers: headers })
      .map(res => res.json()).share()
      .subscribe(dataVM => {
        this.dataVM = dataVM.vrstamodel;
      },
      err => {
        this.router.navigate(['./app']);
      }
      );



    http.get('http://localhost/it255-projekat/php/getserviser.php', { headers: headers })
      .map(res => res.json()).share()
      .subscribe(dataS => {
        this.dataS = dataS.serviser;
      },
      err => {
        this.router.navigate(['./app']);
      }
      );

    http.get('http://localhost/it255-projekat/php/getvehiclestable.php', { headers: headers })
      .map(res => res.json()).share()
      .subscribe(dataVozT => {
        this.dataVozT = dataVozT.vehiclestable;
      },
      err => {
        this.router.parent.navigate(['./']);
      }
      )

  }

  onChange(newValue) {
    console.log(newValue);
    this.selectedItem = newValue;
  }

  onChange2(newValue) {
    console.log(newValue);
    this.selectedItem2 = newValue;
  }

  onChange3(newValue) {
    console.log(newValue);
    this.selectedItem3 = newValue;
  }

  onAddProizvodjac(): void {
    var data = "proizvodjacNaziv=" + this.registerForm.value.proizvodjacNaziv;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/addproizvodjac.php', data, { headers: headers })
      .map(res => res)
      .subscribe(data => this.postResponse = data,
      err => console.error(err),
      () => {
        if (this.postResponse._body.indexOf("error") === -1) {
          alert("Uspesno dodavanje proizvodjaca");
          location.reload();
        } else {
          alert("Neuspesno dodavanje proizvodjaca");
        }
      }
      );
  }

  onAddModel(): void {
    var data = "proizvodjacId=" + this.myModelForm.value.proizvodjacId + "&modelNaziv=" + this.myModelForm.value.modelNaziv +"&vrsta="+ this.myModelForm.value.vrsta;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/addmodel.php', data, { headers: headers })
      .map(res => res)
      .subscribe(data => this.postResponse = data,
      err => console.error(err),
      () => {
        if (this.postResponse._body.indexOf("error") === -1) {
          alert("Uspesno dodavanje modela");
          location.reload();
        } else {
          alert("Neuspesno dodavanje modela");
        }
      }
      );
  }


  onAddServiser(): void {
    var data = "imeServisa=" + this.myServiserForm.value.imeServisa + "&brojTelefona=" + this.myServiserForm.value.brojTelefona;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/addserviser.php', data, { headers: headers })
      .map(res => res)
      .subscribe(data => this.postResponse = data,
      err => console.error(err),
      () => {
        if (this.postResponse._body.indexOf("error") === -1) {
          alert("Uspesno dodavanje servisera");
          location.reload();
        } else {
          alert("Neuspesno dodavanje servisera");
        }
      }
      );
  }

  onAddServis(): void {
    var data = "serviserId=" + this.myServisForm.value.serviserId + "&voziloId=" + this.myServisForm.value.voziloId + "&datum=" + this.myServisForm.value.datum + "&brojKilometara=" + this.myServisForm.value.brojKilometara + "&opis=" + this.myServisForm.value.opis + "&cena=" + this.myServisForm.value.cena;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/addservis.php', data, { headers: headers })
      .map(res => res)
      .subscribe(data => this.postResponse = data,
      err => console.error(err),
      () => {
        if (this.postResponse._body.indexOf("error") === -1) {
          alert("Uspesno dodavanje servisa");
          location.reload();
        } else {
          alert("Neuspesno dodavanje servisa");
        }
      }
      );
  }

  onAddVozilo(): void {
    var data = "proizvodjacId=" + this.myVoziloForm.value.proizvodjacId + "&modelId=" + this.myVoziloForm.value.modelId +"&brojSasije=" + this.myVoziloForm.value.brojSasije + "&registracija=" + this.myVoziloForm.value.registracija + "&kubikaza=" + this.myVoziloForm.value.kubikaza + "&kilometraza=" + this.myVoziloForm.value.kilometraza + "&kategorija=" + this.myVoziloForm.value.kategorija + "&cena=" + this.myVoziloForm.value.cena;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/addvozilo.php', data, { headers: headers })
      .map(res => res)
      .subscribe(data => this.postResponse = data,
      err => console.error(err),
      () => {
        if (this.postResponse._body.indexOf("error") === -1) {
          alert("Uspesno dodavanje vozila. Da bi se vozilo prikazalo na glavnoj stranici potrebno je i staviti putanju do slike u sledecem tabu.");
          location.reload();
        } else {
          alert("Neuspesno dodavanje vozila");
        }
      }
      );
  }

  onAddSlika(): void {
    var data = "voziloId="+ this.mySlikaForm.value.voziloId + "&putanja="+ this.mySlikaForm.value.putanja;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/addslika.php', data, { headers: headers })
      .map(res => res)
      .subscribe(data => this.postResponse = data,
      err => console.error(err),
      () => {
        if (this.postResponse._body.indexOf("error") === -1) {
          alert("Uspesno dodavanje slike");
          location.reload();
        } else {
          alert("Neuspesno dodavanje vozila");
        }
      }
      );
  }
}
