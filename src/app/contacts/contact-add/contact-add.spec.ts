import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { ContactAddComponent } from "./contact-add.component";
import { AngularMaterialModule } from "src/app/material.module";
import { ContactDiscardComponent } from "../contact-discard/contact-discard.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

describe("ContactAddComponent", () => {
  let comp: ContactAddComponent;
  let fixture: ComponentFixture<ContactAddComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAddComponent, ContactDiscardComponent],
      imports: [
        BrowserModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ContactAddComponent);

        comp = fixture.componentInstance; // ContactComponent test instance
        comp.ngOnInit();
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css("form"));
        el = de.nativeElement;
      });
  }));

  it(`should set form changed to true`, async(() => {
    comp.formChanged();
    expect(comp.wasFormChanged).toBeTruthy();
  }));

  it(`should call the onAddContact method`, async(() => {
    spyOn(comp, "onAddContact");
    el = fixture.debugElement.query(By.css("button")).nativeElement;
    el.click();
    expect(comp.onAddContact).toHaveBeenCalled();
  }));

  it(`form should be invalid`, async(() => {
    comp.addContactForm.controls["firstname"].setValue("");
    comp.addContactForm.controls["lastname"].setValue("");
    expect(comp.addContactForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.addContactForm.controls["phone"].setValue("12345678");
    comp.addContactForm.controls["firstname"].setValue("Amina");
    comp.addContactForm.controls["lastname"].setValue("Hamzic");
    expect(comp.addContactForm.valid).toBeTruthy();
  }));
});
