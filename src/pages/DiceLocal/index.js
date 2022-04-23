import React from 'react';
import DiceRoll from '../DiceRoll'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function DiceLocal() {
return (
	<div>
	<DiceRoll />
	</div>
);
}

export default DiceLocal;
