$(document).ready(function() {

            getEmployees();

            var monthlySalary = 0;
            var totalMonthlySalary = 0;

            //event listeners
            $('#employeeinfo').on('submit', postEmployee);
            $('#container').on('click', '.delete', inactivateEmployee);

            //builds the employee info list for the DOM and adds it
            function getEmployees() {

                $.get('/employees', function(employees, status) {
                    console.log("Data: " + employees + "\nStatus: " + status);


                    console.log(employees);
                    $('#container').empty();
                    $('#container').append('<table> <tr>' +
                        '<th>ID#</th>' +
                        '<th>Name</th>' +
                        '<th>Job Title</th> ' +
                        '<th>Monthly Salary</th>' +
                        '</tr>');

                    employees.forEach(function(employee) {

                        $container = $('<tr></tr>');
                        $container.data('id', employee.id);


                        monthlySalary = parseFloat(calculateMonthlySalary(employee.annual_salary));
                        totalMonthlySalary += monthlySalary;
                        $container.append('<td>' + employee.id + '</td>');
                        $container.append('<td>' + employee.last_name + ', ' + employee.first_name + '</td>');
                        $container.append('<td>' + employee.job_title + '</td>');

                        $container.append('<td> ' + monthlySalary + '</td>');
                        $container.append('<button class="delete">Inactivate</button>');

                        $('#container').append($container);


                        $('#container').append('</table>');
                        $('#monthlysalarytotal').text('Monthly Salary Total: ' + totalMonthlySalary);

                    });

                });
            }




            //calculates the monthly salary for an employee given their annual salary
            function calculateMonthlySalary(annualSalary) {

                var monthlySalary = Math.round(annualSalary / 12);
                return monthlySalary;

            }



            //adds an employee field to the DOM when form is submitted, calculates the total monthly salary for all employees
            function postEmployee(event) {
                event.preventDefault();

                var employees = {};
                $.each($('#employeeinfo').serializeArray(), function(i, field) {
                    employees[field.name] = field.value;
                });

                $.post('/employees', employees, function(data) {
                    getEmployees();

                });
                // clear out inputs
                $('#employeeinfo').find('input[type=text]').val('');
                $('#employeeinfo').find('input[type=number]').val('');
                $('#employeefirstname').focus();


            }
            //gets the employee id from the dom
            function getEmployeeId(button) {
                var employeeId = button.parent().data('id');
                console.log('employeeId', employeeId);
                return employeeId;
            }

            //sets the employee status to inactive
            function inactivateEmployee() {
                event.preventDefault();


                var employeeId = getEmployeeId($(this));
                var preparedData = {};
                $.ajax({
                    type: 'PUT',
                    url: '/employees/' + employeeId,
                    data: preparedData,
                    success: function(data) {
                        getEmployees();
                    }
                });
            }

      });
