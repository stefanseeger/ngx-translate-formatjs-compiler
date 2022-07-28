import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
