import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore";
import { auth } from 'firebase/app';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData: any;
  displayName: string;
  email: string;
  mobile_no: string;

  constructor(private router: Router,
              public afAuth: AngularFireAuth,
              public afs:AngularFirestore) { }

  ngOnInit(): void {
  }
  onsignIn(){
    this.router.navigate(['/login']);
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`User/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email, 
    }
    console.log(userData,'userdata');
    return userRef.set(userData, {
      merge: true
    })
  }

  SignUp(email, password) {

    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      //console.log(this.SetUserData(result.user),123456);
      this.SetUserData(result.user);
      this.router.navigate(['/customer']);
    }).catch((error) => {
      window.alert(error.message);
    })
  }

  onReset(){
    this.displayName="";
    this.email="";
    this.mobile_no="";
  }
}
