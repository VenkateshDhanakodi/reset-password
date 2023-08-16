import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { port } from '../App';

function MentorDashboard() {
  const [mentor, setMentor] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    fetchMentor();
    fetchUnassignedStudents();
  }, []);

  const fetchMentor = async () => {
    const mentorData = await axios.get(`${port}/mentors/allMentors`);
    const mentorsInfo = mentorData.data.allMentorsList;
    setMentor(mentorsInfo);
  };

  const fetchUnassignedStudents = async () => {
    const unassignedData = await axios.get(`${port}/mentors/unAssignedStudents`);
    const unassignedStudents = unassignedData.data.unAssignedStudentsList;
    setUnassignedStudents(unassignedStudents);
  };

  const handleCheckboxChange = (event, mentorIndex, studentName) => {
    const checked = event.target.checked;
    setSelectedStudents(prevSelected => {
      const updatedSelected = [...prevSelected];
      if (!updatedSelected[mentorIndex]) {
        updatedSelected[mentorIndex] = [];
      }
      if (checked) {
        updatedSelected[mentorIndex].push(studentName);
      } else {
        updatedSelected[mentorIndex] = updatedSelected[mentorIndex].filter(student => student !== studentName);
      }
      return updatedSelected;
    });
  };

  const handleUpdate = async (mentorIndex) => {
    const mentorToUpdate = mentor[mentorIndex];
    const selectedStudentsForMentor = selectedStudents[mentorIndex] || [];

    // Remove duplicates by converting to Set and back to an array
    const uniqueSelectedStudents = [...new Set(selectedStudentsForMentor)];

    if (uniqueSelectedStudents.length > 0) {
      try {
        await axios.post(`${port}/mentors/assignStudent/`, {
          mentorName: mentorToUpdate.mentorName,
          students: uniqueSelectedStudents,
        });

        console.log("Student assigned successfully");

        await fetchMentor(); // Fetch updated mentor information
        console.log("Mentor data fetched after assignment");

        setSelectedStudents(prevSelected => {
          const updatedSelected = [...prevSelected];
          updatedSelected[mentorIndex] = [];
          return updatedSelected;
        });

        fetchUnassignedStudents();
      } catch (error) {
        console.error("Error assigning student:", error);
      }
    }
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-center mb-4" style={{ textAlign: 'center' }}>
            <h1 className="h3 mb-0 text-gray-800">Mentor Dashboard</h1>
          </div>
        </div>
        <div className="container-fluid">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Mentor Name</th>
                <th>Email</th>
                <th>Students</th>
                <th>Unassigned Students</th>
              </tr>
            </thead>
            <tbody>
              {mentor.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.mentorName}</td>
                  <td>{e.email}</td>
                  <td>
                    {Array.isArray(e.students) && e.students.length > 0 ? (
                      e.students.map((student, index) => (
                        <div key={index}>{student}</div>
                      ))
                    ) : (
                      <div>No students assigned</div>
                    )}
                  </td>
                  <td>
                    <div>
                      {unassignedStudents.map((student, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={student}
                          checked={(selectedStudents[i] || []).includes(student)}
                          onChange={(event) => handleCheckboxChange(event, i, student)}
                        />
                      ))}
                    </div>
                    <br />
                    <Button
                      variant="success"
                      onClick={() => handleUpdate(i)}
                    >
                      <i className="fa-solid fa-user-plus">&nbsp;&nbsp;</i>
                      Assign students
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

export default MentorDashboard;
