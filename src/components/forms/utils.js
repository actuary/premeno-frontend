export const getLocalData = (key, defaultValues = {}) => {
  let data = localStorage.getItem(key)
  if (data) {
    try {
      data = JSON.parse(data)
    } catch (err) {
      console.log(err)
      return defaultValues
    }
    return data
  }

  return defaultValues
}

export const getAge = (date) => {
  const selectedYear = new Date(date).getFullYear()
  const selectedMonth = new Date(date).getMonth()
  const nowYear = new Date().getFullYear()
  const nowMonth = new Date().getMonth()

  var age = nowYear - selectedYear
  const monthsDiff = nowMonth - selectedMonth
  if (monthsDiff < 0 || (monthsDiff == 0 && new Date() < date)) {
    age--
  }

  return age
}
