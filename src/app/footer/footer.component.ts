import { Component, OnInit, OnDestroy, AfterContentChecked, HostListener } from '@angular/core';

import { PlayerService } from '../services/player.service';
import { Track } from '../track.model';
import { Keys, Looping } from '../enums';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit, OnDestroy, AfterContentChecked {
    public track: Track = this.Player.currentTrack;

    constructor (public Player: PlayerService) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}

    ngAfterContentChecked(): void {
        this.track = this.Player.currentTrack;

        let seeker = document.getElementById("time-seeker") as HTMLInputElement;
        seeker.value = String(this.Player.percent);
        
        let details: HTMLElement = document.getElementById("footer-details")!;
        if (!this.Player.is_playing) {
            details.style.display = "none";
            seeker.disabled = true;
            seeker.value = "0";
            this.SetPaused();
        } else {
            details.style.display = "flex";
            seeker.disabled = false;
            
            if (this.Player.is_paused) {
                this.SetPaused();
            } else {
                this.SetPlaying();
            }
        }
    }
    
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        switch (event.key) {
            case " ":
                event.preventDefault();
                this.PlayPause();
                break;
            case Keys.LEFT_ARROW:
                this.Player.Back();
                break;
            case Keys.RIGHT_ARROW:
                this.Player.Next();
                break;
        }
    }

    OnSeek(percent: string) {
        this.Player.percent = Number(percent);
    }

    SetPlaying(): void {
        let button: HTMLElement = document.getElementById("player-controls-playpause")!;
        button.classList.add("playing");
    }

    SetPaused(): void {
        let button: HTMLElement = document.getElementById("player-controls-playpause")!;
        button.classList.remove("playing");
    }

    PlayPause(): void {
        if (this.Player.is_paused || !this.Player.is_playing) {
            this.Player.Play();
            this.SetPlaying();
            console.log("Playing ", this.Player.currentTrack.title);
        } else {
            this.Player.Pause();
            this.SetPaused();
            console.log("Paused");
        }
    }

    OnLikeClick(event: MouseEvent) {
        this.Player.currentTrack.is_liked = !this.Player.currentTrack.is_liked;
        event.stopPropagation();
        console.log(this.Player.currentTrack.is_liked? "Liked" : "Unliked");
    }
}
