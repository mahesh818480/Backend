import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { CommonService } from './common.service';
import { AlertyfyService } from './alertyfy.service';
import { Store } from '@ngrx/store';
import { registerApiData } from '../store/house.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isloggedIn: boolean;
  userData = new Subject();
  forgetUser = new Subject();
  constructor(private route: Router, private http: HttpClient, private commanservice: CommonService,
    private alertyfy: AlertyfyService, private store: Store) {
    this.isloggedIn = false;
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }
  isUserLogOut() {
    this.isloggedIn = false;
  }
  addUsers(user: any) {
    let UserArray: any = [];
    // this.commanservice.registerData().subscribe((res: any) => {
    this.store.select(registerApiData).subscribe((res: any) => {
      console.log(res, '00..00')
      UserArray = res;
      const user123 = UserArray.find((p: any) =>
        p.Username === user.Login_Username && p.Password === user.Login_Password
      )
      console.log(user123, '32::::')
      this.isloggedIn = user123 ? true : false;
      this.userData.next(user123)
    })
  }
  ForgetgetData(user: any) {
    let UserArray: any = [];
    this.store.select(registerApiData).subscribe((res: any) => {
      UserArray = res;
      console.log(UserArray,'46:::')
      const user1234 = UserArray.find((p: any) =>{
        console.log( p.Email ,'50',p.Email === user.Login_Username,'51:::',user.Login_Username)
      return  p.Email === user.Login_Username
      }
      )
      this.forgetUser.next(user1234);
    })
  }
  // updateMango(data: any) {
  //   console.log(data,'47:::::')
  //   return this.http.post('http://localhost:3000//api/update', data)
  // }

}
