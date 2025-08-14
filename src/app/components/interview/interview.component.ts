import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
// import { MaterialModule } from "src/app/material.module";
import { InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
})
export class InterviewComponent {
  loginForm!: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private interview: InterviewService) {
  }

  items = [
    { price: 100, quantity: 2, name: 'Sachin' },
    { price: 200, quantity: 3, name: 'Rahul' },
    { price: 300, quantity: 4, name: 'Sourav' },
    { price: 400, quantity: 5, name: 'Virat' }
  ];

  finalResult: any = [];
  price = [200, 300, 400, 400];
  duplicatePrice = [200, 300, 400, 400];
  quantity = [2, 3, 4, 5];
  filterGreater: any;
  combinedarray: any;
  removeDuplicate: any;
  margedArray: any;
  getApidate: any;

  ngOnInit() {
    //  this.margedArray= [...this.price, ...this.quantity];
    // const totalprice = price.map((prices, index) => prices * quantity[index]);
    this.price = this.price.map((price, index) => price * this.quantity[index]);
    this.filterGreater = this.price.filter((price) => price > 500);
    // this.combinedarray = this.price.map((price, index, totalval) => ({
    //   price: price,
    //   quantity: this.quantity[index],
    //   total: price * this.quantity[index],
    //   totalval: this.filterGreater[index]
    // }));
    // this.removeDuplicate = [...new Set(this.duplicatePrice)];

    // this.removeDuplicate = [...new Set(this.duplicatePrice)];
    this.removeDuplicate = this.duplicatePrice.filter((value, index, run) => run.indexOf(value) === index);
    // alert(totalprice);
    // totalprice.forEach((price, index) => {
    //   this.finalResult.push({
    //     price: price,
    //     quantity: quantity[index],
    //     name: this.items[index].name
    //   });
    //   alert(this.finalResult);
    //   console.log(totalprice);

    //   // this.finalResult = totalprice;
    //   // alert(this.finalResult);
    // })
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.interview.getLoginDetails(this.loginForm).subscribe((response: any)=> {
      if(response.data){
        
      }
    })
    
  }

  submitLogin() {
    if (this.loginForm?.valid) {
      this.loginForm.markAllAsTouched();


      console.log('Form submitted:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
