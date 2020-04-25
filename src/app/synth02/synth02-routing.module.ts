import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Synth02Page } from './synth02.page';

const routes: Routes = [
  {
    path: '',
    component: Synth02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Synth02PageRoutingModule {}
