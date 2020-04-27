import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-synth01',
  templateUrl: './synth01.page.html',
  styleUrls: ['./synth01.page.scss'],
})
export class Synth01Page implements OnInit, AfterViewInit {

  synth: Tone;

  delay: Tone;
  delayTime = 0;
  delayFeedback = 0;
  delayWet = 0;

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
        attack: 0.01,
        decay: 0.1,
        sustain: 0.1,
        release: 10
      },
    });

    this.delay = new Tone.FeedbackDelay(this.delayTime, this.delayFeedback);
    this.delay.wet.value = this.delayWet;

    this.reverb = new Tone.Freeverb(this.reverbRoomSize, this.reverbDampening);
    this.reverb.wet.value = this.reverbWet;
    this.reverb.toMaster();

    this.synth.chain(this.delay, this.reverb);
  }

  onChangeValue(value) {
    if (value === this.delayTime) {
      this.delay.delayTime.value = value;
    }
    if (value === this.delayFeedback) {
      this.delay.feedback.value = value;
    }
    if (value === this.delayWet) {
      this.delay.wet.value = value;
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
    this.synth.triggerAttackRelease(note, 0.1);
    event.stopPropagation();
    event.preventDefault();
  }
}
