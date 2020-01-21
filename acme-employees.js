const employees = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 },
  { id: 3, name: 'curly', managerId: 1 },
  { id: 5, name: 'groucho', managerId: 3 },
  { id: 6, name: 'harpo', managerId: 5 },
  { id: 8, name: 'shep Jr.', managerId: 4 },
  { id: 99, name: 'lucy', managerId: 1 }
]

const spacer = text => {
  if (!text) {
    return console.log('')
  }
  const stars = new Array(5).fill('*').join('')
  console.log(`${stars} ${text} ${stars}`)
}

spacer('findEmployeeByName Moe')
spacer('')

// cool 1st variable name but 2nd could be better. what is it an array of?
function findEmployeeByName(empName, array) {
  // I see you used filter below, how would you rewrite this with only array methods?
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === empName) return array[i]
  }
}

// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees)) //{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')
spacer('')

// touching back on variable naming, is the first parameter a func?
function findManagerFor(func, array) {
  let arr = array.filter(val => val.id === func.managerId)
  // I like the idea (and is what I used to do)
  // there's a prototype method called .find that stops when it finds the first element
  // and does not return an array. check it out
  return arr[0]
}

//given an employee and a list of employees, return the employee who is the manager
console.log(
  findManagerFor(findEmployeeByName('shep Jr.', employees), employees)
) //{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')
spacer('')

// nice filter!
// variable names though
function findCoworkersFor(func, array) {
  return array.filter(val => {
    if (val !== func) return val.managerId === func.managerId
  })
}

//given an employee and a list of employees, return the employees who report to the same manager
console.log(
  findCoworkersFor(findEmployeeByName('larry', employees), employees)
) /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer('')

spacer('findManagementChain for moe')
spacer('')

// I'm gonna sound like a broken mp3 but variable names
function findManagementChainForEmployee(func, array) {
  let finalArray = []
  let currentManager = findManagerFor(func, array)
  if (func.managerId === undefined) { // good base case
    return []
  } else {
    // good recursion
    let nextManager = findManagementChainForEmployee(currentManager, employees)
    finalArray.push(...nextManager, currentManager)
  }
  return finalArray
}

//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(
  findManagementChainForEmployee(
    findEmployeeByName('moe', employees),
    employees
  )
) //[  ]

spacer('')

spacer('findManagementChain for shep Jr.')
spacer('')

console.log(
  findManagementChainForEmployee(
    findEmployeeByName('shep Jr.', employees),
    employees
  )
) /*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer('')

spacer('generateManagementTree')
spacer('')

// we can go over this in office hours if the solution doesn't make sense
function generateManagementTree(array) {
  const base = array[0]

  for (let i = 1; i < array.length; i++) {
    let currentManager = findManagerFor(array[i], array) // good, using earlier function
    base.reports = currentManager

    return base
  }
}

//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2))
/*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
spacer('')

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(
  generateManagementTree(employees)
) /*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
