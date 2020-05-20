import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from './main/main.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  { path: "", redirectTo: "/posts", pathMatch: "full" },
  { path: "posts", component: MainComponent },
  { path: "postsdetail/:id", component: PostDetailsComponent },
  { path: "**", redirectTo: "/posts" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
