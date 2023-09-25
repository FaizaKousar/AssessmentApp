import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCandidateComponent } from './Modules/Candidate/add-edit-candidate/add-edit-candidate.component';
import { CandidateService } from './Modules/Candidate/Service/CandidateService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AssessmentApp';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'company','residence','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog, private _candidateService: CandidateService){

  }

  ngOnInit(): void {
    this.getCandidateList();
  }

  openCandidateDialog(){
    const dialogRef=this.dialog.open(AddEditCandidateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCandidateList();
        }
      },
    });
   
  }

  getCandidateList(){
    this._candidateService.getCandidates().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  
}

deleteCandidate(id: number){

  this._candidateService.deleteCandidate(id).subscribe({
    next: (res)=>{
      alert("deleted");
      this.getCandidateList();
    },
    error:(err:any)=>{
      console.log(err);
    }
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

openEditForm(data: any) {
  const dialogRef = this.dialog.open(AddEditCandidateComponent, {
    data,
  });
debugger;
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getCandidateList();
      }
    },
  });
}

}
