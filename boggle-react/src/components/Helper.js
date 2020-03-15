export default { 

    horizontalCheck(i, inputArray, mainArray, dir) {
  
        let col = (dir == "LTR") ? 0 : 3;
        let correctCount = 0;
        let inputArrayCount = 0;
        for(let j = 0; j<= inputArray.length; j++){


            if( (4 * i + col) > 15 || (4 * i + col) < 0 ){
                break;
            }

            if(mainArray[( 4 * i + col)].name == inputArray[inputArrayCount]){
                
                correctCount++;
                inputArrayCount++;
            }
            //correct only for some chars 
            else if(correctCount > 0){
                //correctCount = 0;
                break; 
            }

            if(correctCount == inputArray.length){
                //success = true;
                //alert('correct');
                return true;
            }

            (dir == "LTR") ? col ++ : col --;
        }

        return false;
  
    }

    ,
    verticalCheck(i, inputArray, mainArray, dir){

        let row =  (dir == "TTB") ? 0 : 3;
        let correctCount = 0;
        let inputArrayCount = 0;
        for(let j = 0; j<= inputArray.length; j++){

            if( (4 * row + i) > 15 || (4 * row + i) < 0 ){
                break;
            }

            if(mainArray[(4 * row + i)].name == inputArray[inputArrayCount]){
                
                correctCount++;
                inputArrayCount++;
            }
            //correct only for some chars 
            else if(correctCount > 0){
                //correctCount = 0;
                break; 
            }

            if(correctCount == inputArray.length){
                //success = true;
                //alert('correct');
                return true;
            }

            (dir == "TTB") ?  row ++ : row--;
        }

        return false;
    },

    diagonalCheck(i, initCol, inputArray, mainArray, dir){

        let col = initCol;
        let correctCount = 0;
        let inputArrayCount = 0;
        let row = i;
        for(let j = 0; j<= inputArray.length; j++){

            if( (4*row + col) > 15 || (4*row + col) < 0 ){
                break;
            }
            if(mainArray[( 4 * row + col)].name == inputArray[inputArrayCount]){
                
                correctCount++;
                inputArrayCount++;
            }
            //correct only for some chars 
            else if(correctCount > 0){
                //correctCount = 0;
                break; 
            }

            if(correctCount == inputArray.length){
                
                //alert('correct');
                return true;;
            }

            (initCol == 0 || initCol == 1) ? col ++ : col--;
            (dir == "TTB") ? row ++ : row--;
        }

        return false;
    },

    webServiceCall(url){
        
        return fetch(url)
          .then(res => res.json())
          
    }
  
    
  }