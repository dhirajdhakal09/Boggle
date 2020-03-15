module Api
   
    class BoggleController < ApplicationController
       
        require  './app/helpers/application_helper'
        include ApplicationHelper
        def show()

            randomWords = random_words();
            shuffledWords = shuffle_word(randomWords);
            
            render json: {status: 'Success', message: '', data:{rv:shuffledWords,rw:randomWords}}, status: :ok
        end



    end

end

