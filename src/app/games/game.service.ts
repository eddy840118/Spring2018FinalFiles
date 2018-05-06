import { Component, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs';

@Injectable()
export class GameService {

    private apiUrl: string;

    constructor(
        private http: Http
    ) {
        this.apiUrl = environment.apiUrl;
    }

    getGames(): Promise<Array<Object>> {
        return this.http.get(`${this.apiUrl}/game`)
            .toPromise()
            .then((resp) => {
                let games = resp.json();
                // console.log('games', games);
                return games;
            });
    }

    getGameById(gameId): Promise<Object> {
        return this.http.get(`${this.apiUrl}/game/id/${gameId}`)
            .toPromise()
            .then((resp) => {
                let game = resp.json();
                // console.log('game', game);
                return game;
            });
    }

    addGame(game): Promise<Object> {
        return this.http.post(`${this.apiUrl}/game`, game)
            .toPromise()
            .then((resp) => {
                let game = resp.json();
                // console.log('game', game);
                return game;
            });
    }

    deleteGame(id): Promise<Object> {
        // console.log(`from game.service delete method......`);
        return this.http.delete(`${this.apiUrl}/game/id/${id}`)
            .toPromise()
            .then((resp) => {
                let status = resp.json();
                // console.log('game', status);
                return status;
            });
    }

    updateGame(id, game): Promise<Object> {
        return this.http.put(`${this.apiUrl}/game/id/${id}`, game)
            .toPromise()
            .then((resp) => {
                let game = resp.json();
                // console.log('game', game);
                return game;
            });
    }

}
