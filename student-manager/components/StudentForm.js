import React, { useState, useEffect } from 'react';

export default function StudentForm({ onAdd, onUpdate, editingStudent, onCancelEdit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    dob: '',
    gender: 'Nam',
    note: '',
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({ id: '', name: '', email: '', dob: '', gender: 'Nam', note: '' });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setFormData({ id: '', name: '', email: '', dob: '', gender: 'Nam', note: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Mã sinh viên:</label>
        <input
          type="text"
          className="form-control"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Họ tên:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Ngày sinh:</label>
        <input
          type="date"
          className="form-control"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Giới tính:</label>
        <div>
          <label className="me-3">
            <input
              type="radio"
              name="gender"
              value="Nam"
              checked={formData.gender === 'Nam'}
              onChange={handleChange}
            /> Nam
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Nữ"
              checked={formData.gender === 'Nữ'}
              onChange={handleChange}
            /> Nữ
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label>Ghi chú:</label>
        <textarea
          className="form-control"
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary w-100" type="submit">
        {editingStudent ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
      </button>

      {editingStudent && (
        <button
          type="button"
          className="btn btn-secondary w-100 mt-2"
          onClick={onCancelEdit}
        >
          Hủy chỉnh sửa
        </button>
      )}
    </form>
  );
}
