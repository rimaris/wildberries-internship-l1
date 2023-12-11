function createElementWithStyles(tag, styles) {
    const el = document.createElement(tag);
    // проходимся по стилям и добавляем каждый из них в элемент
    for (const [k, v] of Object.entries(styles)) {
        el.style[k] = v;
    }
    document.body.append(el);
}