module Api
   
    class BoggleController < ApplicationController
       
       require  './app/helpers/application_helper'
        include ApplicationHelper
        def show()

            shuffledWords = shuffle_word();
            randomWords = random_words();
            
            render json: {status: 'Success', message: '', data:{rv:shuffledWords,rw:randomWords}}, status: :ok
        end



    end

end

