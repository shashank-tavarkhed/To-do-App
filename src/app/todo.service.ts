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
    // this.prioritysort(data);
    this.tasks.push(data);
    this.update();
  }

  PS(){
    let arr:any = this.tasks;
    let hi=0;
    let mi=0;
    let sortedArr:{}[]=[];
    for(let i =0;i<arr.length;i++){
      if(arr[i].priority === 'High'){
        sortedArr.splice(hi,0,arr[i]);
        hi++;
        mi++;
      }else if(arr[i].priority == 'Medium'){
        sortedArr.splice(mi,0,arr[i]);
        mi++
      }else if(arr[i].priority == 'Low'){
        sortedArr.push(arr[i])
      }
    }
    this.taskSub.next(sortedArr);
  }

  reset(){
    this.taskSub.next(this.tasks)
  }

  // prioritysort(data:Task){
  //   if(data.priority=='High'){
  //     let i = this.tasks.findIndex((x:any)=> x.priority =='Medium')
  //     this.tasks.splice((i>0?i:0),0,data)
  //   }else if(data.priority=='Medium'){
  //     let i = this.tasks.findIndex((x:any)=> x.priority =='Low')
  //     this.tasks.splice((i>0?i:0),0,data)
  //   }else if(data.priority=='Low'){
  //     this.tasks.push(data)
  //   }
  // }

  deleteAll(){
    this.tasks = [];
    this.completedTasksdata = [];
    localStorage.clear();
    this.update()
  }

}
