  import React, { Component } from 'react';

  class Card extends Component {
    render() {
        var bgUrl = (this.props.hidden)
          ? 'url(img/hidden.png)'
          : 'url(img/' + this.props.face + '.png)';
        var cardStyle = {backgroundImage: bgUrl};

        return (
            <div className='card' style={cardStyle}/>
        );      
    }
  }

  export default Card;
