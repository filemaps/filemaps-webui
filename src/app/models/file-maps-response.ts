// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { FileMap } from './file-map';

/**
 * Interface for response from GET /maps
 */
export interface FileMapsResponse {
  maps: FileMap[];
}
