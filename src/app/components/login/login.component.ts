import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}
// Form Builder
  loginForm: FormGroup = this._FormBuilder.group({
    email:['',[Validators.required , Validators.email]],
    password:['',[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })



  // loginForm:FormGroup = new FormGroup({
  //   email: new FormControl('',[Validators.required , Validators.email]),
  //   password: new FormControl('',[Validators.required, Validators.pattern(/^\w{6,}$/)]),
  // });



  msgError:string = '';
  isLoading:boolean = false;
  handleForm():void{
    if(this.loginForm.valid){
      this.isLoading  = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          if(response.message == 'success'){
            localStorage.setItem('token',response.token)
            this._AuthService.saveUserData();
            this._Router.navigate(['/home'])
            this.isLoading = false;
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.msgError = err.error.message
          this.isLoading = false;
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}
