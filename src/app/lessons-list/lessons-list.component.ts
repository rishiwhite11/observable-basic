import {Component} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import { Observer, store } from 'app/event-bus-experiments/app-data';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer {

    lessons: Lesson[] =[];

    constructor() {
        
        console.log('lesson list component is registered as observer ..');
    }

    ngOnInit():void{
        store.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..');
        this.lessons = data.slice(0);
    }

    toggleLessonViewed(lesson: Lesson){
        store.toggleLessonViewed(lesson);
    }

    delete(lesson: Lesson){
       store.delete(lesson);
    }
}



