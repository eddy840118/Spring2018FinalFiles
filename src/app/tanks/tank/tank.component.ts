import { Component, OnInit } from '@angular/core';
import { TankService } from '../tank.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})
export class TankComponent implements OnInit {

  tank: Object = {};

  constructor(
    private tankService: TankService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params['id'])
    this.tankService.getTankById(this.activatedRoute.snapshot.params['id'])
      .then((resp) => {
        // console.log('resp book', resp);
        this.tank = resp;
      });

  }

  updateTank(tank: any) {
    // console.log('tank', tank);
    const tankID = tank.id;
    delete tank.id;
    this.tankService.updateTank(tankID, tank).then((resp) => {
      // console.log('resp', resp);
      if (resp) {
        this.router.navigate(['tanks']);
      }
    });

  }

}
