const questions = {
  date_of_birth: {
    question: "What's your date of birth?",
    label: "Date of birth"
  },
  height: {
    question: "What is your height?",
    label: "What is your height?"
  },
  height_ft: {
    question: "What is your height?",
    label: "Feet"
  },
  height_in: {
    question: "What is your height?",
    label: "Inches"
  },
  height_unit: {
    question: "What is your height?",
    label: "Height units"
  },
  weight: {
    question: "What weight are you?",
    label: "What weight are you?"
  },
  weight_unit: {
    question: "What weight are you?",
    label: "Weight units"
  },
  ethnic_group: {
    question:  "What best describes your ethnicity?",
    label:"What best describes your ethnicity?",
    choices: {
      white: "White",
      other: "Other"
    }
  },
  education: {
    question: "What best describes your level of education?",
    label: "What best describes your level of education?",
    choices: {
      primary: "Primary school",
      secondary: "Secondary school",
      college: "College/A-levels",
      uni: "University"
    }
  },
  alcohol: {
    question: "How many standard units of alcohol do you consume a week on average?",
    label: "How many standard units of alcohol do you consume a week on average?",
  },
  smoking: {
    question: "Are you a smoker, or have you smoked in the past?",
    label: "Are you a smoker, or have you smoked in the past?",
    choices: {
      never: "Never smoked",
      past: "Past smoker",
      current: "Current smoker"
    }
  },
  mht: {
    question: "Have you had a hysterectomy, or do you have a Mirena coil (IUS) in situ?",
    label: "Have you had a hysterectomy, or do you have a Mirena coil (IUS) in situ?",
    choices: {
      "e": "Yes",
      "e+p": "No"
    }
  },
  age_at_menarche: {
    question: "What age (years) did you have your first period?",
    label: "What age (years) did you have your first period?"
  },
  age_at_first_child: {
    question: "What age did you have your first child?",
    label: "What age did you have your first child?"
  },
  no_children: {
    question: "I have not had children",
    label: "I have not had children"
  },
  oral_contra: {
    question: "Have you ever used oral contraception?",
    label: "Have you ever used oral contraception?",
    choices: {
      n: "Never used",
      y: "Used at least once"
    }
  },
  biopsy: {
    question: "Have you had a breast biopsy?",
    label: "Have you had a breast biopsy?",
    choices: { 
      "n": "No", 
      "y": "Yes"
    }
  },
  number_of_biopsies: {
    question: "How many breast biopsies have you had?",
    label: "How many breast biopsies have you had?"
  },
  hyperplasia: {
    question: "Have you had a biopsy with atypical hyperplasia?",
    label: "Have you had a biopsy with atypical hyperplasia?",
    choices: { 
      "0": "No", 
      "1": "Yes"
    }
  },
  mother_has_cancer: {
    question: "Has your mother been diagnosed with breast cancer?",
    label: "Has your mother been diagnosed with breast cancer?",
    choices: { 
      "0": "No", 
      "1": "Yes"
    }
  },
  mother_age_at_diagnosis: {
    question: "What age was your mother at first diagnosis of breast cancer?",
    label: "What age was your mother at first diagnosis of breast cancer?",
  },
  number_of_sisters: {
    question: "How many (if any) of your sisters have been diagnosed with breast cancer?",
    label: "How many (if any) of your sisters have been diagnosed with breast cancer?",
  },
  sister_age_at_diagnosis_0: {
    question: "What age was sister 1 at first diagnosis of breast cancer?",
    label: "What age was sister 1 at first diagnosis of breast cancer?",
  },
  sister_age_at_diagnosis_1: {
    question: "What age was sister 2 at first diagnosis of breast cancer?",
    label: "What age was sister 2 at first diagnosis of breast cancer?",
  },
  sister_age_at_diagnosis_2: {
    question: "What age was sister 3 at first diagnosis of breast cancer?",
    label: "What age was sister 3 at first diagnosis of breast cancer?",
  },
  sister_age_at_diagnosis_3: {
    question: "What age was sister 4 at first diagnosis of breast cancer?",
    label: "What age was sister 4 at first diagnosis of breast cancer?",
  },
  sister_age_at_diagnosis_4: {
    question: "What age was sister 5 at first diagnosis of breast cancer?",
    label: "What age was sister 5 at first diagnosis of breast cancer?",
  }
}

export default questions
