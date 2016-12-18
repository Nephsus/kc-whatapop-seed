import { Pipe, PipeTransform } from "@angular/core";


import { Product } from "../models/product";


@Pipe({ name: "productSort" })
export class ProductSortPipe  implements PipeTransform {

   transform(products: Product[], typeFilter: number): Product[] {
        
        let sortedProducts: Product[];

        console.log(typeFilter);

        if (typeFilter == 1){
             console.log("entro alfabeticamente");
            sortedProducts = products.sort((productA: Product, productB: Product): number => {
                let nombreproductA: string = `${productA.name}`.toLowerCase();
                let nombreproductB: string = `${productB.name}`.toLowerCase();
                return nombreproductA > nombreproductB ? 1 : nombreproductA < nombreproductB ? -1 : 0;
            });
        }else{
             console.log("entro por precio");
            sortedProducts = products.sort((productA: Product, productB: Product): number => {
                let nombreproductA: number = productA.price
                let nombreproductB: number = productB.price
                return nombreproductA > nombreproductB ? 1 : nombreproductA < nombreproductB ? -1 : 0;
            });
        }
     

        return sortedProducts;
    }

}