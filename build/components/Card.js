import React, { Component } from 'react';
// import { Text, StyleSheet } from "react-native";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import IconButton from '@material-ui/core/IconButton';

/* editor component */
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
//import { style } from '../../craco.config';
import './Card.css';
import { autoType } from 'd3';

//Start Connect to database----------
if (!firebase.apps.length) {
    firebase.initializeApp({
      databaseURL: "https://test-7916a-default-rtdb.asia-southeast1.firebasedatabase.app/"
    })
    }else {
    firebase.app(); // if already initialized, use that one
    }
  
  const db = firebase.database();


class Card extends Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        //this.handleSave = this.handleSave.bind(this);
        this.ThumbOnClick = this.ThumbOnClick.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.handleNodeHighlight = this.handleNodeHighlight.bind(this);
        this.handleReply = this.handleReply.bind(this);
        // this.handleParent=this.handleParent.bind(this);
        //this.replying = this.replying.bind(this);

        this.ref = React.createRef();
        this.state = {
                        content:this.props.content,
                        videoId:this.props.videoId,
                        // replyContent:this.props.replyContent,
                        //parentId:"",
                        
                        windowWidth:window.innerWidth,
                    thumbColor:"disabled",
                    highlightRelatedNode_onoff: 0,
                    replyNode_onoff: 0};
        }

    handleResize(e){
        this.setState({windowWidth : window.innerWidth});
    }
    componentDidMount(){
        window.addEventListener("resize", this.handleResize);
        

       /* db.ref(this.props.dbPath).on("value",function (snapshot){
        
            var studentlist = [];
            var data_db= snapshot.val().contents.replace("<p>","").replace("</p>","");
            studentlist.push(data_db);
        });*/
    }
    handleEdit(){
        this.props.SetCardEdit(this.props.commentId);     //key is the commentId
        this.props.SetEditorContent(this.props.content);
        // this.props.SetReplyContent(this.props.replyContent);
        this.props.SetCardEdit(true, false, this.props.commentId);//parameters: editing, reply, cardID
        var currentdate = new Date(); 
        var datetime = "Edit Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
    }
    /*handleSave(){
        this.ref.current.disabled();
        this.props.onSave(this.props.id);
        this.setState({editing:false,
                        content:this.ref.current.core.getContents()});
    }*/
    handleCancel(){
        this.props.SetCardEdit("");
        this.props.SetCardEdit(false, false, this.props.commentId);// not editing & not reply
        var currentdate = new Date(); 
        var datetime = "Cancel Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
        // const [disable, setDisable] = React.useState(false);

        // return (
        //   <button disabled={disable} onClick={() => setDisable(true)}>
        //     Click to Disable!
        //   </button>
        // );
    }
    handleCancelDisable(commentId){
        console.log("handleCancelDisable:",commentId)
        //document.getElementById(commentId).disabled = true;
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {        
            this.setState({content:this.props.content});
        }
      }
    ThumbOnClick(){
        if(this.state.thumbColor =="disabled"){
            var thumbColor ="primary";
            this.props.handleThumbsCnt(this.props.commentId, 'add');
            console.log("handleThumbsCnt add", this.props.commentId)
        }else{
            var thumbColor ="disabled";
            this.props.handleThumbsCnt(this.props.commentId, 'minus');
            console.log("handleThumbsCnt minus")
        }
        //var sendBackEnd='http://0.0.0.0:5000/LikeCard/'+this.props.concept+"&"+this.props.commentId;
        var currentdate = new Date(); 
        var datetime = "Thumb Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
        //fetch(sendBackEnd+'&'+thumbColor);
        this.setState({thumbColor});
    }
    renderThumbCnt(){
        if(this.props.thumbsCnt==0){
            return null;
        }else{
            return this.props.thumbsCnt;
        }
    }

    // handleNodeHighlight(){

    //     this.props.handleNodeHighlight(this.props.commentId); 
    // }
    handleNodeHighlight(){
        if (this.state.highlightRelatedNode_onoff == 0){
            this.props.handleNodeHighlight(this.props.commentId);
            this.setState({highlightRelatedNode_onoff: 1})
        }
        else if (this.state.highlightRelatedNode_onoff == 1){
            this.props.handleNodeHighlight([])
            this.setState({highlightRelatedNode_onoff: 0})
        }
        
    }

    handleReply(commentId){
        console.log("this.props.commentId,",commentId);
        //make new card, setCardEdit -> false
        //reply -> true
        //give commentId
        this.props.SetCardEdit(false, true, this.props.commentId);
        this.props.SetParentId(commentId);// send parent ID(current card whose reply button is pressed)
        // the user need to write reply comment in editor
        // "SetCardEdit()" and "SetParentId()" are in the LearningMapFrame
        // these parameters can be passed to editor
        // so editor can record parent and write the information to database
        
        var currentdate = new Date(); 
        var datetime = "Reply Pressed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log(datetime);
        if(this.state.replyNode_onoff == 0){
            // this.props.handleReply(this.props.commentId);
            console.log("this.state.replyNode_onoff == 0");
            this.setState({replyNode_onoff: 1});
        }
        if(this.state.replyNode_onoff == 1){
            // this.props.handleReply([])
            console.log("this.state.replyNode_onoff == 1");
            this.setState({replyNode_onoff: 0});
        }
    }

    // handleParent(parentId){/////////////////////////////////////////////////////////////////////////////////////////////////////
    //     console.log("handleParent(parentId):",parentId);
        
    //     // this.setState({parentId: parentId});
    //     console.log("this.state.parentId:",this.state.parentId);
    //     console.log("this.state.commentId:",this.state.commentId);
    // }

    // replying(){
    //     this.setState({replyNode_onoff: 1});
    // }


    render(){
        var tmp = this;
        var styles={};
        if((this.props.parentId==undefined) || (this.props.parentId=="") || ((this.props.parentId=="0"))){
            styles = ({
                fullCard:{
                  width: tmp.props.style.ul.width-20,
                //   overflow: 'hidden',
                //   height: '50%',//tmp.props.style.ul.height-280,
                //   box-sizing: border-box,
                  border: '1px solid rgba(0.7,0.7,0.7, 0.7)',
                  borderRadius: '5px',
                  margin:' 2px 1px',//10px 5px
                  padding: '2px 4px',//4px
                },

                // noSpace: set the padding and margin equals to zero in the card
                // iconButtons, originalButtons: make buttons smaller
                noSpace:{
                    margin:'0',
                    padding: '0'
                },
                iconButtons:{
                    width: '26px',
                    height: '26px',
                    margin: '0 4px'
                },
                originalButtons:{
                    height: '26px',
                    margin: '0 4px'
                }
              });
        }
        else{// reply
            styles = ({
                fullCard:{
                    width: tmp.props.style.ul.width-70,
                    border: '1px solid rgba(0.7,0.7,0.7, 0.7)',
                    borderRadius: '5px',
                    margin:' 2px 1px',//10px 5px
                    padding: '2px 4px',//4px
                    left: '50px',
                    position: 'relative'
                },
                noSpace:{
                    margin:'0',
                    padding: '0'
                },
                iconButtons:{
                    width: '26px',
                    height: '26px',
                    margin: '0 4px'
                },
                originalButtons:{
                    height: '26px',
                    margin: '0 4px'
                }
            });            
        }

        let btn_name = this.state.highlightRelatedNode_onoff ? "Unshow Related Concepts" : "Show Related Concepts";
            return (
                <div style={styles.fullCard}>
                    <div className='cardContent' style={styles.noSpace}>
                        <div className='cardText' style={styles.noSpace}>
                            <h5 style={styles.noSpace}>{this.props.userId}</h5>
                            <p style={styles.noSpace}><small>{this.props.content}</small></p>
                        </div>
                    </div>
                    <div>
                        <IconButton style={styles.iconButtons} color="inherit" aria-label="Home">
                            {this.renderThumbCnt()}
                            <ThumbUpIcon color={this.state.thumbColor} onClick={this.ThumbOnClick}/>
                        </IconButton>

                        <IconButton style={styles.iconButtons} color="inherit" aria-label="reply">
                            <ReplyIcon 
                                onClick={()=>{this.handleReply(this.props.commentId)}}
                                disabled={this.props.cardEditing}
                            />                        
                        </IconButton>

                        {/* <button
                            onClick={this.handleEdit}
                            disabled={this.props.cardEditing}
                            className="btn btn-primary btn-sm"
                        >
                            Edit
                        </button> */}

                        <IconButton style={styles.iconButtons} color="default" aria-label="delete">
                            {((!this.props.cardEditing)||(this.props.editingcardID!==this.props.commentId))&&<DeleteIcon
                                onClick={()=>this.props.onDelete(this.props.commentId)}
                            />}                            
                        </IconButton>

                        <IconButton style={styles.iconButtons} color="inherit" aria-label="playCircleFilled">
                            <PlayCircleFilledIcon 
                                // videoClick(from LearningMapFrame): get the video correspond to the comment
                                onClick={()=>this.props.videoClick(this.props.videoId)}
                                disabled={this.props.cardEditing}
                            />                        
                        </IconButton> 

                        <button
                            style={styles.originalButtons}
                            onClick={this.handleNodeHighlight}
                            disabled={this.props.cardEditing}
                            className="btn btn btn-info btn-sm m-2"
                        >
                            {btn_name}
                        </button>
                        
                        {(this.props.cardEditing) && (this.props.editingcardID==this.props.commentId)&&
                                                    <button
                                                    onClick={()=>{this.handleCancel();this.handleCancelDisable(this.props.editingcardID);}}
                                                    className="btn btn-danger btn-sm m-2">
                                                Cancel
                                                </button>}
                        
                        {this.state.replyNode_onoff == 1 && <input style={{width: "350px"}} type="text" placeholder="Adding a reply..."/>} 
                        
                    </div>

                
                </div>
            )                
        // }

        // else{
        //     console.log("else reply");
        //     // this.handleReply();
        //     // this.replying();
        //     return(
        //         <blockquote>
        //             <div className='cardContent'>
        //                 <div className='cardText'>
        //                     <h5>{this.props.userId}</h5>
        //                     <p style={styles.content}><small>{this.props.replyContent}</small></p>
        //                 </div>
        //             </div> 
        //             <div>
        //                 <IconButton color="inherit" aria-label="Home">
        //                     {this.renderThumbCnt()}
        //                     <ThumbUpIcon color={this.state.thumbColor} onClick={this.ThumbOnClick}/>
        //                 </IconButton>
        //                 <button
        //                     onClick={this.handleEdit}
        //                     disabled={this.props.cardEditing}
        //                     className="btn btn-primary btn-sm"
        //                 >
        //                     Edit
        //                 </button>
        //                 {((!this.props.cardEditing)||(this.props.editingcardID!==this.props.videoId))&&<button
        //                     onClick={()=>this.props.onDelete(this.props.videoId)}
        //                     className="btn btn-danger btn-sm m-2"
        //                 >
        //                     Delete
        //                 </button>}
        //                 <button
        //                     onClick={this.handleNodeHighlight}
        //                     disabled={this.props.cardEditing}
        //                     className="btn btn btn-info btn-sm m-2"
        //                 >
        //                     {btn_name}
        //                 </button>
                        
        //                 {(this.props.cardEditing) && (this.props.editingcardID==this.props.videoId)&&
        //                                             <button
        //                                             onClick={()=>{this.handleCancel();this.handleCancelDisable(this.props.editingcardID);}}
        //                                             className="btn btn-danger btn-sm m-2">
        //                                         Cancel
        //                                         </button>}
                        
        //                 {/* <button
        //                     onClick={this.handleReply}
        //                     disabled={this.props.cardEditing}
        //                     className="btn btn-success btn-sm"
        //                 >
        //                     Reply
        //                 </button>
        //                 {this.state.replyNode_onoff == 1 && <input style={{width: "350px"}} type="text" placeholder="Add a reply..."/>}  */}
                    
        //             </div>
        //         </blockquote>
        //     )
            
        // }
        

        

/*        }
        else{
            return(
                <div style = {styles.fullCard}>
                    <div className='cardContent'>
                        <div className='cardText'>
                            <h4>{this.props.userId}</h4>
                            <p style={styles.content}>{this.props.content}</p>
                        </div>
                    </div>
                    <IconButton color="inherit" aria-label="Home">
                    {this.renderThumbCnt()}
                    <ThumbUpIcon color={this.state.thumbColor} onClick={this.ThumbOnClick}/>
                    </IconButton>
                    <button
                        onClick={this.handleSave}
                        className="btn btn-primary btn-sm"
                    >
                        Save
                    </button>
                    <button
                        onClick={()=>this.handleCancel()}
                        className="btn btn-danger btn-sm m-2"
                    >
                        Cancel
                    </button>
                
                </div>
            )
        }
        */

    }
}
export default Card;