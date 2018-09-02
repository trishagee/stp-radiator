import {Injectable, NgZone} from '@angular/core';
import {Observable, Observer} from 'rxjs';

export class Attendee {
  private user: string;
  constructor(user: string) {
    this.user = user;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private url = 'https://sleepy-refuge-77810.herokuapp.com/events';

  private static getUserFromEvent(event) {
    return JSON.parse(event.data).user;
  }

  constructor(private zone: NgZone) {
  }

  getEvents(): Observable<Attendee> {
    return Observable.create((observer: Observer<Attendee>) => {
      const eventSource = new EventSource(this.url);
      eventSource.onmessage = (event) => {
        console.log(event);
        this.zone.run(() => observer.next(new Attendee(AttendanceService.getUserFromEvent(event))));
      };
      eventSource.onerror = (error) => {
        switch (eventSource.readyState) {
          case 0:
            console.log('The stream has been closed by the server.');
            eventSource.close();
            observer.complete();
            break;
          default:
            console.error('Error:' + error);
            observer.error('EventSource error: ' + error);
            break;
        }
      };
    });
  }

}
