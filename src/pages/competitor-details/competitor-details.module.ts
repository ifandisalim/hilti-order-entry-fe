import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompetitorDetailsPage } from './competitor-details';

@NgModule({
  declarations: [
    CompetitorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CompetitorDetailsPage),
  ],
})
export class CompetitorDetailsPageModule {}
