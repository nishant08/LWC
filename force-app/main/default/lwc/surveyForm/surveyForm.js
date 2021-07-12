import { LightningElement, wire } from 'lwc';
import getSurvey from '@salesforce/apex/SurveyFormController.getAssignedSurvey';
import getQuestions from '@salesforce/apex/SurveyFormController.getAllQuestions';

export default class SurveyForm extends LightningElement {

    surveyData;
    error;
    isLoading = false;

    @wire(getQuestions)
    survey({ error, data }) {
        this.isLoading = true;
        if (data) {
            console.log('>>>>>>>>>>>>>>>>. ',data);
            this.error = undefined;
            this.surveyData = data
        } else if (error) {
            this.error = error;
            this.surveyData = undefined;
        }
        this.isLoading = false;

    }

    /*@wire (getSurvey)    
    survey({ error, data }) {        
        
        if (data) {
          this.error = undefined;
          this.surveyData = data
        } else if (error) {
          this.error = error;
          this.surveyData = undefined;          
        }
      }*/

    aaa() {
        //this.surveyData
    }

    wdcwec(event) {
        console.log('<<<<<<<<<<<<<<<<<<< ', event.detail);
    }



}