  import React, { Component } from 'react';
  import Outcome from '../Outcome/Outcome';
  import DragDrop from '../DragDrop/DragDrop';
  class Interface extends Component {

    render() {
        return (
            <div>
                
                <Outcome status={this.props.status}/>

                <div className="btn-group btn-group-justified" role="group" aria-label="score">
                    <a className="btn btn-default">Banker Score : {this.props.bankerscore}</a>
                    <a className="btn btn-default">Player Score : {this.props.playerscore}</a>

                </div>
                <br/>
                <div className="col-sm-12">
                    <div className="col-sm-4">
                        <h3>Please select your hand</h3>
                    </div>
                    <div className="col-sm-8">
                    <span className="select-player"><h3>{this.props.selectPlayer ? this.props.selectPlayer.toUpperCase()+' SELECTED' : ''}</h3></span>
                    </div>
                </div>
                <div className="btn-group btn-group-justified" role="group" aria-label="score">
                  <div className="btn-group" role="group">
                      <button onClick={this.props.playerwager} type="button" className={this.props.playerBtn}>Player</button>
                  </div>
                  <div className="btn-group" role="group">
                      <button onClick={this.props.tiewager} type="button" className={this.props.tieBtn}>Tie</button>
                  </div>
                  <div className="btn-group" role="group">
                      <button onClick={this.props.bankerwager} type="button" className={this.props.bankerBtn}>Banker</button>
                  </div>
                </div>
                <br/>
                
                <div className="btn-group btn-group-justified" role="group" aria-label="game">
                    <div className="btn-group" role="group">
                        {/* received as props to the Interface component the handleDeal function is now bound to the onClick event */}
                        <button onClick={this.props.deal} type="button" className="btn btn-success">Deal</button>
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
