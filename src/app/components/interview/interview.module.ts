import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewComponent } from './interview.component';
import { InterviewRoutingModule } from './interview-routing.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/material.module";
import { CommonComponentsModule } from "src/app/common/common-components.module";

@NgModule({
  declarations: [InterviewComponent],
  imports: [
    CommonModule,
    InterviewRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonComponentsModule
],
exports: [InterviewComponent],
})
export class InterviewModule { }
