import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Observable, concatWith, firstValueFrom } from "rxjs";
import { baseUrl } from "src/app/contracts/base_url";

@Injectable({
    providedIn: 'root'
  })
  export class FileService {
  
    constructor(private httpClientService: HttpClientService) { }

    async getBaseStorageUrl(): Promise<baseUrl>{
        const getObservable: Observable<baseUrl> = this.httpClientService.get<baseUrl>({
            controller: "files",
            action: "GetBaseStorageUrl"
        });
        return await firstValueFrom(getObservable);
    }
}