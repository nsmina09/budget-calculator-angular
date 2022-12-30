import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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



  constructor(private ds: DataserviceService, private router: Router, private fb: FormBuilder) {
    this.balance = localStorage.getItem('balance');

  }

  typeOfTransaction: any;
  category: any;
  amount: any;
  date: any;
  note: any;
  transaction: any;
  eachbal: any;



  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') || '';
    this.currentUsername = localStorage.getItem('currentUsername') || '';
    this.getTransaction();

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('');
  }

  //more

  more = false;

  onChange(e: any) {
    this.typeOfTransaction = e.target.value;
  }

  addTransaction() {
    this.ds.addTransaction(this.currentUsername, this.typeOfTransaction, this.category, this.amount, this.date, this.note)
      .subscribe((result: any) => {
        console.log(result);
        this.eachbal = result.balanceArray
      },
        (result) => {
          alert(result.error.message)
        })
  }

  getTransaction() {
    this.ds.getTransaction(this.currentUsername).subscribe((result: any) => {
      this.eachbal = result.balanceArray;
      console.log(this.eachbal);
    },
      (result) => {
        alert(result.error.message)
      })
  }

  delete(table:any) {
    this.ds.deleteRow(this.currentUsername).subscribe((result: any) => {
      alert(result.message)

    }, result => {
      alert(result.message)
    }
    );
let rows=table.rows.length;
table.deleteRow(rows-1);
this.eachbal.pop();
  }

  edit() {

  }

}
