import { Component, OnInit } from '@angular/core';
import { CustomerService, DataInterface } from '../../services/customer.service';
import { Customer } from '../../Models/customer';
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from 'firebase';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  firstname: string;
  lastname:string;
  mobile_no: string;
  editMode = false;
  editing_customer: firestore.DocumentReference | undefined;
  

  customers: DataInterface<Customer>[];

  constructor(private customerService: CustomerService, private afs: AngularFirestore) {
    this.customerService.getCustomers().subscribe(customers => {
      console.log(customers);
      this.customers = customers;
      // this.firstname= this.users[0].data.firstname
      // this.lastname= this.users[0].data.lastname
      // this.mobile_no= this.users[0].data.mobile_no
      
    });
  }

  ngOnInit(): void {
  }

  onAdd(){
    if(this.editMode){
      this.onUpdate();
    }
    else{
      this.afs.collection('Customer').add({'firstname': this.firstname, 'lastname': this.lastname, 'mobile_no': this.mobile_no});
    }
    //this.editMode = false;
    this.onReset();
  }

  onSelect(i){
    this.firstname= this.customers[i].data.firstname
    this.lastname= this.customers[i].data.lastname
    this.mobile_no= this.customers[i].data.mobile_no

    if(this.editing_customer && this.customers[i].ref.id == this.editing_customer.id){
      this.editing_customer = undefined;
      this.editMode = false;
    } else {
      this.editing_customer = this.customers[i].ref;
      this.editMode = true;
    }
  }

  onUpdate(){
    const fname = this.firstname;
    const lname = this.lastname;
    const mob_no = this.mobile_no;
  
  
    const usr ={
      firstname : fname,
      lastname : lname,
      mobile_no : mob_no,
    
    };  
    this.afs.doc(this.editing_customer.path).update(usr).then(val => {
    });
  }

  onDelete(){
    this.afs.doc(this.editing_customer.path).delete().then(res => {
      console.log('delete');
      console.log(res);
    });
  }

  onReset(){
    this.firstname="";
    this.lastname="";
    this.mobile_no="";
    this.editing_customer = undefined;
    this.editMode = false;
    console.log('reset');
  }

}
