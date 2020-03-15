import React, { Component } from 'react';
class Timer extends Component {

    constructor(props){
        super(props);

        this.state = {
            minutes : '05',
            seconds : '00',
            timer: 300
        }
    }

    componentDidMount(){
        
        this.startTimer();
    }

    startTimer(){

        this.tick = setInterval(() => {

            let secondsRemaining = this.state.timer - 1;
            let minutes = '0' + Math.floor(secondsRemaining / 60);
            let seconds = secondsRemaining - (minutes * 60);
            seconds = (Object.keys(seconds.toString()).length > 1)?  seconds : '0' + seconds;
            
            if(seconds == 0 && minutes == 0){
                clearInterval(this.tick);
                this.props.parentCallBack();
            }
            this.setState({
                timer: secondsRemaining,//this.state.timer - 1,
                minutes:minutes,
                seconds : seconds
            })
            
            
        }, 1000)
    }

    render(){
        const{minutes, seconds} = this.state;
        return (
            
            <div> {minutes}:{seconds}</div>
        )
    }

}

export default Timer