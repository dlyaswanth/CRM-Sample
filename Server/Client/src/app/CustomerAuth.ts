import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
@Injectable()
export class CusGuard implements CanActivate 
{
    constructor(private router:Router){}
    canActivate():boolean {
        if (localStorage.getItem('CRM-Customer'))
        return true;
        else
        {
            this.router.navigateByUrl('login').then();
            return false;
        }
    }
}