const { v4: uuid } = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title,
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
