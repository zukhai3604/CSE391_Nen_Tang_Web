import React from "react";
import StudentItem from "./StudentItem";

export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
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
          {students.map((sv, idx) => (
            <StudentItem key={sv.id} student={sv} index={idx} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
