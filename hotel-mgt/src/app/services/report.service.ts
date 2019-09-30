import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  public barReports = [];
  public restaurantReports = [];

  constructor(
    private fireDB: AngularFirestore
  ) { }

  getAllReports(){
    return this.fireDB.collection("reports").get();
  }

  queryReport( reportType: string){
    console.log(reportType);
    return this.fireDB.firestore.collection("reports").where("reports", "array-contains",  {}).get();
  }

  getReports(){
    return this.fireDB.firestore.collection("reports").get();
    
  }
  
  saveToReport(report){
    return this.fireDB.collection("reports").add(report);
  }

  up(guestReport){
    return this.fireDB.collection("reports")
  }

  updateGuestReport(report){
    return this.fireDB.collection("guests").doc(report.id).update(report);
  }
  filterGuest(prop: string, value: string){
    return this.fireDB.firestore.collection("reports").where(prop, "==", value).get();
  }

  setReport(report, id){
    var ref = this.fireDB.collection("reports").doc(id);
    return ref.get()
    .pipe(
      map(rep => {
        if(rep.exists){
          ref.update({
            reports: firebase.firestore.FieldValue.arrayUnion(report)
          })
        } else{
          ref.set({
            reports: firebase.firestore.FieldValue.arrayUnion(report)
          })
        }
      })
    );
  }

  getGuestReport(){
    return this.fireDB.collection("guests").get();
  }

}
