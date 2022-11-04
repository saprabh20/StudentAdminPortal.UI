import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../students/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  genderList: Gender[] = [];

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get("id");
        if (this.studentId) {
          this.studentService.getStudent(this.studentId)
            .subscribe(
              (successResponse) => {
                this.student = successResponse;
              }
            );
          this.genderService.getGenderList()
            .subscribe(
              (successResponse) => {
                this.genderList = successResponse;
                // console.log(this.genderList);

              }
            );
        }
      }
    );

  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student)
      .subscribe(
        (successResponse)=>{
          console.log(successResponse);
          this.snackbar.open("Student updated successfully", undefined, {
            duration: 2000
          });

        },
        (errorResponse)=>{
          console.log(errorResponse);

        }
      )

    // console.log(this.student);
    // console.log(this.student.genderID);

  }

}
