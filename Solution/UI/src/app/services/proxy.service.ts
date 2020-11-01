import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { resolve } from "url";

@Injectable({
  providedIn: "root",
})
export class ProxyService {
  constructor(private _http: HttpClient) {}

  _url: string = "http://localhost:61656/api/";

  // Customer API calls : Start

  getAllCustomers(): Observable<any[]> {
    return this._http.get<any>(this._url + "Customer/GetAll");
  }

  getCustomer(id): Observable<any> {
    return this._http.get(this._url + "Customer/GetCustomerById?id=" + id);
  }

  saveCustomer(obj){
    return this._http.post(this._url + "Customer/SaveCustomer", obj);
  }

  updateCustomer(obj){
    return this._http.put(this._url + "Customer/UpdateCustomer", obj);
  }

  removeCustomer(id){
    return this._http.delete(this._url + "Customer/DeleteCustomer?id=" + id);
  }
  // Customer API calls : End

  // User API calls : Start

  login(user) {
    return this._http.post(this._url + "User/Login", user);
  }

  register(user) {
    return this._http.post(this._url + "User/Register", user);
  }

  // saveCustomer(obj){
  //   return this._http.post(this._url + "Customer/SaveCustomer", obj);
  // }

  // updateCustomer(obj){
  //   return this._http.put(this._url + "Customer/UpdateCustomer", obj);
  // }

  // removeCustomer(id){
  //   return this._http.delete(this._url + "Customer/DeleteCustomer?id=" + id);
  // }
  // Customer API calls : End
}
