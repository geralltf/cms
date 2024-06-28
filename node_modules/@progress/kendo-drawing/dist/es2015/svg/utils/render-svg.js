import { SVG_NS } from '../constants';

const applyStyle = (styleString, element) =>
    styleString.split(';').filter(s => s !== '').forEach(s => {
        const parts = s.split(':');
        element.style[parts[0].trim()] = parts[1].trim();
    });

const styleAttr = 'data-style';
const replaceStyleAttr = (html) => html.replace(/\sstyle=/g, ' ' + styleAttr + '=');
const restoreStyleAttr = (container) => {
    Array.from(container.querySelectorAll('[' + styleAttr +']')).forEach((element) => {
        const styleString = element.getAttribute(styleAttr);
        element.removeAttribute(styleAttr);
        applyStyle(styleString, element);
    });
};

let renderSVG = function(container, svg) {
    container.innerHTML = replaceStyleAttr(svg);
    restoreStyleAttr(container);
};

if (typeof document !== "undefined") {
    const testFragment = "<svg xmlns='" + SVG_NS + "'></svg>";
    const testContainer = document.createElement("div");
    const hasParser = typeof DOMParser !== "undefined";

    testContainer.innerHTML = testFragment;

    if (hasParser && testContainer.firstChild.namespaceURI !== SVG_NS) {
        renderSVG = function(container, svg) {
            const parser = new DOMParser();
            const chartDoc = parser.parseFromString(replaceStyleAttr(svg), "text/xml");
            restoreStyleAttr(chartDoc);
            const importedDoc = document.adoptNode(chartDoc.documentElement);

            container.innerHTML = "";
            container.appendChild(importedDoc);
        };
    }
}

export default renderSVG;
