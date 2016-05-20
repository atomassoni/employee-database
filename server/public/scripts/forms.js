$(document).ready(function() {



    var monthlySalary = 0;
    var totalMonthlySalary = 0;

    //event listeners
    $('#employeeinfo').on('submit', postEmployee);
    $('#container').on('click', '.delete', removeEmployee);

    //builds the employee info list for the DOM and adds it
    function getEmployees() {

        $.get('/employees', function(employees, status){
        console.log("Data: " + employees + "\nStatus: " + status);


        console.log(employees);
  $('#container').empty();
  employees.forEach(function (employee) {
    $container = $('<div></div>');

    // fields I want to edit
    var employeeProperties = ['first_name', 'last_name', 'job_title', 'annual_salary'];
    employeeProperties.forEach(function (prop) {
      var $el = $('<input type="text" id="' + prop + '" name="' + prop + '" />');
      $el.val(employee[prop]);
      $container.append($el);
    });

    $container.data('id', employee.id);
    $container.append('<button class="update">Update</button>');
    $container.append('<button class="delete">Delete</button>');
    $('#container').append($container);
  });

        // $('#container').append('<div class="person"></div>');
        // var $el = $('#container').children().last();
        //
        // $el.append('<ul class="emplist"><li>' + empInfo.employeefirstname + ' ' + empInfo.employeelastname + '</li><li>' + empInfo.employeeident + '</li><li>' + empInfo.employeetitle + '</li><li>' + empInfo.employeesalary + '</li></ul>  <button class="delete">Delete Entry</button>');
    });

    }
    //adds or changes the total for all employee salaries for a month
    function updateDomTotal(totalMonthlySalary) {
        $('#monthlysalarytotal').text('Monthly Salary Total for All Employees: $' + totalMonthlySalary);
    }

    //adds the data for a person's monthly salary to their div.person
    function updateMonthlySalary(empMonthlySalary) {

        $('.person').last().data("monthlysalary", {
            monthlysalary: empMonthlySalary
        });

    }

    //calculates the monthly salary for an employee given their annual salary
    function calculateMonthlySalary(annualSalary) {

        var monthlySalary = Math.round(annualSalary / 12);
        return monthlySalary;

    }

    //gets total combined monthly salary from the DOM data
    function calculateTotalMonthlySalary() {

        var total = 0;
        var $empArray = $('.person');

        for (var i = 0; i < $empArray.length; i++) {
            total += $('.person').eq(i).data("monthlysalary").monthlysalary;
        }

        return total;
    }

    //adds an employee field to the DOM when form is submitted, calculates the total monthly salary for all employees
    function postEmployee(event) {
        event.preventDefault();

        var employees = {};
        $.each($('#employeeinfo').serializeArray(), function(i, field) {
            employees[field.name] = field.value;
        });

        $.post('/employees', employees, function(data){
            getEmployees();

        });
        // clear out inputs
        $('#employeeinfo').find('input[type=text]').val('');
        $('#employeeinfo').find('input[type=number]').val('');
        $('#employeefirstname').focus();
        //add to DOM
        appendDomEmp(values);
        //calculate monthly salary
        monthlySalary = calculateMonthlySalary(values.employeesalary);
        //add data for monthly salary to DOM
        updateMonthlySalary(monthlySalary);
        //sum all the monthly salaries in the present DOM
        totalMonthlySalary = calculateTotalMonthlySalary();
        //update the total monthly salary in the DOM
        updateDomTotal(totalMonthlySalary);


    }

    //deletes an employee from the DOM
    function removeEmployee() {

        $(this).parent().remove();

        totalMonthlySalary = calculateTotalMonthlySalary();
        updateDomTotal(totalMonthlySalary);
    }

});
