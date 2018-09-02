import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProjectsComponent} from './projects/projects.component';
import {AttendanceService} from './attendance.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AttendanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
