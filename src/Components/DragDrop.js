import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

class DragDrop extends Component {
	  	constructor(props) {
		    super(props);
		    this.state = {betamount: 0,styelClass:""};

	  	}
     render() {
        return (<div className="container"  style={{	cursor:'pointer'}}>
        	<div className="row" >
			    <Droppable
			        enabled={true}
			        className="col-sm-12"
			        style={{height: '50px'}} 
			        types={['betamount']} 
			        onDragOver={this.onDragOver.bind(this)}
			        onDrop={this.onDrop.bind(this)}>
			        <div>{this.state.betamount}</div>
			    </Droppable>
			</div>

        	
	            <div className="row">
	                <Draggable type="betamount" data="5"><div className="col-sm-2">5</div></Draggable>
	                <Draggable type="betamount" data="10"><div className="col-sm-2">10</div></Draggable>
	                <Draggable type="betamount" data="20"><div className="col-sm-2">20</div></Draggable>
	                <Draggable type="betamount" data="40"><div className="col-sm-2">40</div></Draggable>
	                <Draggable type="betamount" data="80"><div className="col-sm-2">80</div></Draggable>
	                <Draggable type="betamount" data="200"><div className="col-sm-2">200</div></Draggable>
	            </div>
           
            
        </div>)
    }
    onDrop(data) {
        var totalBetAmount=parseInt(this.state.betamount) + parseInt(data.betamount);

        this.setState({
            betamount :  parseInt(totalBetAmount)
        });
        //console.log(this.state.message);
        // => banana 
    }
    onDragOver(data) {
    	
    	this.setState({
            styelClass :  'droppable'
        });
    	console.log('Data'+this.state.styelClass);
    }
}


export default DragDrop;
