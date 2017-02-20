import React, { Component } from 'react';
import { Droppable } from 'react-drag-and-drop';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bounce } from 'react-animations';
import Radium from 'radium';


var moneyClass;
var moneyArray = [];
class DragDrop extends Component {
	  	
    constructor(props) {
        super(props);
        this.state = {
            betamount: 0,
            showTag : 'place-bet',
            dragDropClass : '',
            styelClass:[
            ]
        };

    }
     render() {
        //console.log(this.state.styelClass);
        var items= this.state.styelClass;
        const listItems = items.map((number,key) =>
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={1000} transitionLeaveTimeout={1000} key={key}>
                <div className={"col-sm-1 " + number}  ></div>
            </ReactCSSTransitionGroup>
        );


        const styles = {
          bounce: {
            fontSize:'30px',
            animation: 'x 1s',
            animationName: Radium.keyframes(bounce, 'bounce'),
            marginRight: '30px'
          }
        }

        return (<div className="container"  style={{cursor:'pointer'}}>
                    <div className="row" >
                    
                        <Droppable
                            enabled={true}
                            className="col-sm-12"
                            style={{height: '60px'}} 
                            types={['betamount']} 
                            onDragOver={this.onDragOver.bind(this)}
                            onDrop={this.onDrop.bind(this)}>
                            <div className={"col-sm-6 drop-price "+this.state.dragDropClass}><span className={this.state.showTag}>Drag and Drop your bet here</span>{listItems}</div>
                            <div className="col-sm-6" style={{"textAlign":"right"}} >
                                <span style={styles.bounce}>Bet Amount : {this.state.betamount}</span> 
                            </div>
                        </Droppable>
                    </div>           
            
        </div>)
    }
    onDrop(data) {
        var totalBetAmount=parseInt(this.state.betamount, 10) + parseInt(data.betamount, 10);
        
        switch(data.betamount)
        {
            case "1" :
               moneyClass = 'one-chip';
               moneyArray.push(moneyClass);
               
               break;
            case "10" :
               moneyClass = 'ten-chip';
               moneyArray.push(moneyClass);
               break;
            case "20" :
               moneyClass = 'twenty-chip';
               moneyArray.push(moneyClass);
               break;
            case "50" :
               moneyClass = 'fifty-chip';
               moneyArray.push(moneyClass);
               break;
            case "100" :
               moneyClass = 'hundred-chip';
               moneyArray.push(moneyClass);
               break;
            case "500" :
               moneyClass = 'five-hundred-chip';
               moneyArray.push(moneyClass);
               break;
            case "1000" :
               moneyClass = 'thousand-chip';
               moneyArray.push(moneyClass);
               break;               
           default:
               moneyClass = '';
               break;
        }
       // console.log(moneyArray);
        
        this.setState({
            betamount :  parseInt(totalBetAmount, 10),
            styelClass : moneyArray,
            dragDropClass : '',
            showTag : 'hide'
        });
    }
    onDragOver(data) {
    	
    	this.setState({
            styelClass :  moneyArray,
            dragDropClass : 'dropPriceDrag',
            showTag : 'hide'
        });
    	
    }
}


export default DragDrop;
