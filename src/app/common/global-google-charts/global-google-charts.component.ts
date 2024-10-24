import { Component, Input } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-global-google-charts',
  templateUrl: './global-google-charts.component.html',
  styleUrls: ['./global-google-charts.component.scss']
})
export class GlobalGoogleChartsComponent {
  @Input() currentuserType: any;
  data: any []=[];
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
  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
    if (this.currentuserType == 0) {
      this.drawMastercharts();
    } else if (this.currentuserType == 1) {
      this.drawCompanycharts();
    } else if (this.currentuserType == 2) {
      this.drawMembercharts();
    } else if (this.currentuserType == 3) {
      // this.drawUsercharts();
      google.charts.setOnLoadCallback(this.drawUsercharts);
    }
  }

  drawMastercharts() {

  }
  drawCompanycharts() {

  }
  drawMembercharts() {

  }
  drawUsercharts() {
    var userdataColoum = google.visualization.arrayToDataTable([
      ['Month', 'Deposit', 'Creadit'],
      ['Junuary', 15000, 20000],
      ['February', 20000, 25000],
      ['March', 13000, 16000],
      ['April', 22000, 25000],
      ['May', 14000, 16000],
      ['June', 14000, 16000],
    ]);
    var comboOptions = {
      vAxis: { title: 'Amount' },
      hAxis: { title: 'Month' },
      seriesType: 'bars',
      is3D: true,
      tooltip: {trigger: 'selection'},
    };
    var loandata = google.visualization.arrayToDataTable([
      ['Loans', 'Amount'],
      ['Pending Amount', 5000],
      ['Paid Amount', 15000],
    ]);
    var options = {
      is3D: true,
      pieHole: 0.4,
    };
    const columnUserElement = document.getElementById('column_user_chart') as HTMLElement;
    const pieUserElement = document.getElementById('pie_user_chart') as HTMLElement;    
    var columnUserChart = new google.visualization.ComboChart(columnUserElement);
    columnUserChart.draw(userdataColoum, comboOptions);
    var pieUserChart = new google.visualization.PieChart(pieUserElement);
    pieUserChart.draw(loandata, options);
  }

  drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);
    var options = {
      'title': 'How Much Pizza I Ate Last Night',
      'width': 400,
      'height': 300,
      is3D: true,
    };

    // code for donut chart
    // var data2 = google.visualization.arrayToDataTable([
    //   ['Task', 'Hours per Day'],
    //   ['Work', 11],
    //   ['Eat', 2],
    //   ['Commute', 2],
    //   ['Watch TV', 2],
    //   ['Sleep', 7]
    // ]);

    // var options2 = {
    //   title: 'My Daily Activities',
    //   pieHole: 0.4,
    // };

    const columnElement = document.getElementById('column_div') as HTMLElement
    const pieElement = document.getElementById('pie_div') as HTMLElement
    const comboElement = document.getElementById('combo_div') as HTMLElement
    const donutElement = document.getElementById('donut_div') as HTMLElement

    var columnChart = new google.visualization.ColumnChart(columnElement);
    var pieChart = new google.visualization.PieChart(pieElement);
    var comboChart = new google.visualization.ComboChart(comboElement);
    var donutChart = new google.visualization.PieChart(donutElement);

    columnChart.draw(data, options);
    pieChart.draw(data, options);
    comboChart.draw(data, options);
    donutChart.draw(data, options);
  }

}
