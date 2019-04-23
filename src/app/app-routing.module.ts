import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'example-two' },
  { path: 'example', loadChildren: 'src/app/features/example/example.module#ExampleModule' },
  { path: 'performance', loadChildren: 'src/app/features/performance/performance.module#PerformanceModule' },
  { path: 'example-two', loadChildren: 'src/app/features/example-two/example-two.module#ExampleTwoModule' },
  {path: 'pageNotFound', loadChildren: 'src/app/features/page-not-found/page-not-found.module#PageNotFoundModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
