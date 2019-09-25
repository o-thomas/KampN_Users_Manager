import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup
  constructor(private  dialogRef:  MatDialogRef<UserFormComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(
        "",
        [Validators.required]
      ),
      lastName: new FormControl(
        '',
        [Validators.required]
      ),
      email: new FormControl(
        '',
        [Validators.required]
      ),
    })
  }
  public  close() {
    this.dialogRef.close();
}
}
