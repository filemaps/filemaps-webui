// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandService } from './command.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CommandService,
  ],
})
export class CommandsModule { }
