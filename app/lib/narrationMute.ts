/** Session-wide narrated-demo mute preference (modal + Frx hero share this latch). */
let narrationMutedPreference = false;

export function readNarrationMutedPreference(): boolean {
  return narrationMutedPreference;
}

export function writeNarrationMutedPreference(muted: boolean): void {
  narrationMutedPreference = muted;
}