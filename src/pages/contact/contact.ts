import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {CustomerPage} from "../customer/customer";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    constructor(public navCtrl: NavController) {

    }

    registerCustomer() {
        this.navCtrl.push(RegisterPage);
        console.log("here");
    }

    custProfile() {
        this.navCtrl.push(CustomerPage);
    }

}
