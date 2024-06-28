/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";
import { messages as t } from "./messages.mjs";
class r {
  constructor(e) {
    if (this.language = e, e === "" && process.env.NODE_ENV !== "production")
      throw "Language should not be an empty string";
  }
  /* eslint-disable max-len */
  /**
   * Provides a string based on a key for the current language. When no string for the current language is available under this key, the `defaultValue` is returned.
   *
   * @param key - The key which identifies the string for the current language.
   * @param defaultValue - The default value which will be returned when no string
   * for the current language is available under the key.
   * @return - The string for the current language.
   */
  // tslint:enable:max-line-length
  toLanguageString(e, a) {
    return this.language && t[this.language] && t[this.language].hasOwnProperty(e) ? t[this.language][e] : a;
  }
}
export {
  r as LocalizationService
};
