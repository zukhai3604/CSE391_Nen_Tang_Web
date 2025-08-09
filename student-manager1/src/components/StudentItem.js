import React from "react";

export default function StudentItem({ student, index, onEdit, onDelete }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{student.Masv}</td>
      <td>{student.Hoten}</td>
      <td>{student.Email}</td>
      <td>{student.GioiTinh}</td>
      <td>{student.NgaySinh}</td>
      <td>
        <button className="btn btn-warning btn-sm me-1" data-bs-toggle="modal" data-bs-target="#studentModal" onClick={() => onEdit(student)}>Sửa</button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(student.id)}>Xóa</button>
      </td>
    </tr>
  );
}
