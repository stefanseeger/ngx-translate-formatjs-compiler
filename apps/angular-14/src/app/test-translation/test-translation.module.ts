import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TestTranslationComponent } from './test-translation.component';

@NgModule({
  declarations: [TestTranslationComponent],
  imports: [CommonModule, TranslateModule],
  exports: [TestTranslationComponent],
})
export class TestTranslationModule {}
