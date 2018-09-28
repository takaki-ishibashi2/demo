const synthe = window.speechSynthesis;
const inputForm = document.querySelector('form');
const inputTxt = document.querySelector('#inputTxt');
const voiceSelect = document.querySelector('select');
const state = document.querySelector('#state');
const propVal = document.querySelector('#propVal');

let voices = [];

const init = () => {
  voices = synthe.getVoices();
  const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHtml = '';
  for (voice of voices) {
    const opt = document.createElement('option');
    opt.textContent = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      opt.textContent += ' -- DEFAULT';
    }
    opt.setAttribute('data-lang', voice.lang);
    opt.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(opt);
  }
  voiceSelect.selectedIndex = selectedIndex; // note: this index is -1 when voice array is empty.
}

init();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = init;
}

const speak = () => {
  state.innerText = 'speaking';
  if (inputTxt.value !== '') {
    const ssu = new SpeechSynthesisUtterance(inputTxt.value);
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (voice of voices) {
      if (voice.name === selectedVoiceName) {
	ssu.voice = voice;
      }
    }
    ssu.pitch = 1;
    ssu.rate = 1;
    synthe.speak(ssu);
  }
}

inputForm.onsubmit = evt => {
  evt.preventDefault();
  speak();
  inputTxt.blur();
}

voiceSelect.onchange = () => {
  speak();
}

document.querySelector("#pauseBtn").ontouchstart = () => {
  state.innerText = 'pausing';
  synthe.pause();
}
document.querySelector("#resumeBtn").ontouchstart = () => {
  state.innerText = 'speaking';
  synthe.resume();
}
document.querySelector("#cancelBtn").ontouchstart = () => {
  synthe.cancel();
}

document.querySelector('#readPaused').ontouchstart = () => {
  if (synthe.paused) {
    return propVal.innerText = 'Yes, paused';
  }
  propVal.innerText = 'No, puased';
}

document.querySelector('#readPending').ontouchstart = () => {
  console.log(synthe.pending);
}

document.querySelector('#readSpeaking').ontouchstart = () => {
  if (synthe.speaking) {
    return propVal.innerText = 'Yes, speaking';
  }
  propVal.innerText = 'No, speaking';
}

const callback = () => {
  if (!synthe.speaking) {
    state.innerText = 'waiting...';
  }
}
window.setInterval(callback, 100);
