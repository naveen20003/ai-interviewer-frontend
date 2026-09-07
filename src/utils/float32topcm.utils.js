export function convertfloat32topcm(audio) {
    const pcm16 = new Int16Array(audio.length);

    for (let i = 0; i < audio.length; i++) {
      // Clamp to [-1, 1]
      const s = Math.max(-1, Math.min(1, audio[i]));

      // Convert to signed 16-bit
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }

    return pcm16;
}