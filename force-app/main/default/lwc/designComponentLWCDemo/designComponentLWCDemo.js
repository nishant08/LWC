import { LightningElement, api} from 'lwc';

export default class DesignComponentLWCDemo extends LightningElement {
    // tracking attributes values
    @api showDetails = false;
    @api strName;
    @api empName;
    @api empDepartment;
    @api empLocation;
    @api empAge;
    @api empGender;
}