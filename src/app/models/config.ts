// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

export class Config {
  textEditor: string;
  textEditorCustom1Cmd: string;
  trustedAddresses: string;
  version: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
