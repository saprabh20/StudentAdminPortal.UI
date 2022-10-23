import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './MyComponents/students/students.component';

const routes: Routes = [
  {
    path:'', component: StudentsComponent
  },
  {
    path: 'students', component: StudentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
