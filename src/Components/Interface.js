  import React, { Component } from 'react';
  import Outcome from './Outcome';
  import DragDrop from './DragDrop';
  class Interface extends Component {

    render() {
        return (
            <div className='panel interface'>
                
                <Outcome status={this.props.status}/>

                <div className="btn-group btn-group-justified" role="group" aria-label="score">
                    <a className="btn btn-default">Banker Score : {this.props.bankerscore}</a>
                    <a className="btn btn-default">Player Score : {this.props.playerscore}</a>

                </div>
                <br/>
                
                <h3>Who will win ? </h3>
                <div className="btn-group btn-group-justified" role="group" aria-label="score">
                  <div className="btn-group" role="group">
                      <button onClick={this.props.playerwager} type="button" className="btn btn-default">Player</button>
                  </div>
                  <div className="btn-group" role="group">
                      <button onClick={this.props.tiewager} type="button" className="btn btn-default">Tie</button>
                  </div>
                  <div className="btn-group" role="group">
                      <button onClick={this.props.bankerwager} type="button" className="btn btn-default">Banker</button>
                  </div>
                </div>
                <br/>
                
                <div className="btn-group btn-group-justified" role="group" aria-label="game">
                    <div className="btn-group" role="group">
                        {/* received as props to the Interface component the handleDeal function is now bound to the onClick event */}
                        <button onClick={this.props.deal} type="button" className="btn btn-info">Deal</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button onClick={this.props.hit} type="button" className="btn btn-success">Hit</button>
                    </div>
                </div>
                <div className="price-display">
                    <DragDrop />
                </div>
            </div>

        );   
    }
  }

Interface.defaultProps = {
    status: 'new'

};

  export default Interface;
