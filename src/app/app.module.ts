import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import {DisplayTextComponent} from './components/display-text/display-text.component';
import {MyInterceptorService} from './features/example-six/my-interceptor.service';
import {ReactiveFormsModule} from '@angular/forms';
import {SignUpModule} from './components/sign-up/sign-up.module';
import {TableModule} from './components/table/table.module';
import {TabsThemeToken, TabsTheme} from './components/tabs/tabs-theme-token';
import {UserDetailsModule} from './components/user-details/user-details.module';

const tabsThemeToken: TabsTheme = {
  '--selected': 'blue'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    HttpClientModule,
    ReactiveFormsModule,
    SignUpModule,
    TableModule,
    UserDetailsModule
  ],
  providers: [
    MyInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptorService, multi: true },
    {
      provide:TabsThemeToken, useValue: tabsThemeToken
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
