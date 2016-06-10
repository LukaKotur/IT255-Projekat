# IT255-Projektni-zadatak
## Rent a Car Agencija

## Tehnologije
- Frontend [Angular2][angular2]
- Backend [PHP]

## Uvod
Ova Aplikacija predstavlja najosnovniju aplikaciju koju neka rent a car agencija moze da ima. U njoj su uradjene stvari kao sto su dodavanje vozila, proizvodjaca, modela, servisera i servisa kao i njihovo brisanje iz baze podataka.

## Preduslov
### Node.js
Potrebno je instalirati [Node.js][node-download]

### Baza
Potrebno je importovati projekat.sql fajl u bazu


### Pokretanje projekta

```
- Otvorite Command Prompt
- Udjete u direktorijum gde se nalazi projekat, zbog php-a bi trebalo da se stavi u folder it255-projekat da bi sve funkcionisalo kako treba
- Pokrenete npm install
- Pokrenete npm start
- Default browser ce se otvoriti i pokrenuti automatski aplikaciju

```


## Kratak prolazak kroz aplikaciju

### home.component.ts
Typescript koji je vezan za home stranicu, u njemu se nalazi par get metoda koje ubacuju vrednosti za dalji rad na stranici i ovo predstavlja home stranicu koju korisnik poseti kad dodje na sajt.
```
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
                this.router.navigate(['./app']);
            }
            );

        http.get('http://localhost/it255-projekat/php/getservis.php', { headers: headers })
            .map(res => res.json()).share()
            .subscribe(dataServis => {
                this.dataServis = dataServis.servis;
            },
            err => {
                this.router.navigate(['./app']);
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

```
### Forme za logovanje/registrovanje
Forma za registrovanje.
```
<form class="col-lg-6 col-lg-offset-3" role="form" [ngFormModel]="registerForm">
    <div class="alert alert-danger" style="display: none;">

    </div>
    <div class="form-group">
      <label for="firstName">First name:</label>
      <input type="text" class="form-control" ngControl='firstName'>
    </div>
    <div class="form-group">
      <label for="lastName">Last name:</label>
      <input type="text" class="form-control" ngControl='lastName'>
    </div>
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" class="form-control" ngControl='username'>
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" ngControl='password'>
    </div>
    <button (click)="onRegister()" class="btn btn-dark col-lg-12">Register</button>
</form>
```

Forma za logovanje:
```
<form class="col-lg-6 col-lg-offset-3" role="form" [ngFormModel]="loginForm">
    <div class="alert alert-danger" style="display: none;">

    </div>
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" class="form-control" ngControl='username'>
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" ngControl='password'>
    </div>
    <button (click)="onLogin()" class="btn btn-dark col-lg-12 col-xs-12">Login</button>
</form>
```
### Registracija/Logovanje preko php-a
Registracija službeničkog naloga.
```
     onRegister(): void {
    var data = "username=" + this.registerForm.value.username + "&password=" + this.registerForm.value.password + "&firstName=" + this.registerForm.value.firstName + "&lastName=" + this.registerForm.value.lastName;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost/it255-projekat/php/registerservice.php', data, { headers: headers })
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
        alert("Uspesno ste napravili nalog")
        this.router.navigate(['./']);
      }
      );

```

Logovanje na službenički nalog:
```
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
```

Dodavanje proizvodjaca
```
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
```

Dodavanje modela:
```
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
```

Dodavanje servisera:
```
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
```
Dodavanje servisa::
```
   
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
  ```
Dodavanje vozila: 

```
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
```
  
## Kontakt
luka.kotur.2399@metropolitan.ac.rs
dejan.zivlak.2526@metropolitan.ac.rs


[node-download]: https://nodejs.org/en/download/
[Angular2]: https://angular.io/
