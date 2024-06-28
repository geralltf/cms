/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const c=require("./messages.js"),r=(s,e,t)=>{for(const o in s)if(s.hasOwnProperty(o)){const n=[...t];if(n.push(o),typeof s[o]!="string")r(s[o],e,n);else{const u=s[o];Object.defineProperty(e,n.join("."),{value:u})}}};function a(s,e){let t=c.messages[e]=c.messages[e]||{};r(s,t,[])}exports.loadMessages=a;
