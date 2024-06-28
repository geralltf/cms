/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react"),s=require("prop-types"),u=require("./IntlService.js"),c=require("../globalization/GlobalizationContext.js");function p(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const l=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,l.get?l:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const r=p(a),i=class i extends r.Component{getIntlService(){return new u.IntlService(this.props.locale)}render(){return r.createElement(c.GlobalizationContext.Consumer,null,t=>r.createElement(c.GlobalizationContext.Provider,{value:{...t,intl:this.getIntlService()}},this.props.children))}};i.propTypes={locale:s.string};let o=i;exports.IntlProvider=o;
