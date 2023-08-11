import { Injectable } from '@angular/core';
import {Observable, concatWith, firstValueFrom} from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entity/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Token } from 'src/app/contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({ // Ganaric yapılanmada 2 modeli'de kullanacağım. : User giden, Create_User gelen olarak kullanacağım ben 
      controller: "users"
    }, user); // brudaki user kısmı bady olarak göndermekiçin bu şekilde.

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction? : () => void): Promise<any> {
    // observable any alacak token döndürecek
    const observable : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"users",
      action: "login"
    }, { userNameOrEmail, password})

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    
    if(tokenResponse){

      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        possition: ToastrPosition.TopRight
      })
    }
      

    callBackFunction();
  }
}
