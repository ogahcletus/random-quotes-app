
import React, {useState, useEffect} from 'react';
import './App.scss';
import colorArray from './colorArray';
import {FaTwitter} from 'react-icons/fa';

const quotesDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const [quote, setQuote] = useState('Life is what happens to you while you’re busy making other plans.');
  
  const [author, setAuthor] = useState('John Lennon');

  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#F44336')

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);

  }

  useEffect(() => {
      fetchQuotes(quotesDBUrl)
  }, [])

  const randomClick = () => {
    let randomInteger = (Math.floor(quotesArray.length*Math.random()));
    setRandomNumber(randomInteger);
    setAccentColor(colorArray[randomInteger])
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author)
  }
  

       
  return (
    <div className="App">
    
    <header className="App-header" style={{backgroundColor:accentColor}}>
    <h1>KLEITOS RANDOM QUOTES APP</h1>
       <div id='quote-box' style={{color:accentColor}}>
         <h1>Random Number: {randomNumber}</h1>
          <p id='text'>"{quote}"</p>
         <p id='author'> -{author} </p>
         <div className='button'>
         <a id='tweet-quote' 
         style={{backgroundColor:accentColor}}
         href={encodeURI(`https://twitter.com/intent/tweet?text=${quote}  -${author}`)}>
         <FaTwitter /></a>
        <button id='new-quote' 
         style={{backgroundColor:accentColor}} 
         onClick={randomClick}><h3>Generate A New Random Quote</h3></button>
         
         </div>

         <footer className='footer'>
      <p>&copy; Cletus Ogah@2022. All rights reserved</p>
      </footer>
        </div>
    </header>
    
      
    </div>
  );
}

export default App;
