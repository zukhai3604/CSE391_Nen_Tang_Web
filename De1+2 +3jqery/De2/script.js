$(document).ready(function () {
  const $tableBody = $("#table-body");
  const $form = $("#formAdd");
  const $customerInput = $("#inputCustomer");
  const $staffInput = $("#inputEmployee");
  const $amountInput = $("#inputAmount");
  const $addModalElement = $("#addModal");

  const $customerError = $("#customerError");
  const $employeeError = $("#employeeError");
  const $amountError = $("#amountError");

  let employees = [];

  function showError($input, $errorElement, message) {
    $input.removeClass("is-valid").addClass("is-invalid");
    $errorElement.text(message).show();
    setTimeout(() => {
      $errorElement.fadeOut();
      $input.removeClass("is-invalid");
    }, 3000);
  }

  function markValid($input) {
    $input.removeClass("is-invalid").addClass("is-valid");
  }

  function validateForm() {
    const customer = $customerInput.val().trim();
    const staff = $staffInput.val().trim();
    const amount = $amountInput.val().trim();

    let isValid = true;

    $(".form-control").removeClass("is-valid is-invalid");
    $(".text-danger").text("").hide();


    if (!customer) {
      showError($customerInput, $customerError, "Vui lòng nhập tên khách hàng.");
      isValid = false;
    } else if (customer.length > 30) {
      showError($customerInput, $customerError, "Tên khách hàng không được vượt quá 30 ký tự.");
      isValid = false;
    } else {
      markValid($customerInput);
    }


    if (!staff) {
      showError($staffInput, $employeeError, "Vui lòng nhập tên nhân viên.");
      isValid = false;
    } else if (staff.length > 30) {
      showError($staffInput, $employeeError, "Tên nhân viên không được vượt quá 30 ký tự.");
      isValid = false;
    } else {
      markValid($staffInput);
    }


    const parsedAmount = parseFloat(amount);
    if (!amount) {
      showError($amountInput, $amountError, "Vui lòng nhập số tiền.");
      isValid = false;
    } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showError($amountInput, $amountError, "Số tiền không hợp lệ. Phải lớn hơn 0.");
      isValid = false;
    } else {
      markValid($amountInput);
    }

    return isValid;
  }

  function renderEmployees() {
    $tableBody.empty();
    employees.forEach(emp => {
      const $row = $(`
        <tr>
          <td>
            <a href="#" style="color: black; cursor: pointer; text-decoration: none; font-weight: bold;">&times;</a>
          </td>
          <td>
            <a href="#" class="btn btn-info btn-sm" data-toggle="tooltip" title="Xem">
              <i class="material-icons text-white">&#xE8F4;</i>
            </a>
            <a href="#" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Sửa">
              <i class="material-icons text-white">&#xE3C9;</i>
            </a>
            <a href="#" class="btn btn-danger btn-sm delete-btn" data-id="${emp.id}" data-toggle="tooltip" title="Xóa"><i class="material-icons text-white"></i></a>
            <!-- Nút Xóa đã bị loại bỏ -->
          </td>
          <td>${emp.id}</td>
          <td>${emp.customer}</td>
          <td>${emp.staff}</td>
          <td>${parseFloat(emp.amount).toLocaleString('vi-VN')} đ</td>
          <td>${emp.date}</td>
        </tr>
      `);
      $tableBody.append($row);
    });

    $('[data-toggle="tooltip"]').tooltip();
  }

  $form.on("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const customer = $customerInput.val().trim();
    const staff = $staffInput.val().trim();
    const amount = parseFloat($amountInput.val().trim());

    const today = new Date();
    const date = today.toLocaleDateString('vi-VN') + ' ' + today.toLocaleTimeString('vi-VN');
    const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;

    employees.push({ id: newId, customer, staff, amount, date });

    renderEmployees();
    $form[0].reset();
    $(".form-control").removeClass("is-valid");
    $addModalElement.modal("hide");
  });

  if (typeof Data !== "undefined" && Array.isArray(Data)) {
    employees = [...Data];
  }

  renderEmployees();
});
