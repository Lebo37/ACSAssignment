import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProxyService } from 'src/app/services/proxy.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data: any;

  //Error handles
  hasError: boolean = false;
  saveSuccess: boolean = false;

  hasErrorMessage: string = '';
  hasSuccessMessage: string = '';

  // variables

  registerForm : FormGroup;
  closeResult: string;

  constructor(private service: ProxyService,
    private _router: Router) {
      this.registerForm = new FormGroup({
        idNumber: new FormControl('', Validators.compose([
          Validators.required
        ])),
        firstName: new FormControl('', Validators.compose([
          Validators.required
        ])),
        lastName: new FormControl('', Validators.compose([
          Validators.required
        ])),
        mobileNumber: new FormControl('', Validators.compose([
          Validators.required
        ])),
        emailAddress: new FormControl('', Validators.compose([
          Validators.required
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required
        ])),
        confirmPassword: new FormControl('', Validators.compose([
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

  register(){
    this.closeAlert();
    let pData = {
      IDNumber: this.registerForm.value.idNumber,
      FirstName: this.registerForm.value.firstName,
      LastName: this.registerForm.value.lastName,
      MobileNumber: this.registerForm.value.mobileNumber,
      EmailAddress: this.registerForm.value.emailAddress,
      UserName: this.registerForm.value.emailAddress,
      Password: this.registerForm.value.password
    }
      this.service.register(pData).subscribe(res =>{
        if (res == "User already exist...") {
          this.hasError = true;
          this.hasErrorMessage = 'User already exists with the Username and ID Number provided...';

        }
          else {
            this.saveSuccess = true;
          this.hasSuccessMessage = 'User added successfully, Please go back to login and use email address and password to login...';
        }
    })

  }

}
