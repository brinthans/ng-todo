import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../Task';

// const httpOptions = {
//   header: new HttpHeaders({
//     'Content-Type': 'application/json'
//   }),
//   responseType: undefined
// }

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private angularFirstore: AngularFirestore) {}

  getTasks() {
    return this.angularFirstore.collection('tasks').snapshotChanges();
  }

  deleteTask(task: Task) {
    return this.angularFirstore.collection('tasks').doc(task.id).delete();
  }

  updateTaskReminder(task: Task) {
    return this.angularFirstore.collection('tasks').doc(task.id).update({
      reminder: task.reminder
    });
  }

  addTask(task: Task) {
    console.log(task);
    return new Promise<any>((resolve, reject) => {
      this.angularFirstore.collection('tasks')
        .doc()
        .set(task)
        .then(
          (res) => {
            console.log(res);
          },
          (error) => {
            reject(error);
          }
        )
    });
  }

  // private apiUrl = 'http://localhost:5000/tasks';

  // constructor(private http: HttpClient) { }

  // getTasks(): Observable<Task[]> {
  //   return this, this.http.get<Task[]>(this.apiUrl)
  // }

  // deleteTask(task: Task): Observable<Task> {
  //   const url = `${this.apiUrl}/${task.id}`;
  //   return this.http.delete<Task>(url);
  // }

  // updateTaskReminder(task: Task): Observable<Task> {
  //   const url = `${this.apiUrl}/${task.id}`;
  //   return this.http.put<Task>(url, task, httpOptions);
  // }

  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(this.apiUrl, task, httpOptions);
  // }
}
