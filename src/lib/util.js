
export const formatMoney = (value) => (Math.round(Number(value || 0) * 100) / 100).toFixed(2)
