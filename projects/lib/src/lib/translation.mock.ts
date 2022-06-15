import { ModuleWithProviders } from '@angular/core';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { of } from 'rxjs';

import { IcuFormatCompiler } from './icu-format.compiler';

/**
 * Translations format interface.
 * E.g. {'component.text': 'text'}
 */
export interface Translations {
  [key: string]: any;
}

/**
 * Function to get the list of modules required to test component using Localization module
 *
 * @example
 * ```
 * TestBed.configureTestingModule({
 *    imports: [
 *        mockTranslationModules({
 *            CONTACT_FORM_DEFAULT_TITLE:
 *               'Benutzerdaten des Vertretungs-/ Verfügungsberechtigten',
 *           ...require('../../translation/authorized-person-registration.component.fiku.json'),
 *       }),
 *    ],
 * });
 * ```
 *
 * @param translations Translations to use
 * @returns List of modules to import in your TestBed
 */
export const mockTranslationModules = (
  translations?: Translations,
): ModuleWithProviders<TranslateModule>[] => {
  return [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useValue: {
          getTranslation: () => of(translations ?? {}),
        },
      },
      defaultLanguage: 'de',
      useDefaultLang: true,
      compiler: {
        provide: TranslateCompiler,
        useClass: IcuFormatCompiler,
      },
    }),
  ];
};
