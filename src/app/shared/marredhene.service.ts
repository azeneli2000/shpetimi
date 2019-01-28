import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MarredheneService {
  Marre : AngularFireList<any>;
 Dhene : AngularFireList<any>;

  constructor(private db:AngularFireDatabase) { }

  formMarre : FormGroup = new FormGroup({
    $key : new FormControl(null),
    SasiaMarre : new FormControl('' ,[Validators.required]),
    MonedhaMarre : new FormControl('',[Validators.required]),
    KomentMarre :  new FormControl('',[Validators.required]),


});

formDhene : FormGroup = new FormGroup({
  $key : new FormControl(null),
  SasiaDhene : new FormControl('',[Validators.required]),
  MonedhaDhene : new FormControl('',[Validators.required]),
  KomentDhene : new FormControl('',[Validators.required]),


});
//matcher = new MyErrorStateMatcher();


getMarre(){
  this.Marre = this.db.list('Marre');
  return this.db.list('Marre').snapshotChanges();
}
getDhene(){
  this.Marre = this.db.list('Dhene');
  return this.db.list('Dhene').snapshotChanges();
}

initializeFormGroupDhene() {
  this.formMarre.setValue({
    $key : null,
    SasiaMarre : 0,
    MonedhaMarre :'',
    KomentMarre : '',
 

  });
}

initializeFormGroupMarre() {
  this.formDhene.setValue({
    $key : null,
    SasiaDhene : 0,
    MonedhaDhene :'',
    KomentDhene : '',
 

  });
}

insertMarrje(mardhene){
  console.log(mardhene);
  this.Marre = this.db.list('Marre');
  this.Marre.push({
    SasiaMarre : mardhene.SasiaMarre,
    MonedhaMarre :mardhene.MonedhaMarre,
    KomentMarre : mardhene.KomentMarre,
    Data : new Date().toLocaleDateString()

  }); 
}

insertDhenie(mardhene){
  this.Dhene = this.db.list('Dhene');
  let date = new Date().toLocaleDateString();
  this.Dhene.push({
   
    SasiaDhene : mardhene.SasiaDhene,
    MonedhaDhene :mardhene.MonedhaDhene,
    KomentDhene :mardhene.KomentDhene,
     Data :date,
  }); 
}

  deleteMarre($key : string){
    this.Marre.remove($key);
  }
  deleteDhene($key : string){
    this.Dhene.remove($key);
  }


}
