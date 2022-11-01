import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  createUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.createUserForm.controls;
  }
  createAccount() {
    this.userService
      .createAccount(this.createUserForm.value)
      .subscribe((response) => {
        console.log(response);
        this.snackBar.open(
          'Kaydınız başarıyla oluşturulmuştur.Giriş Yapınız',
          'Tamam'
        );
        this.router.navigateByUrl('/login');
      });
  }
}
