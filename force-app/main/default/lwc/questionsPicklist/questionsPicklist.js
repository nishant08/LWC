import { LightningElement,api } from 'lwc';

export default class QuestionsPicklist extends LightningElement {

    @api 
    type

    @api
    options

    @api
    quesid

    opt

    get optionValues() {
        console.log('??????????????? '+ String(this.options))
        this.opt = String(this.options).split(', ');
        console.log('??????????????? ======='+ this.opt)
    }


    get inputType() {  
        console.log('+++++++??????????????/ ',this.quesid);     
        return this.type === 'Picklist' ? true : false;
    }

    onValueSelection(event) {
        console.log('+++++++++++=======::::::::======',event.target.value);
        const review = new CustomEvent('pick', {detail: event.target.value});
        this.dispatchEvent(review);
    }
}