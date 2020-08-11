import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleSixComponent } from './example-six.component';
import {Routes, RouterModule} from '@angular/router';
import {ComponentsModule} from '../../components/components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '../../directives/directives.module';
import {VirtualScrollModule} from '../../components/virtual-scroll/virtual-scroll.module';
import {MyInterceptorService} from './my-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PaginationListService} from '../../components/pagination-list/pagination-list.service';
import {TabsModule} from '../../components/tabs/tabs.module';
import {TabsThemeToken, TabsTheme} from '../../components/tabs/tabs-theme-token';
import {ContainerModule} from '../../components/container/container.module';
import {UserDetailsModule} from '../../components/user-details/user-details.module';


const routes: Routes = [
  {
    path: '',
    component: ExampleSixComponent
  }
];

const tabsThemeToken: TabsTheme = {
  '--selected': 'red'
};

@NgModule({
  declarations: [ExampleSixComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    VirtualScrollModule,
    HttpClientModule,
    TabsModule,
    ContainerModule,
    UserDetailsModule
  ],
  providers: [
    // {
    //   provide:TabsThemeToken, useValue: tabsThemeToken
    // }
  ]
})
export class ExampleSixModule { }
