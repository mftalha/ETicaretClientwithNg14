import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  // her bir extra layout için admin'deki işlemi gerçekleştiriyoruz
  {
    path: "admin", component: LayoutComponent, children: [ //url de admin geldiğinde
      {path: "", component: DashboardComponent, canActivate: [AuthGuard]}, //www.admin geldiğinde buraya yönlendir diye belirtiyoruz = dashboard modülündede bunu yazmıştık = ordakine gerek yok ;; ana sayfalarda böyle yapılıyormuş bu sayfada direk componenti veriliyor = ana sayfalarda lazy loading yapılmıyormuş.
      // https://...com/admin/customers ... diye geldiğinde aranacak rotoyı customers.module yönlendiriyorum = import içinden
      // burda loadchildren deme sebebim = component: .. 'dıyı ben zaten ilgili modül içinde vermiştim o yüzden burda artık onu vermiyorum = istek geldiğinde yönlenme şeklini belirtiyorum sadece.
      //{path: "customers/x", loadChildren : ()=> import("./admin/components/customers/customers.module").then(module => module.CustomersModule)}, // burda customer/x deme sebebim path de ilgili modülde pathde x yazdığımdan o rotaya erişmem için burda böyle yazmam gerkir.
      {path: "customers", loadChildren : ()=> import("./admin/components/customers/customers.module").then(module => module.CustomersModule), canActivate: [AuthGuard]},
      {path: "products", loadChildren : ()=> import("./admin/components/products/products.module").then(module => module.ProductsModule), canActivate: [AuthGuard]},
      {path: "orders", loadChildren : ()=> import("./admin/components/orders/orders.module").then(module => module.OrdersModule), canActivate: [AuthGuard]}
    ], canActivate: [AuthGuard] //admin url sine bir istek geliyorsa önce burdaki gard'ı bir tetikle : true dönerse devam et ur'lelere
  },
  // extra layoutlar hariç ana layoutu aşşağıdaki gibi tüm compenentlerini ayrı ayrı veriyorum.
  {path:"", component: HomeComponent}, // modülünde com
  {path: "basket", loadChildren: ()=> import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path: "products", loadChildren: ()=> import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path: "products/:pageNo", loadChildren: ()=> import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path: "register", loadChildren: ()=> import("./ui/components/register/register.module").then(module => module.RegisterModule)},
  {path: "login", loadChildren: ()=> import("./ui/components/login/login.module").then(module => module.LoginModule)},
  {path: "password-reset", loadChildren: ()=> import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule)},
  {path: "update-password/:userId/:resetToken", loadChildren: ()=> import("./ui/components/update-password/update-password.module").then(module => module.UpdatePasswordModule)} 

  //buraya yüklenen rootlar lazy loading ile yükleniyor routa galiba.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
