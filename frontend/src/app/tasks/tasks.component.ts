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
    let newTask = {
      "title": this.task,
      "isDone": "false"
    }
    this.taskService.addNewTask(newTask).subscribe(() => {
      this.fetchTaskList();
    });
    this.task = "";
  }

  deleteTask(item) {
    this.taskService.deleteTask(item._id).subscribe(() => {
      this.fetchTaskList();
    });
  }

}
