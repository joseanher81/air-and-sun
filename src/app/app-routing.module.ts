import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'new-alert', loadChildren: './pages/new-alert/new-alert.module#NewAlertPageModule' },
  { path: 'list-alerts', loadChildren: './pages/list-alerts/list-alerts.module#ListAlertsPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'edit-alert', loadChildren: './pages/edit-alert/edit-alert.module#EditAlertPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
