import { Inject, Injectable } from "@angular/core";
import { Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Product } from "../models/product";
import { ProductFilter } from "../models/product-filter";
import { BackendUri } from "../app.settings";

@Injectable()
export class ProductService {

    constructor(
        @Inject(BackendUri) private _backendUri: string,
        private _http: Http) { }

    getProducts(filter: ProductFilter = undefined): Observable<Product[]> {
        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Pink Path                                                        |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Pide al servidor que te retorne los productos ordenados de más   |
        | reciente a menos, teniendo en cuenta su fecha de publicación.    |
        |                                                                  |
        | En la documentación de 'JSON Server' tienes detallado cómo hacer |
        | la ordenación de los datos en tus peticiones, pero te ayudo      |
        | igualmente. La querystring debe tener estos parámetros:          |
        |                                                                  |
        |   _sort=publishedDate&_order=DESC                                |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Red Path                                                         |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Pide al servidor que te retorne los productos filtrados por      |
        | texto y/ por categoría.                                          |
        |                                                                  |
        | En la documentación de 'JSON Server' tienes detallado cómo       |
        | filtrar datos en tus peticiones, pero te ayudo igualmente. La    |
        | querystring debe tener estos parámetros:                         |
        |                                                                  |
        |   - Búsqueda por texto:                                          |
        |       q=x (siendo x el texto)                                    |
        |   - Búsqueda por categoría:                                      |
        |       category.id=x (siendo x el identificador de la categoría)  |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Yellow Path                                                      |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Pide al servidor que te retorne los productos filtrados por      |
        | estado.                                                          |
        |                                                                  |
        | En la documentación de 'JSON Server' tienes detallado cómo       |
        | filtrar datos en tus peticiones, pero te ayudo igualmente. La    |
        | querystring debe tener estos parámetros:                         |
        |                                                                  |
        |   - Búsqueda por estado:                                         |
        |       state=x (siendo x el estado)                               |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        //console.log(filter);
        /*let urlComposing : string = ((filter === null || (filter.state === undefined && 
                                                                filter.category === undefined && 
                                                                    filter.text === undefined  ) )) ? 
                                        `${this._backendUri}/products?_sort=publishedDate&_order=DESC` : 
                                        (filter.state !== undefined ) ?
                                        `${this._backendUri}/products?state=${filter.state}&_sort=publishedDate&_order=DESC` :
                                        `${this._backendUri}/products?q=${filter.text}&category.id=${filter.category}&_sort=publishedDate&_order=DESC`;
        */

        let urlComposing : string = `${this._backendUri}/products?`;

       if(filter !== null){
            if( filter.category !== null && filter.category !== undefined )
                  urlComposing +=  `category.id=${filter.category}&`;

            if( filter.text !== null && filter.text !== undefined )
                  urlComposing +=  `q=${filter.text}&`;

            if( filter.state !== null && filter.state !== undefined && filter.state !=='all'){
                  urlComposing +=  `state=${filter.state}&`;   
            }
         }

         urlComposing +=`_sort=publishedDate&_order=DESC`;

        console.log(urlComposing);
        return this._http
                   .get( urlComposing )
                   .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
    }

    getProduct(productId: number): Observable<Product> {
        return this._http
                   .get(`${this._backendUri}/products/${productId}`)
                   .map((data: Response): Product => Product.fromJson(data.json()));
    }

    getProductsByUserId(userId: number): Observable<Product[]> {
        console.log(userId);
        return this._http
                   .get(`${this._backendUri}/products?seller.id=${userId}`)
                   .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
    }

    buyProduct(productId: number): Observable<Product> {
        let body: any = { "state": "sold" };
        return this._http
                   .patch(`${this._backendUri}/products/${productId}`, body)
                   .map((data: Response): Product => Product.fromJson(data.json()));
    }

    setProductAvailable(productId: number): Observable<Product> {
        let body: any = { "state": "selling" };
        return this._http
                   .patch(`${this._backendUri}/products/${productId}`, body)
                   .map((data: Response): Product => Product.fromJson(data.json()));
    }

    addLikeProduct(productId: number, likeCounter: number): Observable<Product> {
        let body: any = { "like": likeCounter };
        return this._http
                   .patch(`${this._backendUri}/products/${productId}`, body)
                   .map((data: Response): Product => Product.fromJson(data.json()));
    }
}
