import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

 export class ReportesComponent implements OnInit {

  ngOnInit() {
    // Area Chart Example
    var ctx = document.getElementById("myAreaChart") as HTMLCanvasElement;
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Earnings",
          cubicInterpolationMode: 'default',
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            },
            grid: {
              display: false,
              },
            ticks: {
              maxTicksLimit: 7
            }
          },
          y: {
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              callback: function (value: any, index: any, values: any) {
                return '$' + value.toLocaleString();
              }
            },
            grid: {
              color: "rgb(234, 236, 244)"
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            align: 'start',
            labels: {
              boxWidth: 10,
              padding: 15
            }
          },
          tooltip: { // Aquí se cambió de tooltips a tooltip
            backgroundColor: "rgb(255,255,255)",
            titleMarginBottom: 10,
            borderColor: '#dddfeb',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: function (tooltipItem: any) {
                return 'Earnings: $' + tooltipItem.formattedValue;
              }
            }
          }
        }
      }
    });
  }
}
