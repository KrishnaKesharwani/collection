import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InterviewComponent } from './interview.component';

const routes: Routes = [
  {
    path: '',
    component: InterviewComponent
  }
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class InterviewRoutingModule {
}
