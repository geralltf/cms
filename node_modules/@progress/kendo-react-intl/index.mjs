/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";
import { GlobalizationContext as r } from "./globalization/GlobalizationContext.mjs";
import { messages as i } from "./Localization/messages.mjs";
import { provideIntlService as l, provideLocalizationService as n, registerForIntl as s, registerForLocalization as p } from "./intlUtils.mjs";
import { IntlProvider as x } from "./Intl/IntlProvider.mjs";
import { IntlService as f } from "./Intl/IntlService.mjs";
import { loadMessages as z } from "./Localization/loadMessages.mjs";
import { LocalizationProvider as g } from "./Localization/LocalizationProvider.mjs";
import { LocalizationService as L } from "./Localization/LocalizationService.mjs";
import { load as u } from "@progress/kendo-intl";
import { useInternationalization as M } from "./hooks/useInternationalization.mjs";
import { useLocalization as b } from "./hooks/useLocalization.mjs";
export {
  r as GlobalizationContext,
  x as IntlProvider,
  f as IntlService,
  g as LocalizationProvider,
  L as LocalizationService,
  u as load,
  z as loadMessages,
  i as localizationMessages,
  l as provideIntlService,
  n as provideLocalizationService,
  s as registerForIntl,
  p as registerForLocalization,
  M as useInternationalization,
  b as useLocalization
};
