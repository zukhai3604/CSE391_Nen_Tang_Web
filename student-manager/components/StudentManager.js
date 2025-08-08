import React, { useEffect, useState } from 'react';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';
import initialData from '../data/Data';

const STORAGE_KEY = 'students_zip_v1';

export default function StudentManager() {
  // Initialize from localStorage if present, otherwise use initialData
  const [students, setStudents] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : (initialData || []);
    } catch (e) {
      console.warn('Error reading localStorage, using initialData', e);
      return initialData || [];
    }
  });

  const [editingStudent, setEditingStudent] = useState(null);

  // Persist whenever students change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.warn('Error writing to localStorage', e);
    }
  }, [students]);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: Date.now().toString() }]);
  };

  const updateStudent = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sinh viên này?')) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const startEdit = (student) => setEditingStudent(student);

  const resetToSample = () => {
    if (!window.confirm('Reset dữ liệu về mẫu? Dữ liệu hiện tại sẽ bị ghi đè.')) return;
    setStudents(initialData || []);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-white" href="#">
            <i className="bi bi-book"></i> CRUD Sinh Viên
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
            </ul>
            <form className="d-flex ms-lg-3" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" />
              <button className="btn btn-outline-light" type="submit"><i className="bi bi-search"></i></button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container border rounded p-2 shadow-sm bg-white mt-4">
        <div className="container-sm my-4">
          <div className="row g-4">

            <div className="col-lg-4 order-1 order-lg-1">
              <div className="card h-100">
                <div className="card-header bg-primary text-center">
                  <h5 className="mb-0 font-weight-bold text-white">Form thêm sinh viên</h5>
                </div>
                <div className="card-body">
                  <StudentForm
                    key={editingStudent ? editingStudent.id : 'new'}
                    onAdd={addStudent}
                    onUpdate={updateStudent}
                    editingStudent={editingStudent}
                    onCancelEdit={() => setEditingStudent(null)}
                  />
                </div>
              </div>


            </div>

            <div className="col-lg-8 order-2 order-lg-2">
              <div className="card shadow-sm rounded w-auto mx-auto">
                <div className="card-header bg-primary text-center">
                  <h5 className="text-white mb-0">Bảng sinh viên</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive p-3">
                    <StudentTable students={students} onEdit={startEdit} onDelete={deleteStudent} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
