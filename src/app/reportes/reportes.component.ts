import { Component, OnInit } from '@angular/core';
import { Reporte, Vivienda } from '../Modelos/Entidades.model';
import Chart from 'chart.js/auto';
import { SviviendasService } from '../sviviendas.service';
	
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

 export class ReportesComponent implements OnInit {

  reporte:Reporte=new Reporte()
  chart: any;
  chart2: any;
  chartPai:number=0
  chartBar:number=0
  liElegido:number=0

  constructor(private sViviendas:SviviendasService){}

  ngOnInit() {
    this.ObtenerReporte(1);    
    //this.crearChart('pai');
  }

  ObtenerReporte(eleccion:number){
    this.liElegido=eleccion;
    this.sViviendas.ObtenerReporte(eleccion).subscribe(
      reporte=>{
        this.reporte=reporte
        this.crearChart('bar','miChart', this.chart);
        this.crearChart('pie','miPieChart', this.chart2)
      },
      error=>{
        console.log('Un error al obtener el reporte '+eleccion, error)
      }
    )
  }

  crearChart(tipoChart:ChartType, idHtml:string, chart:Chart) {

    const pie = document.getElementById('pie') as HTMLDivElement
	  const barra = document.getElementById('bar') as HTMLDivElement
    
    if(this.chartBar>=1 && idHtml=='miChart'){
      barra.innerHTML=''
      barra.innerHTML='<canvas id="miChart"></canvas>'
      this.chartBar=0;
    }else if(this.chartPai>=1 && idHtml=='miPieChart'){	
      pie.innerHTML=''
      pie.innerHTML='<canvas id="miPieChart"></canvas>'		
      this.chartPai=0;
    }
    
  const ctx = document.getElementById(idHtml) as HTMLCanvasElement;

	if(idHtml=='miChart'){
		this.chartBar=this.chartBar+1;
	}else if (idHtml=='miPieChart'){
		this.chartPai=this.chartPai+1;
	}
		
	
	
    chart = new Chart(ctx, {
      type: tipoChart, // Puedes cambiar el tipo de gráfico según tus necesidades --pie
      data: {
        labels: this.reporte.ListaDescriptores, // Ejemplo de etiquetas
        datasets: [{
          label: 'Cantidad de Viviendas',
          data: this.reporte.ListaValores, // Ejemplo de datos
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
type ChartType = 'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter' | 'pie';