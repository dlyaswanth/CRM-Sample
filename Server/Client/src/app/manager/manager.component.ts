import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  Customers:any =[];
  review:any=[];
  Customer:any=[];
  Clog:any=[];
  reviews:any='';
  constructor(private router:Router,private httpClient:HttpClient,private toastr:ToastrService) { }
  ngOnInit(): void {
    const headers={'content-type':'application/json'};
    const userName=localStorage.getItem('CRM-Manager');
    const body={"email":userName};
    this.httpClient.post('getCustomers',body,{'headers':headers})
    .subscribe(result=>{
      this.Customers=result;
      this.Customer=result;
      //console.log(result)
    })
    this.httpClient.post('getReview',body,{'headers':headers})
     .subscribe(result=>{
      this.review=result;
      //console.log(result)
    })
    this.httpClient.post('getManReviews',body,{'headers':headers})
     .subscribe(result=>{
      this.reviews=result;
      //console.log(result)
    })
    this.httpClient.post('getlog',body,{'headers':headers})
     .subscribe(result=>{
      this.Clog=result;
      //console.log(result)
    })
  }
  send():void{
    const headers={'content-type':'application/json'};
    const message=(<HTMLInputElement>document.getElementById('message')).value;
    //console.log(message);
    if (message.length === 0)
    {
      this.toastr.error('Enter the message field !');
    }
    else
    {
      this.toastr.info('Please Wait !' );
      const userName=(<HTMLInputElement>document.getElementById('email')).value;
      const body={"email":userName,"message":message};
      this.httpClient.post('sendMessage',body,{'headers':headers})
      .subscribe(result=>{
        (<HTMLInputElement>document.getElementById('message')).value='';
       // this.toastr.info('Please Wait !');
        this.toastr.success('Message Sent !');
      })
    }
  }
  logout():void{
    localStorage.removeItem('CRM-Manager');
    this.router.navigateByUrl('/login').then();
  }
  createLog():void{
    this.toastr.info('Please Wait !' );
    const headers={'content-type':'application/json'};
    const userName=localStorage.getItem('CRM-Manager');
    const Name=(<HTMLInputElement>document.getElementById('customerName')).value;
    const Message=(<HTMLInputElement>document.getElementById('customerMessage')).value;
    const body={"name":Name,"email":userName,"message":Message};
    this.httpClient.post('createlog',body,{'headers':headers})
    .subscribe(result=>{
       this.toastr.success('Log Created !');
      (<HTMLInputElement>document.getElementById('message')).value='';
    })
  }
}
