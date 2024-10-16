import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-global-google-charts',
  templateUrl: './global-google-charts.component.html',
  styleUrls: ['./global-google-charts.component.scss']
})
export class GlobalGoogleChartsComponent {
  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
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
      pieHole: 0.4,
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
