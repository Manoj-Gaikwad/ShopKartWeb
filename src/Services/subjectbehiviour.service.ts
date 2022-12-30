import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectbehiviourService {

  subject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  cartLength: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor() { }
}
