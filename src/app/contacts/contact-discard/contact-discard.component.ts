import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ContactService } from "../contact.service";

@Component({
  selector: "app-contact-discard",
  templateUrl: "./contact-discard.component.html",
  styleUrls: ["./contact-discard.component.scss"]
})
export class ContactDiscardComponent implements OnInit {
  id: any;
  title: string;
  buttonText: string;
  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ContactDiscardComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data;
  }
  // Closing dialog window

  public cancel(): void {
    // To cancel the dialog window
    this.dialogRef.close();
  }

  public cancelN(): void {
    if (this.buttonText == "Delete") this.deleteContact();
    this.dialog.closeAll();
  }

  setDiscardData() {
    this.title = "Are you sure you want to discard the changes?";
    this.buttonText = "Discard";
  }

  setDeleteContactData() {
    this.title = "Are you sure you want to delete this contact?";
    this.buttonText = "Delete";
  }

  deleteContact() {
    this.contactService
      .deleteContact(this.data)
      .subscribe(res => console.log(res));
  }
  ngOnInit() {
    console.log(this.data);
    this.data != null ? this.setDeleteContactData() : this.setDiscardData();
  }
}
