import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Object;

  constructor(
    private gameService: GameService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params['id'])
    this.gameService.getGameById(this.activatedRoute.snapshot.params['id'])
      .then((resp) => {
        // console.log('resp game', resp);
        this.game = resp;
      });
  }

  updateGame(game: any) {
    // console.log('game', game);
    const gameID = game.id;
    delete game.id;
    this.gameService.updateGame(gameID, game).then((resp) => {
      // console.log('resp', resp);
      if (resp) {
        this.router.navigate(['games']);
      }
    });
  }

}
