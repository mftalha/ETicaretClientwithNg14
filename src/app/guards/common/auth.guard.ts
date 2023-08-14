import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
<<<<<<< HEAD
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
=======
>>>>>>> 5e6f1fa2fcadd8c15e07116895c49b0b5353984f
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // ilgili token'ı çözmemizi sağlar => JwtHelperService
<<<<<<< HEAD
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService, private authService: AuthService ){}
=======
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService ){}
>>>>>>> 5e6f1fa2fcadd8c15e07116895c49b0b5353984f

  // geldiğimiz yol : route'da ;; gideceğimiz yer : state'de ile belirtiliyor.
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallScaleMultiple);

<<<<<<< HEAD
    /*
=======
>>>>>>> 5e6f1fa2fcadd8c15e07116895c49b0b5353984f
    const token: string = localStorage.getItem("accessToken");

    //const decodeToken = this.jwtHelper.decodeToken(token); //tokenla ilgili encode edilmiş ama decode edilebilen tüm verileri getirir. : ama security sibi alnları decode edemez.
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);//bu token ne zaman aktif
    let expired: boolean; 
    try{
      expired = this.jwtHelper.isTokenExpired(token); // bu tokenın süresi dolmuşmu => true ise dolmuştur : false ise hala geçerlidir.
    } catch{
      expired = true; // =>  proje token olmadan veya yanlış token ile ilgili sayfgalara girildiğinde patlamaması için böyle yapıyoruz
    }
<<<<<<< HEAD
    */

    // böyle bir veri yoksa(true,false hariç bu şekildede kullanılıyor js'de)
    
    if(!_isAuthenticated){
=======

    // böyle bir veri yoksa(true,false hariç bu şekildede kullanılıyor js'de)
    if(!token || expired){
>>>>>>> 5e6f1fa2fcadd8c15e07116895c49b0b5353984f
      this.router.navigate(["login"], {queryParams: {returnUrl: state.url}}) //Eğerki rout dosyasınında gösterilen modüldeki path'da adres olsaydı onuda yazmalıydık "login/.." diye
      this.toastrService.message("Oturum açmanı gerekiyor!", "Yetkisiz Erişim!",{
        messageType: ToastrMessageType.Warning,
        possition: ToastrPosition.TopRight
      })
    }
    
    this.spinner.hide(SpinnerType.BallScaleMultiple);

    return true;
  }
}
