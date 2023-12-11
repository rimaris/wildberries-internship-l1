function createElementWithStyles(tag, styles) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(styles)) {
        el.style[k] = v;
    }
    document.body.append(el);
}