import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Object;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    // console.log(this.activatedRoute.snapshot.params['id'])
    this.userService.getUserById(this.activatedRoute.snapshot.params['id'])
      .then((resp) => {
        // console.log('resp user', resp);
        this.user = resp;
      });
  }

  updateUser(user: any) {
    // console.log('user', user);
    const userID = user.id;
    delete user.id;
    this.userService.updateUser(userID, user).then((resp) => {
      // console.log('resp', resp);
      if (resp) {
        this.router.navigate(['users']);
      }
    });
  }

}
