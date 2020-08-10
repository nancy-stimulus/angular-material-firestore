import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  error='';

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }
  onsignUp(){
    this.router.navigate(['/signUp']);
  }

  SignIn(email,password) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(
        (success) => {
          this.router.navigate(['/customer']);
        }).catch(
          (err) => {
            //this.snack.show();
            this.error = err;
          });
  }
}
