import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProxyService } from 'src/app/services/proxy.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  //conditions
  enableEdit: boolean = true;

  //Error handles
  hasError: boolean = false;
  saveSuccess: boolean = false;

  hasErrorMessage: string = '';
  hasSuccessMessage: string = '';

  // variables
  closeResult: string;

  customerInfo: any;

  constructor(private service: ProxyService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer(){
    this.service.getCustomer(localStorage.getItem('IDNumber')).subscribe(res => {
      console.log(res);
      this.customerInfo = res;
    })
  }

  editCustomer(){
    this.enableEdit = false;
  }

  cancelEdit(){
    this.enableEdit = true;
  }

  goHome(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  updateCustomer(){

    this.hasError = false;
    this.saveSuccess = false;
      this.service.updateCustomer(this.customerInfo).subscribe(res => {

        if (res == 'Updated customer successfully...') {
          this.getCustomer();
          this.saveSuccess = true;
          this.enableEdit = true;
          this.hasSuccessMessage = res.toString();
          this.modalService.dismissAll();
        } else {
          this.hasError = true;
          this.hasErrorMessage = res.toString();
        }
        console.log(res);
      })
  }

  deleteCustomer(){

    this.hasError = false;
    this.saveSuccess = false;
      this.service.removeCustomer(localStorage.getItem('IDNumber')).subscribe(res => {

        if (res == 'Removed customer successfully...') {
          localStorage.clear();
          this.modalService.dismissAll();
          this.router.navigate(['login']);
        } else {
          this.hasError = true;
          this.hasErrorMessage = res.toString();
        }
      })
  }

  open(content) {
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
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  closeAlert(){
    this.hasError = false;
    this.saveSuccess = false;
  }

}
