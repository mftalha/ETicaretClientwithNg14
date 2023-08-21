import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})

// Uygulama içinde dynamik olarak yüklenmesi gereken componentlerde kullanacağız => böylece modal açtığımda içindeki tabloya yüklenen verilerin her modalı açtığımda tekrardan yüklemesi sağlanacak gibi.
export class DynamicLoadComponentService {


  //viewContainerRef : Dinamik olarak yüklenecek componenti içerisinde barındıran coniner'dır.(her dinamik yükleme sürecinde önceki view'leri clear etmemiz gerekmektedir.)
  //ComponentFactory: Componentlerin instance'lerini oluşturmak için kullanılan bir nesnedir.
  //ComponentFactoryResolver : Belirli bir component için ComponentFactory'i resolve eden sınıftır. İçerisindeki resolveComponentFactory fonksiyonu aracılığıyla ilgili componente dair bir ComponentFactory nesnesi oluşturup döner.

  //ComponentFactoryResolver => dynamic componentleri tanımlamızı sağlıyacak.
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef){

    let _component: any = null;

    switch(component){
      case ComponentType.BasketsComponent:
      _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
      break;
    }

    viewContainerRef.clear()
    // burdaki fabrika ile ilgili compoponenetten 1 tane daha oluşturuyoruz. => componentFactoryResolver resolveComponentFactory methodu sayesinde ilgili componenttei dinamik olarak create ediyoruz.
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component))
  }
}

export enum ComponentType{
  BasketsComponent
}
