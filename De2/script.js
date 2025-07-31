// script.js
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const form = document.getElementById("formAdd");
    const customerInput = document.getElementById("inputCustomer");
    const staffInput = document.getElementById("inputEmployee");
    const amountInput = document.getElementById("inputAmount");
    const addModalElement = document.getElementById("addModal");

    // Get references to the error display divs
    const customerError = document.getElementById("customerError");
    const employeeError = document.getElementById("employeeError");
    const amountError = document.getElementById("amountError");

    let employees = [];

    // Function to render the list of employees in the table
    function renderEmployees() {
        tableBody.innerHTML = "";
        employees.forEach(emp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><a href="#" style="color: black; cursor: pointer; text-decoration: none; font-weight: bold;">&times;</a></td>
                <td>
                    <a href="#" class="btn btn-info btn-sm" data-toggle="tooltip" title="Xem"><i class="material-icons">&#xE8F4;</i></a>
                    <a href="#" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Sửa"><i class="material-icons">&#xE3C9;</i></a>
                    <a href="#" class="btn btn-danger btn-sm delete-btn" data-id="${emp.id}" data-toggle="tooltip" title="Xóa"><i class="material-icons">&#xE872;</i></a>
                </td>
                <td>${emp.id}</td>
                <td>${emp.customer}</td>
                <td>${emp.staff}</td>
                <td>${parseFloat(emp.amount).toLocaleString('vi-VN')} đ</td>
                <td>${emp.date}</td>
            `;
            tableBody.appendChild(row);
        });
        // Re-initialize tooltips after rendering the table
        if (window.jQuery) {
            $('[data-toggle="tooltip"]').tooltip();
        }

        // Add event listeners for the actual delete buttons (trash icon)
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const idToDelete = parseInt(this.dataset.id);
                // Show custom confirmation dialog before deleting
                showConfirmationDialog("Bạn có chắc chắn muốn xóa bản ghi này không?", () => {
                    deleteEmployee(idToDelete);
                });
            });
        });
    }

    // Function to delete an employee from the array
    function deleteEmployee(id) {
        employees = employees.filter(emp => emp.id !== id);
        renderEmployees(); // Re-render the table after deletion
    }

    // Function to show a custom confirmation dialog (used for delete action)
    function showConfirmationDialog(message, onConfirm) {
        const dialogHtml = `
            <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="confirmationModalLabel">Xác nhận xóa</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${message}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append dialog to body if not already present
        if (!document.getElementById('confirmationModal')) {
            document.body.insertAdjacentHTML('beforeend', dialogHtml);
        }

        const confirmationModal = $('#confirmationModal');
        confirmationModal.modal('show');

        // Event listener for the confirm button inside the dialog
        $('#confirmDeleteBtn').off('click').on('click', function() {
            onConfirm();
            confirmationModal.modal('hide');
        });

        // Clean up modal after it's hidden
        confirmationModal.on('hidden.bs.modal', function (e) {
            $(this).remove(); // Remove the modal from DOM
        });
    }

    // Function to validate form data and display inline errors
    function validateForm(customer, staff, amount) {
        // Clear all previous error messages
        customerError.textContent = "";
        employeeError.textContent = "";
        amountError.textContent = "";

        let isValid = true;

        if (!customer) {
            customerError.textContent = "Tên khách hàng không được để trống.";
            isValid = false;
        } else if (customer.length > 30) {
            customerError.textContent = "Tên khách hàng không được vượt quá 30 ký tự.";
            isValid = false;
        }

        if (!staff) {
            employeeError.textContent = "Tên nhân viên không được để trống.";
            isValid = false;
        } else if (staff.length > 30) {
            employeeError.textContent = "Tên nhân viên không được vượt quá 30 ký tự.";
            isValid = false;
        }

        const parsedAmount = parseFloat(amount);
        if (!amount) { // Check for empty string before parsing
            amountError.textContent = "Số tiền không được để trống.";
            isValid = false;
        } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
            amountError.textContent = "Số tiền không hợp lệ. Vui lòng nhập một số lớn hơn 0.";
            isValid = false;
        }

        return isValid;
    }

    // Handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const customer = customerInput.value.trim();
        const staff = staffInput.value.trim();
        const amount = amountInput.value.trim();

        const today = new Date();
        const date = today.toLocaleDateString('vi-VN') + ' ' + today.toLocaleTimeString('vi-VN');

        if (!validateForm(customer, staff, amount)) {
            return; // Stop if data is invalid
        }

        // Create new ID: get the maximum existing ID and increment by 1, if no records exist, start from 1
        const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;

        // Add new record to the array
        employees.push({ id: newId, customer, staff, amount: parseFloat(amount), date });

        renderEmployees(); // Update the table
        form.reset(); // Clear form data
        // Clear error messages after successful submission and closing modal
        customerError.textContent = "";
        employeeError.textContent = "";
        amountError.textContent = "";
        if (window.jQuery) {
            $(addModalElement).modal('hide');
        }
    });

    // Load mock data from data.js
    // Ensure employeeData variable is defined in data.js
    if (typeof Data !== "undefined" && Data.length > 0) {
        employees = [...Data]; // Copy sample data from data.js
    }

    // Call renderEmployees function for the first time to display data when the page loads
    renderEmployees();
});
