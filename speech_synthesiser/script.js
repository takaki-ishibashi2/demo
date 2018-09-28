const synthesis = window.speechSynthesis;
const form = document.querySelector('form');
const inputTxt = document.querySelector('#inputTxt');
const voiceSelect = document.querySelector('select');
const state = document.querySelector('#state');
const prop = document.querySelector('#property');
let voices = [];

const populateVoices = () => {
  voices = synthesis.getVoices();
  const index = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.textContent = '';
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
  voiceSelect.selectedIndex = index; // note: this index is -1 when voice array is empty.
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

const speak = () => {
  if (synthesis.paused) return;
  state.textContent = 'speaking';
  if (inputTxt.value !== '') {
    const utter = new SpeechSynthesisUtterance(inputTxt.value);
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (voice of voices) {
      if (voice.name === selectedVoiceName) {
	utter.voice = voice;
      }
    }
    utter.pitch = 1;
    utter.rate = 1;
    synthesis.speak(utter);
  }
}

form.onsubmit = evt => {
  evt.preventDefault();
  speak();
  inputTxt.blur();
}

voiceSelect.onchange = () => {
  speak();
}

document.querySelector("#pauseBtn").onclick = () => {
  state.textContent = 'pausing';
  synthesis.pause();
}
document.querySelector("#resumeBtn").onclick = () => {
  state.textContent = 'speaking';
  synthesis.resume();
}
document.querySelector("#cancelBtn").onclick = () => {
  synthesis.cancel();
}

document.querySelector('#readPausedBtn').onclick = () => {
  if (synthesis.paused) {
    return prop.textContent = 'Yes, paused';
  }
  prop.textContent = 'No, puased';
}

document.querySelector('#readPendingBtn').onclick = () => {
  // todo
}

document.querySelector('#readSpeakingBtn').onclick = () => {
  if (synthesis.speaking) {
    return prop.textContent = 'Yes, speaking';
  }
  prop.textContent = 'No, speaking';
}

const repeatable = () => {
  if (!synthesis.speaking) {
    state.textContent = 'waiting...';
  }
}
window.setInterval(repeatable, 100);
