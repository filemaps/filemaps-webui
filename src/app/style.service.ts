// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Injectable } from '@angular/core';

import { Style } from './models/style';

@Injectable()
export class StyleService {

  private styles: Style[] = [];

  constructor(
  ) {
  }

  setDefaultStyles(styles) {
    this.styles = styles || [];
  }

  getRule(sClass: string, rule: string, defaultVal?: string): string {
    console.log('StyleService.getRule', sClass, rule, defaultVal, this.styles);
    for (const style of this.styles) {
      if (style.sClass === sClass) {
        if (style.rules.hasOwnProperty(rule)) {
          return style.rules[rule];
        }
      }
    }
    return defaultVal;
  }
}
