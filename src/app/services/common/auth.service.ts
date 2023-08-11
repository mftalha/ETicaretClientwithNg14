import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck() {

    const token: string = localStorage.getItem("accessToken");

    //const decodeToken = this.jwtHelper.decodeToken(token); //tokenla ilgili encode edilmiş ama decode edilebilen tüm verileri getirir. : ama security sibi alnları decode edemez.
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);//bu token ne zaman aktif
    let expired: boolean; 
    try{
      expired = this.jwtHelper.isTokenExpired(token); // bu tokenın süresi dolmuşmu => true ise dolmuştur : false ise hala geçerlidir.
    } catch{
      expired = true; // =>  proje token olmadan veya yanlış token ile ilgili sayfgalara girildiğinde patlamaması için böyle yapıyoruz
    }

    _isAuthenticated= token !=null && !expired;
  }

  get isAuthenticated(): boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;