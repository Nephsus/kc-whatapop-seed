import { Component, EventEmitter, OnInit, Output, Input, OnDestroy , SimpleChange } from "@angular/core";

import { Sorts } from "../../models/sorts";

@Component({
    selector: "product-sort",
    templateUrl: "./app/components/product-sort/product-sort.component.html"
})
export class ProductSort{

 private _sorts: Sorts[] = [{name: "Alfabéticamente", value:1}, {name: "Precio", value:2}];


 private _sortSelected: Sorts;
 
 
 @Input() private cleanValue: Boolean=false;
 @Output() onChangeEvent: EventEmitter<Sorts> = new EventEmitter<Sorts>();


 onChangeValue():void{
   this.onChangeEvent.emit(this._sortSelected);
 }



ngOnChanges(changes: SimpleChange) { 
    console.log(changes);
    this._sortSelected = null;
}


}