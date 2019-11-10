import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'main',
        loadChildren: '../main/main.module#MainPageModule'
      },
      {
        path: 'new-alert',
        loadChildren: '../new-alert/new-alert.module#NewAlertPageModule'
      },
      {
        path: 'list-alerts',
        loadChildren: '../list-alerts/list-alerts.module#ListAlertsPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
