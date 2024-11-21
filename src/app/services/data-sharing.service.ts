import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private depositData: any;
  private loanData: any;
  private collection_type: any;

  setDepositData(data: any, type: any): void {
    this.depositData = data;
    this.collection_type = type;
  }

  getDepositData(): { data: any; type: any } {
    return { data: this.depositData, type: this.collection_type };
  }

  setLoanData(data: any, type: any): void {
    this.loanData = data;
    this.collection_type = type;
  }

  getLoanData(): { data: any; type: any } {
    return { data: this.loanData, type: this.collection_type };
  }
}
