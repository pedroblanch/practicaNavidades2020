import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrediccionPage } from './prediccion.page';

const routes: Routes = [
  {
    path: '',
    component: PrediccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrediccionPageRoutingModule {}
