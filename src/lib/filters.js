import Vue from 'vue'

Vue.filter('trim', value => value.trim())

Vue.filter('money', (value, thousandth) => {
  if (+value !== +value) return value
  value = (Math.round(Number(value || 0) * 100) / 100).toFixed(2)
  if (thousandth) {
    value = value.replace(/(?=(?!\b)(\d{3})+(?!\d))(?=\.\d{2})?/g, ',')
  }
  return value
})
