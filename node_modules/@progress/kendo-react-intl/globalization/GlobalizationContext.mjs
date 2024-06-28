/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";
import * as t from "react";
import { IntlService as o } from "../Intl/IntlService.mjs";
import { LocalizationService as e } from "../Localization/LocalizationService.mjs";
const r = t.createContext({
  intl: new o("en"),
  localization: new e()
});
export {
  r as GlobalizationContext
};
