export default class Todo {
    constructor(text) {
      this.id = Date.now();
      this.text = text;
      this.completed = false;
      this.createdAt = new Date();
    }
  }