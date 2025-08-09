import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

import data from "./data";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

export default function App() {
  const [students, setStudents] = useState(data);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });


  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleAdd = (newStudent) => {
    if (isEditing) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id ? { ...newStudent, id: selectedStudent.id } : s
        )
      );
      showAlert("Cập nhật sinh viên thành công!", "success");
    } else {
      setStudents([...students, { ...newStudent, id: Date.now().toString() }]);
      showAlert("Thêm sinh viên thành công!", "success");
    }
    setIsEditing(false);
    setSelectedStudent(null);
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setSelectedStudent(student);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      setStudents(students.filter((s) => s.id !== id));
      showAlert("Xóa sinh viên thành công!", "danger");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-white" href="#">
            <i className="bi bi-book"></i> CRUD Sinh Viên
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <a className="nav-link active px-3" href="#">
                  <i className="bi bi-house-door-fill"></i> Trang chủ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3" href="#">
                  <i className="bi bi-link-45deg"></i> Liên kết
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle px-3"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-gear-fill"></i> Tùy chọn
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Thêm mới
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cập nhật
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Khác
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex ms-lg-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm..."
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>


      <div className="container mt-3">
        {alert.show && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert({ show: false, message: "", type: "" })}
            ></button>
          </div>
        )}
      </div>


      <div className="container py-4">
        <h2 className="mb-4">Quản lý Sinh viên</h2>
        <button
          className="btn btn-primary mb-3"
          data-bs-toggle="modal"
          data-bs-target="#studentModal"
          onClick={() => {
            setIsEditing(false);
            setSelectedStudent(null);
          }}
        >
          Thêm sinh viên
        </button>

        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <StudentForm
          onSubmit={handleAdd}
          student={selectedStudent}
          isEditing={isEditing}
        />
      </div>

  <ul className="pagination justify-content-center">
    <li className="page-item disabled">
      <a href="#" className="page-link">Previous</a>
    </li>
    <li className="page-item"><a href="#" className="page-link">1</a></li>
    <li className="page-item"><a href="#" className="page-link">2</a></li>
    <li className="page-item active"><a href="#" className="page-link">3</a></li>
    <li className="page-item"><a href="#" className="page-link">4</a></li>
    <li className="page-item"><a href="#" className="page-link">5</a></li>
    <li className="page-item"><a href="#" className="page-link">Next</a></li>
  </ul>



    </>
  );
}
