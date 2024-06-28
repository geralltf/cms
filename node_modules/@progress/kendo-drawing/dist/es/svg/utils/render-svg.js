import { SVG_NS } from '../constants';

var applyStyle = function (styleString, element) { return styleString.split(';').filter(function (s) { return s !== ''; }).forEach(function (s) {
        var parts = s.split(':');
        element.style[parts[0].trim()] = parts[1].trim();
    }); };

var styleAttr = 'data-style';
var replaceStyleAttr = function (html) { return html.replace(/\sstyle=/g, ' ' + styleAttr + '='); };
var restoreStyleAttr = function (container) {
    Array.from(container.querySelectorAll('[' + styleAttr +']')).forEach(function (element) {
        var styleString = element.getAttribute(styleAttr);
        element.removeAttribute(styleAttr);
        applyStyle(styleString, element);
    });
};

var renderSVG = function(container, svg) {
    container.innerHTML = replaceStyleAttr(svg);
    restoreStyleAttr(container);
};

if (typeof document !== "undefined") {
    var testFragment = "<svg xmlns='" + SVG_NS + "'></svg>";
    var testContainer = document.createElement("div");
    var hasParser = typeof DOMParser !== "undefined";

    testContainer.innerHTML = testFragment;

    if (hasParser && testContainer.firstChild.namespaceURI !== SVG_NS) {
        renderSVG = function(container, svg) {
            var parser = new DOMParser();
            var chartDoc = parser.parseFromString(replaceStyleAttr(svg), "text/xml");
            restoreStyleAttr(chartDoc);
            var importedDoc = document.adoptNode(chartDoc.documentElement);

            container.innerHTML = "";
            container.appendChild(importedDoc);
        };
    }
}

export default renderSVG;
