import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private toast: NgToastService, private route: Router) {

this.loginForm = fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required],
})
  }
  ngOnInit(): void {

  }

  logIn(){
    this.isLoading = true;

    const loginRequest = { 
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,

     };

    this.authService.loginRequest(loginRequest).subscribe((response: any) =>{
      console.log(response, 'response');
      if (response.data != null) {
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('token', response.data.token);
        console.log(response.data.user.id, 'Res Id')
        this.route.navigate(['/dashboard']);
        this.isLoading = false;
        this.toast.success({
          detail: `Welcome Back, ${response.data.user.firstName}!`,
          duration: 5000, position:'topCenter',
          summary: response.responseMessage,
        });

      }
    },
    error => {
      this.isLoading = false;
      console.error('Login error:', error);
      if(error.status != 0)
      this.toast.error({
        detail: error.error.responseMessage,
        summary: 'Check your details and try again..',
        duration: 5000, position:'topCenter',
      });
    }
    )
  }
  loginIn() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authService.loginRequest(this.loginForm.value).subscribe(
        response => {

          if (response.data != null) {
            localStorage.setItem('userId', response.data.profile.id);
            localStorage.setItem('token', response.data.token);
            console.log(response.data.profile.id, 'Res Id')
            this.route.navigate(['/dashboard']);
            this.isLoading = false;

            // Swal.fire({
            //   icon: 'warning',
            //   text: response.responseMessage,
            //   title: `Welcome Back, ${response.data.profile.firstName}!`,
            //   confirmButtonText: 'OK',
              
            // });
            this.toast.success({
              detail: `Welcome Back, ${response.data.profile.firstName}!`,
              duration: 5000, position:'topCenter',
              summary: response.responseMessage,
            });

          }
          console.log('Login successful:', response);
        },
        error => {
          console.error('Login error:', error);
          this.isLoading = false;
          let errorMessage = "Something went wrong"; // Default error message
          let errorText = ""; // Default error text

          if (error.status === 401 && error.error && error.error.responseMessage) {
            errorMessage = error.error.responseMessage;
            errorText = " Check your details and try again";
          } else if (error.status === 0) {
            errorMessage = "Something went wrong";
            errorText = "Check your internet and try again";
          }
          this.toast.error({
            detail: errorMessage,
            summary: errorText,
            duration: 5000, position:'topCenter',
          });
        }
      );
    }
  }





  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
