import { Injectable } from '@angular/core';
import { Track } from '../track.model';

import { secondsToTime, percentToSeconds, timeToSeconds } from '../utils';
import { Looping } from '../enums';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
    private _percent: number = 0;
    private _currentTime: number = 0;
    private _is_playing: boolean = false;
    private _is_paused: boolean = false;
    private _has_ended: boolean = false;
    private _looping: Looping = Looping.NONE;
    private _queue: Track[] = [
        {title: "Radioactive", thumbnail: "https://i1.sndcdn.com/artworks-H09RmnLHQntl-0-t500x500.jpg", duration: "4:00"},
        {title: "TeddyLoid - ME!ME!ME! feat. Daoko", thumbnail: "https://img.youtube.com/vi/M1Tl2VKR874/hqdefault.jpg", duration: "5:37", },
        {title: "ปลดเปลื้องอดีตที่ผ่านพ้น - Rock Version", thumbnail: "https://i.scdn.co/image/ab67616d0000b2733e72c36b9f19844eb1bbdc6a", duration: "4:57"},
        {title: "Smoke", thumbnail: "https://i.scdn.co/image/ab67616d0000b27336ccfbe26545732377ae36d2", duration: "3:49"},
        {title: "Childish Gambino - This Is America (Official Video)", thumbnail: "https://img.youtube.com/vi/VYOjWnS4cMY/hqdefault.jpg", duration: "4:04"},
        {title: "Fairy Tail - Main Theme (DJ AG Remix)", thumbnail: "https://img.youtube.com/vi/c5EyHpd3cPk/hqdefault.jpg", duration: "2:54"},
        {title: "Star Wars - The Force Theme (DJ AG Remix)", thumbnail: "https://img.youtube.com/vi/JeMgZPrIj3s/hqdefault.jpg", duration: "2:42"},
        {title: "Pirates of the Caribbean - He's a Pirate (DJ AG Remix)", thumbnail: "https://img.youtube.com/vi/oLUv0tm9fWk/hqdefault.jpg", duration: "2:45"},
        {title: "Numb (Official Music Video) [4K UPGRADE] – Linkin Park", thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg", duration: "3:07"},
    ];

    public index: number = 0;

    constructor() {}

    set currentTrack(track: Track) {
        try {
            this.index = this.Queue.indexOf(track);
        } catch {
            this.AddTrack(track);
            this.index = this._queue.length;
        }

        this.Play();
        this.percent = 0;
    }

    get currentTrack(): Track {
        if (this.is_playing) {
            return this._queue[this.index];
        } else {
            return {title: "", thumbnail: "", duration: ""};
        }
    }

    get currentTime(): number {
        return this._currentTime;
    }

    get stringTime(): string {
        if (this.is_playing) {
            return secondsToTime(this._currentTime);
        } else {
            return ""; // 00:00
        }
    }

    set percent(percent: number) {
        this._percent = percent;
        let seconds: number = timeToSeconds(this.currentTrack.duration);
        this._currentTime = percentToSeconds(percent, seconds);
    }

    set looping(type: Looping) {
        this._looping = type;
    }

    get looping(): Looping {
        return this._looping;
    }

    get percent(): number {
        return this._percent;
    }

    get is_playing(): boolean {
        return this._is_playing;
    }

    get is_paused(): boolean {
        return this._is_paused;
    }

    get Queue(): Track[] {
        return this._queue;
    }

    AddTrack(track: Track): void {
        this._queue.push(track);
    }

    RemoveTrack(track: Track): void {
        if (track === this.currentTrack) {
            this.Stop();
        }
        if (this._queue.length) {
            let index: number = this._queue.indexOf(track);
            if (index > -1) {
                this._queue.splice(index, 1);
            }
        }
    }

    Clear(): void {
        this.Stop();
        this._queue.length = 0;
    }

    Play(): void {
        if (this._queue.length) {
            this._is_playing = true;
            this._is_paused = false;
            this._has_ended = false;
        }
    }

    Pause(): void {
        this._is_paused = true;
    }

    Stop(): void {
        this._is_playing = false;
        this._is_paused = false;
        this.index = 0;
    }

    Back(): void {
        if (this._queue.length) {
            if (this._is_playing) {
                if (this.index > 0) {
                    this.index--
                    this.Play();
                    this.percent = 0;
                }
            } else if (this._has_ended) {
                this.index = this._queue.length-1;
                this.Play();
            }
        }
    }

    Next(): void {
        if (this._queue.length) {
            if (this._is_playing) {
                if (this.index < this._queue.length-1) {
                    this.index++;
                    this.Play();
                    this.percent = 0;
                } else {
                    this.Stop();
                    this._has_ended = true;
                }
            }
        }
    }
}
