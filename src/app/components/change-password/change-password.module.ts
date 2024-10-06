import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentsModule } from "../../common/common-components.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    FormsModule,
]
})
export class ChangePasswordModule { }
