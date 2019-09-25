import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _routes = "https://trainee-api.pleiads.fr/"

  constructor(private _http: HttpClient,) { }
  getAllUsers() {
    return (this._http.get<any>(this._routes + "users"));
  }

  removeUser(id) {
    return (this._http.delete<any>(this._routes + "users/" + id));
  }
  addUser(user){
    console.log(user)
    return (this._http.post<any>(this._routes + "users",user));
  }
  getOneUser(id){
    return (this._http.get<any>(this._routes + "users/" + id));
  }
  modifyUser(id,user){
    return (this._http.put<any>(this._routes + "users/" + id,user));
  }
}
