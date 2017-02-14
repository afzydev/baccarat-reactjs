  import React, { Component } from 'react';

  class Outcome extends Component {
    render() {
          switch(this.props.status) {
              case "playing":
                  return (<div className="alert alert-info" role="alert">Hit or Stand</div>);
              case "win":
                  return (<div className="alert alert-success" role="alert">Win Win Win</div>);
                  
              case "lose":
                  return (<div className="alert alert-danger" role="alert">You Lose</div>);
                  
              case "tie":
                      return (<div className="alert alert-warning" role="alert">TIED</div>);
                      
              default:
                  return(<div className="alert alert-info" role="alert">Click Deal to Start ! </div>);
                 
          }  
    }
}

Outcome.defaultProps = {
  status: 'playing'
};

  export default Outcome;
