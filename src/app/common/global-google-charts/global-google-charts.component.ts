import { Component, Input } from '@angular/core';
import { height } from '@mui/system';
import { GoogleChartsModule } from 'angular-google-charts';
import { GraphService } from 'src/app/services/dashboardGraph/graph.service';

declare var google: any;
@Component({
  selector: 'app-global-google-charts',
  templateUrl: './global-google-charts.component.html',
  styleUrls: ['./global-google-charts.component.scss']
})
export class GlobalGoogleChartsComponent {
  @Input() currentuserType: any;
  data: any[] = [];
  // public comboChart = {
  //   chartType: 'ComboChart',
  //   dataTable: [
  //     ['Month', 'Bolts', 'Nuts', 'Washers', 'Profit'],
  //     ['January', 500, 400, 200, 250],
  //     ['February', 600, 460, 250, 300],
  //     ['March', 700, 520, 300, 350],
  //     ['April', 1000, 620, 350, 400],
  //   ],
  //   options: {
  //     title: 'Monthly Sales & Profit',
  //     vAxis: { title: 'Amount' },
  //     hAxis: { title: 'Month' },
  //     seriesType: 'bars',
  //     series: { 3: { type: 'line' } }, // Profit displayed as line, others as bars
  //     colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
  //   }
  // };
  company_id: any;
  loader: boolean = false;
  depositStatus: any[] = [];
  loanStatus: any;
  customerLoanStatus: any;
  lastDaysAmount: any[] = [];
  memberLoanStatus: any;
  customerDepositStatus: any[] = [];
  depositTotalCustomer: any;
  member_id: any;
  customer_id: any;
  memberloader = true;
  customerloader = true;
  companyloader = true;
  constructor(public _service: GraphService) { }

  ngOnInit() {
    // debugger;
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.member_id = userData.member_id;
      this.customer_id = userData.customer_id;
    }
    setTimeout(() => {
      this.loadGoogleCharts();
    }, 100);
    // if (this.currentuserType == 1) {
    //   this.getLastSixMonthDeposit();
    //   this.getLoanStatus();
    // } else if (this.currentuserType == 2) {
    //   setTimeout(() => {
    //     this.loadGoogleCharts();
    //   }, 100);
    //   // this.getAssignReceivedAmount();
    //   // this.getLastTenDaysAmount();
    // } else {
    //   this.getLastSixMonthDepositForCustomer();
    //   this.getCustomerLoanStatus();
    // }
  }

  loadGoogleCharts() {
    if (typeof google === 'undefined' || !google.charts) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => this.initializeChart();
      document.body.appendChild(script);
    } else {
      this.initializeChart();
    }
  }

  initializeChart() {
    google.charts.load('current', { packages: ['corechart'] });
    if (this.currentuserType == 1) {
      google.charts.setOnLoadCallback(() => this.getLastSixMonthDeposit());
      google.charts.setOnLoadCallback(() => this.getLoanStatus());
      setTimeout(() => {
        this.companyloader = false;
      }, 1000);
    } else if (this.currentuserType == 2) {
      google.charts.setOnLoadCallback(() => this.getAssignReceivedAmount());
      google.charts.setOnLoadCallback(() => this.getLastTenDaysAmount());
      setTimeout(() => {
        this.memberloader = false;
      }, 1000);
    } else if (this.currentuserType == 3) {
      google.charts.setOnLoadCallback(() => this.getLastSixMonthDepositForCustomer());
      // google.charts.setOnLoadCallback(() => this.getCustomerLoanStatus());
      setTimeout(() => {
        this.customerloader = false;
      }, 1000);
    }
  }

  // drawMastercharts() { }

  // drawCompanycharts() {
  //   // if (!this.depositStatus.length && !this.loanStatus.length) {
  //   //   console.error("Deposit status is empty, cannot draw chart.");
  //   //   return;
  //   // }
  //   const chartData: any[][] = [['Days', 'Amount']];

  //   this.depositStatus.forEach((entry: any) => {
  //     const dayLabel = entry.month;
  //     const amountValue = Number(entry.deposit_amount);
  //     chartData.push([dayLabel, amountValue]);
  //   });

  //   const dataTable = google.visualization.arrayToDataTable(chartData);
  //   const options2 = {
  //     vAxis: { title: 'Amount' },
  //     hAxis: { title: 'Days' },
  //     is3D: true,
  //     tooltip: { trigger: 'selection' },
  //   };

  //   const columnUserElement = document.getElementById('column_company_chart') as HTMLElement;
  //   const columnUserChart = new google.visualization.ColumnChart(columnUserElement);
  //   columnUserChart.draw(dataTable, options2);

  //   // logic for pie chart
  //   const totalAmount = Number(this.loanStatus.total_loan_amount);
  //   const pendingAmount = Number(this.loanStatus.total_remaining_amount);
  //   const completedAmount = totalAmount - pendingAmount;

  //   const pieChartData = google.visualization.arrayToDataTable([
  //     ['Amount Type', 'Amount'],
  //     ['Pending Amount', pendingAmount],
  //     ['Completed Amount', completedAmount],
  //   ]);
  //   const pieOptions = {
  //     is3D: true,
  //     pieHole: 0.4,
  //   };

  //   const pieUserElement = document.getElementById('pie_company_chart') as HTMLElement;
  //   const pieUserChart = new google.visualization.PieChart(pieUserElement);
  //   pieUserChart.draw(pieChartData, pieOptions);
  // }

  // drawMembercharts() {
  //   // debugger;
  //   // if (!this.lastDaysAmount.length && !this.memberLoanStatus.length) {
  //   //   console.error("Deposit status is empty, cannot draw chart.");
  //   //   return;
  //   // }

  //   const chartData: any[][] = [['Days', 'Amount']];
  //   this.lastDaysAmount.forEach((entry: any) => {
  //     const dayLabel = entry.date;
  //     const amountValue = Number(entry.received_amount);
  //     chartData.push([dayLabel, amountValue]);
  //   });

  //   const dataTable = google.visualization.arrayToDataTable(chartData);
  //   const options2 = {
  //     vAxis: { title: 'Amount' },
  //     hAxis: { title: 'Days' },
  //     is3D: true,
  //     tooltip: { trigger: 'selection' },
  //   };

  //   const columnUserElement = document.getElementById('column_member_chart') as HTMLElement;
  //   const columnUserChart = new google.visualization.ColumnChart(columnUserElement);
  //   columnUserChart.draw(dataTable, options2);

  //   // // logic for pie chart
  //   // const totalAmount = Number(this.memberLoanStatus.total_loan_amount);
  //   // const pendingAmount = Number(this.memberLoanStatus.total_remaining_amount);
  //   // const completedAmount = totalAmount - pendingAmount;

  //   // const pieChartData = google.visualization.arrayToDataTable([
  //   //   ['Amount Type', 'Amount'],
  //   //   ['Pending Amount', pendingAmount],
  //   //   ['Completed Amount', completedAmount],
  //   // ]);
  //   // const pieOptions = {
  //   //   is3D: true,
  //   //   pieHole: 0.4,
  //   // };
  //   // const pieUserElement = document.getElementById('pie_member_chart') as HTMLElement;
  //   // const pieUserChart = new google.visualization.PieChart(pieUserElement);
  //   // pieUserChart.draw(pieChartData, pieOptions);

  // }

  // drawUsercharts() {
  //   if (!this.customerDepositStatus.length && !this.customerLoanStatus.length) {
  //     console.error("Deposit status is empty, cannot draw chart.");
  //     return;
  //   }
  //   const chartData: any[][] = [['Days', 'Debit', 'Credit']];
  //   this.customerDepositStatus.forEach((entry: any) => {
  //     const dayLabel = entry.month;
  //     const debitValue = Number(entry.deposit_amount);
  //     const creditValue = Number(entry.withdraw_amount);
  //     chartData.push([dayLabel, debitValue, creditValue]);
  //   });
  //   const dataTable = google.visualization.arrayToDataTable(chartData);
  //   const options2 = {
  //     vAxis: { title: 'Amount' },
  //     hAxis: { title: 'Month' },
  //     seriesType: 'bars',
  //     is3D: true,
  //     tooltip: { trigger: 'selection' },
  //   };
  //   const columnUserElement = document.getElementById('column_user_chart') as HTMLElement;
  //   const columnUserChart = new google.visualization.ColumnChart(columnUserElement);
  //   columnUserChart.draw(dataTable, options2);

  //   // logic for pie chart
  //   const totalAmount = Number(this.customerLoanStatus[0].total_paid);
  //   const pendingAmount = Number(this.customerLoanStatus[0].remaining_amount);
  //   const completedAmount = totalAmount - pendingAmount;
  //   const pieChartData = google.visualization.arrayToDataTable([
  //     ['Amount Type', 'Amount'],
  //     ['Pending Amount', pendingAmount],
  //     ['Completed Amount', completedAmount],
  //   ]);
  //   const pieOptions = {
  //     is3D: true,
  //     pieHole: 0.4,
  //   };
  //   const pieUserElement = document.getElementById('pie_user_chart') as HTMLElement;
  //   const pieUserChart = new google.visualization.PieChart(pieUserElement);
  //   pieUserChart.draw(pieChartData, pieOptions);

  // }

  // company dashboard graph api's
  getLastSixMonthDeposit() {
    // this.loader = true;
    let obj = {
      company_id: this.company_id,
    }
    this._service.lastDepositStatus(obj).subscribe((data: any) => {
      this.depositStatus = data.data.graphdata || [];
      this.depositTotalCustomer = data.data;
      // this.loader = false;
      if (this.depositStatus.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          const chartData: any[][] = [['Days', 'Amount']];
          this.depositStatus.forEach((entry: any) => {
            const dayLabel = entry.month;
            const amountValue = Number(entry.deposit_amount);
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
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    }, error => {
      this.loader = false;
    });
  }
  getLoanStatus() {
    let obj = {
      company_id: this.company_id,
    }
    this._service.loanStatus(obj).subscribe((data: any) => {
      this.loanStatus = data.data || [];
      if (this.loanStatus) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          const totalAmount = Number(this.loanStatus.total_loan_amount);
          const pendingAmount = Number(this.loanStatus.total_remaining_loan_amount);
          const finalPendingAmount = totalAmount - pendingAmount;
          const pieChartData = google.visualization.arrayToDataTable([
            ['Amount Type', 'Amount'],
            ['Pending Amount', finalPendingAmount],
            ['Total Amount', totalAmount],
          ]);
          const pieOptions = {
            is3D: true,
            pieHole: 0.4,
          };
          const pieUserElement = document.getElementById('pie_company_chart') as HTMLElement;
          const pieUserChart = new google.visualization.PieChart(pieUserElement);
          pieUserChart.draw(pieChartData, pieOptions);
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    }, error => {
    });
  }

  // customer dashboardgraph api's
  getCustomerLoanStatus() {
    // debugger;
    // this.loader = true;
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id
    }
    this._service.customerLoanStatus(obj).subscribe((data: any) => {
      this.customerLoanStatus = data.data.loans || [];
      // this.loader = false;
      if (this.customerLoanStatus.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
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
        });
      } else {
        console.error("No deposit status data available to draw charts.");
      }
    }, error => {

    });
  }
  getLastSixMonthDepositForCustomer() {
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id
    }
    this._service.customerLastDepositStatus(obj).subscribe((data: any) => {
      this.customerDepositStatus = data.data.graphdata || [];
      const chartData: any[][] = [['Days', 'Debit', 'Credit']];
      this.customerDepositStatus.forEach((entry: any) => {
        const dayLabel = entry.month;
        const debitValue = Number(entry.deposit_amount);
        const creditValue = Number(entry.withdraw_amount);
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
    }, error => {
      this.customerloader = false;
    });
  }
  // member dashboard graph api's
  getLastTenDaysAmount() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id
    }
    this._service.lastDaysAmount(obj).subscribe((data: any) => {
      this.lastDaysAmount = data.data || [];
      if (this.lastDaysAmount.length > 0) {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
          const chartData: any[][] = [['Days', 'Amount']];
          this.lastDaysAmount.forEach((entry: any) => {
            const dayLabel = entry.date;
            const amountValue = Number(entry.received_amount);
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
        });
      } else {
        // console.error("No deposit status data available to draw charts.");
      }
    }, error => {

    });
  }
  getAssignReceivedAmount() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id
    }
    this._service.assingReceivedAmoutn(obj).subscribe((data: any) => {
      this.memberLoanStatus = data.data || [];
      // google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(() => {
        // debugger;
        // const chartData: any[][] = [['Days', 'Amount']];
        // const totalAmount = Number(this.memberLoanStatus.total_customers);
        // const pendingAmount = Number(this.memberLoanStatus.attended_customers);
        // const completedAmount = totalAmount - pendingAmount;
        const totalCustomer =Number(this.memberLoanStatus.total_customers);
        const pendingCustomer = Number(this.memberLoanStatus.remaining_customers);
        const pieChartData = google.visualization.arrayToDataTable([
          ['Collection', 'Amount'],
          ['Pending Customer', pendingCustomer],
          ['Assign Customer', totalCustomer],
        ]);
        const pieOptions = {
          is3D: true,
          pieHole: 0.4,
        };
        const pieUserElement = document.getElementById('pie_member_chart') as HTMLElement;
        const pieUserChart = new google.visualization.PieChart(pieUserElement);
        pieUserChart.draw(pieChartData, pieOptions);
      });
    }, error => {
      console.log('member Loan Status', this.memberLoanStatus);
      this.loader = false;
    });
  }

  // Extra Function
  // loan(data: any, loan: any) {

  //   // logic for pie chart
  //   const totalAmount = Number(data.total_paid); // Make sure these fields match your API response
  //   const pendingAmount = Number(data.remaining_amount);
  //   // if (totalAmount < 0 || pendingAmount < 0) {
  //   //   console.error('Negative values detected in the data. Please check the API response.');
  //   // }
  //   const completedAmount = totalAmount - pendingAmount; // Calculate completed amount
  //   // Create pie chart data
  //   const pieChartData = google.visualization.arrayToDataTable([
  //     ['Amount Type', 'Amount'],
  //     ['Pending Amount', pendingAmount],
  //     ['Completed Amount', completedAmount],
  //   ]);

  //   const pieOptions = {
  //     is3D: true,
  //     pieHole: 0.4,
  //   };

  //   const pieUserElement = document.getElementById('pie_user_chart') as HTMLElement;
  //   const pieUserChart = new google.visualization.PieChart(pieUserElement);
  //   pieUserChart.draw(pieChartData, pieOptions);
  // }
}
