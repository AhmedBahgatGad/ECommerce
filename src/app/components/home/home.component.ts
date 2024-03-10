import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService, private _CartService:CartService, private _ToastrService:ToastrService){}
products:Product[] = [];
categories:any[] = [];
searchTerm:string = '';
categoriesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}
mainSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  items:1,
  nav: false
}
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
ngOnInit():void 
{
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
}
