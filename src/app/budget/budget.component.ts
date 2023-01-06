import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  currentUser = '';
  balance: any;
  currentUsername: any;
  appRegisteredMonth: any;
  lastTransaction: any;
  lastDate: any;
  prevDate: any;
  prevMonth: any

  getToday() {
    return new Date().toISOString().split('T')[0];
  }

  getMin() {
    let date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split('T')[0];
  }





  constructor(private ds: DataserviceService, private router: Router, private fb: FormBuilder,) {
    this.balance = localStorage.getItem('balance');
    this.appRegisteredMonth = localStorage.getItem('appRegisteredMonth')

  }

  typeOfTransaction: any;
  category: any;
  amount: any;
  date: any;
  note: any;
  transaction: any;
  eachbal: any;
  currentMonthId: any
  emptyError = '';






  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') || '';
    this.currentUsername = localStorage.getItem('currentUsername') || '';
    this.getTransaction();
    if(!localStorage.getItem('currentUsername')){
      this.router.navigateByUrl('')
    }
  }

  logout() {
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
    this.router.navigateByUrl('')
  }

  //more

  more = false;

  onChange(e: any) {
    this.typeOfTransaction = e.target.value;
  }

  addTransaction() {
    let newDate = new Date(this.date);
    let month = newDate.getMonth() + 1;
    if (this.typeOfTransaction == null || this.category == null || this.amount == null || this.date == null) {
      this.emptyError = 'please fill all the required fields';
      alert(this.emptyError);
    } else {
      this.ds.addTransaction(this.currentUsername, this.typeOfTransaction, this.category, this.amount, this.date, this.note, month)
        .subscribe((result: any) => {
          this.eachbal = result.balanceArray;
          this.lastTransaction = this.eachbal[this.eachbal.length - 1];
          this.lastDate = this.lastTransaction.date;
          let lastDateFormat = new Date(this.lastDate)
          let prev = new Date(lastDateFormat.getFullYear(), lastDateFormat.getMonth() - 1, 1);
          localStorage.setItem('prevFirstDate', prev.toDateString());
          this.prevMonth = prev.getMonth();
        },
          (result) => {
            alert(result.error.message)
          })
    }
  }

  getTransaction() {
    this.ds.getTransaction(this.currentUsername).subscribe((result: any) => {
      let currentDate = new Date();
      let currentMonth = currentDate.getMonth();
      this.currentMonthId = currentMonth + 1;
      this.eachbal = result.transacttionPerMonth[this.currentMonthId];
      this.lastTransaction = this.eachbal[this.eachbal.length - 1];
      this.lastDate = this.lastTransaction.date;
      let lastDateFormat = new Date(this.lastDate)
      let prev = new Date(lastDateFormat.getFullYear(), lastDateFormat.getMonth() - 1, 1);
      this.prevMonth = prev.getMonth();
    },
      (result) => {
        this.router.navigateByUrl('')

      })
  }

  delete(table: any) {
    this.ds.deleteRow(this.currentUsername).subscribe((result: any) => {
      alert(result.message)

    }, result => {
      alert(result.message)
    }
    );
    let rows = table.rows.length;
    table.deleteRow(rows - 1);
    this.eachbal.pop();
  }

  edit() {

  }

  lastMonth() {
    this.router.navigate(['/lastmonth', this.prevMonth, this.currentUsername])
  }

}
