document.addEventListener("DOMContentLoaded", function () {
  const tableBody     = document.getElementById("employee-table-body");
  const form          = document.getElementById("add-employee-form");
  const nameInput     = document.getElementById("Name");
  const emailInput    = document.getElementById("Email");
  const addressInput  = document.getElementById("Address");
  const phoneInput    = document.getElementById("Phone");
  const closeBtn      = document.getElementById("add-close-btn");

  function renderEmployees() {
    tableBody.innerHTML = "";
    employees.forEach(emp => {
      const row = document.createElement("tr");
      row.innerHTML = `
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
      `;
      tableBody.appendChild(row);
    });
    if (window.jQuery) $('[data-toggle="tooltip"]').tooltip();
  }

  function validateForm(name, email, address, phone) {
    if (!name || !email || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    if (phone.length !== 10) {
      alert("Số điện thoại phải đúng 10 chữ số.");
      return false;
    }
    if (phone[0] !== "0") {
      alert("Số điện thoại phải bắt đầu bằng số 0.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Số điện thoại chỉ được chứa chữ số.");
      return false;
    }
    return true;
  }


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const address = addressInput.value.trim();
    const phone   = phoneInput.value.trim();
    if (!validateForm(name, email, address, phone)) {
      return;
    }

    const newId = employees.length
      ? Math.max(...employees.map(emp => emp.id)) + 1
      : 1;
    employees.push({ id: newId, name, email, address, phone });

    renderEmployees();
    form.reset();
    closeBtn.click();
  });

  renderEmployees();
});
