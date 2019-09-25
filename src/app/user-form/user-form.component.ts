import { Component, OnInit, Inject, Injectable, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { UsersService, } from '../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup

  constructor(private _service: UsersService, private _modal: MatDialogRef<UserFormComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  user = {
    firstName: "",
    lastName: "",
    email: ""
  }
  ngOnInit() {
    if (this.data != null) {
      this.user.firstName = this.data.user.firstName
      this.user.lastName = this.data.user.lastName
      this.user.email = this.data.user.email
    }
    this.form = new FormGroup({
      firstName: new FormControl(
        this.user.firstName,
        [Validators.required]
      ),
      lastName: new FormControl(
        this.user.lastName,
        [Validators.required]
      ),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
 ]))
    })
  }
  //method for close modal window
  public close() {
    this._modal.close();
  }
  //method for add user
  addUser() {
    if (this.form.status == "VALID") {
      this._service.addUser(this.form.value)
        .subscribe(
          res => {
            this._modal.close();
          },
          err => console.log(err)
        )
    } else {
      window.scrollTo(0, 0)
      document.getElementById("error").innerHTML = "Please check all the fields on the form"
    }
  }
  // method for modify user
  modifyUser(id) {
    if (this.form.status == "VALID") {
      this._service.modifyUser(this.data.user.id, this.form.value)
        .subscribe(
          res => {
            this._modal.close();
          },
          err => console.log(err)
        )
    } else {
      window.scrollTo(0, 0)
      document.getElementById("error").innerHTML = "Please check all the fields on the form"
    }
  }
}


