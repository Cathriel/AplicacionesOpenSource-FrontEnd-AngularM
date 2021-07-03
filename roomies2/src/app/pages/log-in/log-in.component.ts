import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/authentication/token-storage.service";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn=false;
  isLoginFailed=false;
  errorMessage='';
  roles: string[] = [];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit():void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn=true;
      this.roles=this.tokenStorageService.getUser().roles;
    }
  }
  reloadPage():void{
    window.location.reload();
  }
  onSubmit():void{
    console.log("hola");
    console.log(this.form.value);
    console.log(this.form.value);
    this.authService.login(this.form.value).subscribe(
      data=>{
        console.log(data);
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.isLoginFailed=false;
        this.isLoggedIn=true;
        this.roles=this.tokenStorageService.getUser().roles;
        return this.router.navigate(['/']).then(()=>{
          console.log(this.router.url);
          window.location.reload();
        });
      },
      error => {
        console.log(error.error.errorMessage);
        this.errorMessage = error.error.errorMessage;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    )
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

}

