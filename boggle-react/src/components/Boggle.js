import React, { Component } from 'react';
import Timer from './Timer';
import Helper from "./Helper";

class Boggle extends Component {

    array = [];
    state = {
        formDisable: false,
        correct:true,
        score: 0,
        message:'No point yet',
        boggleArray: [
            {
                'id': 1,
                'name': 'a'
            },
            {
                'id': 2,
                'name': 'b'
            },
            {
                'id': 3,
                'name': 'c'
            },
            {
                'id': 4,
                'name': 'd'
            },
            {
                'id': 5,
                'name': 'e'
            },
            {
                'id': 6,
                'name': 'f'
            },
            {
                'id': 7,
                'name': 'g'
            },
            {
                'id': 8,
                'name': 'h'
            },
            {
                'id': 9,
                'name': 'i'
            },
            {
                'id': 10,
                'name': 'j'
            },
            {
                'id': 11,
                'name': 'k'
            },
            {
                'id': 12,
                'name': 'l'
            },
            {
                'id': 13,
                'name': 'm'
            },
            {
                'id': 14,
                'name': 'n'
            },
            {
                'id': 15,
                'name': 'o'
            },
            {
                'id': 16,
                'name': 'p'
            }
        ]
    }

    handleSubmit = (event) => {
        event.preventDefault();
       
        let input = this.name.value;
        if (!input) {
            alert('Please enter some text');
            return;
        }

        this.name.value = '';

        if (!this.array.some(item => input === item)) {
            this.array.push(input);
            this.process(input);
        } else {
            this.setState({             
                correct:false,
                message:"Already added"
            })
        }


    };

    process(input) {

        let success = false;
        success = this.checkHorizontal(input);

        if (!success) {
            success = this.checkVertical(input);
        }

        //left down

        if (!success) {
            success = this.checkDiagonal(input);
        }

        if (!success) {
            //alert('invalid word')
            this.setState({             
                correct:false,
                message:"Invalid word!!"
            })
        } else {
            // call HTTP to validate against dictionary
            this.validateWordAgainstDictionary(input);
        }
        
    }

    validateWordAgainstDictionary(input) {


        Helper.webServiceCall('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + input + '?key=1f82c437-133a-4ab7-9162-3bd4fbecb8d3')
            .then(
                (result) => {

                    console.log(result);
                    if (typeof result[0] == "object") {

                        let score = Object.keys(input).length;
                        this.setState({
                            score: this.state.score + score,
                            correct:true,
                            message:"Correct"
                        })

                        //alert('Correct word');
                        //correct word
                    } else {
                        //incorrect word

                        this.setState({
                            
                            correct:false,
                            message:"Invalid word!!"
                        })
                    }
                },

                (error) => {

                    console.log('here')
                    console.log(error);
                }
            )
    }

    checkHorizontal(input) {

        let success = false;
        success = this.checkLeftToRightHorizontal(input);

        if (!success) {
            success = this.checkRightToLeftHorizontal(input);
        }

        return success;
    }

    checkVertical(input) {

        let success = false;
        success = this.checkTopToBottomVertical(input);

        if (!success) {
            success = this.checkBottomToTopVertical(input);
        }

        return success;

    }

    checkDiagonal(input) {

        let success = false;
        success = this.checkTopToBottomDiagonal(input);

        if (!success) {
            success = this.checkBottomToTopDiagonal(input);
        }


        return success;
    }

    checkTopToBottomDiagonal(input) {

        const inputArray = input.split('');
        let success = false;

        for (let j = 0; j <= 3; j++) {
            //initCol = j;
            for (let i = 0; i <= 1; i++) {

                success = Helper.diagonalCheck(i, j, inputArray, this.state.boggleArray, "TTB");


                if (success) {
                    return success;
                }
            }
        }


        return success;

    }

    checkBottomToTopDiagonal(input) {

        const inputArray = input.split('');
        let success = false;

        for (let j = 0; j <= 3; j++) {
            //initCol = j;
            for (let i = 3; i >= 2; i--) {

                success = Helper.diagonalCheck(i, j, inputArray, this.state.boggleArray, "BTT");

                if (success) {
                    return success;
                }
            }


        }


        return success;

    }

    checkLeftToRightHorizontal(input) {

        const inputArray = input.split('');
        let success = false;
        for (let i = 0; i <= 3; i++) {
            success = Helper.horizontalCheck(i, inputArray, this.state.boggleArray, "LTR");

            if (success) {
                return success;
            }
        }

        return success;
    }

    checkRightToLeftHorizontal(input) {

        const inputArray = input.split('');
        let success = false;
        for (let i = 3; i >= 0; i--) {
            success = Helper.horizontalCheck(i, inputArray, this.state.boggleArray, "RTL");

            if (success) {
                return success;
            }
        }

        return success;
    }

    checkTopToBottomVertical(input) {

        const inputArray = input.split('');
        let success = false;
        for (let i = 0; i <= 3; i++) {

            success = Helper.verticalCheck(i, inputArray, this.state.boggleArray, "TTB");
            if (success) {
                return success;
            }
        }

        return success;
    }

    checkBottomToTopVertical(input) {

        const inputArray = input.split('');
        let success = false;
        for (let i = 3; i >= 0; i--) {


            success = Helper.verticalCheck(i, inputArray, this.state.boggleArray, "BTT");
            if (success) {
                return success;
            }
        }

        return success;
    }
    //

    componentDidMount() {
        fetch('http://localhost:3000/api/boggle/get')
            .then(res => res.json())
            .then(
                (result) => {
                   
                    var y = result.data.rv;
                    
                    var x = y.split('');
                    var charArray = [];
                    x.map((r, i) => {
                        charArray.push({ 'id': i + 1, 'name': r })
                    });
                    this.setState({

                        boggleArray: charArray
                    });
                },
             
                (error) => {
                    /*this.setState({
                      isLoaded: true,
                      error
                    });*/
                    console.log('here')
                    console.log(error);
                }
            )
    }


    //

    renderHorizontal() {


        const listStyle = {
            display: "inline-block",
            padding: "10px",
            height: "50px",
            width: "50px",
            fontSize: "40px",
            lineHeight: "50px",
            margin: "auto",
            border: "1px solid gray",
            backgroundColor: "white"
        };
        let parentDiv = []
        let index = 0;
        let count = 0;
        for (let i = 0; i < 4; i++) {

            let childDiv = []
            for (let j = index; j <= index + 3; j++) {

                if (j > 15) {
                    break;
                }
                childDiv.push(<div style={listStyle} >{' '}
                    {this.state.boggleArray[j].name}
                </div>)
            }

            index = index + 4;
            parentDiv.push(<div style={{ display: "block" }}>{childDiv} </div>)
            count++;
        }

        return parentDiv;
    }

    callBackFromTimer = () => {
        this.setState({
            formDisable:true
        });
    }

    render() {

        const { formDisable, score, correct,message } = this.state;
        return (


            <div>
               
                <div className="scoreContainer">
                    <div className="scoreTimer">
                        <div className="score">SCORE : {score}</div>
                        <div className="timer"><Timer parentCallBack={this.callBackFromTimer} /></div>
                    </div>

                </div>
                <div >
                    {this.renderHorizontal()}
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input className={formDisable ? "disabled" : ""} disabled={formDisable ? "disabled" : ""}type="text" maxLength="4" placeholder="Input" ref={input => this.name = input} />
                        <div><button type="submit" className="btn btn-primary">Submit</button></div>
                    </form>
                </div>
                <div className="messageContainer">
                    <div className={correct ? "successMessage" : "errorMessage"}>
                        {message}
                    </div>
                </div>
            </div>


        );
    }
}

export default Boggle;