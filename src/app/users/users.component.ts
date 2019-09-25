import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsersService, } from '../services/users.service';
import { MatDialog, MatDialogRef } from  '@angular/material';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any 
  constructor(private _service: UsersService, private _router: Router,private  dialog:  MatDialog) { }

  ngOnInit() {
    this.getUserPatient()
  }
   //method that allows to recover all users in the database
   getUserPatient() {
    this._service.getAllUsers()
      .subscribe(
        res => {
          this.users = res;
          console.log(this.users[0].firstName)
          console.log(this.users[0])
          if (res == "") {
            document.getElementById("error").innerHTML = "Vous n'avez aucun patient"
          }
        },
        err => console.log(err)
      )
  }
  //method to display form
  displayForm(){
    this.dialog.open(UserFormComponent,{ data: {
      message:  "Error!!!"
      }})
  }

}
