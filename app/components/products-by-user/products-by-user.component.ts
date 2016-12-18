import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../../models/product";
import { Component } from "@angular/core";



@Component({
templateUrl: "./app/components/products-by-user/products-by-user.component.html",
styleUrls: ["./app/components/products-by-user/products-by-user.component.css"]
})

export class ProductsByUser{
 private _productsByUser: Product[];
 private _userId: number;

 constructor(
        private _route: ActivatedRoute,
        private _router: Router) { }

    ngOnInit(): void {
        this._route.data.forEach((data: { product: Product[] }) => this._productsByUser = data.product);
        this._userId = Number(this._route.snapshot.params["userId"]);
    }
}