import { Component, OnInit } from '@angular/core';
import { MarredheneService } from './shared/marredhene.service';
import { NotificationService } from './shared/notification.service';
import { MatTableDataSource } from '@angular/material';
import { ConfirmDialogService } from './shared/confirm-dialog.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service : MarredheneService,private notification : NotificationService, private dialogService : ConfirmDialogService ) { }
  Monedhat = [
    {value : "EUR" } ,
    {value :"LEK" } ,
   
];
searchKey : string;
listDataMarre : MatTableDataSource<any>;
listDataDhene :  MatTableDataSource<any>;
displayedColumnsMarre: string [] =['DataMarre','SasiaMarre','KomentMarre','Actions'];
displayedColumnsDhene: string [] =['DataDhene','SasiaDhene','KomentDhene','Actions'];
marreEUR : number;
marreLEK : number;
dheneEUR : number;
dheneLEK : number;

  ngOnInit() {
//marre
    this.service.getMarre().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key : item.key,
            ...item.payload.val()};
        }
        );
        this.listDataMarre= new MatTableDataSource(array);
        this.marreEUR = this.listDataMarre.filteredData.map((t)=>{if(t.MonedhaMarre=='EUR') return t.SasiaMarre; else return 0;}).reduce((acc, value) => acc + value, 0);
        this.marreLEK = this.listDataMarre.filteredData.map((t)=>{if(t.MonedhaMarre=='LEK') return t.SasiaMarre;else return 0;}).reduce((acc, value) => acc + value, 0);
        console.log(this.marreEUR);
      });
      //dhene
    this.service.getDhene().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key : item.key,
            ...item.payload.val()};
        }
        );
        this.listDataDhene= new MatTableDataSource(array);
        this.dheneEUR = this.listDataDhene.filteredData.map((t)=>{if(t.MonedhaDhene=='EUR') return t.SasiaDhene; else return 0;}).reduce((acc, value) => acc + value, 0);
        this.dheneLEK = this.listDataDhene.filteredData.map((t)=>{if(t.MonedhaDhene=='LEK') return t.SasiaDhene;else return 0;}).reduce((acc, value) => acc + value, 0);
      });
    
  }

  onSearchClearMarre() {
    this.searchKey = "";
    this.applyFilterMarre();
  }

  applyFilterMarre() {
    this.listDataMarre.filter = this.searchKey.trim().toLowerCase();
    this.marreEUR = this.listDataMarre.filteredData.map((t)=>{if(t.MonedhaMarre=='EUR') return t.SasiaMarre; else return 0;}).reduce((acc, value) => acc + value, 0);
    this.marreLEK = this.listDataMarre.filteredData.map((t)=>{if(t.MonedhaMarre=='LEK') return t.SasiaMarre;else return 0;}).reduce((acc, value) => acc + value, 0);

  }
  onSubmitMarre(){
   this.service.insertMarrje(this.service.formMarre.value);
   this.service.formMarre.reset();
   this.service.initializeFormGroupMarre();
   this.notification.success("Te dhenat u ruajten !");
  }
  
  onDeleteMarre($key){
    this.dialogService.openConfirmDialog('Jeni te sigurte ? ')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteMarre($key);
        this.notification.warn('Fshirja u krye !');
      }
    });
  }


  onSubmitDhene(){
    this.service.insertDhenie(this.service.formDhene.value);
    this.service.formDhene.reset();
    this.service.initializeFormGroupDhene();
    this.notification.success("Te dhenat u ruajten !");
   }

   onSearchClearDhene() {
    this.searchKey = "";
    this.applyFilterDhene();
  }

  applyFilterDhene() {
    this.listDataDhene.filter = this.searchKey.trim().toLowerCase();
    this.dheneEUR = this.listDataDhene.filteredData.map((t)=>{if(t.MonedhaDhene=='EUR') return t.SasiaDhene; else return 0;}).reduce((acc, value) => acc + value, 0);
    this.dheneLEK = this.listDataDhene.filteredData.map((t)=>{if(t.MonedhaDhene=='LEK') return t.SasiaDhene;else return 0;}).reduce((acc, value) => acc + value, 0);

  }

  onDeleteDhene($key){
    this.dialogService.openConfirmDialog('Jeni te sigurte   ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteDhene($key);
        this.notification.warn('Fshirja u krye !');
      }
    });
  }

}




