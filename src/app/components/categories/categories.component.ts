import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService:CategoriesService){}
  categories:Categories[] = []
  subCategory:Categories[]=[]
  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({
        next:(response)=>{
          this.categories = response.data
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
  getSubCategory(id:string):void{
    this._CategoriesService.getSubCategory(id).subscribe({
      next:(response)=>{
        this.subCategory = response.data
      }
    })
  }
}
