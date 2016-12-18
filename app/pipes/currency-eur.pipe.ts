import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";


const PADDING = "000000";

@Pipe({ name: "myCurrency" })
export class MyCurrencyPipe  implements PipeTransform {

  constructor( private _currencyPipe:CurrencyPipe ) {}

  transform(value:string): string {

    value = this._currencyPipe.transform(value,'EUR',true,"1.2-2");
    return value;
  }

}