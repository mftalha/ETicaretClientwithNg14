import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop'; //FilseSystemFileEntry, FilesSystemDirectoryEntry == bunlarda ejkebeck süslü parentez içine hata alırsam : gençayda öyle
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent  {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog : MatDialog  ) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>; // : dışarıdan gönderildiğinde yakalamam gerekbilir o yüzden.// Burdaki options ismi'ni html sayfasına yazığ burayı tetikleyeceğim. 

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData(); //bütün file'ları tutmak için'
    for (const file of files) {
      //(file.fileEntry as FileSystemFileEntry)// file.fileEntry'i -> FileSystemFileEntry'e dönüştür. : type dönüşümü == bu şekilde kullanmamıza izin verdiği için.
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => { // _file callback fonksiyonu : _file ile artık seçilen file erişebileceğim
        fileData.append(_file.name, _file, file.relativePath) //seçilen file'ları fileData dizisine koyuyorum.
      });
    }

    this.openDialog(() => { //dialog açıldığında yes geliyor ise post işlemini gerçekleştir.

      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" }) //resmin gönderme type ile alakalı galiba : kütüphanedede. böyle
      }, fileData).subscribe(data => { //başarılı ise 

        const message: string = "Dosyalar başarıyla yüklenmiştir.";
        if (this.options.isAdminPage) {
          this.alertifyService.message(message,
            {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
        } else {
          this.customToastrService.message(message, "Başarılı",
            {
              messageType: ToastrMessageType.Success,
              possition: ToastrPosition.TopRight
            })
        }

      }, (errorResponse: HttpErrorResponse) => { // süreçte patlama var ise

        const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";
        if (this.options.isAdminPage) {
          this.alertifyService.message(message,
            {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
        } else {
          this.customToastrService.message(message, "Başarısız",
            {
              messageType: ToastrMessageType.Error,
              possition: ToastrPosition.TopRight
            })
        }
      });
    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      data: FileUploadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == FileUploadDialogState.Yes)
        afterClosed();
    });
  }
}

export class FileUploadOptions {
  controller?: string; //hangi controllara
  action?: string; //hangi action'a
  queryString?: string; // 5 id li ürüne resim ekliyorum
  explanation?: string; // Nerede kullandığımıza dağir açıklama.
  accept?: string // bir img mi ? , pdf mi ? , excel mi?
  isAdminPage?: boolean = false; //true ise alertfy (admin sayfasında) kullan , false ise toastr kullan (ui sayfaları)
}

//servis mahiyetinde bir componenettir = sebebi: html sayfası da olmalı , ts sayfasıda olmalı o yüzden component.
