import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProxyService } from 'src/app/services/proxy.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

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
  customerList: any[];
  customerId: number = 0;

  constructor(private service: ProxyService,
    private modalService: NgbModal,) { }

  ngOnInit() {
    this.getCustomers();
  }

  closeAlert(){
    this.hasError = false;
    this.saveSuccess = false;
  }

  getCustomers(){
      this.service.getAllCustomers().subscribe(res =>{
        this.customerList = res;
        console.log(this.customerList);
    })
  }

  createCustomer(){

    let cData = {
      IDNumber: this.idNumber,
      FirstName: this.firstName,
      LastName: this.lastName,
      MobileNumber: this.mobileNumber,
      EmailAddress: this.emailAddress
    }

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
      this.service.saveCustomer(cData).subscribe(res => {

        if (res == 'Saved customer successfully...') {
          this.idNumber = '';
          this.firstName = '';
          this.lastName = '';
          this.mobileNumber = '';
          this.emailAddress = '';
          this.saveSuccess = true;
          this.hasSuccessMessage = res.toString();
          this.getCustomers();
          this.modalService.dismissAll();
        } else {
          this.hasError = true;
          this.hasErrorMessage = res.toString();
        }
        console.log(res);
      })
    }
  }

  deleteCustomer(){

    this.hasError = false;
    this.saveSuccess = false;
      this.service.removeCustomer(this.idNumber).subscribe(res => {

        if (res == 'Removed customer successfully...') {
          this.idNumber = '';
          this.getCustomers();
          this.modalService.dismissAll();
        } else {
          this.hasError = true;
          this.hasErrorMessage = res.toString();
        }
      })
  }

  updateCustomer(){
    this.hasError = false;
    this.saveSuccess = false;

    let cData = {
      CustomerID: this.customerId,
      IDNumber: this.idNumber,
      FirstName: this.firstName,
      LastName: this.lastName,
      MobileNumber: this.mobileNumber,
      EmailAddress: this.emailAddress
    }
    console.log(cData);
      this.service.updateCustomer(cData).subscribe(res => {
        console.log(res);
        if (res == 'Updated customer successfully...') {
          this.idNumber = '';
          this.firstName = '';
          this.lastName = '';
          this.mobileNumber = '';
          this.emailAddress = '';
          this.getCustomers();
          this.saveSuccess = true;
          this.hasSuccessMessage = res.toString();
          this.modalService.dismissAll();
        } else {
          this.hasError = true;
          this.hasErrorMessage = res.toString();
        }
        console.log(res);
      })
  }

  open(content, data) {
    this.idNumber = data;
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

  openEdit(content, customer) {

    this.customerId = customer.CustomerID;
    this.idNumber = customer.IDNumber;
    this.firstName = customer.FirstName;
    this.lastName = customer.LastName;
    this.mobileNumber = customer.MobileNumber;
    this.emailAddress = customer.EmailAddress;
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
