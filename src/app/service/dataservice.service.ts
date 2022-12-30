import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const options = {
  headers: new HttpHeaders()
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
    console.log(token);

    let headers = new HttpHeaders();
    if (token) {
      options.headers = headers.append('token', token)
    } else {
      alert('login first')
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

  register(fullname: any, designation: any, monthlyIncome: any, currentBalance: any, amountToSave: any, username: any, password: any) {
    let data = {
      fullname,
      designation,
      monthlyIncome,
      currentBalance,
      amountToSave,
      username,
      password,
    }
    console.log(data);

    return this.http.post('http://localhost:3000/register', data)
  }

  addTransaction(username: any, type: any, category: any, amount: any, date: any, note: any) {
    let data = {
      username,
      type,
      category,
      amount,
      date,
      note
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
    return this.http.post('http://localhost:3000/delete-row',data,);
  }
}
