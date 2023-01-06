import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //declare all the variables
  fullname: any;
  designation: any;
  monthlyIncome: any;
  currentBalance: any;
  amountToSave: any;
  username: any;
  password: any;
  appRegisteredMonth:any;

  //constructor
  constructor(private router: Router, private ds: DataserviceService, private fb: FormBuilder) { 
    this.appRegisteredMonth=new Date()
  }

  ngOnInit(): void {
  }

  //register validator 
  registerForm = this.fb.group({
    fullname: ['', [Validators.pattern('[a-zA-z ]*'), Validators.required]],
    designation: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
    monthlyIncome: ['', [Validators.pattern('[0-9]*'), Validators.required]],
    currentBalance: ['', [Validators.pattern('[0-9]*'), Validators.required]],
    amountToSave: ['', [Validators.pattern('[0-9]*'), Validators.required]],
    username: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
    password: ['', [Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required]],
  });

  //register function
  register() {
    console.log(this.registerForm);
    let fullname = this.registerForm.value.fullname;
    let designation = this.registerForm.value.designation;
    let monthlyIncome = this.registerForm.value.monthlyIncome;
    let currentBalance = this.registerForm.value.currentBalance;
    let amountToSave = this.registerForm.value.amountToSave;
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;
    if (this.registerForm.valid) {
      this.ds.register(fullname, designation, monthlyIncome, currentBalance, amountToSave, username, password,this.appRegisteredMonth)
        .subscribe((result: any) => {
          alert(result.message);
          this.router.navigateByUrl('login');
        },
          (result) => {
            alert(result.error.message);
          })
    }
  }

}
