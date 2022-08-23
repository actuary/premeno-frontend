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

export const retrieveFormData = () => {
  const about = getLocalData("about_you")

  if (about["height_unit"] != "cm") {
    const val = Math.round(parseInt(about["height_in"])/12.0 + parseInt(about["height_ft"])*30.48)
    about["height"] = val.toString()
    about["height_unit"] = "cm"
  }

  if (about["weight_unit"] != "kg") {
    const val = Math.round(parseInt(about["weight"])/2.205)
    about["weight"] = val.toString()
    about["weight_unit"] = "kg"
  }

  const repro = getLocalData("reproductive_health")

  if (repro["no_children"] === true) {
    repro["age_at_first_child"] = ""
  }


  const bcr = getLocalData("breast_cancer_risk")

  if (bcr["biopsy"] === "n") {
    bcr["number_of_biopsies"] = ""
    bcr["hyperplasia"] = ""
  }

  if (bcr["mother_has_cancer"] === "0") {
    bcr["mother_age_at_diagnosis"] = ""
  }

  for (let i = 0; i < 5 - parseInt(bcr["number_of_sisters"]); i++) {
    bcr[`sister_age_at_diagnosis_${4-i}`] = ""
  }

  return {...about, ...repro, ...bcr}
}

export const makeQuestionsAndAnswers = (data, questions) => {
  const combineQnA = (qs) => (
    qs.map(val => {
      var answer = data[val]
      if (val === "date_of_birth") {
        answer = new Date(data[val]).toLocaleDateString()
      }
      return {
        question: questions[val]["question"], 
        answer: (
          questions[val].choices === undefined ? 
            answer : 
            questions[val]["choices"][data[val]]
        )
      }
    })
  )

  const about = [
    "date_of_birth", "height", "weight", "ethnic_group", 
    "education", "alcohol", "smoking"
  ]

  const reproductive_health = [
    "mht", "age_at_menarche", "age_at_first_child", "oral_contra", 
  ]

  const cancer_risk = [
    "biopsy", "number_of_biopsies", "hyperplasia", "mother_has_cancer",
    "mother_age_at_diagnosis", "number_of_sisters", "sister_age_at_diagnosis_0",
    "sister_age_at_diagnosis_1", "sister_age_at_diagnosis_2",
    "sister_age_at_diagnosis_3", "sister_age_at_diagnosis_4"
  ]

  return {
    about: combineQnA(about),
    repro: combineQnA(reproductive_health),
    bcrisk: combineQnA(cancer_risk)
  }
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

export const boldText = (text) => (
  <span style={{fontWeight: "bold"}}>{text}</span>
)

export const italicize = (text) => (
  <span style={{fontStyle: "italic"}}>{text}</span>
)
