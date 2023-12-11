class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function jsonToLinkedList(json) {
  if (!Array.isArray(json) || json.length === 0) {
    return null;
  }

  // создаем первый элемент списка
  const head = new ListNode(json[0].value);
  let current = head;

  for (let i = 1; i < json.length; i++) {
    // создаем для элемента массива узел, добавляем его следующим к текущему
    current.next = new ListNode(json[i].value);
    // делаем новый элемент текущим
    current = current.next;
  }
  return head;
}
