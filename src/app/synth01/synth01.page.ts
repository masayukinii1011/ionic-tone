import { Component, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-synth01',
  templateUrl: './synth01.page.html',
  styleUrls: ['./synth01.page.scss'],
})
export class Synth01Page implements AfterViewInit {

  padContainerHeight: number;
  effectContainerHeight: number;

  autoWah: Tone;
  autoWahBaseFrequency = 400;

  vibrato: Tone;
  vibratoFrequency = 0;

  chorus: Tone;
  chorusFrequency = 0;

  delay: Tone;
  delayTime = 0;
  delayFeedback = 0;

  reverb: Tone;
  reverbRoomSize = 0;
  reverbWet = 0;

  synth: Tone;

  notesArray = [
    ['C4', 'D4', 'E4', 'F4'],
    ['G4', 'A4', 'B4', 'C5'],
    ['D5', 'E5', 'F5', 'G5'],
    ['A5', 'B5', 'C6', 'D6']
  ];

  ngAfterViewInit() {
    this.setpadContainerHeight(window.innerWidth);
    this.setEffectContainerHeight(window.innerHeight);

    this.autoWah = new Tone.AutoWah(this.autoWahBaseFrequency);
    this.vibrato = new Tone.Vibrato(this.vibratoFrequency);
    this.chorus = new Tone.Chorus(this.chorusFrequency);

    this.delay = new Tone.FeedbackDelay(this.delayTime, this.delayFeedback);
    this.delay.wet.value = 50;

    this.reverb = new Tone.Freeverb(this.reverbRoomSize, 4000);
    this.reverb.wet.value = this.reverbWet;
    this.reverb.toMaster();

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
    }).chain(this.autoWah, this.vibrato, this.chorus, this.delay, this.reverb);
  }

  /**
   * エフェクトの値が変更された時
   * @param value エフェクトの値
   */
  onChangeValue(value) {
    if (value === this.autoWahBaseFrequency) {
      this.autoWah.baseFrequency = value;
    }
    if (value === this.vibratoFrequency) {
      this.vibrato.frequency.value = value;
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
    if (value === this.reverbWet) {
      this.reverb.wet.value = value;
    }
  }

  /**
   * リサイズイベント
   * @param event イベント
   */
  onResize(event) {
    this.setpadContainerHeight(event.target.innerWidth);
    this.setEffectContainerHeight(event.target.innerHeight);
  }

  /**
   * パッドエリアの高さを指定
   * @param windowWidth windowの幅
   */
  setpadContainerHeight(windowWidth) {
    this.padContainerHeight = windowWidth;
  }

  /**
   * エフェクトエリアの高さを指定
   * @param windowHeight windowの幅
   */
  setEffectContainerHeight(windowHeight) {
    this.effectContainerHeight = windowHeight - this.padContainerHeight;
  }

  /**
   * 音を発生
   * @param note 音階
   * @param event イベント
   */
  noteOn(note, event) {
    this.synth.triggerAttack(note);
    // イベントの伝搬を停止
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * 音を停止
   * @param note 音階
   * @param event イベント
   */
  noteOff(note, event) {
    this.synth.triggerRelease(note);
    event.stopPropagation();
    event.preventDefault();
  }
}
