import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';

@Component({
  selector: 'app-lastmonth',
  templateUrl: './lastmonth.component.html',
  styleUrls: ['./lastmonth.component.css']
})
export class LastmonthComponent implements OnInit {

  public month:any;
  lastMonthArray:any;
  monthId:any;
  username:any;
  currentUser:any

  public monthNames=[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
   'Augest',
   'September',
    'October',
    'November',
   'December',
  ]
  constructor(private route:ActivatedRoute,private ds:DataserviceService,private router:Router) {
  
   }

  ngOnInit(): void {
    this.lastMonth();
    this.getLastMonthTransaction();
    this.currentUser=localStorage.getItem('currentUser')
    if(!localStorage.getItem('currentUsername')){
      alert('please login to continue')
      this.router.navigateByUrl('')
    }
  }

lastMonth(){
this.route.paramMap.subscribe((params:ParamMap)=>{
 this. monthId=parseInt(params.get('month')||'');
 this.username=params.get('username')
  this.month=this.monthNames[this.monthId]
  console.log(this.month);
  let date=localStorage.getItem('prevFirstDate');
})
}

getLastMonthTransaction(){
  let id=this.monthId+1
this.ds.getLastMonthTransaction(this.username).subscribe((result:any)=>{
  console.log(result.transacttionPerMonth[id]);
  this.lastMonthArray=result.transacttionPerMonth[id];
},result=>{
  console.log(result.error.message);
})
}

logout(){
  localStorage.removeItem('currentUsername');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token')
  this.router.navigateByUrl('')  
}

}
