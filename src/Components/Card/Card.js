  import React, { Component } from 'react';
  import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
  class Card extends Component {
    render() {
        var bgUrl = (this.props.hidden)
          ? 'url(img/hidden.png)'
          : 'url(img/' + this.props.face + '.png)';
        var cardStyle = {backgroundImage: bgUrl};

        return (
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
                <div className='card' style={cardStyle}/>
            </ReactCSSTransitionGroup>
        );      
    }
  }

  export default Card;
