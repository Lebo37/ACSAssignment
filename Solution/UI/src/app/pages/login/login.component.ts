import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProxyService } from 'src/app/services/proxy.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any;

  //Error handles
  hasError: boolean = false;
  saveSuccess: boolean = false;

  hasErrorMessage: string = '';
  hasSuccessMessage: string = '';

  // variables

  loginForm : FormGroup;
  closeResult: string;

  constructor(private service: ProxyService,
    private _router: Router) {

      this.loginForm = new FormGroup({
        username: new FormControl('', Validators.compose([
          Validators.required
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });

     }

  ngOnInit() {
  }

  closeAlert(){
    this.hasError = false;
    this.saveSuccess = false;
  }

  login(){
    let pData = {
      UserName: this.loginForm.value.username,
      Password: this.loginForm.value.password
    }
      this.service.login(pData).subscribe(res =>{
        if (res == "User does not exist...") {
          this.hasError = true;
          this.hasErrorMessage = 'Supplied username does not exist, please Sign up.';

        }
         else
          if(res == "Password incorrect"){
            this.hasError = true;
            this.hasErrorMessage = 'The password provided is incorrect.';
          }
          else {
            this._router.navigate(['/customers']);
        }
    })

  }

}
