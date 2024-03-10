import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/shared/interfaces/brands';
import { Brand } from 'src/app/shared/interfaces/product';
import { BrandsService } from 'src/app/shared/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService:BrandsService){}
  brands:Brands[] = [];
  specBrand:any='' ; 
  ngOnInit(): void {
      this._BrandsService.getAllBrands().subscribe({
        next:(respone)=>{
          this.brands = respone.data;
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }
  alertMsg(_id:string):void{
    this._BrandsService.getSpecificBrand(_id).subscribe({
      next:(response)=>{
        this.specBrand = response.data
      }
    })
  }
}
