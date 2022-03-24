import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Task {
  name:string ,
   value:boolean ,
    priority:string,
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  taskSub = new Subject();
  completedTaskSub = new Subject();
  tasks:Object[] =[];
  completedTasksdata:Object[] =[];
  // tasks:Task[] = [
  //   {name: 'HelloWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssd', priority:'High', value: false},
  //   {name: 'HelloWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssd', priority:'High', value: false},
  //   {name: 'Hello World', priority:'medium', value: false},
  //   {name: 'Hello World', priority:'medium', value: false},
  //   {name: 'Hello World', priority:'medium', value: false},
  // ]

  // // // completedTasks
  // completedTasksdata:Task[] =[
  //   {name: 'Hello World', priority:'medium', value: false},
  //   {name: 'Hello World', priority:'medium', value: false},
  //   {name: 'Hello World', priority:'medium', value: false},
  //   {name: 'HelloWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssd', priority:'High', value: false},
  //   {name: 'HelloWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssd', priority:'High', value: false},
  //   {name: 'HelloWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssdWorlasdasdasdasdasdasdssssssssssssssssd', priority:'High', value: false},

  // ];

  checkForTasks(){

    if(localStorage.getItem('tasks')){
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    }
    if(localStorage.getItem('completed')){
      this.completedTasksdata = JSON.parse(localStorage.getItem('completed') || '{}');
    }
    this.taskSub.next(this.tasks);
    this.completedTaskSub.next(this.completedTasksdata);
  }

  update(){
    window.localStorage.clear();

    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    window.localStorage.setItem('completed', JSON.stringify(this.completedTasksdata));

    this.taskSub.next(this.tasks);
    this.completedTaskSub.next(this.completedTasksdata);


  }

  completeTask(task:Task){
    this.tasks.forEach((el:any,i,arr)=>{
      if(el.name == task.name){
        let [compTask] = this.tasks.splice(i,1);
        this.completedTasksdata.push(compTask);
        this.update();
      }
    })

  }

  delTask(task:Task){
    this.tasks.forEach((el:any,i,arr) =>{
      if(el.name === task.name){
        this.tasks.splice(i,1);
        this.update();
      }
    })
  }

  addTask(data:Task){
    this.tasks.push(data);
    this.update();
  }

  deleteAll(){
    this.tasks = [];
    this.completedTasksdata = [];
    localStorage.clear();
    this.update()
  }

}
