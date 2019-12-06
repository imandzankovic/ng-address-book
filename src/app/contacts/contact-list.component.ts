import { Component, OnInit, ViewChild } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { MatDialog } from "@angular/material/dialog";
import { ContactAddComponent } from "./contact-add/contact-add.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"]
})
export class ContactListComponent implements OnInit {
  errorMessage = "";
  filteredContacts: Contact[] = [];
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ContactAddComponent, {
      width: "640px",
      disableClose: true
    });
  }

  contactClicked(contact) {
    console.log(contact);
    this.router.navigate(["/contact", contact.id]);
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe({
      next: contacts => {
        this.contacts = contacts;
        this.filteredContacts = this.contacts;
      },
      error: err => (this.errorMessage = err)
    });
  }
}
