import React from 'react';

export default function StudentTable({ students, onEdit, onDelete }){
  return (
    <table className="table mb-0">
      <thead className="table-light">
        <tr>
          <th>STT</th>
          <th>Mã sinh viên</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.length===0 ? (
          <tr><td colSpan={7} className="text-center py-4">Chưa có sinh viên</td></tr>
        ) : (
          students.map((s, idx) => (
            <tr key={s.id}>
              <td>{idx+1}</td>
              <td>{s.Masv}</td>
              <td>{s.Hoten}</td>
              <td>{s.Email}</td>
              <td>{s.gioi_tinh}</td>
              <td>{s.Ngaysinh ? new Date(s.Ngaysinh).toLocaleDateString() : ''}</td>
              <td>
                <div className="btnluachon">
                  <button className="btn btn-sm btn-warning me-1" onClick={()=>onEdit(s)}>Sửa</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>onDelete(s.id)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
