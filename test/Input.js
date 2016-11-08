'use strict';

import dom from 'metal-dom';
import Input from '../src/Input';

describe('Input', function() {
	let comp;

	afterEach(function() {
		if (comp) {
			comp.dispose();
		}
	});

	it('should render a empty text field by default', function() {
		comp = new Input();
		assert.equal('text', comp.element.getAttribute('type'));
	});

	it('should set password as type to requested field', function() {
		comp = new Input({
			type: 'password'
		});
		assert.equal('password', comp.element.getAttribute('type'));
	});	

	it('should add "name" html attribute to requested field', function() {
		comp = new Input({
			name: 'username'
		});
		assert.equal('username', comp.element.name);
		assert.ok(comp.element.hasAttribute('name'));
	});

	it('should add a class to requested field', function() {
		comp = new Input({
			classes: 'form-control'
		});
		assert.ok(dom.hasClass(comp.element, 'form-control'));
	});

	it('should add more than one class to requested field', function() {
		comp = new Input({
			classes: 'form-control has-error'
		});
		assert.ok(dom.hasClass(comp.element, 'form-control'));
		assert.ok(dom.hasClass(comp.element, 'has-error'));
	});

	it('should add "placeholder" html attribute to requested field', function() {
		comp = new Input({
			placeholder: 'Name'
		});
		assert.equal('Name', comp.element.getAttribute('placeholder'));
		assert.ok(comp.element.hasAttribute('placeholder'));
	});

	it('should set a value to requested field', function() {
		comp = new Input({
			value: 'Stephen Hawking'
		});
		assert.equal('Stephen Hawking', comp.element.value);
	});

	it('should add "autocomplete" html attribute to requested field', function() {
		comp = new Input({
			autocomplete: 'on'
		});
		assert.equal('on', comp.element.getAttribute('autocomplete'));
		comp.element.setAttribute('autocomplete', 'off');
		assert.equal('off', comp.element.getAttribute('autocomplete'));
	});

	it('should add "readonly" html attribute to requested field', function() {
		comp = new Input({
			readonly: true
		});
		assert.ok(comp.element.hasAttribute('readonly'));
	});

	it('should add "maxlength" html attribute to requested field', function() {
		comp = new Input({
			maxLength: 10
		});
		assert.equal(10, comp.element.getAttribute('maxlength'));
		assert.ok(comp.element.hasAttribute('maxlength'));
	});

	it('should add "data-field-index" custom attribute to requested field', function() {
		comp = new Input({
			fieldIndex: 1
		});
		assert.equal(1, comp.element.getAttribute('data-field-index'));
		assert.ok(comp.element.hasAttribute('data-field-index'));
	});

	it('should add "data-row-index" custom attribute to requested field', function() {
		comp = new Input({
			rowIndex: 0
		});
		assert.equal(0, comp.element.getAttribute('data-row-index'));
		assert.ok(comp.element.hasAttribute('data-row-index'));
	});

	it('should add "data-oninput" custom attribute to requested field', function() {
		var handlerFunction = sinon.stub();

		comp = new Input({
			onInput: handlerFunction
		});

		let testField = comp.element;
		testField.value = 'test';
		dom.triggerEvent(testField, 'input');

		comp.once('stateSynced', function(done) {
			assert.equal(1, handlerFunction.callCount);
			done();
		});
	});

	//TOGGLE PASSWORD
	it('should render the requested field as toggle password', function() {
		comp = new Input({
			isTogglePassword: true
		});
		assert.ok(dom.hasClass(comp.element, 'input-group'));
	});

	it('should check if the field is hidden as default (password)', function() {
		comp = new Input({
			isTogglePassword: true
		});
		assert.equal('password', comp.element.childNodes[0].getAttribute('type'));
	});

	it('should set the related field visibility to exposed (text)', function() {
		comp = new Input({
			isShowing: true,
			isTogglePassword: true
		});
		assert.equal('text', comp.element.childNodes[0].getAttribute('type'));
	});

	it('should change the field visibility by clicking on the toogle button : hidden to exposed', function() {
		comp = new Input({
			isTogglePassword: true
		});
		
		let toggleButton = comp.element.childNodes[1].querySelector('button');
		dom.triggerEvent(toggleButton, 'click');

		comp.once('stateSynced', function(done) {
			assert.equal('text', comp.element.childNodes[0].getAttribute('type'));
			done();
		});

	});

	it('should change the field visibility by clicking on the toogle button : exposed to hidden', function() {
		comp = new Input({
			isShowing: true,
			isTogglePassword: true
		});
		
		let toggleButton = comp.element.childNodes[1].querySelector('button');
		dom.triggerEvent(toggleButton, 'click');

		comp.once('stateSynced', function(done) {
			assert.equal('password', comp.element.childNodes[0].getAttribute('type'));
			done();
		});
	});

});
