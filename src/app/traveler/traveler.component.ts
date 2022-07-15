import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TravelerService } from '../Traveler.service';
import { Iform } from '../shared/Iform';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.scss']
})

export class TravelerComponent implements OnInit {

  travelerForm!: FormGroup;
  traveler!: FormArray;
  titleOption: string[] = ['אדון', 'גברת'];
  telephonePrefixOption: string[] = ['050', '052', '053', '054', '055', '058'];
  count: number = 0;
  edit: boolean = false;
  new: boolean = false;
  status: boolean = true;

  constructor(private formBuilder: FormBuilder, private _travelerService: TravelerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.travelerForm = new FormGroup({
      traveler: new FormArray([])
    });
    this.addForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      mailAdress: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]],
      identityCard: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      telephonePrefix: ['', Validators.required],
      phon: ['', [Validators.required, Validators.pattern(/[0-9]-?[0-9]{6}/)]],
    });
  }

  addForm(): void {
    if (this.count < 4) {
      this.travelerForm.disable();
      this.traveler = this.travelerForm.get('traveler') as FormArray;
      this.traveler.push(this.createForm());
      this.count += 1;
      this.new = false;
    }
    else
      this.openSnackBar()
  }

  openSnackBar() {
    this._snackBar.open('ניתן להוסיף עד 4 נוסעים', 'סגור');
  }

  add(element: Iform) {
    if (!this.travelerForm.invalid) {
      console.log("good form 👍", element);
      this.travelerForm.disable();
    }
  }

  removetraveler(element,index) {
    (<FormArray>this.travelerForm.get("traveler")).removeAt(index);
    this.count -= 1;
    this.new = true;
  }

  isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

  onSubmit(element: Iform[]) {
    if (!this.travelerForm.invalid) {
      this.new = true;
      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < this.traveler.length; j++) {
          if (i != j) {
            if (this.isEqual(this.traveler.at(i).value, this.traveler.at(j).value))
              return;
          }
        }

        this.travelerForm.disable();
        this._travelerService.save(element).subscribe(x => {
          this.status = x;
          if (!this.status)
            this._snackBar.open('אופס... הכנסת נתונים שגויים :(', 'סגור');
        });
      }
    }
  }
}