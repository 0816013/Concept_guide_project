import React, { Component } from 'react';

class VideoComment extends Component {
    render(){
        const styles = ({
            fullCard:{
                width: this.props.style.ul.width-20,
                border: '1px solid rgba(0.7,0.7,0.7, 0.7)',
                borderRadius: '5px',
                //may LCY
                margin:' 2px 1px',
                padding: '2px 4px',
            },
            noSpace:{
                margin:'0',
                padding: '0'
            }
          });

          return(
            <div style={styles.fullCard}>
                <div className='cardContent' style={styles.noSpace}>
                    <div className='cardText' style={styles.noSpace}>
                        <h5 style={styles.noSpace}>{this.props.comment}</h5>
                        <p style={styles.noSpace}>❤️<small>{this.props.likeCount}</small></p>
                    </div>
                </div>
            </div>

          )
    }
}

export default VideoComment;