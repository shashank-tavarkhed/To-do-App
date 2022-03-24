import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('eachCard', [
      state('open',style({
        height: '200px',
        opacity: 0.5,
        backgroundColor: 'yellow'
      })),
      state('close',style({
        height: '400px',
        opacity: 1,
        backgroundColor: 'red'
      })),
      transition('open => close',[
        animate('1s')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  datas:Array<any> = [];
  completedTasks:Array<any> = [];
  addbtn:boolean = false;
  delAll:boolean = false;
  compbtn:boolean = false;
  error:boolean = false;

  constructor(private service: TodoService) { }

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
  }

  onDelAll(){
    this.service.deleteAll();
    this.delAll =false;
  }

  onComplete(task:any){
    task.value = true;
    this.service.completeTask(task);
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
