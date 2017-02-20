import React, { Component } from 'react';
import _ from 'lodash';
import Hand from '../Hand/Hand';
import BankerHand from '../BankerHand/BankerHand';
import Interface from '../Interface/Interface';
import { Draggable } from 'react-drag-and-drop';
class Table extends Component {

        constructor(props){
          super(props);
          var shuffled = _.shuffle(this.props.deck);

          this.state = {
            deck : shuffled,
            playerBtn : 'btn btn-default',
            tieBtn : 'btn btn-default',
            bankerBtn : 'btn btn-default',
            status : 'playing',
            selectPlayer : ''
          }
          this.handleDealButton = this.handleDealButton.bind(this);
          this.handleHitButton = this.handleHitButton.bind(this);
          this.handScore = this.handScore.bind(this);
          this.handlePlayerWagerButton = this.handlePlayerWagerButton.bind(this);
          this.handleBankerWagerButton = this.handleBankerWagerButton.bind(this);
          this.handleTieWagerButton = this.handleTieWagerButton.bind(this);
        }

        handScore(hand) {

            var scoreP = _.sumBy(hand,'v');
            if(scoreP > 10 && scoreP !== 10) {
              var one = String(scoreP).charAt(1);
              return Number(one);
            }

            return scoreP;
        }


        /* function to handle the event of user clicking the Deal button */
        handleDealButton(){

            /* this variables are restrained to this closure and modifying state variables without the setState is prohibited */
            var deck        = this.state.deck;
            var newStatus   = this.state.status;
            var selectedPlayer = this.state.selectPlayer;
            var playerhand  = [];
            var bankerhand  = [];

            //check deck size to see if we need to shuffle a new deck
            if(deck.length < 5){
                deck = _.shuffle(this.props.deck);
            }
            //player hand, deal 2 cards
            playerhand.push(deck.pop());
            playerhand.push(deck.pop());

            //lets just burn a card
            deck.pop();

            //dealer card
            //since we are using client side state the dealer secret card is only popped out of the deal at the time the user clicks Stand.
            bankerhand.push(deck.pop());
            bankerhand.push(deck.pop());


            var newPlayerscore = this.handScore(playerhand);
            var bankerScore = this.handScore(bankerhand);

            var playerDiff = this.findClosestValue(newPlayerscore);
            var bankerDiff = this.findClosestValue(bankerScore);
            
            var status ;
            if( newPlayerscore === 8 && bankerScore <= 2 ) {
                status = 'draws';
            }
            if( newPlayerscore === 8 && bankerScore >= 3 && bankerScore <= 7 ) {
              status = 'stays';
            }
            if( (newPlayerscore === 6 && bankerScore <= 6) || (newPlayerscore === 7 && bankerScore <= 6) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 6 && bankerScore === 7) || (newPlayerscore === 7 && bankerScore === 7) ) {
              status = 'stays';
            }
            if( (newPlayerscore === 4 && bankerScore <= 5) || (newPlayerscore === 5 && bankerScore <= 5) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 4 && bankerScore >= 6 && bankerScore <= 7 ) || (newPlayerscore === 5 && bankerScore >= 6 && bankerScore <= 7) ) {
              status = 'stays';
            }
            if( (newPlayerscore === 2 && bankerScore <= 4) || (newPlayerscore === 3 && bankerScore <= 4) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 2 && bankerScore >= 5 && bankerScore <= 7 ) || (newPlayerscore === 3 && bankerScore >= 5 && bankerScore <= 7) ) {
              status = 'stays';
            }
            if( (newPlayerscore === 9 && bankerScore <= 3) || (newPlayerscore === 10 && bankerScore <= 3) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 9 && bankerScore >= 4 && bankerScore <= 7 ) || (newPlayerscore === 10 && bankerScore >= 4 && bankerScore <= 7) ) {
              status = 'stays';
            }
            // check deck size to see if we need to shuffle a third deck
            if(status === 'draws') {
                    
                  this.setState( {deck:this.props.deck} );
                  
                  // we shuffle every time so you don't cheat by checking component state :D
                  var shuffled = _.shuffle(this.state.deck);
                  // player hands card
                  playerhand.push(shuffled.pop());
                  // banker hands card
                  bankerhand.push(shuffled.pop());

                   newPlayerscore = this.handScore(playerhand);
                   bankerScore = this.handScore(bankerhand);

                   playerDiff = this.findClosestValue(newPlayerscore);

                   bankerDiff = this.findClosestValue(bankerScore);
              }
              else{
                  this.setState( {deck:this.props.deck} );
                // we shuffle every time so you don't cheat by checking component state :D
                   shuffled = _.shuffle(this.state.deck);
              }

              if( playerDiff < bankerDiff ) {
                newStatus = "win";
              }
              else if( playerDiff > bankerDiff ) {
                newStatus = "lose";
              }
              else if( playerDiff === bankerDiff ) {
                newStatus = "tie";
              }

              if( selectedPlayer === "player" && newStatus === "win" ) {
                newStatus = "win";
              }
              else if( selectedPlayer === "banker" && newStatus === "lose" ) {
                newStatus = "win";
              }
              else if( selectedPlayer === "tie" && newStatus === "tie" ) {
                newStatus = "win";
              }
              else {
                newStatus = "lose";
              }
              
             
            this.setState({
                player :  playerhand,
                playerscore: newPlayerscore,
                bankerscore : bankerScore,
                deck : shuffled,
                status : newStatus,
                banker:bankerhand
            });

            //set the updates
//            this.setState({
//                player  :  playerhand,
//                banker  : bankerhand,
//                deck    : deck,
//                status  : "playing"
//            });
            
        }

        /* function to find the closest number out of given array */
        findClosestValue(num) {
              return 9 - num;
        }

        /* function to handle the event of user clicking the Hit button */
        handleHitButton(){
            var newStatus = this.state.status;
            var playerHand = this.state.player;
            var bankerHand = this.state.banker;

            var selectedPlayer = this.state.selectPlayer;

            var newPlayerscore = this.handScore(playerHand);
            var bankerScore = this.handScore(bankerHand);

            var playerDiff = this.findClosestValue(newPlayerscore);

            var bankerDiff = this.findClosestValue(bankerScore);

            var status ;
            if( newPlayerscore === 8 && bankerScore <= 2 ) {
                status = 'draws';
            }
            if( newPlayerscore === 8 && bankerScore >= 3 && bankerScore <= 7 ) {
              status = 'stays';
            }
            if( (newPlayerscore === 6 && bankerScore <= 6) || (newPlayerscore === 7 && bankerScore <= 6) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 6 && bankerScore === 7) || (newPlayerscore === 7 && bankerScore === 7) ) {
              status = 'stays';
            }
            if( (newPlayerscore === 4 && bankerScore <= 5) || (newPlayerscore === 5 && bankerScore <= 5) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 4 && bankerScore >= 6 && bankerScore <= 7 ) || (newPlayerscore === 5 && bankerScore >= 6 && bankerScore <= 7) ) {
              status = 'stays';
            }
            if( (newPlayerscore === 2 && bankerScore <= 4) || (newPlayerscore === 3 && bankerScore <= 4) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 2 && bankerScore >= 5 && bankerScore <= 7 ) || (newPlayerscore === 3 && bankerScore >= 5 && bankerScore <= 7) ) {
              status = 'stays';
            }
            if( (newPlayerscore === 9 && bankerScore <= 3) || (newPlayerscore === 10 && bankerScore <= 3) ) {
              status = 'draws';
            }
            if( (newPlayerscore === 9 && bankerScore >= 4 && bankerScore <= 7 ) || (newPlayerscore === 10 && bankerScore >= 4 && bankerScore <= 7) ) {
              status = 'stays';
            }
            // check deck size to see if we need to shuffle a third deck
            if(status === 'draws') {
                    
                  this.setState( {deck:this.props.deck} );
                  
                  // we shuffle every time so you don't cheat by checking component state :D
                  var shuffled = _.shuffle(this.state.deck);
                  // player hands card
                  playerHand.push(shuffled.pop());
                  // banker hands card
                  bankerHand.push(shuffled.pop());

                   newPlayerscore = this.handScore(playerHand);
                   bankerScore = this.handScore(bankerHand);

                   playerDiff = this.findClosestValue(newPlayerscore);

                   bankerDiff = this.findClosestValue(bankerScore);
              }
              else{
                  this.setState( {deck:this.props.deck} );
                // we shuffle every time so you don't cheat by checking component state :D
                   shuffled = _.shuffle(this.state.deck);
              }

              if( playerDiff < bankerDiff ) {
                newStatus = "win";
              }
              else if( playerDiff > bankerDiff ) {
                newStatus = "lose";
              }
              else if( playerDiff === bankerDiff ) {
                newStatus = "tie";
              }

              if( selectedPlayer === "player" && newStatus === "win" ) {
                newStatus = "win";
              }
              else if( selectedPlayer === "banker" && newStatus === "lose" ) {
                newStatus = "win";
              }
              else if( selectedPlayer === "tie" && newStatus === "tie" ) {
                newStatus = "win";
              }
              else {
                newStatus = "lose";
              }

            // set the updates
            this.setState({
                player :  playerHand,
                playerscore: newPlayerscore,
                bankerscore : bankerScore,
                deck : shuffled,
                status : newStatus
            });

        }
        //  Select who will win
        handlePlayerWagerButton() {
            this.setState({
                selectPlayer : 'player',
                playerBtn : 'btn btn-primary active',
                bankerBtn : 'btn btn-default',
                tieBtn : 'btn btn-default'
            });
        }
        //  Select who will win
        handleBankerWagerButton() {
            this.setState({
                selectPlayer : 'banker',
                bankerBtn : 'btn btn-primary active',
                tieBtn : 'btn btn-default',
                playerBtn : 'btn btn-default'
            });
        }
        //  Select who will win
        handleTieWagerButton() {
            this.setState({
                selectPlayer : 'tie',
                tieBtn : 'btn btn-primary active',
                playerBtn : 'btn btn-default',
                bankerBtn : 'btn btn-default'
            });
        }
        /*

         lets call for a Hand component for the dealer where we will show the deck of cards,
         the user Interface component to display scores and buttons (that will trigger the game logic events)
         and finaly another Hand component for the player

         */
        render() {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <Hand showDeck={true} hand={this.state.player}  allavailabledec={this.state.deck}  />
                        </div>
                        <div className="col-sm-12">
                            <Interface
                            playerscore={this.handScore(this.state.player)}
                            bankerscore={this.handScore(this.state.banker)}
                            deal={this.handleDealButton}
                            hit={this.handleHitButton}
                            stand={this.handleStandButton}
                            status={this.state.status}
                            playerwager={this.handlePlayerWagerButton}
                            bankerwager={this.handleBankerWagerButton}
                            tiewager={this.handleTieWagerButton}
                            selectPlayer={this.state.selectPlayer}
                            playerBtn={this.state.playerBtn}
                            tieBtn={this.state.tieBtn}
                            bankerBtn={this.state.bankerBtn}
                            />
                        </div>
                        <div className="col-sm-12">
                            <div className="col-sm-8">
                                <BankerHand showDeck={true} hand={this.state.banker} allavailabledec={this.state.deck}/>
                            </div>
                           <div className="col-sm-4" style={{top:'15px'}}>
                                <Draggable type="betamount" data="1"><div className="col-sm-2 one-chip"></div></Draggable>
                                <Draggable type="betamount" data="10"><div className="col-sm-2 ten-chip"></div></Draggable>
                                <Draggable type="betamount" data="20"><div className="col-sm-2 twenty-chip"></div></Draggable>
                                <Draggable type="betamount" data="50"><div className="col-sm-2 fifty-chip"></div></Draggable>
                                <Draggable type="betamount" data="100"><div className="col-sm-2 hundred-chip"></div></Draggable>
                                <Draggable type="betamount" data="500"><div className="col-sm-2 five-hundred-chip"></div></Draggable>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
}

export default Table;