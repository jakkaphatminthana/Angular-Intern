import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  editRow!: number | null;
  groupEmpoyee!: FormGroup;
  employees: any[] = [];
  FormMode!: String | null;

  constructor(private fb: FormBuilder) {
    //TODO : Validator Form
    this.groupEmpoyee = this.fb.group({
      //FormControl [ค่าเริ่มต้น, [เงื่อนไข]]
      empCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      empPreName: [null, [Validators.required]],
      empName: [null, [Validators.required, Validators.maxLength(60)]],
      empRole: [null, [Validators.required]],
      empYear: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      empSalary: [null, [Validators.required, Validators.min(1)]],
      empOther: [null],
      empImage: [null],

    })
  }

  ngOnInit(): void {
  }
  //---------------------------------------------------------------------------------------------

  save() {
    //Case1: Form กรอกถูกต้องหมด
    if (this.groupEmpoyee.valid) {
      let index: number = this.employees.findIndex(objectEZ => {
        return objectEZ.empCode == this.groupEmpoyee.value.empCode;
      })

      //1.1 ถ้ามีข้อมูลอยู่แล้ว: จากเพิ่มข้อมูล -> แก้ไขข้อมูลแทน
      if (index >= 0) {
        this.employees[index] = this.groupEmpoyee.value;
        //1.2 ถ้าไม่มีข้อมูลอยู่ก่อน: เพิ่มข้อมูล
      } else {
        this.employees.push(this.groupEmpoyee.value);
      }
      //reset form
      this.editRow = null;
      this.groupEmpoyee.reset();
      this.FormMode = null;

      //Case2: Form Error
    } else {
      alert('กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน');
    }
  }


  edit(rowIndex: number, employee: any) {
    //update form
    this.groupEmpoyee.patchValue(employee)
    //open edit mode
    this.editRow = rowIndex;
    this.FormMode = "edit";
  }


  add() {
    //open mode add
    this.FormMode = "add";
  }

  delete(rowIndex: number) {
    //splice = เอาออกไป(ตำแหน่ง, จำนวน)
    this.employees.splice(rowIndex, 1)
  }

  uploadImage(event: any) {
    debugger 
    let file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log()
      this.groupEmpoyee.get('empImage')?.setValue(reader.result)
    }
  }
}
