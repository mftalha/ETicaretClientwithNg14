import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/Entity/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // formBuilder => html sayfasındaki forma denk gelecek
  constructor(private formBuilder: FormBuilder) { }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        nameSurname: ["", [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3)
        ]],
        userName: ["", [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3)
        ]],
        email: ["", [
          Validators.required,
          Validators.maxLength(250),
          Validators.email
        ]],
        password: ["", [
          Validators.required,
        ]],
        passwordAgain: ["", [
          Validators.required,
        ]]
      } /*,
      {
        Validators: (group: AbstractControl): ValidationErrors | null => {
          let pass = group.get("password").value;
          let passAgain = group.get("passwordAgain").value;
          debugger
          return pass === passAgain ? null : { notSame: true };
        }
      }*/
    );
  }

  // get koyduguğuımuz için property oldu : çağırdığımızda component.xx diyecez ;; eğerki get olmasaydı fonksiyon olurdu : component(). diye çapırırdık.
  get component(){
    return this.frm.controls
  }

  submitted: boolean = false;
  onSubmit(data: User){
    this.submitted = true;

    debugger;
    if(this.frm.invalid)
     return;
  }

}
