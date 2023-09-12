const server_url = "http://localhost/form/"
const form = document.getElementById("userForm")

const app = {
  api_request: (api, params, cb) => {
    $.ajax({
      url: server_url + api + ".php",
      data: {
        params,
      },
      method: "POST",
      dataType: "json",
      crossDomain: true,
      timeout: 50000,

      success: function (response) {
        return cb(response)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR)
        console.log(textStatus)
        console.log(errorThrown)
      },
    })
  },
  add: {
    user: (fullName, emailAddress, mobileNumber, dateOfBirth, gender, cb) => {
      const { age } = app.form.input()
      const params = {
        _fullName: fullName,
        _emailAddress: emailAddress,
        _mobileNumber: mobileNumber,
        _dateOfBirth: dateOfBirth,
        _gender: gender,
        _age: age,
      }
      console.log(params)
      app.api_request("api/user/add", params, function (response) {
        cb(response)
      })
    },
  },
  validations: {
    isTextWithCommaAndPeriod: (inputString) => {
      // text only and characters like comma and period are allowed
      // numbers not allowed
      const pattern = /^[.,a-zA-Z\s]+$/ 
      return pattern.test(inputString)
    },
    isValidEmail: (email) => {
      // valid email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailRegex.test(email)
    },
    isValidNumber: (number) => {
      // valid contact number e.q 09097762803
      const contactNumberRegex = /^0\d{10}$/
      return contactNumberRegex.test(number)
    },
  },
  events: {
    calculateAge: (birthdate) => {
      const birthDateObj = new Date(birthdate)
      const currentDate = new Date()

      // Calculate the difference in years
      const age = currentDate.getFullYear() - birthDateObj.getFullYear()

      // Adjust the age if the birthday hasn't occurred yet this year
      if (currentDate.getMonth() < birthDateObj.getMonth() || (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())) {
        return age - 1
      } else {
        return age
      }
    },
  },
  form: {
    input: () => {
      return (data = {
        fullName: $("#fullName").val().trim(),
        emailAddress: $("#emailAddress").val().trim(),
        mobileNumber: $("#mobileNumber").val().trim(),
        dateOfBirth: $("#dateOfBirth").val(),
        gender: $("#gender").val(),
        age: $("#age").val(),
      })
    },
    clear: () => {
      // Find all input and select elements inside the form
      $("#userForm :input").each(function () {
        // Check if the element is an input or select and clear its value
        if ($(this).is("input") || $(this).is("select")) {
          $(this).val("")
        }
      })
    },
  },
}

// form
form.addEventListener("submit", function (event) {
  event.preventDefault()

  const { fullName, emailAddress, mobileNumber, dateOfBirth, gender } = app.form.input()

  console.log(fullName, emailAddress, mobileNumber, dateOfBirth, gender)

  // validations
  // check empty values
  if (fullName.length == 0 || emailAddress.length == 0 || mobileNumber.length == 0 || !dateOfBirth || !gender) {
    alert("Please fill out all required fields.")
    return
  }

  // full name validation
  if (!app.validations.isTextWithCommaAndPeriod(fullName)) {
    alert("Text only and characters like comma and period are allowed in the full name field.")
    return
  }

  // email validation
  if (!app.validations.isValidEmail(emailAddress)) {
    alert("Invalid email format.")
    return
  }

  // contact number validation
  if (!app.validations.isValidNumber(mobileNumber)) {
    alert("Invalid contact number format, e.g. 09097762803")
    return
  }

  // add user
  app.add.user(fullName, emailAddress, mobileNumber, dateOfBirth, gender, (resp) => {
    console.log({ resp })
    if (resp.status) {
      alert(resp.message)
      app.form.clear()
    } else {
      console.log(resp)
      alert(resp.message)
    }
  })
})

// jquery
$(document)
  .off("change", "#dateOfBirth")
  .on("change", "#dateOfBirth", function () {
    const { dateOfBirth } = app.form.input()
    const age = app.events.calculateAge(dateOfBirth)
    $("#age").val(age)
  })
