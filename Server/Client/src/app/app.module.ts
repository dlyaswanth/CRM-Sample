import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component'
import { authGuard } from './AuthGuard';
import { ManGuard } from './ManagerAuth';
import { CusGuard } from './CustomerAuth';
import { ManagerComponent } from './manager/manager.component';
import { CustomerComponent } from './customer/customer.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AdminComponent,
    ManagerComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:6000,
      positionClass:'toast-top-right'
    }),
    BrowserAnimationsModule,
  ],
  providers: [authGuard,ManGuard,CusGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
