

app.route('/usuarios/:id')
  .get(atc.getItemById)
  .put(atc.updateItem)
  .delete(atc.deleteItem);