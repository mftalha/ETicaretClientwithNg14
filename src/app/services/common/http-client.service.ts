import { Inject, Injectable } from '@angular/core'; //enjection işlemleri için
import { HttpClient, HttpHeaders } from "@angular/common/http" // anguların httpclient servisine erişim sağlıyoruz.
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
  // @Inject("baseUrl") diyerek app.module.ts içindeki provider da tanımladığımız değişkeni buraya enjeckte olmasını sağladık.
  // bu servisimiz angular httpclient servisinin customure edilmiş hali olacak

  private url(requestParameters: Partial<RequestParameters>){
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` :  ""}`;
  }
  get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T>{ // Observable<T> diye belirtmemize gerek yok geriye ne döneceğini(belirtmesekde aynı işi yapar) ama biz ne döneceğini görelim diye belirtiyoruz. ne döneceğinide : this.httpClient.get<T> paremtre kısmında virgül atıp girilecekler dönecekler kısmından bakarak yaptık. == type güvenliğinide sağlamış oluyoruz böylece.
    // partial yapısını kullanma sebebim = eğerki kullanmaz isem = httpClient servis'i her çağırdıgımda özelliklerinide vermem gerekir ama bu yapı sayesinde sadece değerleri girer yapıyı burada oluşturabiliriz.= gerekli propertyleri burda verebiliriz.

    let url: string= "";

    if(requestParameters.fullEndpoint) // fullEndpoint dolu ise url yi full end point yapacaz. == burdaki mantık eğerki tamamen farklı bir url üzerşnden işlem yapılacak ise.
      url = requestParameters.fullEndpoint; 
    else
      url = `${this.url(requestParameters)}${id ? `/${id}`: ""}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`; //id dolu ise /id , boş ise boş geç == slaş hertürlü olabilirdi sorun çıkarmazdı ama : gerek yok.

    return this.httpClient.get<T>(url, { headers: requestParameters.headers})
  }

  post<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>) : Observable<T> { // biz id yi body içinde kullandığımızdan api de paremetre olarka almıyoruz. : göövdede olacak.
    let url: string= "";
    if(requestParameters.fullEndpoint)
      url= requestParameters.fullEndpoint;
    else
      url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}`: ""}`;

    return this.httpClient.post<T>(url, body, {headers: requestParameters.headers})
  }

  put<T>(requestParameters: Partial<RequestParameters>, body: Partial<T>): Observable<T>{// biz id yi body içinde kullandığımızdan api de paremetre olarka almıyoruz. : göövdede olacak.
    let url: string = "";
    if(requestParameters.fullEndpoint)
      url = requestParameters.fullEndpoint;
    else
      url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    
      return this.httpClient.put<T>(url, body, {headers: requestParameters.headers});
  }

  delete<T>(requestParameters: Partial<RequestParameters>, id: string): Observable<T>{
    let url: string= "";
    if(requestParameters.fullEndpoint)
      url= requestParameters.fullEndpoint;
    else
      url = `${this.url(requestParameters)}/${id}${requestParameters.queryString ? `?${requestParameters.queryString}`: ""}`;

    return this.httpClient.delete<T>(url, {headers: requestParameters.headers});
  }
}

export class RequestParameters{ //buraya koyduğum herşey genel şeylerdir = tüm methodlarda kullanacağım şeyler :: eğerki ortak olmayan şeyler olursa method paremetresi olarak girmeliyim = id gibi : bazı methotlarda olacak : her zaman kullanılmaz.
  controller?: string; //null gelebilecekleri için nulable tanımlıyoruz.
  action?: string;
  queryString?: string;

  headers?: HttpHeaders;
  baseUrl?: string; //temel url miz değişebilir`= eğerki bu dolu değil ise ana modulden gelen url yi kullan yoksa bu nu kullan url olarak
  fullEndpoint?: string; //end point tamamen deüğişebilir = bu dolu olursa  bunu kullanacaz
}

// not burda o-data protokolüne benzer bi yapılanma gerçekleştirdik.