import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TrackstarConnectButtonComponent } from './angular-trackstar-link.component';



@NgModule({
  declarations: [
    TrackstarConnectButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    TrackstarConnectButtonComponent
  ]
})
export class AngularTrackstarLinkModule { }
