import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
   {path: '', pathMatch: 'full', redirectTo: 'example-six'},
  {path: 'example', loadChildren: () => import('src/app/features/example/example.module').then(m => m.ExampleModule)},
  {path: 'performance', loadChildren: () => import('src/app/features/performance/performance.module').then(m => m.PerformanceModule)},
  {path: 'example-two', loadChildren: () => import('src/app/features/example-two/example-two.module').then(m => m.ExampleTwoModule)},
  {path: 'example-three', loadChildren: () => import('src/app/features/example-three/example-three.module').then(m => m.ExampleThreeModule)},
  {path: 'example-four', loadChildren: () => import('src/app/features/example-four/example-four.module').then(m => m.ExampleFourModule)},
  {path: 'example-five', loadChildren: () => import('src/app/features/example-five/example-five.module').then(m => m.ExampleFiveModule)},
  {path: 'example-six', loadChildren: () => import('src/app/features/example-six/example-six.module').then(m => m.ExampleSixModule)},
  {path: 'pageNotFound', loadChildren: () => import('src/app/features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
