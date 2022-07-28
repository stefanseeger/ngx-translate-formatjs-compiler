# ngx-translate-formatjs-compiler [![Node.js CI](https://github.com/stefanseeger/ngx-translate-formatjs-compiler/actions/workflows/node.js.yml/badge.svg)](https://github.com/stefanseeger/ngx-translate-formatjs-compiler/actions/workflows/node.js.yml) [![npm version](https://badge.fury.io/js/ngx-translate-formatjs-compiler.svg)](https://badge.fury.io/js/ngx-translate-formatjs-compiler) [![CodeQL](https://github.com/stefanseeger/ngx-translate-formatjs-compiler/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/stefanseeger/ngx-translate-formatjs-compiler/actions/workflows/codeql-analysis.yml)

[Format.js](https://formatjs.io/) based [@ngx/translate](https://github.com/ngx-translate/core) compiler.

Supports Angular >= 10

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

## Troubleshooting

- With FormatJS HTML tags must be escaped with a `'` in the translation. E.g. `'<h1>'Your content goes here'</h1>'`
- With FormatJS interpolation variables are surrounded by single brackets. E.g. `I am having {count} cats`

## Further links

- [Supported Syntax](https://formatjs.io/docs/core-concepts/icu-syntax)
- [ICU Online Editor](https://format-message.github.io/icu-message-format-for-translators/editor.html)
