module ApplicationHelper
    require 'literate_randomizer'
    def random_string(length, include_uppercase = false, include_lowercase = true, include_numbers = false)
      l = []
      l.push ('a'..'z') if include_uppercase
      l.push ('A'..'Z') if include_lowercase
  
      l.push (0..9) if include_numbers
      l = l.map { |i| i.to_a }.flatten
      string = (0...length).map { l[rand(l.length)] }.join


    end

    def random_words()
        string = LiterateRandomizer.sentence
    end

    def shuffle_word()
      string = LiterateRandomizer.sentence
      charArray = string.chars.to_a;

      shuffledString = charArray.shuffle.join.downcase;
      shuffledString = shuffledString.gsub(/[()-,.!'"\s]/, '');
    end

  end