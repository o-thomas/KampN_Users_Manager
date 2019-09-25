import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { Router } from '@angular/router'
import { UsersService, } from '../services/users.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  constructor(private _service: UsersService, private _modal:  MatDialogRef<RemoveUserComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit() {
  }
  public  close() {
    this._modal.close();
}
    deleteUser(){ 
        this._service.removeUser(this.data.currentId)
          .subscribe(
            res => { 
              this._modal.close();
            },
            err => console.log(err)
          )
    }
}
