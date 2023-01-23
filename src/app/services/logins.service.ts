import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})


export class LoginsService {


  getUsers(username: string, password: string) {
    console.log(username, password);
    fetch('http://localhost:8000/api/users/' + username)
      .then(response => response.json())
      .then(data => {
        console.log(data[0].password);
        bcrypt.compare(password, data[0].password, (err, res) => {
          if (res) {
            window.localStorage.setItem('username', username);
            window.localStorage.setItem('userId', data[0].id);
            this.router.navigate(['/input']);
          } else {
            alert("Wrong password");
          }
        });
      })
  };

  constructor(private router: Router) { }
}
