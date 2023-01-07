import { Component, OnInit } from '@angular/core';
import { FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  //to set current user info
  currentUser = '';
  balance: any;
  currentUsername: any;
  appRegisteredMonth: any;
 
  
  

  //to set max dates in modal calander
  getToday() {
    return new Date().toISOString().split('T')[0];
  }

  //to set min dates in modal calander
  getMin() {
    let date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split('T')[0];
  }


  constructor(private ds: DataserviceService, private router: Router, private fb: FormBuilder,) {
    this.balance = localStorage.getItem('balance');
    this.appRegisteredMonth = localStorage.getItem('appRegisteredMonth')
  }

  //transaction details
  typeOfTransaction: any;
  category: any;
  amount: any;
  date: any;
  note: any;
  emptyError = '';

//show transaction details in ui
  eachbal: any;

//get previous date info
  currentMonthId: any
  prevDate: any;
  prevMonth: any;
  lastTransaction: any;



  // last array of eachbalance details
  lastType: any;
  lastCategory: any;
  lastAmount: any
  lastDateNote: any
  lastDate: any;






  ngOnInit(): void {

    this.currentUser = localStorage.getItem('currentUser') || '';
    this.currentUsername = localStorage.getItem('currentUsername') || '';
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
          //for showing transactions in ui
          this.eachbal = result.balanceArray;
          //get last transaction details
          this.lastTransaction = this.eachbal[this.eachbal.length - 1];
          this.lastDate = this.lastTransaction.date;
          let lastDateFormat = new Date(this.lastDate)
          let prev = new Date(lastDateFormat.getFullYear(), lastDateFormat.getMonth() - 1, 1);//get 1st date format of previuos month
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
      // to display only current month details
      let currentDate = new Date();
      let currentMonth = currentDate.getMonth();
      this.currentMonthId = currentMonth + 1;
      this.eachbal = result.transacttionPerMonth[this.currentMonthId];
      // to get last month name
      this.lastTransaction = this.eachbal[this.eachbal.length - 1];
      this.lastDate = this.lastTransaction.date;
      let lastDateFormat = new Date(this.lastDate)
      let prev = new Date(lastDateFormat.getFullYear(), lastDateFormat.getMonth() - 1, 1);
      this.prevMonth = prev.getMonth();
      //to edit last trnsaction we have to access last transaction details
      this.lastType = this.lastTransaction.type;
      this.lastCategory = this.lastTransaction.category;
      this.lastAmount = this.lastTransaction.amount;
      this.lastDateNote = this.lastTransaction.note;
    },
      (result) => {
        this.router.navigateByUrl('');
      })
  }

  delete(table: any) {
    this.ds.deleteRow(this.currentUsername).subscribe((result: any) => {
      alert(result.message);
    }, result => {
      alert(result.message)
    }
    );
    //to delete last table row from ui
    let rows = table.rows.length;
    table.deleteRow(rows - 1);
    this.eachbal.pop();
  }

  // edit(table:any){
  //   this.ds.deleteRow(this.currentUsername).subscribe((result: any) => { 
  //     this.eachbal=result.balanceArray
  //      }, result => {  }
  //   );
  //   //to delete last table row from ui
  //   // let rows = table.rows.length;
  //   // table.deleteRow(rows - 1);
  //   // this.eachbal.pop();
  // }

//   onEdit(){
//     let date=new Date();
//     let month=date.getMonth()+1;
//     if (this.lastType == null || this.lastCategory == null || this.lastAmount == null || this.lastDate == null) {
//       this.emptyError = 'please fill all the required fields';
//       alert(this.emptyError);
//     } else {
//       this.ds.addTransaction(this.currentUsername, this.lastType, this.lastCategory, this.lastAmount, this.lastDate, this.lastDateNote, month)
//       .subscribe((result: any) => {
//         //for showing transactions in ui
//         this.eachbal = result.balanceArray;
//         //get last transaction details
//         this.lastTransaction = this.eachbal[this.eachbal.length - 1];
//         this.lastDate = this.lastTransaction.date;
//         let lastDateFormat = new Date(this.lastDate)
//         let prev = new Date(lastDateFormat.getFullYear(), lastDateFormat.getMonth() - 1, 1);//get 1st date format of previuos month
//         localStorage.setItem('prevFirstDate', prev.toDateString());
//         this.prevMonth = prev.getMonth(); 
//       },
//         (result) => {
//           alert(result.error.message)
//         })
//     }

// }

onEdit(){
  let date=new Date();
  let month=date.getMonth()+1;
  this.ds.updateLastTransaction(this.currentUsername, this.lastType, this.lastCategory, this.lastAmount, this.lastDate, this.lastDateNote, month).
  subscribe((result:any)=>{
    console.log('balance array');
    console.log(result.balanceArray);
    console.log('transaction array');
    console.log(result.transactionsArray); 
    this.eachbal=result.balanceArray;   
  },(result:any)=>{
    console.log(result.error.message);
    
  })
}

  onEditChange(e: any) {
    this.lastType = e.target.value
  }


  lastMonth() {
    this.router.navigate(['/lastmonth', this.prevMonth, this.currentUsername])
  }



}
