import { LightningElement,api } from 'lwc';

export default class Questions extends LightningElement {

    @api 
    type

    @api
    options


    get inputType() {
        //console.log('+++++++++++++++++++')
        return this.type === 'Text' ? true : false;
    }
}