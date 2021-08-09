import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  signHandler():void{
    let userName=(<HTMLInputElement>document.getElementById('email')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    let type=(<HTMLInputElement>document.getElementById('userType')).value;
    if (userName.length ===0 || password.length ===0 )
    {
      this.toastr.error('Enter all fields');
    }
    else
    {
      //console.log(userName,password,type)
      this.toastr.info('Please Wait !' );
      const headers={'content-type':'application/json'};
      const body={"email":userName,"password":password,"type":type};
      const signurl='login'
      this.httpClient.post(signurl,body,{'headers':headers})
      .subscribe(res=>{
        //this.toastr.info('Please Wait !');
        this.toastr.success('Logged In Successfully !');
        if (type === 'Admin')
        {
          localStorage.setItem('CRM-Admin',userName);
          this.router.navigateByUrl('/admin');
        }
        else if (type === 'Manager')
        {
          localStorage.setItem('CRM-Manager',userName);
          this.router.navigateByUrl('/manager');
        }
        else if (type === 'Customer')
        {
          localStorage.setItem('CRM-Customer',userName);
          this.router.navigateByUrl('/customer');
        }
      },
        err=>{
          this.toastr.error('Invalid Email or Password !');
        }
      )
    }
  }
}
