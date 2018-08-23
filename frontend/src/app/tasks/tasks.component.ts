import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskList: any;
  task: string = "";
  isUpdate: boolean = false;
  taskObj = {
    title: '',
    isDone: false,
    _id: ''
  };
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.fetchTaskList();
  }

  fetchTaskList() {
    this.taskService.getTasks()
      .subscribe((res) => {
        this.taskList = res;
      })
    return;
  }

  addNewTask() {
    if (this.isUpdate) {
      this.updateTask();
      this.isUpdate = false;
    } else {
      this.insertTask();
    }
  }

  insertTask() {
    let newTask = {
      "title": this.task,
      "isDone": "false"
    }
    this.taskService.addNewTask(newTask).subscribe(() => {
      this.fetchTaskList();
    });
    this.task = "";
  }

  updateTask() {
    let newTask = {
      "title": this.task,
      "isDone": this.taskObj.isDone
    }
    this.taskService.updateTask(newTask, this.taskObj._id).subscribe(() => {
      this.fetchTaskList();
      this.taskObj = {
        title: '',
        isDone: false,
        _id: ''
      }
    });
    this.task = "";
  }

  deleteTask(item) {
    this.taskService.deleteTask(item._id).subscribe(() => {
      this.fetchTaskList();
    });
  }

  editTask(task) {
    this.task = task.title;
    this.isUpdate = true;
    this.taskObj = task;
  }

}
