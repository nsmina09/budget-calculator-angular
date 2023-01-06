import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private ds: DataserviceService, private fb: FormBuilder) { }

  username: any;
  password: any;
  currentUser: any;
  data = '';

  ngOnInit(): void { }

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
  });

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    if (this.loginForm.valid) {
       this.ds.login(username, password)
       .subscribe((result:any)=>{
        alert(result.message);
        localStorage.setItem('currentUser',result.currentUser);
        localStorage.setItem('currentUsername',result.currentUsername);
        localStorage.setItem('token',result.token);
        localStorage.setItem('balance',result.balance);
        localStorage.setItem('appRegisteredMonth',result.appRegisteredMonth)
        this.router.navigateByUrl('/budget')
       },
       (result)=>{
        alert(result.error.message);
       })
    } 
  }
}
