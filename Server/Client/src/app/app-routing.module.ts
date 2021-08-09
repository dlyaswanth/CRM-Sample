import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DataService } from './managerdata';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './AuthGuard';
import { ManGuard } from './ManagerAuth';
import { CusGuard } from './CustomerAuth';
import { CustomerComponent } from './customer/customer.component';
import { ManagerComponent } from './manager/manager.component';
const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path:'admin',
    component:AdminComponent,
    resolve:{
      name:DataService,
    },
    canActivate:[authGuard],
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path:'manager',
    component: ManagerComponent,
    canActivate:[ManGuard],
  }
  ,
  {
    path:'customer',
    component: CustomerComponent,
    canActivate:[CusGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
