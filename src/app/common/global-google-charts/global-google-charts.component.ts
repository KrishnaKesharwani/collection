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
      'height': 300
    };
    const element = document.getElementById('chart_div') as HTMLElement
    var chart = new google.visualization.PieChart(element);
    chart.draw(data, options);
  }

}
