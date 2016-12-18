import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { ConfirmationService } from "primeng/primeng";

import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";

@Component({
    templateUrl: "./app/components/product-detail/product-detail.component.html",
    styleUrls: ["./app/components/product-detail/product-detail.component.css"]
})
export class ProductDetailComponent implements OnDestroy, OnInit {

    private _product: Product;
    private _productSubscription: Subscription;

    
    private Session_Storage:string = "Session Storage";
    private counterSessionStorage = 0;
    private Local_Storage:string = "Local Storage";
    private counterLocalStorage = 0;
    private Server_Storage:string = "Server Storage";
    private counterServerStorage = 0;
    
    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this._route.data.forEach((data: { product: Product }) => this._product = data.product);
        window.scrollTo(0, 0);

        this.counterSessionStorage = Number( sessionStorage.getItem(this.Session_Storage) ===null ? 0 :  
                                                                      sessionStorage.getItem(this.Session_Storage).toString());

        this.counterLocalStorage = Number( localStorage.getItem(this.Local_Storage) ===null ? 0 :  
                                                                      localStorage.getItem(this.Local_Storage).toString());
                                                                      
    }

    ngOnDestroy(): void {
        if (this._productSubscription !== undefined) {
            this._productSubscription.unsubscribe();
        }
    }

    private _buyProduct(): void {
        this._productSubscription = this._productService
                                        .buyProduct(this._product.id)
                                        .subscribe(() => this._showPurchaseConfirmation())
    }

    private _showPurchaseConfirmation(): void {
        this._confirmationService.confirm({
            rejectVisible: false,
            message: "Producto comprado. ¡Enhorabuena!",
            accept: () => this._router.navigate(["/product"])
        });
    }
    
    getImageSrc(): string {
        return this._product && this._product.photos.length > 0 ? this._product.photos[0] : "";
    }

    showPurchaseWarning(): void {
        this._confirmationService.confirm({
            message: `Vas a comprar ${this._product.name}. ¿Estás seguro?`,
            accept: () => this._buyProduct()
        });
    }

    goBack(): void {
        window.history.back();
    }
    
    clickEventLike(nameComponentClickLike: string){
  
    if(nameComponentClickLike === "Session Storage" ){
        if (typeof(Storage) !== "undefined") {
             ++this.counterSessionStorage;
             sessionStorage.setItem( this.Session_Storage , (this.counterSessionStorage).toString() );  
        }
    } else if(  nameComponentClickLike === "Local Storage" ){
        if (typeof(Storage) !== "undefined") {
             ++this.counterLocalStorage;
             localStorage.setItem( this.Local_Storage , (this.counterLocalStorage).toString() );  
        }
    }else{
        this.counterServerStorage = this._product.like;
        this._productService
            .addLikeProduct(this._product.id, ++this.counterServerStorage)
            .subscribe(() => this._product.like = this.counterServerStorage);
    }



    }



}
