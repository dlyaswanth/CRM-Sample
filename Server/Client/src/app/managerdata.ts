import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DataService implements Resolve<any> {
  constructor(private _http: HttpClient) {
  }
  resolve() {
    return this._http.get("getManagers");
  }
}
