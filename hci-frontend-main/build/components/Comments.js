import React, { Component } from 'react';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            concept:this.props.searchInfo,
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
            Card_ConceptIndex: this.props.Card_ConceptIndex,
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
        if (this.props.progress=="4"){
            // console.log("progress==4");
            styles = ({
                ul: {
                    //overflowX: "scroll",
                    overflowY: "scroll",
                    width:tmp.props.graphWidth,
                    height:(tmp.state.windowHeight/2-100)
                }, 
                paper2: {
                    width: tmp.state.windowWidth/2.012,
                    // height: 850,
                    overflowX: "hidden",
                    overflowY: "scroll",
                    padding: 15,
                    margin : 15,
                }
            });
        }
        else{
            styles = ({
                ul: {
                    //overflowX: "scroll",
                    overflowY: "scroll",
                    // may LCY
                    width:tmp.state.windowWidth/2.012,
                    height:(tmp.state.windowHeight/3)+(tmp.state.windowHeight/3)
                }, 
                paper2: {
                    width: tmp.state.windowWidth/2.012,
                    // height: 850,
                    overflowX: "hidden",
                    overflowY: "scroll",
                    padding: 15
                }
            });
        };
    }
}

export default Comments;