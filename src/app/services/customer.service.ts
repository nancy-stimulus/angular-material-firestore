import { Injectable } from '@angular/core';
import { AngularFirestore,  } from "@angular/fire/firestore";
import { Customer }from '../Models/customer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerCollection = this.afs.collection("Customer");
  users : DataInterface<Customer> = {};
  constructor(public afs: AngularFirestore) {  }

  getCustomers() {
    return this.customerCollection.snapshotChanges().pipe(tap(val => console.log(val)),map((value) =>{
      return value.map((element) =>{
        let ref = element.payload.doc.ref;
        let data = element.payload.doc.data() as Customer;
        return {data:{...data}, ref:ref} as DataInterface<Customer>;
      });
    }),
    );
  }
}

export interface DataInterface<T>  { data?: T; ref?: firestore.DocumentReference }
