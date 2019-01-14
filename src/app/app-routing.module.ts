import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'example' },
  { path: 'example', loadChildren: 'src/app/features/example/example.module#ExampleModule' },
  {path: 'pageNotFound', loadChildren: 'src/app/features/page-not-found/page-not-found.module#PageNotFoundModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
