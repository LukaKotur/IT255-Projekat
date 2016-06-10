import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'Contact',
    templateUrl: 'contact.html'
})
export class ContactComponent implements OnInit {
    name: String = "";

    constructor() { }

    ngOnInit() { }

}