import { LightningElement, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import fivestar from '@salesforce/resourceUrl/fivestar';

const READ_ONLY_CLASS = 'readonly c-rating';
const EDITABLE_CLASS = 'c-rating';
const ERROR_TITLE = 'Error loading five-star';
const ERROR_VARIANT = 'error';

const MAX_RATING = 5;

export default class FiveStarRating extends LightningElement {

	@api
	readOnly = false;

	@api
	ratingValue = 0;

	ratingComp;

	ratingResourceLoaded = false;

	get starClass() {
		return this.readOnly ?  READ_ONLY_CLASS : EDITABLE_CLASS;
	}

	loadRatingResource = () => {
		Promise.all([
			loadStyle(this, fivestar + '/rating.css'),
			loadScript(this, fivestar + '/rating.js')
		])
		.then(() => {
			this.initializeRating();
			this.ratingResourceLoaded = true;
		}).catch( (error) => {
			this.dispatchEvent(new ShowToastEvent({
				title: ERROR_TITLE,
				message: error.body.message,
				variant: ERROR_VARIANT
			}))
		})
    }
    
    ratingChanged(rating) {
        this.dispatchEvent(new CustomEvent('ratingchange', {detail: rating}));
    }

	initializeRating = () => {
		const domEl = this.template.querySelector("ul");
		const ratingCallback = (rating) => {
			this.dispatchEvent(new CustomEvent('ratingchange', {detail: rating}));
		}
		this.ratingComp = rating(domEl, this.ratingValue, MAX_RATING, ratingCallback, this.readOnly);
    }
    
    

	connectedCallback() {
		if(!this.ratingResourceLoaded) {
			this.loadRatingResource();
		}
	}

	@api
	resetStarRating() {
		this.ratingComp.resetRating();
	}

}