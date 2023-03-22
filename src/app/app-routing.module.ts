import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule) }, 
  { path: 'item', loadChildren: () => import('./module/item/item.module').then(m => m.ItemModule) }, 
  { path: 'sales', loadChildren: () => import('./module/sales/sales.module').then(m => m.SalesModule) }, 
  { path: 'car', loadChildren: () => import('./module/car/car.module').then(m => m.CarModule) }, 
  { path: 'list', loadChildren: () => import('./module/list/list.module').then(m => m.ListModule) }, 
  { path: 'reactive-form', loadChildren: () => import('./module/reactive-form/reactive-form.module').then(m => m.ReactiveFormModule) },
  { path: 'employee', loadChildren: () => import('./module/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'wharehouse', loadChildren: () => import('./module/wharehouse/wharehouse.module').then(m => m.WharehouseModule) },
  { path: 'address', loadChildren: () => import('./module/address/address.module').then(m => m.AddressModule) },
  { path: 'student', loadChildren: () => import('./module/student/student.module').then(m => m.StudentModule) },
  { path: 'springboot', loadChildren: () => import('./module/springboot/springboot.module').then(m => m.SpringbootModule) },
  { path: 'sql', loadChildren: () => import('./module/sql/sql.module').then(m => m.SqlModule) },
  { path: 'master', loadChildren: () => import('./module/master/master.module').then(m => m.MasterModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
