$(document).ready(function () {
  const $tableBody = $("#employee-table-body");
  const $form = $("#add-employee-form");
  const $nameInput = $("#Name");
  const $emailInput = $("#Email");
  const $addressInput = $("#Address");
  const $phoneInput = $("#Phone");
  const $closeBtn = $("#add-close-btn");

  function showError($input, message) {
    const $error = $("<div class='text-danger error-message mt-1'></div>").text(message);
    $input.addClass("is-invalid").removeClass("is-valid");
    $input.next(".error-message").remove();
    $input.after($error);

    setTimeout(() => {
      $error.fadeOut(300, function () {
        $(this).remove();
      });
    }, 3000);
  }

  function showSuccess($input) {
    $input.removeClass("is-invalid").addClass("is-valid");
    $input.next(".error-message").remove();

    setTimeout(() => {
      $input.removeClass("is-valid");
    }, 3000);
  }

  function validateForm(name, email, address, phone) {
    let isValid = true;


    $(".form-control").removeClass("is-invalid is-valid");
    $(".error-message").remove();

    if (!name) {
      showError($nameInput, "Vui lòng nhập tên.");
      isValid = false;
    } else if (name.length > 15) {
      showError($nameInput, "Tên không được vượt quá 15 ký tự.");
      isValid = false;
    } else {
      showSuccess($nameInput);
    }

      if (!email) {
      showError($emailInput, "Vui lòng nhập email.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError($emailInput, "Email không hợp lệ. Ví dụ: ten@email.com");
      isValid = false;
    } else {
      showSuccess($emailInput);
    }

    if (!address) {
      showError($addressInput, "Vui lòng nhập địa chỉ.");
      isValid = false;
    } else if (address.length > 50) {
      showError($addressInput, "Địa chỉ không được vượt quá 50 ký tự.");
      isValid = false;
    } else {
      showSuccess($addressInput);
    }

    if (!phone) {
      showError($phoneInput, "Vui lòng nhập số điện thoại.");
      isValid = false;
    } else if (phone.length !== 10) {
      showError($phoneInput, "Số điện thoại phải đúng 10 chữ số.");
      isValid = false;
    } else if (phone[0] !== "0") {
      showError($phoneInput, "Số điện thoại phải bắt đầu bằng số 0.");
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      showError($phoneInput, "Số điện thoại chỉ được chứa chữ số.");
      isValid = false;
    } else {
      showSuccess($phoneInput);
    }

    return isValid;
  }

  function renderEmployees() {
    $tableBody.empty();
    employees.forEach(emp => {
      const $row = $(`
        <tr>
          <td>
            <span class="custom-checkbox">
              <input type="checkbox" id="checkbox${emp.id}" value="${emp.id}">
              <label for="checkbox${emp.id}"></label>
            </span>
          </td>
          <td>${emp.name}</td>
          <td>${emp.email}</td>
          <td>${emp.address}</td>
          <td>${emp.phone}</td>
          <td>
            <a href="#editEmployeeModal" class="edit" data-toggle="tooltip" title="Edit">
              <i class="material-icons">&#xE254;</i>
            </a>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="tooltip" title="Delete">
              <i class="material-icons">&#xE872;</i>
            </a>
          </td>
        </tr>
      `);
      $tableBody.append($row);
    });

    $('[data-toggle="tooltip"]').tooltip();
  }

  $form.on("submit", function (e) {
    e.preventDefault();

    const name = $nameInput.val().trim();
    const email = $emailInput.val().trim();
    const address = $addressInput.val().trim();
    const phone = $phoneInput.val().trim();

    if (!validateForm(name, email, address, phone)) return;

    const newId = employees.length
      ? Math.max(...employees.map(emp => emp.id)) + 1
      : 1;

    employees.push({ id: newId, name, email, address, phone });

    renderEmployees();
    $form[0].reset();
    $(".form-control").removeClass("is-valid");
    $closeBtn.click();
  });

  renderEmployees();
});
