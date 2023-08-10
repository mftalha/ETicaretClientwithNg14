import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/Entity/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // formBuilder => html sayfasındaki forma denk gelecek
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService) { }

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
        passwordConfirm: ["", [
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
  async onSubmit(user: User){
    this.submitted = true;

    if(this.frm.invalid)
     return;

     const result : Create_User = await this.userService.create(user);
     if(result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        possition: ToastrPosition.TopRight
    })
    else
    this.toastrService.message(result.message, "Hata", {
      messageType: ToastrMessageType.Error,
      possition: ToastrPosition.TopRight
  })
  }

}
