import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    //TODO 1: Validator Form
    this.groupStudent = this.fb.group({
      //FormControl [ค่าเริ่มต้น, [เงื่อนไข]]
      studentCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      studentName: [null, [Validators.required, Validators.maxLength(150)]],
      studentAge: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      gpa: [null, [Validators.required, Validators.min(0), Validators.max(4)]]
    })
  }

  groupStudent!: FormGroup;
  students: any[] = [];

  save() {
    //valid = ทำถูก, invaild = กรอกผิด
    if (this.groupStudent.valid) {
      let index: number = this.students.findIndex(objectEZ => {
        return objectEZ.studentCode == this.groupStudent.value.studentCode;
      })

      //1.ถ้ามีข้อมูลอยู่แล้ว: จากเพิ่มข้อมูล -> แก้ไขข้อมูลแทน
      if (index >= 0) {
        this.students[index] = this.groupStudent.value;
        //2.ถ้าไม่มีข้อมูลอยู่ก่อน: เพิ่มข้อมูล
      } else {
        this.students.push(this.groupStudent.value);
      }
      // reset value
      this.groupStudent.reset();
    } else {
      alert("โปรดกรอกข้อมูลให้ถูกต้อง")
    }


  }

  edit(student: any) {
    this.groupStudent.patchValue(student)
  }

  delete(index: number) {
    //splice = เอาออกไป(ตำแหน่ง, จำนวน)
    this.students.splice(index, 1)
  }

  ngOnInit(): void {
  }

}
