import React from 'react';

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table className="table table-striped table-hover mb-0">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Tuổi</th>
          <th>Email</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              Không có sinh viên
            </td>
          </tr>
        ) : (
          students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.email}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(s)}>
                  Sửa
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(s.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
