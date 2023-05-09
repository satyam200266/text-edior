import React, { useState } from 'react';

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert(" :- Converted to uppercase","success");
  }

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert(" :- Converted to lowercase","success");
  }

  const handleClearClick = () => {
    let newText = '';
    setText(newText)
    props.showAlert(" :- Text cleared","success");
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert(" :- Speaking your text","success");
  }
  
  function handleDuplicates(){
    let wordArr = text.split(" ");
    let newText = wordArr.filter((item, pos)=>{
        return wordArr.indexOf(item) === pos;
    })
    newText = newText.join(" ");
    setText(newText);
    props.showAlert(" :- Duplicates removed","success");
}

const handleFirstLetterUppercase = () =>{
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const upper = text.split(' ').map(capitalize).join(' ');
  setText(upper)
  props.showAlert(" :- First letter capitalized","success");
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log(text + " copied ");
      props.showAlert(" :- Text copied to clipboard","success");
    })
    .catch((error) => {
      console.error('Error copying text: ', error);
    });
}

const handleExtraSpace = () => {
  let newText = text.split(/[ ]+/);
  setText(newText.join(" "));
  props.showAlert(" :- Removed extra spaces","success");
}

  const handleOnChange = (event) => {
    // console.log("on change");
    setText(event.target.value);
  }
  const [text, setText] = useState('');
  return (
    <>
      <div className="containe" style={{color: props.mode==='dark'?'white':'black'}}>
        <h1>{props.heading} </h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{backgroundColor: props.mode==='dark'?'#212529':'white',color: props.mode==='dark'?'white':'black'}}
            id="mybox"
            rows="8">
            </textarea>
          </div>
            <button className="btn btn primary mx-1 my-1" onClick={handleFirstLetterUppercase}>Capitilize First Word</button>
            <button className="btn btn primary mx-1 my-1" onClick={handleUpClick}>Convert to Upercase</button>
            <button className="btn btn primary mx-1 my-1" onClick={handleLowClick}>Convert to Lowercase</button>
            <button className="btn btn primary mx-1 my-1" onClick={copyToClipboard}>Copy Text</button>
            <button className="btn btn primary mx-1 my-1" onClick={handleExtraSpace}>Remove Extra Space</button>
            <button className="btn btn primary mx-1 my-1" onClick={handleDuplicates}>Remove Duplicate</button>
            <button className="btn btn primary mx-1 my-1" onClick={handleClearClick}>Clear Text </button>
            <button type="submit" onClick={speak} className="btn btn-warning mx-1 my-1">Speak</button>
          </div>
      <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").filter((element)=>{return element.length!==0}).length}words and {text.length}characters
        </p>
        <p>
          {0.008* text.split(" ").length} :-Minutes read minimum
        </p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter your text to see preview here."}</p>
      </div>
    </>
  )
}
// #042749
// #212529