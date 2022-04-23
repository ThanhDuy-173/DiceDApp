import React, {Component} from 'react'
import './dice.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Die extends Component{
render(){
	const {face, rolling} = this.props;
    function handleClick(e) {
        console.log(e.target.value);
    }
	return (
			<div>
				<FontAwesomeIcon icon={['fas', `fa-dice-${face}`]} className={`Die
				${rolling && 'Die-shaking'}`} onChange={e => handleClick(e)} />
			</div >
		)
}
}

export default Die
