class SpeechRecognitionWrapper {
  constructor() {
    this.recognition = this.getRecognition();
    this.grammarList = this.getGrammarList();
    const grammar = '#JSGF V1.0; grammar colors; public <color> = blue | red | green ;';
    const grammarWeight = 1;
    this.grammarList.addFromString(grammar, grammarWeight);
    this.recognition.grammars = this.grammarList;
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

  }
  getRecognition() {
    if (window.hasOwnProperty('SpeechRecognition')) {
      return new SpeechRecognition();
    }
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      return new webkitSpeechRecognition();
    }
    return -1;
  }
  getGrammarList() {
    if (window.hasOwnProperty('SpeechGrammarList')) {
      return new SpeechGrammarList();
    }
    if (window.hasOwnProperty('webkitSpeechGrammarList')) {
      return new webkitSpeechGrammarList();
    }
    return -1;
  }
  start() {
    this.recognition.start();
  }
}

const spw = new SpeechRecognitionWrapper();
const output = document.querySelector('#output');
const bg = document.querySelector('html');
const root = document.querySelector('#root');

root.onclick = () => {
  spw.start();
  output.textContent = 'Try saying "blue", "red" or "green".';
}

spw.recognition.onresult = evt => {
  const color = evt.results[0][0].transcript;
  output.textContent = `You said ${color}.`;
  bg.style.backgroundColor = color;

  const utter = new SpeechSynthesisUtterance(`You said, ${color}.`);
  ustter.voice = voices[3];
  utter.pitch = 1;
  utter.rate = 1;
  synthesis.speak(utter);
}

// Synthesis
const synthesis = window.speechSynthesis;
let voices = [];
const prepareVoices = () => {
  voices = synthesis.getVoices();
}
prepareVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = prepareVoices;
}
