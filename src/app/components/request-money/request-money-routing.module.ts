import { NgModule } from '@angular/core';
import { RequestMoneyComponent } from './request-money.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RequestMoneyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RequestMoneyRoughtingModule { }
