import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { HomePage } from './pages/home/home.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleModule } from "./_store/people.module";

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    PeopleListComponent,
    PeopleFormComponent,
    NavbarComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PeopleModule
  ],
  providers: [
    {
      provide: [RouteReuseStrategy, FormGroup],
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
