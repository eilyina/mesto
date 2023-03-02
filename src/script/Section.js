export default class Section {
  constructor({ items, renderer }, selector) {
    this.renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this.renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }

  addLeftItem(element) {
    this._container.prepend(element);
  }
}
