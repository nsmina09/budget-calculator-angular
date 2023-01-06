import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers: new HttpHeaders(),
  
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) {

  }

  currentUser = '';
  balance: any;

  getToken() {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders();
    if (token) {
      options.headers = headers.append('token', token)
    } else {
      alert('please login to continue')
    }
    return options;
  }

  login(username: any, password: any) {
    let data = {
      username,
      password
    }
    return this.http.post('http://localhost:3000/login', data);
  }

  register(fullname: any, designation: any, monthlyIncome: any, currentBalance: any, amountToSave: any, username: any, password: any,appRegisteredMonth:any) {
    let data = {
      fullname,
      designation,
      monthlyIncome,
      currentBalance,
      amountToSave,
      username,
      password,
      appRegisteredMonth
    }
    console.log(data);

    return this.http.post('http://localhost:3000/register', data)
  }

  addTransaction(username: any, type: any, category: any, amount: any, date: any, note: any,month:any) {
    let data = {
      username,
      type,
      category,
      amount,
      date,
      note,
      month
    }
    return this.http.post('http://localhost:3000/budget', data, this.getToken(),);
  }

  getTransaction(username: any) {
    let data = {
      username
    }
    return this.http.post('http://localhost:3000/gettransaction', data, this.getToken(),);
  }

  deleteRow(username: any) {
    let data = {
      username
    }
    return this.http.post('http://localhost:3000/delete-row',data,this.getToken(),);
  }

  getLastMonthTransaction(username:any){
    const data = {
      username
      };
      const httpOptions = {
        params: data,
       }
    return this.http.get('http://localhost:3000/last-transaction',httpOptions,);
  }
}
