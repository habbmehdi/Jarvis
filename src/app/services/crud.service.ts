import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticateService } from './authentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
   
  currentUser: string;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthenticateService
      
  ) { }
 
 
  create_NewUser(record, collection: string) {
    return  this.firestore.collection(collection).doc(this.authService.userDetails().uid).set(record);
  }
 
  read_Records(collection: string) {
    return  this.firestore.collection(collection).snapshotChanges();
  }
 
  update_Record(recordID,record,collection: string){
    this.firestore.collection(collection).doc(this.authService.userDetails().uid).update(record);
  }
 
  delete_Record(record_id,collection: string) {
    this.firestore.collection(collection).doc(this.authService.userDetails().uid).delete();
  }
}