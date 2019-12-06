import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./home/welcome/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent },
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", component: PageNotFoundComponent }

      // { path: 'notfound', component: PageNotFoundComponent },
      // { path: '**', redirectTo: '/notfound' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
