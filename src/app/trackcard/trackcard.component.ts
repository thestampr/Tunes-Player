import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';

import { CdkDragStart } from '@angular/cdk/drag-drop';
import { PlayerService } from '../services/player.service';
import { Track } from '../track.model';


@Component({
  selector: 'app-trackcard',
  templateUrl: './trackcard.component.html',
  styleUrls: ['./trackcard.component.less']
})
export class ItemcardComponent implements OnInit, AfterContentChecked {
    @Input() _index: number = 0;
    @Input() title: string = "";
    @Input() duration: string = "";
    @Input() thumbnail: string = "";

    public track: Track;

    constructor(public Player: PlayerService) { }

    get index(): number {
        return this._index-1;
    }

    get is_playing(): boolean {
        return this.track === this.Player.currentTrack;
    }

    ngOnInit(): void {
        this.track = {title: this.title, duration: this.duration, thumbnail: this.thumbnail};
    }

    ngAfterContentChecked(): void {
        this.track = this.Player.Queue[this.index];
    }

    OnClick(event: MouseEvent) {
        let last: string = this.Player.currentTrack.title;
        
        this.Player.currentTrack = this.track;

        if (last != this.Player.currentTrack.title) {
            console.log("Changed to ", this.Player.currentTrack.title);
        }
    }

    OnLikeClick(event: MouseEvent) {
        this.track.is_liked = !this.track.is_liked;
        event.stopPropagation();
        console.log(this.track.is_liked? "Liked" : "Unliked");
    }

    OnOptionClick(event: MouseEvent) {
        event.stopPropagation();
        console.log("Option clicked");
    }

    OnDragClick(event: MouseEvent) {
        event.stopPropagation();
        console.log("Drag clicked");
    }

    OnDrag(event: CdkDragStart) {
        console.log("Dragging");
    }
}
