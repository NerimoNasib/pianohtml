function generateSineWave(frequency, duration, vol) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = audioCtx.sampleRate;
  const numberOfSamples = Math.ceil(sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, numberOfSamples, sampleRate);
  const data = buffer.getChannelData(0);
  const volumeDecayRate = Math.pow(0.01, 1 / (sampleRate * duration));

  let volume = vol;

  for (let i = 0; i < numberOfSamples; i++) {
    const t = i / sampleRate;
    const amplitude = Math.sin(2 * Math.PI * frequency * t) * volume;

    data[i] = amplitude;
    volume *= volumeDecayRate;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();

  setTimeout(() => {
    source.stop();
  }, duration * 1000);
}

function playNote(frequency) {
  const vol = 0.5; // Adjust the volume as needed
  const duration = 2; // Adjust the duration as needed
  generateSineWave(frequency, duration, vol);
}