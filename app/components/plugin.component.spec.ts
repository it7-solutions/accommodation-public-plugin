/* tslint:disable:no-unused-variable */
import { TestBed, async }      from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { PluginComponent } from './plugin.component';
import { PluginConfig } from '../services/plugin.config';
import { It7ErrorService } from '../services/it7-error.service';

////////  SPECS  /////////////

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

// describe('PluginComponent with TCB', function () {
//   beforeEach(async(() => {
//     TestBed
//         .configureTestingModule({
//           imports: [FormsModule],
//           declarations: [PluginComponent],
//           providers: [
//               {provide: PluginConfig, useValue: {mockAJAX: true}},
//               {provide: It7ErrorService, useValue: new It7ErrorService()}
//             ]
//         })
//         .compileComponents(); // compile template and css
//   }));
//
//   it('should instantiate component', () => {
//     let fixture = TestBed.createComponent(PluginComponent);
//     fixture.detectChanges();
//     expect(fixture.componentInstance instanceof PluginComponent).toBe(true, 'should create PluginComponent');
//   });
//
//   it('should have expected <h1> text', () => {
//     let fixture = TestBed.createComponent(PluginComponent);
//     fixture.detectChanges();
//
//     let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works
//
//     h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred
//
//     expect(h1.innerText).toMatch(/test app/i, '<h1> should say something about "Angular App"');
//   });
//});


