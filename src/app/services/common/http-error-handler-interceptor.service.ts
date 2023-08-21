import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})

// request anında araya girmek için HttpInterceptor : implement ediyoruz ve ilgili implement methodunda işlemelri gerçekleştiriyoruz.
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService : UserAuthService, private router: Router, private spinner: NgxSpinnerService) { }

  // req : yapılan requesti temsil eder, next : request'in araya girdikten sonrasını temsil eder : işimiz bitince devam et diye kullanırız.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // buraya tüm istekler düşer.

    // next.handle(req).pipe(catchError() : request esnasında hata çıkarsa o hatayı bana bırak.
    return next.handle(req).pipe(catchError(error =>{
      switch(error.status){
        case HttpStatusCode.Unauthorized: //401 error
          
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if(!state){
              const url = this.router.url;
              if(url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekir.", "Oturum açınız!", {
                  messageType: ToastrMessageType.Warning,
                  possition: ToastrPosition.TopRight
                });
              else
                this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!","Yetkisiz işlem!",{
                  messageType: ToastrMessageType.Warning,
                  possition: ToastrPosition.BottomFullWidth
                });
            }
          }).then(data => {   
          });
          break;
          case HttpStatusCode.InternalServerError: //500
            this.toastrService.message("Sunucuya erişilemiyor!","Sunucu Hatası",{
            messageType: ToastrMessageType.Warning,
            possition: ToastrPosition.BottomFullWidth
            });
            break;
          case HttpStatusCode.BadRequest: 
           this.toastrService.message("Geçersiz istek yapıldı!","Geçersiz işlem!",{
            messageType: ToastrMessageType.Warning,
            possition: ToastrPosition.BottomFullWidth
            });
            break;
          case HttpStatusCode.NotFound: 
           this.toastrService.message("Sayfa bulunamadı!","Sayfa bulunamadı!",{
            messageType: ToastrMessageType.Warning,
            possition: ToastrPosition.BottomFullWidth
            });
            break;
          default:
            this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!","Hata!",{
              messageType: ToastrMessageType.Warning,
              possition: ToastrPosition.BottomFullWidth
            });
            break;
      }

      this.spinner.hide(SpinnerType.BallScaleMultiple);
      return of(error);
    }));
  }
}
