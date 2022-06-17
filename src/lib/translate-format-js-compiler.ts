import { Injectable } from '@angular/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { IntlMessageFormat } from 'intl-messageformat';

@Injectable()
export class TranslateFormatJsCompiler extends TranslateCompiler {
  /** Compiles single translation */
  compile(
    value: string,
    lang: string,
  ): string | ((params?: Record<string, unknown>) => any) {
    return (params?: any): any => {
      try {
        return new IntlMessageFormat(value, lang).format(params);
      } catch (e: any) {
        // eslint-disable-next-line no-console
        console.error(e);
        return `ERROR in: "${value}"`;
      }
    };
  }

  /** Compile translations object */
  compileTranslations(translations: any, lang: string): any {
    return this.compileRecursively(translations, lang);
  }

  /**
   * Traverse through object and replace translations strings with compile function.
   * @param obj to be traversed
   * @param lang from @ngx-translate
   * @returns translation object with compile functions.
   */
  private compileRecursively(obj: any, lang: string): any {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const value = obj[key];

      return typeof value === 'string'
        ? { ...acc, [key]: this.compile(value, lang) }
        : {
          ...acc,
          [key]: this.compileRecursively(value, lang),
        };
    }, {});
  }
}
