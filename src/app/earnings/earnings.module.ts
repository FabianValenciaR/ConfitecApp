import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EarningsPageRoutingModule } from './earnings-routing.module';

import { EarningsPage } from './earnings.page';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EarningsPageRoutingModule
  ],
  declarations: [EarningsPage,
    BarChartComponent
  ]
})
export class EarningsPageModule {}
