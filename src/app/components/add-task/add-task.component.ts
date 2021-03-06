import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Task } from "../../Task";
import { UiService } from "../../services/ui.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.text || !this.dayTime) {
      alert('Please Fill the fields!');
    } else {
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
}
