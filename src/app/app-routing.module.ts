import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./home/welcome/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { ContactModule } from "./contacts/contact.module";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent },
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", component: PageNotFoundComponent }
    ]),
    ContactModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
