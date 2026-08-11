import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-synth01',
  templateUrl: './synth01.page.html',
  styleUrls: ['./synth01.page.scss'],
})
export class Synth01Page implements AfterViewInit, OnDestroy {
  padAreaHeight: number;
  padAreaWidth: number;
  effectAreaHeight: number;
  effectAreaWidth: number;

  showStartOverlay = !localStorage.getItem('tone-synth-started');

  autoWah: Tone.AutoWah;
  autoWahBaseFrequency = 400;

  vibrato: Tone.Vibrato;
  vibratoFrequency = 0;

  chorus: Tone.Chorus;
  chorusFrequency = 0;

  delay: Tone.FeedbackDelay;
  delayTime = 0;
  delayFeedback = 0;

  reverb: Tone.Freeverb;
  reverbRoomSize = 0;
  reverbWet = 0;

  synth: Tone.PolySynth;

  private audioStarted = false;
  private activeNotes = new Set<string>();

  notesArray = [
    ['C4', 'D4', 'E4', 'F4'],
    ['G4', 'A4', 'B4', 'C5'],
    ['D5', 'E5', 'F5', 'G5'],
    ['A5', 'B5', 'C6', 'D6']
  ];

  ngAfterViewInit() {
    this.setpadAreaSize();
    this.setEffectAreaSize();

    this.autoWah = new Tone.AutoWah(this.autoWahBaseFrequency);
    this.vibrato = new Tone.Vibrato(this.vibratoFrequency);
    this.chorus = new Tone.Chorus(this.chorusFrequency);

    this.delay = new Tone.FeedbackDelay(this.delayTime, this.delayFeedback);
    this.delay.wet.value = 50;

    this.reverb = new Tone.Freeverb(this.reverbRoomSize, 4000);
    this.reverb.wet.value = this.reverbWet;
    this.reverb.toMaster();

    this.synth = new Tone.PolySynth(6, Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.04,
        decay: 1,
        sustain: 1,
        release: 4
      },
    }).chain(this.autoWah, this.vibrato, this.chorus, this.delay, this.reverb);
  }

  ngOnDestroy() {
    this.synth?.dispose();
    this.autoWah?.dispose();
    this.vibrato?.dispose();
    this.chorus?.dispose();
    this.delay?.dispose();
    this.reverb?.dispose();
  }

  private isPortrait(): boolean {
    if (window.matchMedia) {
      return window.matchMedia('(orientation: portrait)').matches;
    }
    return window.innerHeight >= window.innerWidth;
  }

  onResize() {
    this.setpadAreaSize();
    this.setEffectAreaSize();
  }

  setpadAreaSize() {
    if (this.isPortrait()) {
      this.padAreaHeight = window.innerWidth;
      this.padAreaWidth = window.innerWidth;
    } else {
      this.padAreaHeight = window.innerHeight;
      this.padAreaWidth = window.innerHeight;
    }
  }

  setEffectAreaSize() {
    if (this.isPortrait()) {
      this.effectAreaHeight = window.innerHeight - this.padAreaHeight;
      this.effectAreaWidth = window.innerWidth;
    } else {
      this.effectAreaHeight = window.innerHeight;
      this.effectAreaWidth = window.innerWidth - this.padAreaWidth;
    }
  }

  private async ensureAudioStarted(): Promise<void> {
    if (!this.audioStarted) {
      await Tone.start();
      this.audioStarted = true;
      this.showStartOverlay = false;
      localStorage.setItem('tone-synth-started', '1');
    }
  }

  async noteOn(note: string, event: Event) {
    await this.ensureAudioStarted();
    this.activeNotes.add(note);
    this.synth.triggerAttack(note);
    event.stopPropagation();
    event.preventDefault();
  }

  noteOff(note: string, event: Event) {
    if (!this.activeNotes.has(note)) {
      return;
    }
    this.activeNotes.delete(note);
    this.synth.triggerRelease(note);
    event.stopPropagation();
    event.preventDefault();
  }

  onAutoWahChange(value: number) {
    this.autoWahBaseFrequency = value;
    this.autoWah.baseFrequency = value;
  }

  onVibratoChange(value: number) {
    this.vibratoFrequency = value;
    this.vibrato.frequency.value = value;
  }

  onChorusChange(value: number) {
    this.chorusFrequency = value;
    this.chorus.frequency.value = value;
  }

  onDelayTimeChange(value: number) {
    this.delayTime = value;
    this.delay.delayTime.value = value;
  }

  onDelayFeedbackChange(value: number) {
    this.delayFeedback = value;
    this.delay.feedback.value = value;
  }

  onReverbRoomSizeChange(value: number) {
    this.reverbRoomSize = value;
    this.reverb.roomSize.value = value;
  }

  onReverbWetChange(value: number) {
    this.reverbWet = value;
    this.reverb.wet.value = value;
  }
}
