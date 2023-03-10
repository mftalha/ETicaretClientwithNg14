import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  // her bir extra layout için admin'deki işlemi gerçekleştiriyoruz
  {
    path: "admin", component: LayoutComponent, children: [ //url de admin geldiğinde
      {path: "", component: DashboardComponent}, //www.admin geldiğinde buraya yönlendir diye belirtiyoruz = dashboard modülündede bunu yazmıştık = ordakine gerek yok ;; ana sayfalarda böyle yapılıyormuş bu sayfada direk componenti veriliyor = ana sayfalarda lazy loading yapılmıyormuş.
      // https://...com/admin/customers ... diye geldiğinde aranacak rotoyı customers.module yönlendiriyorum = import içinden
      // burda loadchildren deme sebebim = component: .. 'dıyı ben zaten ilgili modül içinde vermiştim o yüzden burda artık onu vermiyorum = istek geldiğinde yönlenme şeklini belirtiyorum sadece.
      //{path: "customers/x", loadChildren : ()=> import("./admin/components/customers/customers.module").then(module => module.CustomersModule)}, // burda customer/x deme sebebim path de ilgili modülde pathde x yazdığımdan o rotaya erişmem için burda böyle yazmam gerkir.
      {path: "customers", loadChildren : ()=> import("./admin/components/customers/customers.module").then(module => module.CustomersModule)},
      {path: "products", loadChildren : ()=> import("./admin/components/products/products.module").then(module => module.ProductsModule)},
      {path: "orders", loadChildren : ()=> import("./admin/components/orders/orders.module").then(module => module.OrdersModule)}
    ]
  },
  // extra layoutlar hariç ana layoutu aşşağıdaki gibi tüm compenentlerini ayrı ayrı veriyorum.
  {path:"", component: HomeComponent}, // modülünde com
  {path: "basket", loadChildren: ()=> import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path: "products", loadChildren: ()=> import("./ui/components/products/products.module").then(module => module.ProductsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
