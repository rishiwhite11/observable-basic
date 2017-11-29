import { Component, OnInit } from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import { store, Observer } from 'app/event-bus-experiments/app-data';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer, OnInit{
    ngOnInit(): void {
        store.subscribe(this);
    }
    lessonsCounter = 0;
    constructor() {
        
        console.log('lesson list component is registered as observer ..');
        
    }
    

    next(data: Lesson[]) {
        console.log('counter component received data ..');
        this.lessonsCounter = data.length;
    }

}
