import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { port } from '../App';

function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchMentors();
  }, []);

  const fetchStudents = async () => {
    const studentData = await axios.get(`${port}/students/getAllStudentData`);
    const studentsInfo = studentData.data.AllStudentData;
    setStudents(studentsInfo);
  };

  const fetchMentors = async () => {
    const mentorData = await axios.get(`${port}/mentors/allMentors`);
    const mentorsInfo = mentorData.data.allMentorsList;
    setMentors(mentorsInfo);
  };

  const handleAssignMentor = async (studentIndex) => {
    if (selectedMentor) {
      const studentToUpdate = students[studentIndex];
      try {
        await axios.post(`${port}/students/assignOrChangeMentor`, {
          studentName: studentToUpdate.studentName,
          mentor: selectedMentor,
        });

        console.log("Mentor assigned successfully");

        await fetchStudents(); // Fetch updated student information
        console.log("Student data fetched after mentor assignment");

        setSelectedMentor('');
      } catch (error) {
        console.error("Error assigning mentor:", error);
      }
    }
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-center mb-4" style={{ textAlign: 'center' }}>
            <h1 className="h3 mb-0 text-gray-800">Student Dashboard</h1>
          </div>
        </div>
        <div className="container-fluid">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Mentor</th>
                <th>Previous Mentor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.studentName}</td>
                  <td>{e.email}</td>
                  <td>{e.mentor}</td>
                  <td>{e.previousMentor ? e.previousMentor : "-"}</td>
                  <td>
                    <div>
                      <Form.Select
                        value={selectedMentor}
                        onChange={(event) => setSelectedMentor(event.target.value)}
                      >
                        <option value="">Select Mentor</option>
                        {mentors.map((mentor, index) => (
                          <option key={index} value={mentor.mentorName}>
                            {mentor.mentorName}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    <br />
                    <Button
                      variant="success"
                      onClick={() => handleAssignMentor(i)}
                      disabled={!selectedMentor}
                    >
                      <i className="fa-solid fa-user-plus">&nbsp;&nbsp;</i>Assign Mentor
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
