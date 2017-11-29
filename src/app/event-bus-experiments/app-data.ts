
import * as _ from 'lodash';
import { Lesson } from 'app/shared/model/lesson';

export interface Observer {
    next(data:any);
}

export interface Observable{
    subscribe( obs:Observer);
    unsubscribe( obs:Observer);
}

interface Subject extends Observer, Observable{
    
}

class SubjectImplementation implements Subject{
    private observers : Observer[]=[]
    next(data: any) {
        this.observers.forEach(obs => obs.next(data));
    }
    subscribe(obs: Observer) {
        this.observers.push(obs);
        
    }
    unsubscribe(obs: Observer) {
        _.remove(this.observers, el => el === obs);
    }
    
    
}



class DataStore implements Observable{
    subscribe(obs: Observer) {
        this.lessonsListSubject.subscribe(obs);
    }
    unsubscribe(obs: Observer) {
        this.lessonsListSubject.unsubscribe(obs);
    }
    private lessonsListSubject = new SubjectImplementation();    
    private lessons: Lesson[] = [];
    initializeLessonsList(newList : Lesson[]){
        this.lessons = _.cloneDeep(newList);
        this.broadcast();
    }
    addLesson(newLesson : Lesson){
        this.lessons.push(_.cloneDeep(newLesson));
        this.broadcast();
    }
    delete(lesson: Lesson){
        _.remove(this.lessons, deletedLesson => lesson.id === deletedLesson.id);
        this.broadcast();
    }
    toggleLessonViewed(toggled: Lesson){
        const lesson = _.find(this.lessons, lesson => lesson.id === toggled.id);
        lesson.completed = !lesson.completed;
        this.broadcast();
    }
    broadcast(){
        this.lessonsListSubject.next(_.cloneDeep(this.lessons));
    }
}

export const store = new DataStore();











