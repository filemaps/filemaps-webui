// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { FileMap } from './file-map';
import { Style } from './style';

/**
 * Interface for response from GET /api/styles/:id
 */
export interface FileMapResponse {
  fileMap: FileMap;
  defaultStyles: Style[];
}
