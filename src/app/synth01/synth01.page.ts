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
  reverb: Tone;

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
        type: 'pulse'
      },
      envelope: {
        attack: 0.4,
        decay: 0.1,
        sustain: 0.1,
        release: 100
      },
    });

    this.delay = new Tone.FeedbackDelay('6n', 0.4);
    this.reverb = new Tone.Freeverb(0.1, 100).toMaster();

    this.synth.chain(this.delay, this.reverb);
  }

  onResize(event) {
    this.setpadContainerHeight(event.target.innerWidth);
  }

  setpadContainerHeight(height) {
    this.padContainerHeight = height;
  }

  noteOn(note) {
    this.synth.triggerAttackRelease(note, '8n');
  }
}
