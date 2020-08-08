import { Injectable } from '@angular/core';
import { AngularFirestore,  } from "@angular/fire/firestore";
import { User }from '../Models/user';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable()
export class UserService {

  userCollection = this.afs.collection("Users");
  users : DataInterface<User> = {};
  constructor(public afs: AngularFirestore) { 

  }

  getUers() {
    return this.userCollection.snapshotChanges().pipe(tap(val => console.log(val)),map((value) =>{
      return value.map((element) =>{
        let ref = element.payload.doc.ref;
        let data = element.payload.doc.data() as User;
        return {data:{...data}, ref:ref} as DataInterface<User>;
      });
    }),
    );
  }
}

export interface DataInterface<T>  { data?: T; ref?: firestore.DocumentReference }