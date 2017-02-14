  import React, { Component } from 'react';
  import Card from './Card';

  class Hand extends Component {

    render() {
        return (
            <div className='hand'>

                {/* Example on how to use an IF/ELSE statement inside the return (jsx) function */}
                {/* This will show an upside down card representing the deck on the dealer side of the table */}
                {this.props.showDeck ? <Card hidden={true}/> : ''}

                {this.props.hand.map(function(card,i){
                    return <Card face={card.f} value={card.v} key={i}/>
                })}

            </div>
        );   
    }
  }

Hand.defaultProps = {
  hand: []
};

  export default Hand;
