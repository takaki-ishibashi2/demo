var synth = window.speechSynthesis;
var inputForm = document.querySelector('form');
var inputTxt = document.getElementById('inputTxt');
var voices = [];

function prepareVoiceList() {
  voices = synth.getVoices();
}

prepareVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = prepareVoiceList;
}
