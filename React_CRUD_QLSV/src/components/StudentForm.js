import React, { useState, useEffect } from "react";

export default function StudentForm({ onSubmit, student, isEditing }) {
  const [formData, setFormData] = useState({
    Masv: "",
    Hoten: "",
    Email: "",
    GioiTinh: "Nam",
    NgaySinh: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && student) {
      setFormData(student);
    } else {
      setFormData({ Masv: "", Hoten: "", Email: "", GioiTinh: "Nam", NgaySinh: "" });
    }
    setErrors({});
  }, [student, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let temp = {};
    if (!formData.Masv.trim()) temp.Masv = "Mã SV không được để trống";
    if (!formData.Hoten.trim()) temp.Hoten = "Họ tên không được để trống";
    if (!formData.Email.trim()) {
      temp.Email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      temp.Email = "Email không hợp lệ";
    }
    if (!formData.NgaySinh) temp.NgaySinh = "Vui lòng chọn ngày sinh";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    setFormData({ Masv: "", Hoten: "", Email: "", GioiTinh: "Nam", NgaySinh: "" });
    setErrors({});
  };

  return (
    <div className="modal fade" id="studentModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{isEditing ? "Sửa sinh viên" : "Thêm sinh viên"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Mã SV</label>
                <input type="text" name="Masv" className={`form-control ${errors.Masv ? "is-invalid" : ""}`} value={formData.Masv} onChange={handleChange} />
                {errors.Masv && <div className="invalid-feedback">{errors.Masv}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Họ tên</label>
                <input type="text" name="Hoten" className={`form-control ${errors.Hoten ? "is-invalid" : ""}`} value={formData.Hoten} onChange={handleChange} />
                {errors.Hoten && <div className="invalid-feedback">{errors.Hoten}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="Email" className={`form-control ${errors.Email ? "is-invalid" : ""}`} value={formData.Email} onChange={handleChange} />
                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              </div>
                 <div className="mb-3">
                <label className="form-label">Giới tính</label>
                <select name="GioiTinh" className="form-select" value={formData.GioiTinh} onChange={handleChange}>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Ngày sinh</label>
                <input type="date" name="NgaySinh" className={`form-control ${errors.NgaySinh ? "is-invalid" : ""}`} value={formData.NgaySinh} onChange={handleChange} />
                {errors.NgaySinh && <div className="invalid-feedback">{errors.NgaySinh}</div>}
              </div>
           
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">{isEditing ? "Cập nhật" : "Thêm"}</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
