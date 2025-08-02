$(document).ready(function () {
    const $tableBody = $("#table-body");
    const $form = $("#formAdd");
    const $inputTen = $("#inputTen");
    const $inputHodem = $("#inputHodem");
    const $inputDiachi = $("#inputDiachi");
    const $inputHoatdong = $("#inputHoatdong");
    const $addModalElement = $("#addModal");

    function showError($input, errorSelector, message) {
        $input.removeClass("is-valid").addClass("is-invalid");
        $(errorSelector).text(message).show();

        setTimeout(() => {
            $(errorSelector).fadeOut();
            $input.removeClass("is-invalid");
        }, 3000);
    }

    function markValid($input) {
        $input.removeClass("is-invalid").addClass("is-valid");
    }

    function validateForm() {
        let isValid = true;


        $(".error-message").text("").hide();
        $(".form-control").removeClass("is-invalid is-valid");

        const ten = $inputTen.val().trim();
        const hodem = $inputHodem.val().trim();
        const diachi = $inputDiachi.val().trim();


        if (!ten) {
            showError($inputTen, "#TenError", "Vui lòng nhập tên.");
            isValid = false;
        } else if (ten.length > 15) {
            showError($inputTen, "#TenError", "Tên không được vượt quá 15 ký tự.");
            isValid = false;
        } else {
            markValid($inputTen);
        }


        if (!hodem) {
            showError($inputHodem, "#hotenError", "Vui lòng nhập họ đệm.");
            isValid = false;
        } else if (hodem.length > 20) {
            showError($inputHodem, "#hotenError", "Họ đệm không được vượt quá 20 ký tự.");
            isValid = false;
        } else {
            markValid($inputHodem);
        }


        if (!diachi) {
            showError($inputDiachi, "#diachiError", "Vui lòng nhập địa chỉ.");
            isValid = false;
        } else if (diachi.length > 50) {
            showError($inputDiachi, "#diachiError", "Địa chỉ không được vượt quá 50 ký tự.");
            isValid = false;
        } else {
            markValid($inputDiachi);
        }

        return isValid;
    }

    function renderEmployees() {
        $tableBody.empty();
        data.forEach((emp, index) => {
            const $row = $(`
                <tr>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-outline-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Chi tiết</a></li>
                                <li><a class="dropdown-item" href="#">Khóa</a></li>
                            </ul>
                        </div>
                    </td>
                    <td>
                        <a href="#" class="btn btn-info btn-sm" data-toggle="tooltip" title="Xem"><i class="material-icons text-white">&#xE8F4;</i></a>
                        <a href="#" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Sửa"><i class="material-icons text-white"></i></a>
                        <a href="#" class="btn btn-danger btn-sm delete-btn" data-id="${emp.id}" data-toggle="tooltip" title="Xóa"><i class="material-icons text-white"></i></a>
                    </td>
                    <td>${index + 1}</td>
                    <td>${emp.ten}</td>
                    <td>${emp.hodem}</td>
                    <td>${emp.diachi}</td>
                    <td>
                        ${emp.hoatdong ? '<i class="fa fa-check text-success"></i>' : '<i class="fa fa-times text-danger"></i>'}
                    </td>
                </tr>
            `);
            $tableBody.append($row);
        });

        $('[data-toggle="tooltip"]').tooltip();
    }

    $form.on("submit", function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        const ten = $inputTen.val().trim();
        const hodem = $inputHodem.val().trim();
        const diachi = $inputDiachi.val().trim();
        const hoatdong = $inputHoatdong.val() === "true";

        const newId = data.length > 0 ? Math.max(...data.map(e => e.id)) + 1 : 1;

        data.push({ id: newId, ten, hodem, diachi, hoatdong });
        renderEmployees();
        $form[0].reset();
        $(".form-control").removeClass("is-valid");
        $addModalElement.modal("hide");
    });

    renderEmployees();
});
