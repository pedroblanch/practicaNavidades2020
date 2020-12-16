import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrediccionPageRoutingModule } from './prediccion-routing.module';

import { PrediccionPage } from './prediccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrediccionPageRoutingModule
  ],
  declarations: [PrediccionPage]
})
export class PrediccionPageModule {}
