import { Component, Inject, Pipe} from '@angular/core';
import { RouteSegment, Routes, Router, RouterUrlSerializer, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { HomePageComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllVehiclesComponent } from './allvehicles/allvehicles.component';
import { AddComponent } from './addproizvodjac/add.component';
 


@Component({
    selector: 'moja-aplikacija',
    templateUrl: 'app/router.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@Routes([
    { path: '/', name: 'Home', component: HomePageComponent, useAsDefault: true },
    { path: '/contact', name: 'Contact Page', component: ContactComponent },
    { path: '/login', name: 'Login Page', component: LoginComponent },
    { path: '/register', name: 'Register Page', component: RegisterComponent },
    { path: '/add', name: 'Add', component: AddComponent },
    { path: '/allvehicles', name: 'AllRoomsPage', component: AllVehiclesComponent }
])

export class AppComponent {
    router: Router;
    isAuth: String;
    isHome: String;
    showStyle: false;
    currentUrl: String;
    location: Location;
    routeSerializer: RouterUrlSerializer;
    constructor(private router: Router, private routeSerializer: RouterUrlSerializer) {
        this.router = router;
        this.currentUrl = '';
        this.routeSerializer = routeSerializer;
    }


    ngOnInit() {
        this.router.changes.subscribe(
            next => {
                this.currentUrl = JSON.stringify(this.router.urlTree);

                if (localStorage.getItem('token') !== null) {
                    this.isAuth = "yes";
                } else {
                    this.isAuth = "no";
                }
                if (location.pathname == '/') {
                    this.isHome = "yes";
                } else {
                    this.isHome = "no";
                }
            }
        )
    }

    isCurrentRoute(route: string): boolean {
        return this.currentUrl === route;
    }

    onLogout(): void {
        localStorage.removeItem("token");
        this.router.navigate(['./']);
        if (localStorage.getItem('token') !== null) {
            this.isAuth = "yes";
        } else {
            this.isAuth = "no";
        }
    }
}
