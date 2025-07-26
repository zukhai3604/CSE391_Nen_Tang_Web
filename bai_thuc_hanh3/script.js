document.addEventListener("DOMContentLoaded", function () {
  const btnThem = document.getElementById("btnThem");
  const tbody = document.querySelector("table tbody");
  const thongBao = document.getElementById("thongBao");
  const form = document.querySelector("form");
  let selectedRow = null;

  tbody.addEventListener("click", function (e) {
    const suaBtn = e.target.closest("button.btn-warning");
    if (!suaBtn) return; 
    const tr = suaBtn.closest("tr");
    selectedRow = tr;
    document.getElementById("Masv").value     = tr.cells[1].innerText;
    document.getElementById("Hoten").value    = tr.cells[2].innerText;
    document.getElementById("Email").value    = tr.cells[3].innerText;
    document.getElementById("Ngaysinh").value = tr.cells[5].innerText;
    const gt = tr.cells[4].innerText;
    document.getElementById(gt === "Nam" ? "gioiTinhNam" : "gioiTinhNu").checked = true;
    btnThem.textContent = "Cập nhật sinh viên";
  });


  btnThem.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Đã nhấn nút " + (selectedRow ? "Cập nhật" : "Thêm"));
    const masv    = document.getElementById("Masv");
    const hoten   = document.getElementById("Hoten");
    const email   = document.getElementById("Email");
    const ngaysinh= document.getElementById("Ngaysinh");
    const gtRadio = document.querySelector('input[name="gioi_tinh"]:checked');
    const gioitinh= gtRadio ? gtRadio.value : "";
    thongBao.className = "";
    if (!masv.value.trim() || !hoten.value.trim()) {
      thongBao.textContent = "Vui lòng nhập Mã sinh viên và Họ tên";
      thongBao.className = "text-danger fw-bold my-2 text-center";
      (!masv.value.trim() ? masv : hoten).focus();
      return;
    }
    const regexEmail = /^\S+@\S+\.\S+$/;
    if (!regexEmail.test(email.value)) {
      thongBao.textContent = "Email không hợp lệ";
      thongBao.className = "text-danger fw-bold my-2 text-center";
      email.focus();
      return;
    }

    if (selectedRow) {
      selectedRow.cells[1].innerText = masv.value;
      selectedRow.cells[2].innerText = hoten.value;
      selectedRow.cells[3].innerText = email.value;
      selectedRow.cells[4].innerText = gioitinh;
      selectedRow.cells[5].innerText = ngaysinh.value;

      thongBao.textContent = "Cập nhật thành công!";
      thongBao.className = "text-success fw-bold my-2 text-center";
      selectedRow = null;
    } else {
    
      const stt = tbody.rows.length + 1;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${stt}</td>
        <td>${masv.value}</td>
        <td>${hoten.value}</td>
        <td>${email.value}</td>
        <td>${gioitinh}</td>
        <td>${ngaysinh.value}</td>
        <td>
          <div class="btnluachon">
            <button class="btn btn-sm btn-warning me-1">Sửa</button>
            <button class="btn btn-sm btn-danger" onclick="xoaDong(this)">Xóa</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
      thongBao.textContent = "Đã thêm sinh viên thành công!";
      thongBao.className = "text-success fw-bold my-2 text-center";
    }

    setTimeout(() => {
      thongBao.textContent = "";
      thongBao.className = "";
    }, 3000);

    form.reset();
    btnThem.textContent = "Thêm sinh viên";
  });

  window.xoaDong = function (btn) {
    if (confirm("Bạn có chắc chắn muốn xoá?")) {
      const row = btn.closest("tr");
      row.remove();
      thongBao.textContent = "Xoá thành công!";
      thongBao.className = "text-success fw-bold my-2 text-center";


      [...tbody.rows].forEach((r, i) => r.cells[0].innerText = i + 1);

      setTimeout(() => {
        thongBao.textContent = "";
        thongBao.className = "";
      }, 3000);
    }
  };
});
