import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import VideoComment from './VideoComment';

// progress = 4
// user's name, comment and like count

class VideoComments extends Component {
    constructor(props){
        super(props);
        this.state={
            // concept:this.props.searchInfo,
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
            // Card_ConceptIndex: this.props.Card_ConceptIndex,
            // highlight_nodes: this.props.highlight_nodes,
        };
    }

    render(){
        var tmp = this;
        var styles={};

        styles = ({
            ul: {
                //overflowX: "scroll",
                overflowY: "scroll",
                width:tmp.props.graphWidth,
                height:(tmp.state.windowHeight/2-100)
            }, 
            paper2: {
                width: tmp.state.windowWidth/2.0,
                // height: 850,
                overflowX: "hidden",
                overflowY: "scroll",
                padding: 15,
                margin : 15,
                position: 'absolute',
                right: 0,
                top: 100,
            }
        });

        // read data from json file
        // show comments and it's likeCount
        const videoInfomations = [];
        const videoIdNow = this.props.videoId;
        const comments_list = this.props.data.videos_info[videoIdNow].show_comments;
        for(var i=0;i<comments_list.length;i++){
            videoInfomations.push({comment: this.props.data.comments_info[comments_list[i]].text, 
                                   likeCount: this.props.data.comments_info[comments_list[i]].likeCount});
        }

        // for(const videoId of Object.keys(this.props.data.videos_info)){
        //     console.log("videoId:",videoId)
        //     console.log("this.props.videoId",this.props.videoId)
        //     const videoIdNow = this.props.data.videos_info[videoId].videoid;
        //     if(videoIdNow == this.props.videoId){
        //         for(var i=0;i<10;i++){
        //             videoInfomations.push({description: this.props.data.videos_info[videoId].description, 
        //                                 likeCount: this.props.data.videos_info[videoId].likeCount});                    
        //         }
        //     }
        // }

        if(this.props.progress==4){
            return(
                <div className="relative">
                    <Paper style= {Object.assign({}, styles.paper2, {height:window.innerHeight-130})} elevation={13}>
                        {videoInfomations.map(videoInformation =>
                        (<VideoComment
                            comment={videoInformation.comment}
                            likeCount={videoInformation.likeCount}
                            style={styles}
                        />
                        ))}                        
                    </Paper>
                </div>
            );            
        }
        else{
            return null;
        }

    }
}

export default VideoComments;