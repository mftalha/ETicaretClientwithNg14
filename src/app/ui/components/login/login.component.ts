import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  // ActivatedRoute => url'deki root paremetreleri için
  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService, private httpClientService : HttpClientService ) { 
    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user)
      this.showSpinner(SpinnerType.BallScaleMultiple)
      await userService.googleLogin(user, () => {
        this.authService.identityCheck();
        this.hideSpinner(SpinnerType.BallScaleMultiple);
      })
    });
  }

  ngOnInit(): void {
  }

  async login(userNameOrEmail: string, password: string){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    await this.userService.login(userNameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params =>{
        const returnUrl = params["returnUrl"]; 
        if(returnUrl) // Eğerki return url varsa => üst url paremetrelerde => bir sayfaya tıklamışızdır o bizi login'e yönlendirmiştir(Autherization).
          this.router.navigate([returnUrl]); // biz login olduğumuzda bizi direk hangi sayfaya erişilmeye çalışıldı ise ona geri döndürecektir.(hangi sayfaya tıkladığ9ımızda autherization için bizi buraya yönlendirdi ise tekrar o sayfaya dönüyoruz.)
      })
      this.hideSpinner(SpinnerType.BallScaleMultiple)
    });
  }
}
