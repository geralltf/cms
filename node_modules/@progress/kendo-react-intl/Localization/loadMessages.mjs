/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";
import { messages as c } from "./messages.mjs";
const r = (s, o, e) => {
  for (const t in s)
    if (s.hasOwnProperty(t)) {
      const n = [...e];
      if (n.push(t), typeof s[t] != "string")
        r(s[t], o, n);
      else {
        const f = s[t];
        Object.defineProperty(o, n.join("."), { value: f });
      }
    }
};
function i(s, o) {
  let e = c[o] = c[o] || {};
  r(s, e, []);
}
export {
  i as loadMessages
};
