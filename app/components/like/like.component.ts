import {Component, Input, Output, EventEmitter, OnInit } from "@angular/core";


@Component({
  selector: "like-sessionstorage",
  templateUrl: "./app/components/like/like.component.html",
  styleUrls: ["./app/components/like/like.component.css"]
})
export class LikeComponent {

@Input() private textLabel: string;

@Output() launchClickEvent: EventEmitter<string> = new EventEmitter<string>();
    
    private _countClicks = 0;
    
    launchEventClickLike(eventName: string):void{
     this.launchClickEvent.emit( eventName );
}


}