// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Observable } from 'rxjs/Observable';

export interface Command {
  exec(): Observable<any>;
  undo(): Observable<any>;
}
