import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTasks();

    // this.taskService.getTasks()
    //   .subscribe(res => {
    //     this.tasks = res;
    //   });
            // this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  getAllTasks(): void {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res.map((task) => {
        return {
          id: task.payload.doc.id,
          ...task.payload.doc.data() as {}
        }
      })
    })
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task);
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
    console.log('tasks:' ,this.tasks);
  }
}
