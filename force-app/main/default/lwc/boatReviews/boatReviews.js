import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

import getAllReviews from '@salesforce/apex/BoatDataService.getAllReviews';

export default class BoatReviews extends NavigationMixin(LightningElement) {

    boat;
    @api boatId;
    @api isLoading = false;
    @track error;
    boatReviews;

    @api get recordId() {
        return this.boatId;
    }

    getReviews() {        
        this.isLoading = true;
        getAllReviews({ boatId: this.boatId })
            .then(result => {
                this.boatReviews = result;
                this.error = undefined;
            })
            .catch(error => {
                this.boatReviews = undefined;
                this.error = error;
            });
            this.isLoading = false;
            console.log(':???????????????? ', this.boatReviews);            
    }


    set recordId(value) {
        this.setAttribute('boatId', value);
        this.boatId = value;
        console.log('::>>>>>>>>>>>>>>> ', value);
        this.getReviews();

    }



    get reviewsToShow() {
        console.log('::::::::::::::: ',this.boatReviews );
        console.log('::::::::::::::: ',this.boatReviews.length );
        return this.boatReviews && this.boatReviews.length > 0;
    }

    get isBoatReviewsEmpty() {
        return !this.boatReviews || this.boatReviews.length === 0;
    }

    navigateToRecord(event) {
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: event.target.dataset.recordId,
                actionName: "view"
            }
        });
    }

    @api
    refresh() {
        refreshApex(this.boatReviews);
    }

}