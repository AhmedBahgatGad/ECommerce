import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService, private _CartService:CartService, private _ToastrService:ToastrService){}
  wishList:any;
  ngOnInit(): void {
      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
          this.wishList = response.data
        }
      })
    }
    removeWishList(id:string):void{
      this._WishlistService.removeItem(id).subscribe({
        next:()=>{
          this.ngOnInit()
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    addCart(id:string):void{
      this._CartService.addToCart(id).subscribe({
        next:(response)=>{
          this._ToastrService.success(response.message, `Fresh Cart`)
          this.removeWishList(id)
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
}
