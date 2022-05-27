import React, {useState} from 'react';
import axios from "axios"
import styles from './Style.module.css';
import Banner from './Banner.js'
import Footer from "./Footer"
import { FaInfo} from "react-icons/fa"

function App() {
  const limit=parseInt(10000);
  const maxRate=parseInt(200);
  const minRate=parseInt (160);
  const placeholder=`Text should not be more than ${limit} characters. 
Every fullstop should be preceded with a space before the next sentence begins.`
  
  const [error, setError] = useState("")
  const [processing,setProcesing]=useState(false)
  const [indicator,setIndicator] =useState('Processing....');
  const [text,setText] =useState('');
  const [voice,setVoice] =useState('female');
  const [rate,setRate] =useState(`${minRate}`);
  const [audio, setAudio] =useState();
  
   
  const playAudio= (url) =>{
    let audio=new Audio(url);
    audio.play()
  }

  const transcribeText= async() =>{
    setProcesing(false)
    setError('')
    if (rate < minRate){
      setError(`Speech Rate should not be less than ${minRate}`)
      return
    }
    else if( rate>maxRate){
      setError(`Speech Rate should not be more than ${maxRate}`)
      return
    }
    else if(text===''){
      setError('No text entered')
      return
    }
    else{
      setAudio()
      setIndicator('Processing....')
      setProcesing(true)
      try{
      const {data}= await axios.get(`http://127.0.0.1:8000/synthesize?text=${text}&voice=${voice}&rate=${rate}`,
      { responseType: 'arraybuffer',
      headers:{'Content-Type':'audio/wav'}
    });
    const blob = new Blob([data], {type:'audio/wav'})
    const audioUrl=URL.createObjectURL(blob)
    playAudio(audioUrl)
    setAudio(audioUrl)
    setProcesing(false)
  } catch(error){
    setIndicator(error.message)
  }
    }
    
  }

  return (
    <div>
    <Banner/>
    <div className={styles.container}>
     <h3 className={styles.heading}>TEXT TO SPEECH APP</h3>
     <div className={styles.form}>
      <div className={styles.choice}> 
       <label htmlFor='voice'>VOICE</label>
        <select onChange={(e) =>{setVoice(e.target.value)}} id="voice" name="voice-choice">
          <option value="male">Male</option>
          <option value="female" selected>Female</option>
        </select>

      <label htmlFor='rate'>SPEECH RATE</label>
      <input type="number" placeholder={minRate} onChange={(e) =>{setRate(e.target.value)}} id="rate" min={minRate} max={maxRate}></input>
      </div>
      { error && <p className={styles.error}> <FaInfo className={styles.infoicon} />{error} </p> }
      <textarea placeholder={placeholder}  maxLength={limit} className={styles.textarea} onChange={(e) => {setText(e.target.value)}} rows="6" cols="50"></textarea>
      <p className={styles.indicator}>({text.length})/{limit} Characters</p>
      <div className={styles.control}><button onClick={transcribeText}>Read Aloud</button></div>
    </div>
    {  audio ? 
    <div className={styles.playcenter}>
      <a href={audio}  download ="TTS_AUDIO.mp3"><button className={styles.download}>Download Audio</button> </a> 
     <button className={styles.replay} onClick={()=> playAudio(audio)}> Replay </button>
    </div> : (processing) && <p className={styles.processing}> {indicator}</p>} 
    </div>
    <Footer />
    </div>
  );
}

export default App;
