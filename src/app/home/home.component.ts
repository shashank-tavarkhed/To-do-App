import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  datas:Array<any> = [];
  completedTasks:Array<any> = [];
  addbtn:boolean = false;
  delAll:boolean = false;
  compbtn:boolean = false;
  error:boolean = false;

  priority:boolean = false;

  constructor(private service: TodoService) { }

  prioritySort(){
    this.priority = !this.priority;
    if(this.priority){
      this.service.PS();
    }else{
      this.service.reset()
    }
  }

  popDel(){
    this.delAll =true;
  }

  popAdd(){
    this.addbtn = true;
  }

  popComp(){
    this.compbtn = true;
  }

  onAdd(data:any){
    console.log(data.invalid);
    if(!data.invalid){
    const newTask = data.value;
    newTask['value'] = false;
    console.log('adding');
    this.service.addTask(newTask);
    this.addbtn =false;
    }else{
      this.error = true;
    }
  }

  onDelIndi(task:any){
    this.service.delTask(task);
    if(this.priority) this.service.PS();
  }

  onDelAll(){
    this.service.deleteAll();
    this.delAll =false;
  }

  onComplete(task:any){
    task.value = true;
    this.service.completeTask(task);
    if(this.priority) this.service.PS();
  }

  onCancel(){
    this.addbtn=false;
    this.delAll =false;
    this.compbtn=false;
    this.error = false;
  }

  ngOnInit(): void {
    this.datas = this.service.tasks;
    this.completedTasks = this.service.completedTasksdata;

    this.service.taskSub.subscribe(
      (list:any) =>{
        this.datas = list;
      }
    );


    this.service.completedTaskSub.subscribe(
      (data:any) => {this.completedTasks = data}
    );

    this.service.checkForTasks();

    // console.log((this.completedTasks.length /(this.datas.length + this.completedTasks.length ))*100);



  }

}
