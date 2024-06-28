/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";
import * as o from "react";
import { GlobalizationContext as t } from "../globalization/GlobalizationContext.mjs";
const a = () => o.useContext(t).localization;
export {
  a as useLocalization
};
