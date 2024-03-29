import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthPageModule)
  },
  {
    path: "indicators",
    loadChildren: () =>
      import("./indicators/indicators.module").then(
        m => m.IndicatorsPageModule
      ),
    canLoad: [AuthGuard]
  },
  {
    path: "earnings",
    loadChildren: () =>
      import("./earnings/earnings.module").then(m => m.EarningsPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
