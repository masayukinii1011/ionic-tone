import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';
import { TokenError } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-synth01',
  templateUrl: './synth01.page.html',
  styleUrls: ['./synth01.page.scss'],
})
export class Synth01Page implements OnInit, AfterViewInit {

  synth: Tone;

  tremolo: Tone;
  tremoloFrequency = 0;

  vibrato: Tone;
  vibratoFrequency = 0;

  autoWah: Tone;
  autoWahBaseFrequency = 400;

  chorus: Tone;
  chorusFrequency = 0;

  delay: Tone;
  delayTime = 0;
  delayFeedback = 0;
  delayWet = 50;

  reverb: Tone;
  reverbRoomSize = 0;
  reverbDampening = 0;
  reverbWet = 0;

  notesArray = [
    ['C4', 'D4', 'E4', 'F4'],
    ['G4', 'A4', 'B4', 'C5'],
    ['D5', 'E5', 'F5', 'G5'],
    ['A5', 'B5', 'C6', 'D6']
  ];
  padContainerHeight: number;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setpadContainerHeight(window.innerWidth);

    this.synth = new Tone.PolySynth(4, Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.04,
        decay: 1,
        sustain: 1,
        release: 4
      },
    });

    this.tremolo = new Tone.Tremolo(this.tremoloFrequency);
    this.tremolo.start();

    this.vibrato = new Tone.Vibrato(this.vibratoFrequency);

    this.autoWah = new Tone.AutoWah(this.autoWahBaseFrequency);

    this.chorus = new Tone.Chorus(this.chorusFrequency);

    this.delay = new Tone.FeedbackDelay(this.delayTime, this.delayFeedback);
    this.delay.wet.value = this.delayWet;

    this.reverb = new Tone.Freeverb(this.reverbRoomSize, this.reverbDampening);
    this.reverb.wet.value = this.reverbWet;
    this.reverb.toMaster();

    this.synth.chain(this.tremolo, this.vibrato, this.autoWah, this.chorus, this.delay, this.reverb);
  }

  onChangeValue(value) {
    if (value === this.tremoloFrequency) {
      this.tremolo.frequency.value = value;
    }
    if (value === this.vibratoFrequency) {
      this.vibrato.frequency.value = value;
    }
    if (value === this.autoWahBaseFrequency) {
      this.autoWah.baseFrequency = value;
    }
    if (value === this.chorusFrequency) {
      this.chorus.frequency.value = value;
    }
    if (value === this.delayTime) {
      this.delay.delayTime.value = value;
    }
    if (value === this.delayFeedback) {
      this.delay.feedback.value = value;
    }
    if (value === this.reverbRoomSize) {
      this.reverb.roomSize.value = value;
    }
    if (value === this.reverbDampening) {
      this.reverb.dampening.value = value;
    }
    if (value === this.reverbWet) {
      this.reverb.wet.value = value;
    }
  }

  onResize(event) {
    this.setpadContainerHeight(event.target.innerWidth);
  }

  setpadContainerHeight(height) {
    this.padContainerHeight = height;
  }

  noteOn(note, event) {
    this.synth.triggerAttack(note);
    event.stopPropagation();
    event.preventDefault();
  }

  noteOff(note, event) {
    this.synth.triggerRelease(note);
    event.stopPropagation();
    event.preventDefault();
  }
}
