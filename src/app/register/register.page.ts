import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { CrudService } from './../services/crud.service';
import { timeout } from 'q';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ],
   'name': [
     { type: 'required', message: 'Name is required.' },
     { type: 'minlength', message: 'Name is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
     { type: 'minlength', message: 'Age is Required.' }
   ],
   'address': [
     { type: 'required', message: 'Address is required.' },
     { type: 'minlength', message: 'Address is required.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) {}
 
  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])),
      age: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ]))
    });
  }
 
  async tryRegister(value){
    await this.authService.registerUser(value)
     .then
      (res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
     await this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
      }, err => {
        this.errorMessage = err.message;
      })
     
     let record = {};
     record['Name'] = value.name;
     record['Age'] = value.age;
     record['Address'] = value.address;
    await this.crudService.create_NewUser(record,'Users').then(resp => {
       console.log(resp);
     })
       .catch(error => {
         console.log(error);
       });

    this.navCtrl.navigateForward('/home');
   }
  
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }
 
 
}
