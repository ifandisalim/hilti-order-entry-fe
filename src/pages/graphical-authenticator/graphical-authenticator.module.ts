import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphicalAuthenticatorPage } from './graphical-authenticator';

@NgModule({
  declarations: [
    GraphicalAuthenticatorPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphicalAuthenticatorPage),
  ],
})
export class GraphicalAuthenticatorPageModule {}
