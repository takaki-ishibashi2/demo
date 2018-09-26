const synthe = window.speechSynthesis;
const inputForm = document.querySelector('form');
const inputTxt = document.querySelector('#inputTxt');
const voiceSelect = document.querySelector('select');

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
