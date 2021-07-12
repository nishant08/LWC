/*import {LightningElement, wire, track} from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityChartCntrl.getOpportunities';
export default class OpportunityBarChart extends LightningElement {
 @track chartConfiguration;

 @wire(getOpportunities, {})
 getOpportunities({error, data}) {
  if (error) {
   this.error = error;
   console.log('error => ' + JSON.stringify(error));
   this.chartConfiguration = undefined;
  } else if (data) {
   //let chartData = [];
   let chartLabels = [];
   /*data.forEach(opp => {
    chartData.push(opp.Amount);
    chartLabels.push(opp.Name);
   });*/
/*console.log('============ ', data)
    let chartData = Object.assign({},data);
    /*
      this.opportunityData will in the below format
      [['Closed Won',2],['Closed Lost',4],['Negotiation',5]];
    */
    /*for(let key in chartData){
        key='Needs Analysis'
      if(chartData.hasOwnProperty(key)){
        let tempData=[key, chartData[key]];
        this.chartData.push(tempData);
      }
    }
  




   this.chartConfiguration = {
    type: 'bar',
    data: {
     labels: chartLabels,
     datasets: [
      {
       label: 'Closed Won Last Week',
       barPercentage: 0.5,
       barThickness: 6,
       maxBarThickness: 8,
       minBarLength: 2,
                            backgroundColor: "green",
       data: chartData,
      },
     ],
    },
    options: {
    },
   };
   console.log('data => ', data);
   this.error = undefined;
  }
 }
}*/







import { LightningElement,wire,track} from 'lwc';
//importing the Chart library from Static resources
import chartjs from '@salesforce/resourceUrl/ChartJs1'; 
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//importing the apex method.
import getAllAccountsByRating from '@salesforce/apex/OpportunityChartCntrl.getAllAccountsByRating';
export default class FourthLwc extends LightningElement {
@wire (getAllAccountsByRating) accounts({error,data})
{
   if(data)
   {
      for(var key in data)
       {
          this.updateChart(data[key].count,data[key].label);
       }
      this.error=undefined;
   }
  else if(error)
  {
     this.error = error;
     this.accounts = undefined;
  }
}
chart;
chartjsInitialized = false;
config={
type : 'bar',
data :{
datasets :[
{
data: [
],
backgroundColor :[
    'rgb(255,99,132)',
    'rgb(255,159,64)',
    'rgb(255,205,86)',
    'rgb(75,192,192)',
],
   label:'Dataset 1'
}
],
labels:[]
},
options: {
    responsive : true,
legend : {
    position :'right'
},
animation:{
   animateScale: true,
   animateRotate : true
},






    scales: {
        xAxes: [
            {
                beginAtZero: true,
                ticks: {
                    autoSkip: false
                }
            }
        ]
    }






}
};
renderedCallback()
{
   if(this.chartjsInitialized)
  {
   return;
  }
  this.chartjsInitialized = true;
  Promise.all([
   loadScript(this,chartjs)
  ]).then(() =>{
    const ctx = this.template.querySelector('canvas.barChart')
    .getContext('2d');
    this.chart = new window.Chart(ctx, this.config);
  })
  .catch(error =>{
    this.dispatchEvent(
    new ShowToastEvent({
    title : 'Error loading ChartJS',
    message : error.message,
    variant : 'error',
   }),
  );
});
}
updateChart(count,label)
{

   this.chart.data.labels.push(label);
   this.chart.data.datasets.forEach((dataset) => {
   dataset.data.push(count);
   });
   this.chart.update();
 }
}