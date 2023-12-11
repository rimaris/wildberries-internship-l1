function traverseDOM(element=document.body) {
    console.log(element);
    for (childElem of element.children) {
        traverseDOM(childElem);
    }
}