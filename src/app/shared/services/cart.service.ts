import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myHeaders:any = {token:localStorage.getItem('token')}
  constructor(private _HttpClient:HttpClient) { }
  addToCart(idProduct:string):Observable <any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      productId : idProduct
  },
  {
    headers: this.myHeaders
  }
  )
  }
  getUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:this.myHeaders
    })
  }
  removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: this.myHeaders
    })
  }
  updateCart(productId:string, count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {"count":count},
    {
      headers: this.myHeaders
    })
  }
  checkOut(cartId:string, userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://ahmedbahgatgad.github.io/ECommerce`,
    {
      shippingAddress: userData
    })
  }
}
