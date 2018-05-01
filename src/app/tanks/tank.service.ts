import { Component, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs';

@Injectable()
export class TankService {

    private apiUrl: string;

    constructor(
        private http: Http
    ) {
        this.apiUrl = environment.apiUrl;
    }

    getTanks(): Promise<Array<Object>> {
        return this.http.get(`${this.apiUrl}/tank`)
            .toPromise()
            .then((resp) => {
                let tanks = resp.json();
                // console.log('tanks', tanks);
                return tanks;
            });
    }

    getTankById(tankId): Promise<Object> {
        return this.http.get(`${this.apiUrl}/tankk/id/${tankId}`)
            .toPromise()
            .then((resp) => {
                let tank = resp.json();
                // console.log('tank', tank);
                return tank;
            });
    }

    addTank(tank): Promise<Object> {
        return this.http.post(`${this.apiUrl}/tank`, tank)
            .toPromise()
            .then((resp) => {
                let tank = resp.json();
                // console.log('tank', tank);
                return tank;
            });
    }

    deleteTank(id): Promise<Object> {
        // console.log(`from tank.service delete method......`);
        return this.http.delete(`${this.apiUrl}/tank/id/${id}`)
            .toPromise()
            .then((resp) => {
                let status = resp.json();
                // console.log('tank', status);
                return status;
            });
    }

    updateTank(id, tank): Promise<Object> {
        return this.http.put(`${this.apiUrl}/tank/id/${id}`, tank)
            .toPromise()
            .then((resp) => {
                let tank = resp.json();
                // console.log('tank', tank);
                return tank;
            });
    }

}
