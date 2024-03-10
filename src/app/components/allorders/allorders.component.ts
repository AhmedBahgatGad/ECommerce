import { jwtDecode } from 'jwt-decode';
import { Component, OnInit, inject } from '@angular/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  constructor(private _WishlistService:WishlistService ,){}
  userData:any;
  allOrders:any;
  saveUserData(){
    if(localStorage.getItem('token')!=null){
      let encodeToken:any = localStorage.getItem('token')
      let decodeToken = jwtDecode(encodeToken)
      this.userData = decodeToken
    }
  }
  ngOnInit(): void {
    this.saveUserData()
    this._WishlistService.getAllOrders(this.userData.id).subscribe({
      next:(response)=>{
        this.allOrders = response
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
