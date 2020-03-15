class Article < ApplicationRecord

    def initialize(name, price)
        @name = name
        @price = price
    end
    
end
