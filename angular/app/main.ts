import { bootstrap }    from '@angular/platform-browser-dynamic';
import {ROUTER_DIRECTIVES, Routes, Router, ROUTER_PROVIDERS, RouteSegment} from '@angular/router';
import { bind } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, ROUTER_DIRECTIVES]);

