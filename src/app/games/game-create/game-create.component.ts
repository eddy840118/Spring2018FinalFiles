import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})

export class GameCreateComponent implements OnInit {

  game:Object;

  constructor(
    private gameService:GameService,
    private router:Router
    ) { }

  ngOnInit() {
    this.game = {};
  }

  createGame(game:Object) {
    this.gameService.addGame(game).then((resp) => {
      this.router.navigate(['/games']);
    });
  }

}
