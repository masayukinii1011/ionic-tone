import { Component, AfterViewInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-synth01',
  templateUrl: './synth01.page.html',
  styleUrls: ['./synth01.page.scss'],
})
export class Synth01Page implements AfterViewInit {
  padAreaHeight: number;
  padAreaWidth: number;
  effectAreaHeight: number;
  effectAreaWidth: number;

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
   * リサイズイベント
   */
  onResize() {
    this.setpadAreaSize();
    this.setEffectAreaSize();
  }

  /**
   * パッドエリアのサイズを指定
   */
  setpadAreaSize() {
    // 縦向き
    if (window.orientation === 0) {
      this.padAreaHeight = window.innerWidth;
      this.padAreaWidth = window.innerWidth;
    } else {
      // 横向き
      this.padAreaHeight = window.innerHeight;
      this.padAreaWidth = window.innerHeight;
    }
  }

  /**
   * エフェクトエリアのサイズを指定
   */
  setEffectAreaSize() {
    // 縦向き
    if (window.orientation === 0) {
      this.effectAreaHeight = window.innerHeight - this.padAreaHeight;
      this.effectAreaWidth = window.innerWidth;
    } else {
      // 横向き
      this.effectAreaHeight = window.innerHeight;
      this.effectAreaWidth = window.innerWidth - this.padAreaWidth;
    }
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
}
