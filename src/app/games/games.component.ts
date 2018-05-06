import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit {

  games:Array<Object>;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {
    this.games = [];
    this.getGames();
    console.log('games', this.games);
  }

  getGames() {
     this.gameService.getGames().then((resp) => {
      this.games = resp;
     });  
  }

  goToCreate() {
    console.log('go to create....;');
    this.router.navigate(['game-create']);
  }

  deleteGame(id:string) {
    console.log(`deleting game with id of : ${id}`);
    this.gameService.deleteGame(id).then((resp) => {
      if(resp) {
        this.games = this.games.filter((game) => {
          return game['id'] != id;
        });
      }
    });
  }

}
