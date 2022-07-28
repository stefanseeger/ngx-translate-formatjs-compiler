import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateFormatJsCompiler } from 'ngx-translate-formatjs-compiler';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { translations } from './app.component.translations';
import { TestTranslationModule } from './test-translation/test-translation.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        TestTranslationModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: () => of(translations),
            },
          },
          compiler: {
            provide: TranslateCompiler,
            useClass: TranslateFormatJsCompiler,
          },
          defaultLanguage: 'en',
          useDefaultLang: true,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app angular-14', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render text', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('angular-14');
  });

  it('should render innerHtml', () => {
    expect(compiled.querySelector('h2')?.textContent).toContain('HTML content');
  });

  it.each`
    text   | translation
    ${'A'} | ${'Ich wohne in einem Haus.'}
    ${'B'} | ${'Ich wohne in einem Hotel.'}
    ${'C'} | ${'Ich wohne in einem Keller.'}
    ${'D'} | ${'Ich wohne in einem Garten.'}
    ${'E'} | ${'Ich wohne in einem Garten.'}
  `('should translate select correctly with $text', ({ text, translation }) => {
    expect(
      fixture.debugElement.nativeElement.querySelector(`#select-${text}`)
        .textContent,
    ).toBe(translation);
  });

  it.each`
    num  | translation
    ${0} | ${'Gib mir Kein Bier'}
    ${1} | ${'Gib mir Ein Bier'}
    ${2} | ${'Gib mir Zwei Bier'}
    ${3} | ${'Gib mir mehr Bier'}
    ${4} | ${'Gib mir mehr Bier'}
  `('should translate plural correctly with $num', ({ num, translation }) => {
    expect(
      fixture.debugElement.nativeElement.querySelector(`#plural-${num}`)
        .textContent,
    ).toBe(translation);
  });
});
