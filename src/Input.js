'use strict';

import core from 'metal';
import templates from './Input.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

class Input extends Component {

	toggle() {
		this.isShowing = !this.isShowing;
	}
	
}
Soy.register(Input, templates);

Input.STATE = {
	/**
	 * @type {boolean}
	 * @default false
	 */
	isShowing: {
		value: false
	}
};

export default Input;
