'use strict';

import core from 'metal';
import templates from './TogglePasswordInput.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

class TogglePasswordInput extends Component {

	toggle() {
		this.isShowing = !this.isShowing;
		console.log(this.isShowing);
	}
	
}
Soy.register(TogglePasswordInput, templates);

TogglePasswordInput.STATE = {
	/**
	 * @type {boolean}
	 * @default false
	 */
	isShowing: {
		value: false
	}
};

export default TogglePasswordInput;
