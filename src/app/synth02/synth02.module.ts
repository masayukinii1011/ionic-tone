import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Synth02PageRoutingModule } from './synth02-routing.module';

import { Synth02Page } from './synth02.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Synth02PageRoutingModule
  ],
  declarations: [Synth02Page]
})
export class Synth02PageModule {}
