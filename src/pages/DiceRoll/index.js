import React,{ Component } from 'react'
import './DiceRoll.scss'
import Dice from '../Dice'
  
class RollDice extends Component{
  
  // Face numbers passes as default props
  static defaultProps = {
    sides : ['one', 'two', 'three', 
             'four', 'five', 'six']
  }
  constructor(props){
    super(props)
      
    // States
    this.state = {
      die1 : 'one',
      die2 : 'two',
      die3 : 'three',
      rolling: false,
      price: 0,
      bet: 0,
      HL: '',
      resultDice: [],
    }
    this.roll = this.roll.bind(this);
    this.handleSetBet = this.handleSetBet.bind(this);
  }
  roll(){
    const {sides} = this.props;
    const value = ['one', 'two', 'three','four', 'five', 'six']
    if(this.state.bet && this.state.HL.length) {
      if((this.state.bet !== this.state.price) && window.confirm("You haven't updated your bets yet! Continue?")) {
        if(window.confirm(`Are you sure you want to place a bet for ${this.state.bet} ?`))
          {
              this.setState({
            // Changing state upon click
            die1 : sides[Math.floor(Math.random() * sides.length)],
            die2 : sides[Math.floor(Math.random() * sides.length)],
            die3 : sides[Math.floor(Math.random() * sides.length)],
            rolling:true,
            })
            // Start timer of one sec when rolling start
            setTimeout(() => {
                const result = value.indexOf(this.state.die1)+value.indexOf(this.state.die2)+value.indexOf(this.state.die3)+3
                this.setState({resultDice: [...this.state.resultDice, {time: new Date(), HL: result, chose: this.state.HL, brt: this.state.bet}]})
                this.setState({HL: ''})
            // Set rolling to false again when time over
            this.setState({rolling:false})
            },3000)
          }
        else {
          alert("Roll is failed! :((")
        }
      } else {
        if(window.confirm(`Are you sure you want to place a bet for ${this.state.bet} ? Your chose: ${this.state.HL}`))
          {
            this.setState({
                // Changing state upon click
                die1 : sides[Math.floor(Math.random() * sides.length)],
                die2 : sides[Math.floor(Math.random() * sides.length)],
                die3 : sides[Math.floor(Math.random() * sides.length)],
                rolling:true,
                })
                // Start timer of one sec when rolling start
                setTimeout(() => {
                const result = value.indexOf(this.state.die1)+value.indexOf(this.state.die2)+value.indexOf(this.state.die3)+3
                this.setState({resultDice: [...this.state.resultDice, {time: new Date(), HL: result, chose: this.state.HL, bet: this.state.bet}]})
                this.setState({HL: ''})
                // Set rolling to false again when time over
                this.setState({rolling:false})
                },3000)
          }
        else {
          alert("Roll is failed! :((")
        }
      }
    } else {
      if(!this.state.bet) {
        alert("Please bet greater than or equal to 1ETH")
      } else {
        alert("Please chose High or Low!")
      }
    }
  }
  handleBet(e) {
    this.setState({ price: e.target.value })
    if(e.target.value) this.setState({ disabled: false });
  }
  handleExit() {
    window.location.href="/";
  }
  handleSetBet() {
    this.setState({bet: this.state.price});
  }
  handleHL(value) {
    this.setState({HL: value});
  }
  render(){
    const handleBtn = this.state.rolling ? 
                      'RollDice-rolling' : ''
    const handleBtnExit = this.state.rolling ? 
                      'RollDice-rolling' : 'btn-exit'
    const handleBtnHigh = this.state.rolling ? 
                      'RollDice-rolling' : 'btn-high'
    const handleBtnLow = this.state.rolling ? 
                      'RollDice-rolling' : 'btn-low'
    const {die1, die2, die3, rolling} = this.state
    return(
      <div className='RollDice'>
        <div className='RollDice-container'>
          <Dice face={die1} rolling={rolling}/>
          <Dice face={die2} rolling={rolling}/>
          <Dice face={die3} rolling={rolling}/>
        </div>
        <div className="box-button">
            <button className={handleBtn}
                disabled={this.state.rolling} 
                onClick={this.roll}>
            {this.state.rolling ? 'Rolling' : 'Roll Dice!'}
            </button>
            <div className="box-bet">
                <input type="number" min="1" onChange={e => this.handleBet(e)}/>
                <button className={handleBtn}
                    disabled={this.state.rolling} 
                    onClick={this.handleSetBet}>
                Set Bet
                </button>
            </div>
            <button className={handleBtnExit}
                    disabled={this.state.rolling} 
                    onClick={this.handleExit}>
            Exit
            </button>
        </div>
        <div className="box-button">
            <button className={handleBtnHigh}
                disabled={this.state.rolling} 
                onClick={() => this.handleHL('high')}>
            High
            </button>
            <div className="box-history">
                <p>History</p>
                <ul>
            {
              this.state.resultDice.map((r, index) => {
                return (
                  <li key={index}>
                    Time: {r.time.getHours().toString()}:{r.time.getMinutes().toString()}. 
                    Bet: {r.bet} ETH.
                    You chose: {r.chose}. 
                    Result: {r.HL >= 11 ? `High ${r.HL}` : `Low ${r.HL}`}.
                    You {(r.HL >= 11 && r.chose === 'high') || (r.HL < 11 && r.chose === 'low') ? 'win' : 'lose'}!!!
                  </li>
                )
              })
            }
            </ul>
            </div>
            <button className={handleBtnLow}
                    disabled={this.state.rolling} 
                    onClick={() => this.handleHL('low')}>
            Low
            </button>
        </div>
      </div>
    )
  }
}
  
export default RollDice