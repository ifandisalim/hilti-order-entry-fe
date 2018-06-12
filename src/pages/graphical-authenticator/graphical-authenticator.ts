import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import * as $ from 'jquery';
import {ContactPage} from "../contact/contact";
import {OrderHelper} from "../../helpers/orderHelper";
import {OrderProvider} from "../../providers/order/order";
import {Employee} from "../../models/employee";
import {OrderItem} from "../../models/orderItem";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {AppState} from "../../states/app.state";
import {Store} from "@ngrx/store";

/**
 * Generated class for the GraphicalAuthenticatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graphical-authenticator',
  templateUrl: 'graphical-authenticator.html',
})
export class GraphicalAuthenticatorPage {

  shoppingCartItems: OrderItem[] = [];
  loggedInEmployee: Employee = null;
  currentActiveCustomer: CustomerRepresentative = null;
  totalCartPrice: number = 0;

  constructor(public navCtrl: NavController,
              private store: Store<AppState>,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private orderHelper: OrderHelper,
              private orderService: OrderProvider) {


    this.store.select("loggedInEmployee").subscribe(employee => this.loggedInEmployee = employee);
    this.store.select("currentActiveCustomer").subscribe(currentCustomer => this.currentActiveCustomer = currentCustomer);

    this.store.select("shoppingCart").subscribe((orderItems) => {
      this.shoppingCartItems = orderItems;
      this.totalCartPrice = this.orderHelper.calculateTotalOrderPrice(this.shoppingCartItems);
    });
  }

  ionViewDidEnter() {

    // Init graphicals
    var input = [];
    var match = false;
    var matchCount = 0;
    var dotCounter = 0;
    var registeredPassword = ["3", "blue", "car", "5", "red", "bike"];

    var dots = document.getElementsByClassName('dot');
    dots = Array.prototype.slice.call(dots);

    var boundInitKeyPadFunc = this.initKeyPad;
    var boundSelf = this;

    $(".number").each(function (index, number) {
      $(this).on("click", function () {

        console.log(this);
        //Extract Attribute from Selected Coin

        var selectedColour = $(this).attr('data-colour');
        var selectedNumber = $(this).attr('data-num');
        var selectedIcon = $(this).attr('data-icon');

        //Place Selected Attributes as One Input
        console.log("clicked");
        console.log(this);

        input[dotCounter] = (selectedColour + selectedNumber + selectedIcon);

        console.log("Input " + dotCounter  + ": ");
        console.log(input[dotCounter]);

        dots[dotCounter].className += ' active';

        dotCounter++;
        boundInitKeyPadFunc(boundSelf);

        if (dotCounter > 6){dotCounter = 0;}

        if (dotCounter == 6) {
          for (var i = 0; i<6; i++){
            console.log("@@@Matching Start@@@");
            var inputPassword = input[i];
            console.log("@@INPUT: " + i + input[i]);
            var storedPassword = registeredPassword[i];
            console.log("@@PASSWORD: " + i + registeredPassword[i]);
            if (inputPassword.includes(storedPassword) > 0){
              matchCount++;
              console.log(matchCount);
              console.log("Match!");
            }
            else{
              matchCount--;
              console.log("No Match");
            }
          }
          //Wrong Passcode Match
          if (matchCount < 6) {
            Array.from(dots).forEach(function (dot, index) {
              dot.className += ' wrong';
              console.log("Match Failed!");

            });
            document.body.className += ' wrong';
            boundSelf.presentOrderPlacementStatusToast("Wrong passcode.");
            boundSelf.navCtrl.pop();
          }
          else if (matchCount == 6){
            Array.from(dots).forEach(function (dot, index) {
              dot.className += ' correct';
              console.log("Password Matched!");
            });

            boundSelf.orderService.placeOrder(boundSelf.currentActiveCustomer.id, boundSelf.loggedInEmployee.id, boundSelf.shoppingCartItems)
              .subscribe(orderId => {

                boundSelf.presentOrderPlacementStatusToast("Order has been placed.")
                  .then(() => {
                    boundSelf.orderHelper.resetCart();
                    boundSelf.navCtrl.setRoot(ContactPage);
                  });

              }, err => {
                boundSelf.navCtrl.pop();
                boundSelf.presentOrderPlacementStatusToast("Order placement failed. Try again later.");
              });
            document.body.className += ' correct';
          }
          setTimeout(function () {
            Array.from(dots).forEach(function (dot, index) {
              dot.className = 'dot';
            });
            input = [];
          }, 900);
          setTimeout(function () {
            document.body.className = '';
          }, 1000);

          matchCount = 0;
          dotCounter = 0;
        }
      });
    });




    this.initKeyPad(boundSelf);
  }

  presentOrderPlacementStatusToast(message: string): Promise<any> {
    return this.toastCtrl.create({
      message,
      position: 'bottom',
      duration: 2000
    }).present();
  }

  coinPasscodeGenerator(colourSet, numberSet, iconSet){
    var coinPasscodeObject = {};
    var randColour = Math.floor(Math.random() * colourSet.length);
    var randIcon = Math.floor(Math.random() * iconSet.length);
    var randNum = Math.floor(Math.random() * numberSet.length);

    coinPasscodeObject = {
      colour: colourSet[randColour],
      icon: iconSet[randIcon],
      num: numberSet[randNum]
    };

    console.log("Coin Generation Complete");
    return coinPasscodeObject;

  }

  initKeyPad(self){
    var coinPasscodeObject = {};

    var colourArray = ["white", "black", "yellow", "red", "brown", "green", "turquoise", "blue", "pink", "purple"];
    var numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    var iconArray = ["wine", "heart", "car", "flower", "plane", "umbrella", "human", "cake", "bike", "star"];
    //loop 10 time for each coin passcode
    for (var j = 0; j<10; j++){
      coinPasscodeObject[j] = self.coinPasscodeGenerator(colourArray, numberArray, iconArray);

      var currentObject = coinPasscodeObject[j];
      //Set current attribute index from array set
      var colourIndex = colourArray.indexOf(currentObject.colour);
      var numberIndex = numberArray.indexOf(currentObject.num);
      var iconIndex = iconArray.indexOf(currentObject.icon);

      console.log("current object");
      console.log(currentObject.colour);

      var selector = $('#coin'+j);

      console.log("selector");
      console.log(selector);
      selector.attr("data-colour", currentObject.colour);
      selector.attr("data-num", currentObject.num);
      selector.attr("data-icon", currentObject.icon);


      //Remove assigned attribute from array set
      if(colourIndex != -1){
        colourArray.splice(colourIndex, 1);
      }
      if(numberIndex != -1){
        numberArray.splice(numberIndex, 1);
      }

      if(iconIndex != -1){
        iconArray.splice(iconIndex, 1);
      }
    }
    console.log("InitKeyPad completed");
  }






  // shuffleKeys() {
  //   console.log("###shuffle###");
  //   $("#numbers > .number").sort(function(a, b) {
  //     return (Math.random() - 0.5);
  //   }).prependTo($("#numbers"));
  //   console.log("Shuffle Complete");
  // };


}
