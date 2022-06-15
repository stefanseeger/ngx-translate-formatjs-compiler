import { Injectable } from '@angular/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { IntlMessageFormat } from 'intl-messageformat';

@Injectable()
export class IcuFormatCompiler extends TranslateCompiler {
  compile(
    value: string,
    lang: string,
  ): string | ((params?: Record<string, unknown>) => any) {
    return this.wrap(value, lang);
  }
  compileTranslations(translations: any, lang: string): any {
    return this.wrapRecursively(translations, lang);
  }

  private wrap(value: string, lang: string): (params: any) => any {
    return (params?: any): any => {
      try {
        return new IntlMessageFormat(value, lang).format(params);
      } catch (e: any) {
        console.error(e);
        return `ERROR in: "${value}"`;
      }
    };
  }

  private wrapRecursively(obj: any, lang: string): any {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const value = obj[key];

      return typeof value === 'string'
        ? { ...acc, [key]: this.wrap(value, lang) }
        : {
            ...acc,
            [key]: this.wrapRecursively(value, lang),
          };
    }, {});
  }
}
