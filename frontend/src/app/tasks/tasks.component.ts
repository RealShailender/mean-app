import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskList: any;
  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.taskService.getTasks()
        .subscribe( (res) => {
          this.taskList = res;
        })
  }

}
