import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Synth01Page } from './synth01.page';

const routes: Routes = [
  {
    path: '',
    component: Synth01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Synth01PageRoutingModule {}
