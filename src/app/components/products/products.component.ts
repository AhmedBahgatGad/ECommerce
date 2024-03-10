import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService, private _CartService:CartService, private _ToastrService:ToastrService, private _WishlistService:WishlistService){}
  products:Product[] = [];
  categories:any[] = [];
  searchTerm:string = '';
  wishListData:string[] = [];
  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message, `Fresh Cart`)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
      // get All Products
  this._EcomdataService.getAllProducts().subscribe({
    next:(response)=>{
      this.products = response.data;
    }
  })
  // Get Categories
  this._EcomdataService.getCategories().subscribe({
    next:(response)=>{
      this.categories =  response.data
    }
  })
  }
  addToWishList(id:string):void{
    this._WishlistService.addItem(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message, `Wish List`)
        this.wishListData = response.data
        
      }
    })
  }
  removeWish(id:string):void{
    this._WishlistService.removeItem(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message, `Wish List`)
        this.wishListData = response.data
        
      }
    })
  }
}
