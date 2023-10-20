import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/Services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  isLoading: boolean = false;
  registerForm!: FormGroup;
  states: string[] = [];
  countries: any[] = [];
  showPassword: boolean = false;
  constructor( private fb: FormBuilder, private authService: AuthenticationService, private toast: NgToastService, private route: Router) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      role: [''],
      registeredDate: [''],
      lastLoggedIn: [''],
      status: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })

  }

  ngOnInit(): void {
   this.stepOne();
  }
stepOne(){
this.step1 = true
this.step3 = false
this.step4 = false
this.step2 = false
}
stepTwo(){
this.step1 = false
this.step3 = false
this.step4 = false
this.step2 = true
}
stepThree(){
this.step1 = false
this.step3 = true
this.step4 = false
this.step2 = false
}

  // onCountrySelect(event: Event): void {
  //   const selectedCountry = (event.target as HTMLSelectElement).value;
  //   if (selectedCountry) {
  //     const country = this.countries.find(c => c.name.common === selectedCountry);
  //     console.log(country, 'TTTTT')
  //     if (country) {
  //       this.states = country.states?.map((state: any) => state.name) || [];
  //       this.registerForm.get('state')?.reset();
  //     }
  //   } else {
  //     this.states = [];
  //     this.registerForm.get('state')?.reset();
  //   }
  // }



  register(){
    this.isLoading = true;
    this.registerForm.value.registeredDate = new Date();
    this.registerForm.value.lastLoggedIn = new Date();

    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe((response: any) =>{
        console.log(response, 'response');
        if (response.statusCode === 200) {
          console.log(response, 'Res')
          this.route.navigate(['/login']);
          this.toast.success({
            detail: response.responseMessage,
            summary: 'Kindly login to continue',
          });
  
        }
      },
      error => {
        this.isLoading = false;
        console.error(' error:', error);
        if(error.status != 0)
        this.toast.error({
          detail: error.error.responseMessage,
          summary: 'Please try again..',
          duration: 5000, position:'topCenter',
        });
      }
      )
    }
  

   
  }
  // register() {
  //   this.registerForm.value.registeredDate = new Date();
  //   this.registerForm.value.lastLoggedIn = new Date();

  //   this.isLoading = true;
  //   if (this.registerForm.valid) {

  //     this.authService.register(this.registerForm.value).subscribe(
  //       response => {
  //         console.log(response, 'res')

  //         if (response.data != null) {
  //           this.isLoading = false;
  //           this.toast.success({
  //             detail: response.responseMessage,
  //             summary: 'Welcome To Ash Hotel',
  //           });
  //           this.route.navigateByUrl('/login');
  //         }else{
  //           this.toast.warning({
  //             detail: response.responseMessage,
  //             // summary: 'Welcome To Ash Hotel',
  //           });
  //         }
  //         // console.log('Login successful:', response);
  //       },
  //       error => {
  //         console.error('error:', error);
  //         this.isLoading = false;
         
  //        } );
  //   }
  // }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
