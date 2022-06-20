import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { of } from 'rxjs';

import { TranslateFormatJsCompiler } from './translate-format-js-compiler';

@Component({
  template: `
    <div id="select">{{ 'TEST_SELECT' | translate: { text: this.text } }}</div>
    <div id="plural">{{ 'TEST_PLURAL' | translate: { num: this.num } }}</div>
    <div id="deep">{{ 'DEEP.TEST' | translate }}</div>
    <div id="html" [innerHtml]="'HTML' | translate"></div>
  `,
})
class TestTranslateFormatJsCompilerComponent {
  @Input() num = 0;

  @Input() text = '';
}

describe('TranslateFormatJsCompiler', () => {
  let fixture: ComponentFixture<TestTranslateFormatJsCompilerComponent>;
  let compiler: TranslateFormatJsCompiler;
  const SELECT_TEXT = 'Ich wohne in einem {text, select, A {Haus} B {Hotel} C {Keller} other {Garten}}.';
  const PLURAL_TEXT = 'Gib mir {num, plural, =0 {Kein} =1 {Ein} =2 {Zwei} other {mehr}} Bier';
  const HTML_TEXT = "'<h1>Headline</h1>'";
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestTranslateFormatJsCompilerComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: () => of({
                ...{
                  TEST_SELECT: SELECT_TEXT,
                  TEST_PLURAL: PLURAL_TEXT,
                  DEEP: {
                    TEST: 'deep test',
                  },
                  HTML: HTML_TEXT,
                },
              }),
            },
          },
          defaultLanguage: 'de',
          useDefaultLang: true,
          compiler: {
            provide: TranslateCompiler,
            useClass: TranslateFormatJsCompiler,
          },
        }),
      ],
      providers: [TranslateFormatJsCompiler],
    }).compileComponents();
    fixture = TestBed.createComponent(TestTranslateFormatJsCompilerComponent);
    compiler = TestBed.inject(TranslateFormatJsCompiler);
    fixture.detectChanges();
  }));
  describe('should compileTranslations', () => {
    it.each`
      text   | translation
      ${'A'} | ${'Ich wohne in einem Haus.'}
      ${'B'} | ${'Ich wohne in einem Hotel.'}
      ${'C'} | ${'Ich wohne in einem Keller.'}
      ${'D'} | ${'Ich wohne in einem Garten.'}
      ${'E'} | ${'Ich wohne in einem Garten.'}
    `(
      'should translate select correctly with $text',
      ({ text, translation }) => {
        fixture.componentInstance.text = text;
        fixture.detectChanges();

        expect(
          fixture.debugElement.nativeElement.querySelector('#select')
            .textContent,
        ).toBe(translation);
      },
    );

    it.each`
      num  | translation
      ${0} | ${'Gib mir Kein Bier'}
      ${1} | ${'Gib mir Ein Bier'}
      ${2} | ${'Gib mir Zwei Bier'}
      ${3} | ${'Gib mir mehr Bier'}
      ${4} | ${'Gib mir mehr Bier'}
    `('should translate plural correctly with $num', ({ num, translation }) => {
      fixture.componentInstance.num = num;
      fixture.detectChanges();

      expect(
        fixture.debugElement.nativeElement.querySelector('#plural').textContent,
      ).toBe(translation);
    });

    it('should support deep', () => {
      expect(
        fixture.debugElement.nativeElement.querySelector('#deep').textContent,
      ).toBe('deep test');
    });

    it('should support html', () => {
      expect(
        fixture.debugElement.nativeElement.querySelector('#html > h1')
          .textContent,
      ).toBe('Headline');
    });
  });

  describe('should compile', () => {
    it.each`
      text   | translation
      ${'A'} | ${'Ich wohne in einem Haus.'}
      ${'B'} | ${'Ich wohne in einem Hotel.'}
      ${'C'} | ${'Ich wohne in einem Keller.'}
      ${'D'} | ${'Ich wohne in einem Garten.'}
      ${'E'} | ${'Ich wohne in einem Garten.'}
    `(
      'should translate select correctly with $text',
      ({ text, translation }) => {
        expect((compiler.compile(SELECT_TEXT, 'de') as any)({ text })).toBe(
          translation,
        );
      },
    );

    it.each`
      num  | translation
      ${0} | ${'Gib mir Kein Bier'}
      ${1} | ${'Gib mir Ein Bier'}
      ${2} | ${'Gib mir Zwei Bier'}
      ${3} | ${'Gib mir mehr Bier'}
      ${4} | ${'Gib mir mehr Bier'}
    `('should translate plural correctly with $num', ({ num, translation }) => {
      expect((compiler.compile(PLURAL_TEXT, 'de') as any)({ num })).toBe(
        translation,
      );
    });

    it.each`
      num  | translation
      ${0} | ${"It's my cat's 0th birthday!"}
      ${1} | ${"It's my cat's 1st birthday!"}
      ${2} | ${"It's my cat's 2nd birthday!"}
      ${3} | ${"It's my cat's 3rd birthday!"}
      ${4} | ${"It's my cat's 4th birthday!"}
    `(
      'should translate selectordinal correctly with $num',
      ({ num, translation }) => {
        expect(
          (
            compiler.compile(
              "It's my cat's {num, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} birthday!",
              'en',
            ) as any
          )({ num }),
        ).toBe(translation);
      },
    );
  });
});
