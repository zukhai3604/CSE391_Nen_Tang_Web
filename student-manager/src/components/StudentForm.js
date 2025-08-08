import React, { useState, useEffect } from 'react';

export default function StudentForm({ onAdd, onUpdate, editingStudent, onCancelEdit }) {
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({ name: '', age: '', email: '' });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', age: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Tên</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Tuổi</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editingStudent && (
          <button type="button" onClick={onCancelEdit} className="btn btn-secondary">
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
