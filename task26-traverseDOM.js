function traverseDOM(element=document.body) {
    // печаеаем текущий элемент
    console.log(element);
    // проходимся по детям текущего элемента  
    for (childElem of element.children) {
        traverseDOM(childElem);
    }
}