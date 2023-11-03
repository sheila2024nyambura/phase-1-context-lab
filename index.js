/* Your Code Here */

function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
  }

  function createTimeInEvent(dateTimeString) {
    // Parse the date and time from the input string
    const [date, time] = dateTimeString.split(" ");
    const hour = parseInt(time);
  
    // Create a new timeIn event object
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: hour,
    };
  
    // Add the timeIn event to the employee's record
    this.timeInEvents.push(timeInEvent);
  
    // Return the updated employee record
    return this;
  }
  
  function createTimeOutEvent(dateTimeString) {
    // Parse the date and time from the input string
    const [date, time] = dateTimeString.split(" ");
    const hour = parseInt(time);
  
    // Create a new timeOut event object
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: hour,
    };
  
    // Add the timeOut event to the employee's record
    this.timeOutEvents.push(timeOutEvent);
  
    // Return the updated employee record
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    // Find the matching timeIn and timeOut events for the given date
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      // Calculate the hours worked by subtracting timeOut from timeIn
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    } else {
      // Return 0 if no matching events are found
      return 0;
    }
  }
  
  function wagesEarnedOnDate(date) {
    // Calculate hours worked for the date given using the hoursWorkedOnDate function
    const hoursWorked = hoursWorkedOnDate.call(this, date);
  
    // Multiply the hours worked by the employee's pay rate per hour
    const wages = hoursWorked * this.payPerHour;
  
    return wages;
  }

  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  function calculatePayroll(employees) {
    let totalPayroll = 0;
  
    employees.forEach(employee => {
      // Calculate the employee's total wages using the allWagesFor function
      const employeePay = allWagesFor.call(employee);
      
      // Add  total wages to total payroll
      totalPayroll += employeePay;
    });
  
    return totalPayroll;
  }
  
  
  
  
  

 

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

