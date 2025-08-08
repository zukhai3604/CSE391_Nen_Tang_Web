import React from 'react';

export default function StudentList({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return <div className="empty">Chưa có sinh viên. Hãy thêm sinh viên mới.</div>;
  }

  return (
    <div className="student-list">
      <h2>Danh sách sinh viên</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Ngành</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.major}</td>
              <td className="actions">
                <button onClick={() => onEdit(s)}>Sửa</button>
                <button onClick={() => onDelete(s.id)} className="danger">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
