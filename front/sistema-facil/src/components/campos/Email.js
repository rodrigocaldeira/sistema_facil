import React from 'react';
import Texto from './Texto';
import EmailInvalido from './validadores/EmailInvalido';

class Email extends Texto  {

	constructor(props) {
		super(props);
		
		this.validadores.push(new EmailInvalido());
	}
}

export default Email;
