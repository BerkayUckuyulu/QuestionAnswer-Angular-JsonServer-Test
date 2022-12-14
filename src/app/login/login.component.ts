import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.userService
      .getUserByEmail(this.loginForm.get('email')?.value)
      .subscribe((response) => {
        if (response.length > 0) {
          if (response[0].password === this.loginForm.get('password')?.value) {
            this.userService.user = response[0];
            localStorage.setItem('user', JSON.stringify(response[0]));
            this.router.navigateByUrl('/home');
          } else {
            this.snackBar.open('Lütfen Şifrenizi Doğru Giriniz.', 'Kapat');
          }
        } else {
          this.snackBar.open('Böyle bir hesap bulunamadı', 'Kapat');
        }
      });
  }
}
