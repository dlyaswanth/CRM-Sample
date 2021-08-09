import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
@Injectable()
export class ManGuard implements CanActivate 
{
    constructor(private router:Router){}
    canActivate():boolean {
        if (localStorage.getItem('CRM-Manager'))
        return true;
        else
        {
            this.router.navigateByUrl('login').then();
            return false;
        }
    }
}