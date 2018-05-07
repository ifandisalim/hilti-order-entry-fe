import {Injectable} from "@angular/core";
import {Product} from "../models/product";
import {Store} from "@ngrx/store";
import {AppState} from "../states/app.state";
import {
  AddItemToCart, ClearCart, DecreaseItemQuantity, IncreaseItemQuantity,
  RemoveItemFromCart
} from "../states/order/order.actions";
import {OrderItem} from "../models/orderItem";

@Injectable()
export class OrderHelper {

  constructor(private store: Store<AppState>) {

  }

  addNewCartItem(product: Product, quantity: number) {
    this.store.dispatch(new AddItemToCart({
      product,
      quantity
    }));
  }

  increaseCartItemQuantity(orderItem: OrderItem) {
    this.store.dispatch(new IncreaseItemQuantity(orderItem));
  }


  decreaseCartItemQuantity(orderItem: OrderItem) {
    this.store.dispatch(new DecreaseItemQuantity(orderItem));
  }

  removeCartItem(orderItem: OrderItem) {
    this.store.dispatch(new RemoveItemFromCart(orderItem));
  }

  calculateTotalOrderPrice(orderItems: OrderItem[]): number {
    return orderItems.reduce((currentSum, item) => {
      currentSum += (item.product.price * item.quantity);
      return currentSum;
    }, 0)

  }

  resetCart() {
    this.store.dispatch(new ClearCart());
  }




}