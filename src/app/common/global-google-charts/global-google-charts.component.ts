import { Component, Input } from '@angular/core';
import { height } from '@mui/system';
import { GoogleChartsModule } from 'angular-google-charts';
import { GraphService } from 'src/app/services/dashboardGraph/graph.service';

@Component({
  selector: 'app-global-google-charts',
  templateUrl: './global-google-charts.component.html',
  styleUrls: ['./global-google-charts.component.scss']
})
export class GlobalGoogleChartsComponent {
  @Input() currentuserType: any;
  data: any[] = [];
  public comboChart = {
    chartType: 'ComboChart',
    dataTable: [
      ['Month', 'Bolts', 'Nuts', 'Washers', 'Profit'],
      ['January', 500, 400, 200, 250],
      ['February', 600, 460, 250, 300],
      ['March', 700, 520, 300, 350],
      ['April', 1000, 620, 350, 400],
    ],
    options: {
      title: 'Monthly Sales & Profit',
      vAxis: { title: 'Amount' },
      hAxis: { title: 'Month' },
      seriesType: 'bars',
      series: { 3: { type: 'line' } }, // Profit displayed as line, others as bars
      colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
    }
  };
  company_id: any;
  depositStatus: any[] = [];
  loanStatus: any;
  customerLoanStatus: any;
  lastDaysAmount: any[] = [];
  memberLoanStatus: any;
  customerDepositStatus: any[] = [];
  depositTotalCustomer: any;
  member_id: any;
  customer_id: any;

  constructor(public _service: GraphService) { }
  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    // const companyData = localStorage.getItem('CompanyData');
    // const memberData = localStorage.getItem('MemberData');
    // const customerData = localStorage.getItem('CustomerData');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.member_id = userData.member_id;
      this.customer_id = userData.customer_id;
    }

    if (this.currentuserType == 1) {
      this.getLastSixMonthDeposit();
      this.getLoanStatus();
    } else if (this.currentuserType == 2) {
      this.getLastTenDaysAmount();
      this.getAssignReceivedAmount();
    } else {
      this.getLastSixMonthDepositForCustomer();
      this.getCustomerLoanStatus();
    }



  }

  drawMastercharts() {

  }

  drawCompanycharts() {
    if (!this.depositStatus.length && !this.loanStatus.length) {
      console.error("Deposit status is empty, cannot draw chart.");
      return;
    }

    // Create the data structure for the chart, expecting the first column to be a label (string) and the second column to be a value (number)
    const chartData: any[][] = [['Days', 'Amount']];

    this.depositStatus.forEach((entry: any) => {
      const dayLabel = entry.month; // Adjust this to match the actual label in your data, e.g., entry.day or entry.label
      const amountValue = Number(entry.deposit_amount); // Ensure amount is a number
      chartData.push([dayLabel, amountValue]);
    });

    const dataTable = google.visualization.arrayToDataTable(chartData);
    const options2 = {
      vAxis: { title: 'Amount' },
      hAxis: { title: 'Days' },
      is3D: true,
      tooltip: { trigger: 'selection' },
    };

    const columnUserElement = document.getElementById('column_company_chart') as HTMLElement;
    const columnUserChart = new google.visualization.ColumnChart(columnUserElement);
    columnUserChart.draw(dataTable, options2);

    // logic for pie chart
    const totalAmount = Number(this.loanStatus.total_loan_amount); // Make sure these fields match your API response
    const pendingAmount = Number(this.loanStatus.total_remaining_amount);
    const completedAmount = totalAmount - pendingAmount; // Calculate completed amount

    // Create pie chart data
    const pieChartData = google.visualization.arrayToDataTable([
      ['Amount Type', 'Amount'],
      ['Pending Amount', pendingAmount],
      ['Completed Amount', completedAmount],
    ]);

    const pieOptions = {
      is3D: true,
      pieHole: 0.4,
    };

    const pieUserElement = document.getElementById('pie_company_chart') as HTMLElement;
    const pieUserChart = new google.visualization.PieChart(pieUserElement);
    pieUserChart.draw(pieChartData, pieOptions);
  }

  drawMembercharts() {

    if (!this.lastDaysAmount.length && !this.memberLoanStatus.length) {
      console.error("Deposit status is empty, cannot draw chart.");
      return;
    }

    // Create the data structure for the chart, expecting the first column to be a label (string) and the second column to be a value (number)
    const chartData: any[][] = [['Days', 'Amount']];

    this.lastDaysAmount.forEach((entry: any) => {
      const dayLabel = entry.date; // Adjust this to match the actual label in your data, e.g., entry.day or entry.label
      const amountValue = Number(entry.received_amount); // Ensure amount is a number
      chartData.push([dayLabel, amountValue]);
    });

    const dataTable = google.visualization.arrayToDataTable(chartData);
    const options2 = {
      vAxis: { title: 'Amount' },
      hAxis: { title: 'Days' },
      is3D: true,
      tooltip: { trigger: 'selection' },
    };

    const columnUserElement = document.getElementById('column_member_chart') as HTMLElement;
    const columnUserChart = new google.visualization.ColumnChart(columnUserElement);
    columnUserChart.draw(dataTable, options2);

    // logic for pie chart
    const totalAmount = Number(this.memberLoanStatus.total_loan_amount); // Make sure these fields match your API response
    const pendingAmount = Number(this.memberLoanStatus.total_remaining_amount);
    const completedAmount = totalAmount - pendingAmount; // Calculate completed amount

    // Create pie chart data
    const pieChartData = google.visualization.arrayToDataTable([
      ['Amount Type', 'Amount'],
      ['Pending Amount', pendingAmount],
      ['Completed Amount', completedAmount],
    ]);

    const pieOptions = {
      is3D: true,
      pieHole: 0.4,
    };

    const pieUserElement = document.getElementById('pie_member_chart') as HTMLElement;
    const pieUserChart = new google.visualization.PieChart(pieUserElement);
    pieUserChart.draw(pieChartData, pieOptions);

  }

  drawUsercharts() {
    if (!this.customerDepositStatus.length && !this.customerLoanStatus.length) {
      console.error("Deposit status is empty, cannot draw chart.");
      return;
    }
    const chartData: any[][] = [['Days', 'Debit', 'Credit']];
    this.customerDepositStatus.forEach((entry: any) => {
      const dayLabel = entry.month; // Adjust this to match the actual label in your data, e.g., entry.day or entry.label
      const debitValue = Number(entry.deposit_amount); // Ensure amount is a number
      const creditValue = Number(entry.withdraw_amount); // Ensure amount is a number
      chartData.push([dayLabel, debitValue, creditValue]);
    });
    const dataTable = google.visualization.arrayToDataTable(chartData);
    const options2 = {
      vAxis: { title: 'Amount' },
      hAxis: { title: 'Month' },
      seriesType: 'bars',
      is3D: true,
      tooltip: { trigger: 'selection' },
    };
    const columnUserElement = document.getElementById('column_user_chart') as HTMLElement;
    const columnUserChart = new google.visualization.ColumnChart(columnUserElement);
    columnUserChart.draw(dataTable, options2);

    // logic for pie chart
    const totalAmount = Number(this.customerLoanStatus[0].total_paid);
    const pendingAmount = Number(this.customerLoanStatus[0].remaining_amount);
    const completedAmount = totalAmount - pendingAmount;
    const pieChartData = google.visualization.arrayToDataTable([
      ['Amount Type', 'Amount'],
      ['Pending Amount', pendingAmount],
      ['Completed Amount', completedAmount],
    ]);
    const pieOptions = {
      is3D: true,
      pieHole: 0.4,
    };
    const pieUserElement = document.getElementById('pie_user_chart') as HTMLElement;
    const pieUserChart = new google.visualization.PieChart(pieUserElement);
    pieUserChart.draw(pieChartData, pieOptions);

  }

  // company dashboard graph api's
  getLastSixMonthDeposit() {
    let obj = {
      company_id: this.company_id,
      // customer_id: '2'
    }
    this._service.lastDepositStatus(obj).subscribe((data: any) => {
      console.log(data.data);
      this.depositStatus = data.data.graphdata || [];
      this.depositTotalCustomer = data.data;
      console.log("Deposit Status:", this.depositStatus);  // Check if data is available

      if (this.depositStatus.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          if (this.currentuserType === 0) {
            this.drawMastercharts();
          } else if (this.currentuserType === 1) {
            this.drawCompanycharts();
          } else if (this.currentuserType === 2) {
            this.drawMembercharts();
          } else if (this.currentuserType === 3) {
            this.drawUsercharts();
          }
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    });

  }

  getLoanStatus() {
    let obj = {
      company_id: this.company_id,
      // member_id: '2'
    }
    this._service.loanStatus(obj).subscribe((data: any) => {
      console.log(data.data);
      this.loanStatus = data.data || [];
      console.log("Deposit Status:", this.loanStatus);  // Check if data is available


      if (this.loanStatus.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          if (this.currentuserType === 0) {
            this.drawMastercharts();
          } else if (this.currentuserType === 1) {
            this.drawCompanycharts();
          } else if (this.currentuserType === 2) {
            this.drawMembercharts();
          } else if (this.currentuserType === 3) {
            this.drawUsercharts();
          }
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    });
  }

  // ============================

  // customer dashboardgraph api's
  getCustomerLoanStatus() {
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id
    }
    this._service.customerLoanStatus(obj).subscribe((data: any) => {
      console.log(data.data);
      this.customerLoanStatus = data.data.loans || [];
      console.log("Deposit Status:", this.customerLoanStatus);  // Check if data is available


      if (this.customerLoanStatus.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          if (this.currentuserType === 0) {
            this.drawMastercharts();
          } else if (this.currentuserType === 1) {
            this.drawCompanycharts();
          } else if (this.currentuserType === 2) {
            this.drawMembercharts();
          } else if (this.currentuserType === 3) {
            this.drawUsercharts();
          }
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    });
  }

  getLastSixMonthDepositForCustomer() {
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id
    }
    this._service.customerLastDepositStatus(obj).subscribe((data: any) => {
      console.log(data.data);
      this.customerDepositStatus = data.data.graphdata || [];
      console.log("Deposit Status:", this.customerDepositStatus);  // Check if data is available

      if (this.customerDepositStatus.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          if (this.currentuserType === 0) {
            this.drawMastercharts();
          } else if (this.currentuserType === 1) {
            this.drawCompanycharts();
          } else if (this.currentuserType === 2) {
            this.drawMembercharts();
          } else if (this.currentuserType === 3) {
            this.drawUsercharts();
          }
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    });

  }

  // =========================

  // member dashboard graph api's
  getLastTenDaysAmount() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id
    }
    this._service.lastDaysAmount(obj).subscribe((data: any) => {
      console.log(data.data);
      this.lastDaysAmount = data.data || [];
      console.log("Last Days Amount:", this.lastDaysAmount);  // Check if data is available


      if (this.lastDaysAmount.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          if (this.currentuserType === 0) {
            this.drawMastercharts();
          } else if (this.currentuserType === 1) {
            this.drawCompanycharts();
          } else if (this.currentuserType === 2) {
            this.drawMembercharts();
          } else if (this.currentuserType === 3) {
            this.drawUsercharts();
          }
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    });
  }

  getAssignReceivedAmount() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id
    }
    this._service.assingReceivedAmoutn(obj).subscribe((data: any) => {
      console.log(data.data);
      this.memberLoanStatus = data.data || [];
      console.log("Deposit Status:", this.memberLoanStatus);  // Check if data is available


      if (this.memberLoanStatus.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          if (this.currentuserType === 0) {
            this.drawMastercharts();
          } else if (this.currentuserType === 1) {
            this.drawCompanycharts();
          } else if (this.currentuserType === 2) {
            this.drawMembercharts();
          } else if (this.currentuserType === 3) {
            this.drawUsercharts();
          }
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    });
  }

  loan(data: any, loan: any) {

    // logic for pie chart
    const totalAmount = Number(data.total_paid); // Make sure these fields match your API response
    const pendingAmount = Number(data.remaining_amount);
    // if (totalAmount < 0 || pendingAmount < 0) {
    //   console.error('Negative values detected in the data. Please check the API response.');
    // }
    const completedAmount = totalAmount - pendingAmount; // Calculate completed amount
    // Create pie chart data
    const pieChartData = google.visualization.arrayToDataTable([
      ['Amount Type', 'Amount'],
      ['Pending Amount', pendingAmount],
      ['Completed Amount', completedAmount],
    ]);

    const pieOptions = {
      is3D: true,
      pieHole: 0.4,
    };

    const pieUserElement = document.getElementById('pie_user_chart') as HTMLElement;
    const pieUserChart = new google.visualization.PieChart(pieUserElement);
    pieUserChart.draw(pieChartData, pieOptions);
  }
}
