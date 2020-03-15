module ApplicationHelper
    require 'literate_randomizer'

    def random_words()
        string = LiterateRandomizer.sentence
    end

    def shuffle_word(randomWords)
      #string = LiterateRandomizer.sentence
      charArray = randomWords.chars.to_a;

      shuffledString = charArray.shuffle.join.downcase;
      shuffledString = shuffledString.gsub(/[^a-zA-Z]/, '');
    end

  end