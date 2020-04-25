import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Synth01PageRoutingModule } from './synth01-routing.module';

import { Synth01Page } from './synth01.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Synth01PageRoutingModule
  ],
  declarations: [Synth01Page]
})
export class Synth01PageModule {}
