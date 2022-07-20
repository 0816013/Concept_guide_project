import React, { Component } from 'react';

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
        if (this.props.progress=="4"){
            console.log("progress==4");
            console.log("concept", this.state.concept);
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
            console.log("progress==else");
            console.log("concept", this.state.concept);
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

        return(
            // <h1>hello h1</h1>
            <div>
                <div>
                    {/* {this.state.concept} */}
                </div>  
                {/* <div>
                    {this.state.highlight_nodes}
                </div>            */}
            </div>

        );
    }
}

export default Comments;