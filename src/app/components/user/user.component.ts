import { Component, OnInit } from '@angular/core';
import { UserService, DataInterface } from '../../services/user.service';
import { User } from '../../Models/user';
import { FormGroup, NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { FormsModule } from '@angular/forms';
import { firestore } from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  firstname: string;
  lastname:string;
  mobile_no: string
  editMode = false;
  editing_user: firestore.DocumentReference | undefined;
  

  users: DataInterface<User>[];

  constructor(private userService: UserService, private afs: AngularFirestore) {
    this.userService.getUers().subscribe(users => {
      console.log(users);
      this.users = users;
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
      this.afs.collection('Users').add({'firstname': this.firstname, 'lastname': this.lastname, 'mobile_no': this.mobile_no });
    }
    //this.editMode = false;
    this.onReset();
  }

  onSelect(i){
    this.firstname= this.users[i].data.firstname
    this.lastname= this.users[i].data.lastname
    this.mobile_no= this.users[i].data.mobile_no
    if(this.editing_user && this.users[i].ref.id == this.editing_user.id){
      this.editing_user = undefined;
      this.editMode = false;
    } else {
      this.editing_user = this.users[i].ref;
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
      mobile_no : mob_no
    };  
    this.afs.doc(this.editing_user.path).update(usr).then(val => {
    });
  }

  onDelete(){
    this.afs.doc(this.editing_user.path).delete().then(res => {
      console.log('delete');
      console.log(res);
    });
  }

  onReset(){
    this.firstname="";
    this.lastname="";
    this.mobile_no="";
    this.editing_user = undefined;
    this.editMode = false;
    console.log('reset');
  }
}
