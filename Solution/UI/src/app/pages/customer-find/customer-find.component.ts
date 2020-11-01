import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProxyService } from 'src/app/services/proxy.service';

@Component({
  selector: 'app-customer-find',
  templateUrl: './customer-find.component.html',
  styleUrls: ['./customer-find.component.scss']
})
export class CustomerFindComponent implements OnInit {

  data: any;

  //Error handles
  hasError: boolean = false;
  saveSuccess: boolean = false;

  hasErrorMessage: string = '';
  hasSuccessMessage: string = '';

  // variables
  idNumber: string = '';
  closeResult: string;

  firstName: string = '';
  lastName: string = '';
  mobileNumber: string = '';
  emailAddress: string = '';

  constructor(private service: ProxyService,
    private modalService: NgbModal,
    private _router: Router) { }

  ngOnInit() {
  }

  closeAlert(){
    this.hasError = false;
    this.saveSuccess = false;
  }

  getCustomer(){
    this.hasError = false;
    this.saveSuccess = false;
    if (this.idNumber.length > 13) {
      this.idNumber = '';
      this.hasError = true;
      this.hasErrorMessage = 'The ID Number entered has more than 13 numbers...';
      return;
    }
    else
    if (this.idNumber.length < 13) {
      this.idNumber = '';
      this.hasError = true;
      this.hasErrorMessage = 'The ID Number entered has less than 13 numbers...';
      return;
    }
    else {
      this.service.getCustomer(this.idNumber).subscribe(res =>{
        if (res == null) {
          this.hasError = true;
          this.hasErrorMessage = 'The customer with the specified ID Number does not exist...';
          this.idNumber = '';
        } else {
            localStorage.setItem('IDNumber', this.idNumber);
            this._router.navigate(['customer-info']);
            this.idNumber = '';
        }
    })
    }

  }

  open(content) {
    this.hasError = false;
    this.saveSuccess = false;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.idNumber = '';
      this.firstName = '';
      this.lastName = '';
      this.mobileNumber = '';
      this.emailAddress = '';
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.idNumber = '';
      this.firstName = '';
      this.lastName = '';
      this.mobileNumber = '';
      this.emailAddress = '';
      return "by clicking on a backdrop";
    } else {
      this.idNumber = '';
      this.firstName = '';
      this.lastName = '';
      this.mobileNumber = '';
      this.emailAddress = '';
      return `with: ${reason}`;
    }
  }

}
