import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: IUser[] = [];

  ngOnInit(): void {
    this.userService.getUser().subscribe((response) => {
      console.log(response);
      this.user.push(response);
    });
  }
}
