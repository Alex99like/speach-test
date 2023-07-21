
import { FormEvent, useState } from 'react'
import styles from './Home.module.scss'
import { Select } from '../../components/Select/Select'

const options = [
  { name: 'RUSSIAN', value: 'ru-RU' },
  { name: 'ENGLISH', value: 'en-US' }
]

export const Home = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const [input, setInput] = useState<string>('ru-RU')
  //const [output, setOutput] = useState<'ru-RU' | 'en-EN'>('en-EN')

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  let recognition: SpeechRecognition | null = null;

  const deleteDob = (interimTranscript: string, transcript: string) => {
    if (!interimTranscript.trim() && transcript) return transcript
  
    console.log('interimTranscript: ', !interimTranscript)
    console.log('transcript', !transcript)
    const res = interimTranscript.replace(transcript, '')
    return res
  }

  const startListening = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = input // locale
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      
      let interimTranscript = '';
      //let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          //finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      if (interimTranscript.trim()) {
        setTranscript(() => deleteDob(interimTranscript, transcript));
      } else {
        setTranscript((prev) => prev + '.');
      }
      
      // setTranscript(() => deleteDob(interimTranscript, transcript));
      //console.log(deleteDob(interimTranscript, transcript))
  
      //translateText(finalTranscript); // транслэйт речи

    };
    recognition.start();
  };

  

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  return (
    <section className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.select}>
          <Select
            options={options}
            selected={input}
            changeValue={setInput}
          />
        </div>
        <textarea value={transcript}></textarea>
        <button onClick={toggleListening} className={styles.speech}>
          {isListening ? 'STOP' : 'SPEECH'}
        </button>
      </form>
     
    </section>
  )
}
