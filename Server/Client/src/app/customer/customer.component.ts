import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  Messages:any=[];
  reviews:any=[];
  user:any='';
  constructor(private router:Router,private toastr:ToastrService,private httpClient:HttpClient,private _router:ActivatedRoute) { }
  logout():void{
    localStorage.removeItem('CRM-Customer');
    this.router.navigateByUrl('/login').then();
  }
  postRev():void{
    this.toastr.info('Please Wait !' );
    const headers={'content-type':'application/json'};
    const review=(<HTMLInputElement>document.getElementById('message')).value;
    const name=(<HTMLInputElement>document.getElementById('name')).value;
    //console.log(review)
    const email=localStorage.getItem('CRM-Customer');
    const body={"name":name,"message":review,"email":email};
    this.httpClient.post('http://localhost:4201/postReview',body,{'headers':headers})
    .subscribe(res=>{
      (<HTMLInputElement>document.getElementById('name')).value="";
      (<HTMLInputElement>document.getElementById('message')).value='';
      this.toastr.success('Review Posted !' );
    })
  }
  post():void{
    this.toastr.info('Please Wait !' );
    const headers={'content-type':'application/json'};
    const email=localStorage.getItem('CRM-Customer');
    const review=(<HTMLInputElement>document.getElementById('value')).value;
    //console.log(review)
    const body={"email":email,"review":review};
    this.httpClient.post('http://localhost:4201/review',body,{'headers':headers})
    .subscribe(res=>{
      (<HTMLInputElement>document.getElementById('value')).value="1";
      this.toastr.success('Review Posted !' );
    })
  }
  ngOnInit(): void {
    const headers={'content-type':'application/json'};
    const email=localStorage.getItem('CRM-Customer');
    this.user=email;
    const body={"email":email};
    this.httpClient.post('http://localhost:4201/getMessages',body,{'headers':headers})
    .subscribe(res=>{
      this.Messages=res;
      //console.log(res);
    })
    this.httpClient.post('http://localhost:4201/getReviews',body,{'headers':headers})
    .subscribe(res=>{
      this.reviews=res;
      //console.log(res);
    })
  }
}
