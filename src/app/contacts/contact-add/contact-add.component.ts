import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ContactDiscardComponent } from "../contact-discard/contact-discard.component";
import { Contact } from "../contact";
import { ContactService } from "../contact.service";
import { ContactDetailComponent } from "../contact-detail/contact-detail.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-add",
  templateUrl: "./contact-add.component.html",
  styleUrls: ["./contact-add.component.scss"]
})
export class ContactAddComponent implements OnInit {
  public breakpoint: number; // Breakpoint observer code
  public addContactForm: FormGroup;
  contact = new Contact();
  wasFormChanged = false;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private contactService: ContactService,
    public dialogRef: MatDialogRef<ContactDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contact = data;
  }

  public ngOnInit(): void {
    console.log(this.contact);
    this.addContactForm = this.fb.group({
      IdProof: null,
      firstname: [
        this.contact != null ? this.contact.firstName : " ",
        [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")]
      ],
      lastname: [
        this.contact != null ? this.contact.lastName : " ",
        [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")]
      ],
      phone: [
        this.contact != null ? this.contact.phone : " ",
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ],
      email: [this.contact != null ? this.contact.email : " "]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer codes
  }

  public onAddContact(): void {
    this.markAsDirty(this.addContactForm);
    this.saveContact();
  }

  saveContact(): void {
    console.log("netipichno");
    console.log(this.addContactForm.value);

    if (this.addContactForm.valid) {
      if (this.addContactForm.dirty) {
        const c = { ...this.contact, ...this.addContactForm.value };

        if (c.id === undefined) {
          this.contactService.createContact(c).subscribe(
            () => this.onSaveComplete(),
            (error: any) => (this.errorMessage = <any>error)
          );
        } else {
          this.contactService.updateContact(c).subscribe(
            () => this.onSaveComplete(),
            (error: any) => (this.errorMessage = <any>error)
          );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(): void {
    this.dialog.closeAll();
    this.router.navigate(["/contacts"]);
  }

  openDialog(): void {
    console.log(this.wasFormChanged);
    if (this.addContactForm.dirty) {
      const dialogRef = this.dialog.open(ContactDiscardComponent, {
        width: "340px"
      });
    } else {
      this.dialog.closeAll();
    }
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }
}
