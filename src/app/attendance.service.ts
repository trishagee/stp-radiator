import {Injectable, NgZone} from '@angular/core';
import {Observable, Observer} from 'rxjs';

class Attendee {
  constructor(user: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private url: string;

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
