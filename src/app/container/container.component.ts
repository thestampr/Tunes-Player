import { Component, AfterContentChecked } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { PlayerService } from '../services/player.service';


@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.less']
})
export class ContainerComponent implements AfterContentChecked {

    constructor(public Player: PlayerService) {}

    ngAfterContentChecked(): void {
        
    }

    OnDrop(event: CdkDragDrop<{title: string; poster: string}[]>) {
        moveItemInArray(this.Player.Queue, event.previousIndex, event.currentIndex);
        console.log("Move from", event.previousIndex, "to", event.currentIndex);

        if (event.previousIndex === this.Player.index) {
            this.Player.index = event.currentIndex;
        } else if (event.previousIndex > this.Player.index) {
            if (event.currentIndex <= this.Player.index) {
                this.Player.index++;
            }
        } else if (event.previousIndex < this.Player.index) {
            if (event.currentIndex >= this.Player.index) {
                this.Player.index--;
            }
        }
    }

    Clear(): void {
        this.Player.Clear();
    }
}
