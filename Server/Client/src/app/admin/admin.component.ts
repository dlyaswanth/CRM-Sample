import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  managers:any[]=[];
  constructor(private router:Router,private toastr:ToastrService,private httpClient:HttpClient,private _router:ActivatedRoute) { }
  ngOnInit(): void {
    this._router.data.subscribe(response => {
      this.managers = response.name;
      //console.log(this.managers)
    })
  }
  signHandler():void{
    //console.log(this.managers);
    let name=(<HTMLInputElement>document.getElementById('name')).value;
    let userName=(<HTMLInputElement>document.getElementById('email')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    let type=(<HTMLInputElement>document.getElementById('userType')).value;
    let manager=(<HTMLInputElement>document.getElementById('manager')).value;
    if (userName.length ===0 || password.length ===0 && (type === 'customer' && manager.length === 0 ))
    {
      this.toastr.error('Enter all fields');
    }
    else
    {
      this.toastr.info('Please Wait !');
      console.log(userName,password,type)
      const headers={'content-type':'application/json'};
      let body;
      if (type === 'manager')
      body={"email":userName,"password":password,"type":type,"name":name};
      else
      body={"email":userName,"password":password,"type":type,"name":name,"manager":manager};
      const signurl='http://localhost:4201/signup'
      this.httpClient.post(signurl,body,{'headers':headers})
      .subscribe(res=>{
        this.toastr.success(`${type} Account Saved!`);
        window.location.reload();
      },
        err=>{
          this.toastr.error('Invalid Email or Password !');
        }
      )
    }
  }
  logout():void{
    localStorage.removeItem('CRM-Admin');
    this.router.navigateByUrl('/login').then();
  }
}
