/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";
import { IntlService as n } from "./Intl/IntlService.mjs";
import { LocalizationService as e } from "./Localization/LocalizationService.mjs";
import { GlobalizationContext as o } from "./globalization/GlobalizationContext.mjs";
function a(t) {
  if (!t && process.env.NODE_ENV !== "production")
    throw `Passed component - ${t} is invalid.`;
  const i = t.context;
  return i && i.intl ? i.intl : new n("en");
}
function s(t) {
  if (!t && process.env.NODE_ENV !== "production")
    throw `Passed component - ${t} is invalid.`;
  const i = t.context;
  return i && i.localization ? i.localization : new e();
}
function p(t) {
  t.contextType = o;
}
function v(t) {
  t.contextType = o;
}
export {
  a as provideIntlService,
  s as provideLocalizationService,
  p as registerForIntl,
  v as registerForLocalization
};
