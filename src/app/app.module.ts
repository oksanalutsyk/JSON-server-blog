import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { PostsComponent } from "./posts/posts.component";
import { RightAsideComponent } from "./right-aside/right-aside.component";
import { MainComponent } from "./main/main.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { HttpClientModule } from "@angular/common/http";
import { PostDetailsComponent } from "./post-details/post-details.component";
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostsComponent,
    RightAsideComponent,
    MainComponent,
    PostDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatRadioModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
