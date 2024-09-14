const checkboxList = document.querySelectorAll(".box-container .checkbox");
const inputFields = document.querySelectorAll(".box-container input");
const errorValue = document.querySelector("#error");
const rangeValue = document.querySelector("#range-value");
const rangeValueSpan = document.querySelector("#range-value span");
const showQuote = document.querySelector("#p-range p");

const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]
let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedValues = Object.values(allGoals).filter((e) => {
  return  e.completed
}).length
// console.log(completedValues)
rangeValue.style.width = `${(completedValues / 3) * 100}%`;
rangeValueSpan.innerText = `${completedValues}/3 Completed`;
showQuote.innerText = `${allQuotes[completedValues]}`

checkboxList.forEach((checkbox, index) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");

      
      let inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedValues = Object.values(allGoals).filter((e) => {
        return e.completed
      }).length;
     console.log(completedValues)
      rangeValue.style.width = `${(completedValues  / 3) * 100}%`;
      rangeValueSpan.innerText = `${completedValues}/3 Completed`;
      showQuote.innerText = `${allQuotes[completedValues]}`
      
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorValue.classList.add("visible");
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }

  input.addEventListener('focus', () => {
    errorValue.classList.remove('visible')
  })

  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
})