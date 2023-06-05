import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { DatastorageserviceService } from 'src/app/datastorage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  valCheck: string[] = ['remember'];
  isSubmitted = false;
  user = {firstName:'', lastName:'',email:'',mobile:'', password:'',confirmPassword:''};
  signin = false;
  signupForm! :FormGroup;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  mobileControl = new FormControl('', [Validators.required, Validators.minLength(9)]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  password!: string;

  constructor(public layoutService: LayoutService,
    private ds: DatastorageserviceService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
        firstName:['', Validators.required],
        lastName:['', Validators.required],
        email:this.emailControl,
        mobile:this.mobileControl,
        password:this.passwordControl,
        confirmPassword:['', Validators.required]
    });
  }

  signUp(){
    this.isSubmitted = true;
    this.ds.createUser(this.user).subscribe(
        response => {
          console.log('User created successfully!', response);
          // Handle success response here
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully!' });

        },
        error => {
          console.error('Failed to create user:', error);
          // Handle error response here
          this.messageService.add({ severity: 'error', summary: 'Success', detail: 'Failed to create user' });

        }
      );

    this.signin = true;
    if(this.signupForm.invalid){
      return;
    }

    this.router.navigate(['/']);
  }

  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }


  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}

}
