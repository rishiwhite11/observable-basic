import {Component, OnInit} from '@angular/core';
import {testLessons} from "../shared/model/test-lessons";
import {Lesson} from "../shared/model/lesson";
import { store } from 'app/event-bus-experiments/app-data';
import { setTimeout } from 'timers';

@Component({
    selector: 'event-bus-experiments',
    templateUrl: './event-bus-experiments.component.html',
    styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

    constructor(){
        store.initializeLessonsList(testLessons.slice(0));
    }
    ngOnInit() {

        console.log('Top level component broadcasted all lessons ...');
        
        setTimeout(() => {
            const newLesson = {
                id: Math.random(),
                description: "New Lesson came at the backend"
            }
            store.addLesson(newLesson)
        }, 1000)
    }

    addLesson(lessonText: string) {
        const newLesson = {
            id: Math.random(),
            description: lessonText
        }
        store.addLesson(newLesson);
    }

}












