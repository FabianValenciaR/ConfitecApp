import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IndicatorsPageRoutingModule } from "./indicators-routing.module";

import { IndicatorsPage } from "./indicators.page";
import { DailySalesChartComponent } from "../components/daily-sales-chart/daily-sales-chart.component";
import { DropInfoComponent } from "../components/drop-info/drop-info.component";
import { EffectiveVisitComponent } from "../components/effective-visit/effective-visit.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndicatorsPageRoutingModule
  ],
  declarations: [
    IndicatorsPage,
    DailySalesChartComponent,
    DropInfoComponent,
    EffectiveVisitComponent
  ]
})
export class IndicatorsPageModule {}
