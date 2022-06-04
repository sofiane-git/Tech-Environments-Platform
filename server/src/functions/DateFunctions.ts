// Gestion de la date et heure
const formatedHour = (data: number) => data < 10 ? `0${data}` : data
const formatedDate = (data: number) => data < 10 ? `0${data}` : data

const updatedDayWhenDispoChange = () => {
  const date = new Date()
  const day = formatedDate(date.getDate())
  const month = formatedDate(date.getMonth()+1)
  const year = formatedDate(date.getFullYear())
  const dateOfTheDay = `${day}/${month}/${year}`
  console.log(dateOfTheDay)
  return dateOfTheDay
}

const updatedHourWhenDispoChange = () => {
  const date = new Date()
  const hour = formatedHour(date.getHours()+1)
  const minute = formatedHour(date.getMinutes())
  const completHour = `${hour}h${minute}`
  console.log(completHour)
  return completHour
}

export default {
  updatedDayWhenDispoChange,
  updatedHourWhenDispoChange
}