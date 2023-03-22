import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  studentCode!: string | null;
  studentName!: string | null;
  studentAge!: number | null;
  gpa!: number | null;

  students: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    let index: number = this.students.findIndex(objectEZ => {
      return objectEZ.studentCode == this.studentCode;
    })

    //1.ถ้ามีข้อมูลอยู่แล้ว: จากเพิ่มข้อมูล -> แก้ไขข้อมูลแทน
    if (index >= 0) {
      this.students[index] = {
        studentCode: this.studentCode,
        studentName: this.studentName,
        studentAge: this.studentAge,
        gpa: this.gpa,
      }
      //2.ถ้าไม่มีข้อมูลอยู่ก่อน: เพิ่มข้อมูล
    } else {
      this.students.push(
        {
          studentCode: this.studentCode,
          studentName: this.studentName,
          studentAge: this.studentAge,
          gpa: this.gpa,
        }
      )
    }
    // reset value
    this.studentCode = null
    this.studentName = null
    this.studentAge = null
    this.gpa = null

  }

  edit(student: any) {
    this.studentCode = student.studentCode
    this.studentName = student.studentName
    this.studentAge = student.studentAge
    this.gpa = student.gpa
  }

  delete(index: number) {
    //splice = เอาออกไป(ตำแหน่ง, จำนวน)
    this.students.splice(index, 1)
  }
}


