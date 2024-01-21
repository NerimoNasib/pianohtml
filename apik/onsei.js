let audioCtx;
let gainNode;
let volumeSlider;

function initAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);

  volumeSlider = document.getElementById('volumeSlider');
  volumeSlider.addEventListener('input', function() {
    updateVolume(this.value);
  });
}

function updateVolume(volume) {
  gainNode.gain.value = volume;
}

function generateSineWave(frequency, duration, vol) {
  const numberOfSamples = Math.ceil(audioCtx.sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, numberOfSamples, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  const volumeDecayRate = Math.pow(0.01, 1 / (audioCtx.sampleRate * duration));

  let volume = vol;

  for (let i = 0; i < numberOfSamples; i++) {
    const t = i / audioCtx.sampleRate;
    const amplitude = Math.sin(2 * Math.PI * frequency * t) * volume;

    data[i] = amplitude;
    volume *= volumeDecayRate;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  source.connect(gainNode);

  source.start();

  setTimeout(() => {
    source.stop();
  }, duration * 1000);
}

function playNote(frequency) {
  const vol = volumeSlider.value;
  const duration = 2;
  generateSineWave(frequency, duration, vol);
}