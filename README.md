# ngx-translate-formatjs-compiler

[Format.js](https://formatjs.io/) based [@ngx/translate](https://github.com/ngx-translate/core) compiler.

## Install

`npm i --save intl-messageformat @ngx-translate/core ngx-translate-formatjs-compiler`

## Integration in @ngx/translate/core

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateCompiler, TranslateModule } from '@ngx-translate/core';
import { TranslateFormatJsCompiler } from 'ngx-translate-formatjs-compiler';

import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateFormatJsCompiler,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Further links

- [Supported Syntax](https://formatjs.io/docs/core-concepts/icu-syntax)
- [ICU Online Editor](https://format-message.github.io/icu-message-format-for-translators/editor.html)
