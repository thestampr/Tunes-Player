import { Injectable } from '@angular/core';
import { Track } from './track.model';


@Injectable({
  providedIn: 'root'
})
export class PlayerTestService {

    // private _currentTrack: Track = {title: "Smoke", duration: "3:49", thumbnail: "https://i.scdn.co/image/ab67616d0000b27336ccfbe26545732377ae36d2"};
    private _currentTrack: Track;

    constructor() {
        this._currentTrack = {title: "", duration: "", thumbnail: ""};
    }

    set currentTrack(track: Track) {
        this._currentTrack = track;
    }

    get currentTrack(): Track {
        return this._currentTrack;
    }
}
