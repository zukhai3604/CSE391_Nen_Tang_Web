document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const form = document.getElementById("formAdd");
    const customerInput = document.getElementById("inputCustomer");
    const staffInput = document.getElementById("inputEmployee");
    const amountInput = document.getElementById("inputAmount");
    const addModalElement = document.getElementById("addModal");

    const customerError = document.getElementById("customerError");
    const employeeError = document.getElementById("employeeError");
    const amountError = document.getElementById("amountError");

    let employees = [];

    function renderEmployees() {
        tableBody.innerHTML = "";
        employees.forEach(emp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><a href="#" style="color: black; cursor: pointer; text-decoration: none; font-weight: bold;">&times;</a></td>
                <td>
                   <a href="#" class="btn btn-info btn-sm" data-toggle="tooltip" title="Xem"><i class="material-icons text-white">&#xE8F4;</i></a>
<a href="#" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Sửa"><i class="material-icons text-white">&#xE3C9;</i></a>
<a href="#" class="btn btn-danger btn-sm delete-btn" data-id="${emp.id}" data-toggle="tooltip" title="Xóa"><i class="material-icons text-white">&#xE872;</i></a>
                </td>
                <td>${emp.id}</td>
                <td>${emp.customer}</td>
                <td>${emp.staff}</td>
                <td>${parseFloat(emp.amount).toLocaleString('vi-VN')} đ</td>
                <td>${emp.date}</td>
            `;
            tableBody.appendChild(row);
        });

        if (window.jQuery) {
            $('[data-toggle="tooltip"]').tooltip();
        }

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const idToDelete = parseInt(this.dataset.id);

                showConfirmationDialog("Bạn có chắc chắn muốn xóa bản ghi này không?", () => {
                    deleteEmployee(idToDelete);
                });
            });
        });
    }

    function deleteEmployee(id) {
        employees = employees.filter(emp => emp.id !== id);
        renderEmployees();
    }
    
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

        if (!document.getElementById('confirmationModal')) {
            document.body.insertAdjacentHTML('beforeend', dialogHtml);
        }

        const confirmationModal = $('#confirmationModal');
        confirmationModal.modal('show');
    
        $('#confirmDeleteBtn').off('click').on('click', function() {
            onConfirm();
            confirmationModal.modal('hide');
        });

        confirmationModal.on('hidden.bs.modal', function (e) {
            $(this).remove(); 
        });
    }
    
    function validateForm(customerInput, staffInput, amountInput) {

        customerError.textContent = "";
        employeeError.textContent = "";
        amountError.textContent = "";

        customerInput.classList.remove("input-error");
        staffInput.classList.remove("input-error");
        amountInput.classList.remove("input-error");

        let isValid = true;

        const customer = customerInput.value.trim();
        const staff = staffInput.value.trim();
        const amount = amountInput.value.trim();

        if (!customer) {
            customerError.textContent = "Vui lòng nhập thông tin tên khách hàng.";
            customerInput.classList.add("input-error");
            isValid = false;
            setTimeout(() => {
                customerError.textContent = "";
                customerInput.classList.remove("input-error");
            }, 1000);
        } else if (customer.length > 30) {
            customerError.textContent = "Tên khách hàng không được vượt quá 30 ký tự.";
            customerInput.classList.add("input-error");
            isValid = false;
            setTimeout(() => {
                customerError.textContent = "";
                customerInput.classList.remove("input-error");
            }, 1000);
        }

        if (!staff) {
            employeeError.textContent = "Vui lòng nhập thông tin tên nhân viên.";
            staffInput.classList.add("input-error");
            isValid = false;
            setTimeout(() => {
                employeeError.textContent = "";
                staffInput.classList.remove("input-error");
            }, 1000);
        } else if (staff.length > 30) {
            employeeError.textContent = "Tên nhân viên không được vượt quá 30 ký tự.";
            staffInput.classList.add("input-error");
            isValid = false;
            setTimeout(() => {
                employeeError.textContent = "";
                staffInput.classList.remove("input-error");
            }, 1000);
        }

        const parsedAmount = parseFloat(amount);
        if (!amount) {
            amountError.textContent = "Vui lòng nhập thông tin số tiền.";
            amountInput.classList.add("input-error");
            isValid = false;
            setTimeout(() => {
                amountError.textContent = "";
                amountInput.classList.remove("input-error");
            }, 1000);
        } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
            amountError.textContent = "Số tiền không hợp lệ. Vui lòng nhập một số lớn hơn 0.";
            amountInput.classList.add("input-error");
            isValid = false;
            setTimeout(() => {
                amountError.textContent = "";
                amountInput.classList.remove("input-error");
            }, 1000);
        }

        return isValid;
    }

    
    form.addEventListener("submit", function (e) {
        e.preventDefault();


        customerInput.classList.remove("input-error");
        staffInput.classList.remove("input-error");
        amountInput.classList.remove("input-error");
        customerError.textContent = "";
        employeeError.textContent = "";
        amountError.textContent = "";

        if (!validateForm(customerInput, staffInput, amountInput)) {
            return; 
        }

        const customer = customerInput.value.trim();
        const staff = staffInput.value.trim();
        const amount = amountInput.value.trim();

        const today = new Date();
        const date = today.toLocaleDateString('vi-VN') + ' ' + today.toLocaleTimeString('vi-VN');
        const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;

        employees.push({ id: newId, customer, staff, amount: parseFloat(amount), date });

        renderEmployees();
        form.reset();

        if (window.jQuery) {
            $(addModalElement).modal('hide');
        }
    });

    if (typeof Data !== "undefined" && Data.length > 0) {
        employees = [...Data];
    }

    renderEmployees();
});