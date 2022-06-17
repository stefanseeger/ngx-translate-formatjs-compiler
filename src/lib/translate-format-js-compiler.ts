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
    this.compileRecursively(translations, lang);
    return translations;
  }

  /**
   * Traverse through object and replace translations strings with compile function.
   * @param obj to be traversed
   * @param lang from @ngx-translate
   * @returns translation object with compile functions.
   */
  private compileRecursively(obj: any, lang: string): void {
    Object.keys(obj).forEach((key: string) => {
      const value = obj[key];

      if (typeof value === 'string') {
        // eslint-disable-next-line no-param-reassign
        obj[key] = this.compile(value, lang);
      } else {
        this.compileRecursively(value, lang);
      }
    });
  }
}
