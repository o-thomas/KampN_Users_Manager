import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsersService, } from '../services/users.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any
  constructor(private _service: UsersService, private _router: Router, private dialog: MatDialog, ) { }

  ngOnInit() {
    this.getUsers()
  }
  //method that allows to recover all users in the database
  getUsers() {
    this._service.getAllUsers()
      .subscribe(
        res => {
          this.users = res;

        },
        err => console.log(err)
      )
  }
  //method to display form in modal window
  displayForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(UserFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }
  //method to display remove component in modal window
  displayModal(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      currentId: id,
    };
    const dialogRef = this.dialog.open(RemoveUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }
  //method for display form with option for modify the current user 
  modifyUser(id) {
    console.log(id)
    this._service.getOneUser(id)
      .subscribe(
        res => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
            user: res,
          };
          const dialogRef = this.dialog.open(UserFormComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(result => {
            this.getUsers()
          });
          err => console.log(err)
        })
  }
}



