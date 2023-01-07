import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css']
})
export class RemarksComponent implements OnInit {

  currentUser: any;
  eachbal: any
  currentUsername: any
  appRegisteredMonth: any
  balance: any
  lastDate: any
  lastTransaction: any
  prevMonth: any


  constructor(private router: Router, private ds: DataserviceService) {
    this.currentUser = localStorage.getItem('currentUser')
    this.currentUsername = localStorage.getItem('currentUsername')
    this.appRegisteredMonth = localStorage.getItem('appRegisteredMonth')
    this.balance = localStorage.getItem('balance');
  }

  ngOnInit(): void {
    this.getTransaction();
    if (!localStorage.getItem('currentUsername')) {
      this.router.navigateByUrl('')
    }
  }

  logout() {
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
    this.router.navigateByUrl('')
  }

  getTransaction() {
    this.ds.getTransaction(this.currentUsername).subscribe((result: any) => {
      //to get full transaction get balance array details
      this.eachbal = result.balanceArray;
      //we have to navigate to last month from this page also, so we need last month details also here 
      this.lastTransaction = this.eachbal[this.eachbal.length - 1];
      this.lastDate = this.lastTransaction.date;
      let lastDateFormat = new Date(this.lastDate)
      let prev = new Date(lastDateFormat.getFullYear(), lastDateFormat.getMonth() - 1, 1);
      this.prevMonth = prev.getMonth();
    },
      (result) => {
        alert(result.error.message)
      })
  }

  lastMonth() {
    this.router.navigate(['/lastmonth', this.prevMonth, this.currentUsername])
  }

}
