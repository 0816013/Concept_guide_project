import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Comment from './Comment';

// progress = 3
// trends
// topic, video photo, rank, comments, username

class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            concept:this.props.searchInfo,
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
            Card_ConceptIndex: this.props.Card_ConceptIndex,
            highlight_nodes: this.props.highlight_nodes,
        };
        // fetch('http://localhost:8001/GetJson_covid/'+index, {
        //     headers : { 
        //       'Content-Type': 'application/json',
        //       'Accept': 'application/json'
        //      }
      
        //   })
        // .then(function (res) {
        //     return res.json();
        // }).then(function(myJson) {////////////////////////////
        //     console.log("myJson",myJson.search_info);
        //     tmp.props.SetMenuClose();
        //     tmp.props.SetProgress(3,myJson);
        //     //tmp.props.SetNewJson(myJson);
        //     return myJson;/////////////////////////////////////
        // });
    }

    render(){
        var tmp = this;
        var styles={};
        
        styles = ({
            ul: {
                //overflowX: "scroll",
                overflowY: "scroll",
                // may LCY
                width:tmp.state.windowWidth/2.1,
                height:(tmp.state.windowHeight/3)+(tmp.state.windowHeight/3)
            }, 
            paper2: {
                width: tmp.state.windowWidth/2.1,
                // height: 850,
                overflowX: "hidden",
                overflowY: "scroll",
                padding: 15,
                margin : 15,
                position: 'absolute',
                right: 0,
            }
        });

        if(this.props.progress==3){
            return(
                <Comment/>
                // <div>
                //     <Paper style={styles.paper2} elevation={3}>
                //         <h1>hello h1 comment</h1>
                //     </Paper>
                //     {/* <div>

                //         {this.state.concept}
                //     </div>   */}
                //     {/* <div>
                //         {this.state.highlight_nodes}
                //     </div>            */}                  
                // </div>

            );            
        }
        else{
            return null;
        }

    }
}

export default Comments;