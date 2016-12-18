import { BrowserModule } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";

import { ConfirmDialogModule, ConfirmationService } from "primeng/primeng";

import { AppComponent } from "./app.component";
import { AppRouting } from "./app.routing";
import { BackendUriProvider } from "./app.settings";
import { CategoryService } from "./services/category.service";
import { ProductComponent } from "./components/product/product.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { ProductDetailResolve } from "./services/product-detail-resolve.service";
import { ProductFilterComponent } from "./components/product-filter/product-filter.component";
import { ProductResetComponent } from "./components/product-reset/product-reset.component";
import { ProductsCollectionComponent } from "./components/products-collection/products-collection.component";
import { ProductService } from "./services/product.service";
import { SoldProductsResolve } from "./services/sold-products-resolve.service";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { UserService } from "./services/user.service";
import { PublicationDatePipe } from "./pipes/publication-date.pipe";
import { MyCurrencyPipe } from "./pipes/currency-eur.pipe";
import { CurrencyPipe } from "@angular/common";
import {  LikeComponent } from "./components/like/like.component";
import {  ProductSort } from "./components/product-sort/product-sort.component";
import { ProductSortPipe } from "./pipes/product-sort.pipe";
import { ProductsByUser } from "./components/products-by-user/products-by-user.component"
import { ProductByUserResolve } from "./services/products-by-user-resolve.service";
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Blue Path                                                        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| No olvides declarar PublicationDatePipe en el módulo.            |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

@NgModule({
    imports: [
        AppRouting,
        BrowserModule,
        FormsModule,
        HttpModule,
        ConfirmDialogModule
    ],
    declarations: [
        AppComponent,
        ProductComponent,
        ProductDetailComponent,
        ProductFilterComponent,
        ProductResetComponent,
        ProductsCollectionComponent,
        UserProfileComponent,
        PublicationDatePipe,
        MyCurrencyPipe,
        LikeComponent,
        ProductSort,
        ProductsByUser
    ],
    providers: [
        BackendUriProvider,
        CategoryService,
        ConfirmationService,
        DatePipe,
        ProductDetailResolve,
        ProductService,
        SoldProductsResolve,
        ProductSortPipe,
        ProductByUserResolve,
        UserService,
        {
            provide: CurrencyPipe,
            useFactory: () => {
                     return new CurrencyPipe("es");
        }}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
