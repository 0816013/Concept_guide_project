import { BottomNavigationAction, Hidden } from '@material-ui/core';
import React, { Component } from 'react';
import SunEditor from 'suneditor-react';
import Card from './Card'
import RelatedVideosPanel from './RelatedVideosPanel';


//Start Connect to database----------
if (!firebase.apps.length) {
    console.log("connecting firebase");
    firebase.initializeApp({
        apiKey: "AIzaSyD5ro8Oj_EHuFweJR3bywJCO49egETQp7g",
        authDomain: "test-7916a.firebaseapp.com",
        databaseURL: "https://test-7916a-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "test-7916a",
        storageBucket: "test-7916a.appspot.com",
        messagingSenderId: "931195594829",
        appId: "1:931195594829:web:65c637f9dc54e245d4d404",
        measurementId: "G-T5RH81V2MG"
    })
    }else {
    firebase.app(); // if already initialized, use that one
    }


  
const db = firebase.database();
console.log("db = ", db);

// function cardordering(ConceptIndex, methods){
//     var concept = this.state.concept;
//     var Concept_Index = this.props.Card_ConceptIndex
        
//         if(method=="order by index"){
//             db.ref("/maps&others/"+concept +"/maps&others/cards4concept_filtered").on('value', function(snapshot){
//             var cardskeylist = JSON.parse(JSON.stringify(snapshot.val()));
//             console.log(cardskeylist);
//             //console.log("tmp.state.cards", tmp.state.cards);
//             //console.log("keys = ", Object.keys(tmp.state.cards));
//             var tmp = this;
//             if((cardskeylist!=null)||(cardskeylist!=undefined)){
//                 var keys = cardslist[ConceptIndex]
//                 console.log("keys = ", keys);
//                 var cards = [];
//                 var i =0;
//                 while(i<keys.length){
//                     var videoId = keys[i];
//                     var cardContent = tmp.state.cards[videoId].cardContent;
//                     var likes = tmp.state.cards[videoId].likes;
//                     var userId = tmp.state.cards[videoId].userId;
//                     var card = {videoId:videoId, cardContent:cardContent, userId: userId, likes:likes };
//                     cards.push(card);
//                     i = i+1;
//                 }
//                 tmp.state.cards = cards;
//                 tmp.forceUpdate();

//             }
//             });   
//         } else if (method == 'clear'){
//             var cards = tmp.state.cards
//             cards.sort(function(a, b){
//                 return b.thumbsCnt-a.thumbsCnt;
//             });
//             tmp.setState({cards});
//             tmp.forceUpdate();
//         }
        

//     }

  
class Cards extends Component {
    constructor(props){
        super(props);
        this.state={
            cards: [
            ],
            concept:this.props.searchInfo,
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
            Card_ConceptIndex: this.props.Card_ConceptIndex,
            // parentId:"",
        };
        this.handleDelete=this.handleDelete.bind(this);
        this.handleEdit=this.handleEdit.bind(this);      
        this.addCard=this.addCard.bind(this);  
        // this.addCardReply=this.addCardReply(this);////////////////////////////////////////////////////////// 
        this.handleThumbsCnt=this.handleThumbsCnt.bind(this);
        // this.handleParent=this.handleParent.bind(this);////////////////////////////////////////////////////////
        this.handleResize = this.handleResize.bind(this);
        this.handleNodeHighlight = this.handleNodeHighlight.bind(this);

        var concept = this.state.concept;
        var path = "/"+concept;//+"/cards";
        var Card_ConceptIndex = this.props.Card_ConceptIndex;
        var tmp = this;
        /*db.ref(path).on('value', function(snapshot){
            let cardsdata = JSON.parse(JSON.stringify(snapshot.val()));
            console.log(cardsdata);
            let cardscontent = cardsdata['cards']
            let cardsorder = cardsdata['maps&others']['cards4concept_filtered']
            //console.log("tmp.state.cards", tmp.state.cards);
            //console.log("keys = ", Object.keys(tmp.state.cards));

            var keys = cardsorder[Card_ConceptIndex];
                
            if ((cardscontent!=null)&& (cardscontent!=undefined)&&(Card_ConceptIndex!=null)&&(keys!=null)){
                
                var cards = [];
                var i =0;
                while(i<keys.length){
                    var videoId = keys[i];
                    var cardContent = cardscontent[videoId].cardContent;
                    var likes = cardscontent[videoId].likes;
                    var userId = cardscontent[videoId].userId;
                    var higlightnodes = cardscontent[videoId].highlight_nodes_post;
                    var card = {videoId:videoId, cardContent:cardContent, userId: userId, likes:likes, higlightnodes:higlightnodes};

                    cards.push(card);
                    i = i+1;
                }
                console.log("filtered keys from db = ", keys);
                //console.log("cards = ", cards);


            }
            else if((cardscontent!=null)||(cardscontent!=undefined)){
                var keys = Object.keys(cardscontent);
                var cards = [];
                var i =0;
                while(i<keys.length){
                    var videoId = keys[i];
                    var cardContent = cardscontent[videoId].cardContent;
                    var likes = cardscontent[videoId].likes;
                    var userId = cardscontent[videoId].userId;
                    var higlightnodes = cardscontent[videoId].highlight_nodes_post;
                    var card = {videoId:videoId, cardContent:cardContent, userId: userId, likes:likes, higlightnodes:higlightnodes};

                    cards.push(card);
                    i = i+1;
                }
                //console.log("keys = ", keys);
                //console.log("cards = ", cards);
                cards.sort(function(a, b){
                    return b.likes-a.likes;
                });

            }
            tmp.state.cards = cards;
            tmp.forceUpdate();
            //console.log("tmp.state.cards", tmp.state.cards);
        });
        */
        const styles = ({
            ul: {
                //overflowX: "scroll",
                overflowY: "scroll",
                width:this.state.windowWidth/2,
                height:this.state.windowHeight/2
            }
        });
    }
    
    componentDidMount(){
        window.addEventListener("resize", this.handleResize);
    }
    handleResize(e){
        this.setState({windowWidth : window.innerWidth,
                        windowHeight : window.innerHeight});
    }
    addCard(content){
        let cards = this.state.cards;
        cards.push({id:cards.length+1, content: content, thumbsCnt: 0});
        this.setState({cards});
    }
    // addCardReply(replyContent, parent){///////////////////////////////////////////////////////////////////////////////////////////
    //     let cards = this.state.cards;
    //     cards.push({id:cards.length+1, content: replyContent, parent:parent});
    //     this.setState({cards});
    // }
    handleDelete(commentId) {
        var sendBackEnd='http://0.0.0.0:5000/DeleteCard/'+this.state.concept+"&"+commentId;
        console.log("handleDelete = ",sendBackEnd);
        fetch(sendBackEnd);
    }
    handleEdit(commentId) {
        console.log("handleEdit",commentId);

    }
    handleSave(commentId){
        console.log("handleSave", commentId);
    }
    handleThumbsCnt(commentId,method){
        // var card = this.state.cards.filter(c=>c.id==videoId);
        // if(method=="add"){
        //     card[0].thumbsCnt=card[0].thumbsCnt+1;
        // }
        // else if (method=='minus'){
        //     card[0].thumbsCnt=card[0].thumbsCnt-1;
        // }
        //console.log("card = ", card);
        //console.log("this.state.cards.filter = ",this.state.cards.filter(c=>c.id!==videoId));
        //var cards =card.concat( this.state.cards.filter(c=>c.id!==videoId));
        //console.log("cards = ", cards);
        
        var sendBackEnd='http://0.0.0.0:5000/LikeCard/'+this.state.concept+"&"+commentId+'&'+method;
        fetch(sendBackEnd);

        // cards.sort(function(a, b){
        //     return b.thumbsCnt-a.thumbsCnt;
        // });
        // this.setState({cards});
    }
    // handleParent(parentId){/////////////////////////////////////////////////////////////////////////////////////////////////////
    //     console.log("handleParent(parentId):",parentId);
    //     this.setState({parentId: parentId});
    // }
    // componentDidUpdate(prevState){
        
    //     if(this.state.Card_ConceptIndex != prevState.state.Card_ConceptIndex){
    //         console.log('test if componentDidUpdate works.')
    //         var tmp = this;
    //         var concept = this.state.concept;
    //         var path = "/"+concept;//+"/cards";
    //         db.ref(path).on('value', function(snapshot){
    //             let cardsdata = JSON.parse(JSON.stringify(snapshot.val()));
    //             console.log(cardsdata);
    //             let cardscontent = cardsdata['cards']
    //             let cardsorder = cardsdata['maps&others']['cards4concept_filtered']
    //             //console.log("tmp.state.cards", tmp.state.cards);
    //             //console.log("keys = ", Object.keys(tmp.state.cards));
    //             console.log('Card_ConceptIndex in cards.js line203', tmp.props.Card_ConceptIndex);
    //             if ((cardscontent!=null)&&(cardscontent!=undefined)&&(tmp.props.Card_ConceptIndex!=null)){
    //                 var keys = cardsorder[tmp.props.Card_ConceptIndex];
                    
    //                 var cards = [];
    //                 var i =0;
    //                 while(i<keys.length){
    //                     var videoId = keys[i];
    //                     var cardContent = cardscontent[videoId].cardContent;
    //                     var likes = cardscontent[videoId].likes;
    //                     var userId = cardscontent[videoId].userId;
    //                     var card = {videoId:videoId, cardContent:cardContent, userId: userId, likes:likes };
    //                     cards.push(card);
    //                     i = i+1;
    //                 }
    //                 console.log("special keys from db = ", keys);
    //                 console.log("cards = ", cards);


    //             } else if ((cardscontent!=null)&&(cardscontent!=undefined)){
    //                 var keys = Object.keys(cardscontent);
    //                 var cards = [];
    //                 var i =0;
    //                 while(i<keys.length){
    //                     var videoId = keys[i];
    //                     var cardContent = cardscontent[videoId].cardContent;
    //                     var likes = cardscontent[videoId].likes;
    //                     var userId = cardscontent[videoId].userId;
    //                     var card = {videoId:videoId, cardContent:cardContent, userId: userId, likes:likes };
    //                     cards.push(card);
    //                     i = i+1;
    //                 }
    //                 console.log("keys = ", keys);
    //                 console.log("cards = ", cards);
    //                 cards.sort(function(a, b){
    //                     return b.likes-a.likes;
    //                 });
    //             }
    //         this.setState({'cards': cards})
    //         })
    //     }   
    // }
    componentDidMount(){
        var concept = this.state.concept;
        var path = "/"+concept;
        var tmp = this;
        db.ref(path).once('value', function(snapshot){
            tmp.setState({cards:snapshot.val()});
            console.log(snapshot.val());
            console.log(typeof(tmp.state.cards));
            });
        var properties = Object.getOwnPropertyNames(this.state.cards);
        console.log("properties", properties);
        db.ref(path).on('value', function(snapshot){
            tmp.setState({cards:snapshot.val()});
            });
        // this.setState({cards:Object.values(this.state.cards)});
        // cards.setState Object.values(this.state.cards);
        //console.log(typeof(this.state.cards));
    }
    handleNodeHighlight(commentId){
        var data = this.state.cards
        var highlightnodes_selected = []
        for (var i = 0; i < data.length; i++) { 
            if (data[i]['commentId'] == commentId){
                highlightnodes_selected = data[i]['higlightnodes']
                console.log(data[i]['higlightnodes']) 
                //this.props.setState({HighlightRelatedNodes: highlightnodes_selected })
            }
        }

        this.props.SetHighlightRelatedNodes(highlightnodes_selected)

    }
    componentDidUpdate(prevProps,prevState) {
        // 常見用法（別忘了比較 prop）：
        if (this.props.newCardContent !== prevProps.newCardContent) {
              this.addCard(this.props.newCardContent);
        };
        if (this.state!== prevState) {
            console.log("this.state = ", this.state);
            // this.setState({cards:Object.values(this.state.cards)});
            // var cards = Object.values(this.state.cards);
        }
      }
    // card by index, Nov JX
    
    render() { 
        var tmp = this;
        var styles={};
        if (this.props.progress=="4"){
            styles = ({
                ul: {
                    //overflowX: "scroll",
                    overflowY: "scroll",
                    width:tmp.props.graphWidth,
                    height:(tmp.state.windowHeight/2-100)
                }
            });
        }else{
            styles = ({
                ul: {
                    //overflowX: "scroll",
                    overflowY: "scroll",
                    width:tmp.state.windowWidth/2.012,
                    height:(tmp.state.windowHeight/3)+(tmp.state.windowHeight/3)
                }
            });
        };

        var cards = Object.values(this.state.cards);

        // Array.prototype.swapItems = function(a, b){
        //     this[a] = this.splice(b, 1, this[a])[0];
        //     return this;
        // }
        var swapArrayElements = function(arr, indexA, indexB) {
            var temp = arr[indexA];
            arr[indexA] = arr[indexB];
            arr[indexB] = temp;
        };
        
        //traverse cards
        for(let i=0;i<Object.keys(this.state.cards).length;i++){
            var key = Object.keys(cards)[i];
            // console.log("key:",key);
            // console.log("cards.indexOf(cards[i])",cards.indexOf(cards[i]));
            
            if(cards[key]==undefined || cards[key]['content']==undefined || cards[key]['parentId']==undefined){
                cards.splice(key, 1);
            }
            else if((cards[key]["parentId"]=="") || (cards[key]["parentId"]==undefined) || (cards[key]["parentId"]=="0")){// no parent
                // console.log("no parent,",cards[key]["parentId"], "videoId:",cards[key]["videoId"]);
            }
            else if((cards[key]["parentId"]!="0") || (cards[key]["parentId"]!=undefined)){// have parent
                // console.log("have parent,",cards[key]["parentId"], "videoId:",cards[key]["videoId"]);
                var childIndex = cards.indexOf(cards[i]);
                var parentIndex = Number(cards[key]["parentId"])+1;
                // var parentIndex = cards.indexOf(cards[key]);
                // console.log("childIndex:", childIndex);
                // console.log("parentIndex:", typeof(parentIndex));
                // console.log("parentIndex+1:", parentIndex+1);
                console.log("cards[key]", cards[key]);

                swapArrayElements(cards, childIndex, parentIndex);
                // alert(cards.swapItems(childIndex, parentIndex));
            }
        }
        // console.log("Object.keys(cards)[0]:",Object.keys(cards)[0]);
        // for(let i=0;i<Object.keys(this.state.cards).length;i++){
        //     var uniqueKey = Object.keys(cards)[i];
        //     cards[uniqueKey]["videoId"] = uniqueKey;
        // }

        // if the card in cards have parent, modify the sequence
        // console.log("cards[0]:",this.state.cards["0"]);
        // console.log("cards id:",Object.keys(cards));
        

        // console.log("cards = ", this.state.cards);
        //this.setState(cards);
        //console.log(cards);
        console.log('card = ', cards);
        if((cards!=null)&&(cards!=[])){
            
            return (
                <div className="relative" style={styles.ul}> 
                    {cards.map
                    (card => card &&
                        (<Card content={card.content}
                                replyContent={card.replyContent}
                                parentId={card.parentId}
                                key = {card.commentId}
                                commentId = {card.commentId}
                                userId = {card.userId}
                                onDelete={this.handleDelete}
                                onEdit={this.handleEdit} 
                                onSave={this.handleSave}
                                handleThumbsCnt={this.handleThumbsCnt}
                                thumbsCnt={card.likes}
                                SetCardEdit={this.props.SetCardEdit}
                                concept = {this.state.concept}
                                SetEditorContent = {this.props.SetEditorContent}
                                SetParentId = {this.props.SetParentId}
                                cardEditing = {this.props.cardEditing}
                                editingcardID = {this.props.editingcardID}

                                SetCardReply={this.props.SetCardReply}
                                SetReplyContent = {this.props.SetReplyContent}
                                cardReply = {this.props.cardReply}
                                replycardID = {this.props.replycardID}
                                videoClick = {this.props.videoClick}
                                videoId = {card.videoId}
                                // handleParent = {this.handleParent}
                                
                                handleNodeHighlight = {this.handleNodeHighlight}
                                style = {styles}/>
                        ))}
                    </div>
            );
        } else {
            return null;
        }
    }
}

export default Cards;