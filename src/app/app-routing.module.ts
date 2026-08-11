import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'synth01',
    pathMatch: 'full'
  },
  {
    path: 'synth01',
    loadChildren: () => import('./synth01/synth01.module').then(m => m.Synth01PageModule)
  },
  {
    path: '**',
    redirectTo: 'synth01'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
