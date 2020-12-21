function checkSort(type, method) {
  let selected = {}
  let showSelected = ''
  if (type === 'name') {
    selected.name = method
    showSelected = '按名稱排序'
  }
  if (type === 'category') {
    selected.category = method
    showSelected = '按分類排序'
  }
  if (type === 'rating') {
    selected.rating = method
    method === 'asc' ? showSelected = '按評分排序↑' : showSelected = '按評分排序↓'
  }
  return [selected, showSelected]
}

module.exports = checkSort