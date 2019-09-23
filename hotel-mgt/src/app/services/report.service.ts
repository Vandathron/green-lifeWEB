import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportService {



  constructor(
    private fireDB: AngularFirestore
  ) { }

  getAllReports(){
    return this.fireDB.collection("reports").get();
  }

  queryReport(property: string, value: string){
    return this.fireDB.firestore.collection("reports").where(property, "==", value).get();
  }
  
  saveToReport(report){
    return this.fireDB.collection("reports").add(report);
  }

}
