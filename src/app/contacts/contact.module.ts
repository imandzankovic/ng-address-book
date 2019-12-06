import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { RouterModule } from "@angular/router";
import { ContactListComponent } from "./contact-list.component";
import { ContactAddComponent } from "./contact-add/contact-add.component";
import { ContactDiscardComponent } from "./contact-discard/contact-discard.component";
import { AngularMaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "contacts", component: ContactListComponent },
      {
        path: "contact/:id",
        component: ContactDetailComponent
      }
    ]),
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],

  declarations: [
    ContactDetailComponent,
    ContactAddComponent,
    ContactDiscardComponent
  ]
})
export class ContactModule {}
