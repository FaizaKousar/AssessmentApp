import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../Service/CandidateService';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css']
})
export class AddEditCandidateComponent implements OnInit {
  candForm: FormGroup;

  alphaNumericValidationPattern = /^\w[ \w]*$/;
  stringValidationPattern = /^\w.*$/;
  
  constructor(
    private form:FormBuilder, 
    private _dialogRef:MatDialogRef<AddEditCandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _candidateService: CandidateService)
    {
      this.candForm = this.form.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        gender: ['', Validators.required],
        company: ['', Validators.required],
        residence: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    this.candForm.patchValue(this.data);
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.candForm.controls;
  }

  onFormSubmit(){   
    if (this.candForm.valid) {
      if (this.data) {
        this.candForm.value.id=this.data.id;
        this._candidateService
          .updateCandidate(this.data.id, this.candForm.value)
          .subscribe({
            next: (val: any) => {         
              alert("Candidate Updated");     
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._candidateService.addCandidate(this.candForm.value).subscribe({
          next: (val: any) => {
            alert("Candidate Added");
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  getErrorMessage(control: FormControl, name: string = 'Field') {
    if (control.errors != null) {
      if (control.hasError('required')) {
        return `${name} cannot be empty`;
      }
      if (control.hasError('minlength')) {
        return (
          'Minimum length should be ' +
          control?.errors['minlength'].requiredLength
        );
      }
      if (control.hasError('maxlength')) {
        return (
          'Maximum length should be ' +
          control?.errors['maxlength'].requiredLength
        );
      }
      if (control.hasError('email')) {
        return 'Not a valid email';
      }
      if (control.hasError('pattern')) {
        return `${name} is Invalid.`;
      }
      if (
        control.hasError('pattern') &&
        control?.errors['pattern'].requiredPattern ===
          this.alphaNumericValidationPattern
      ) {
        return 'Only text and numbers are allowed.';
      }
      if (control.hasError('dateValid') && name === 'Start Date') {
        return 'Start Date should be less than End Date';
      }
      if (control.hasError('dateValid') && name === 'End Date') {
        return 'End Date should be greater than Start Date';
      }
      if (control.hasError('matDatepickerParse')) {
        return 'Invalid Date Format';
      }
    }
    return '';
  }

}
