import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Task } from "../../Task";
import { UiService } from "../../services/ui.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  
  text: string;
  dayTime: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void { }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
    }

    const newTask: Task = {
      text: this.text,
      day: this.dayTime,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.dayTime = '';
    this.reminder = false;
  }
}
