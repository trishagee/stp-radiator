import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {AttendanceService, Attendee} from '../attendance.service';

@Component({
  selector: 'app-component-projects',
  providers: [AttendanceService],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  messageObservable: Observable<Attendee>;

  constructor(private attendanceService: AttendanceService) {
  }

  ngOnInit(): void {
    this.messageObservable = this.attendanceService.getEvents();
  }

}

