import React from 'react'
import './BallotPage.css'
import DropdownModuleSearchBox from '../../components/DropdownModuleSearchBox'

function BallotPage() {
  const exampleStudent = {
      "name": "Xavier", "year": "4", "semester":"2", "credit_score":"80"
  } // TODO: link to API call to get information of student
  return (
    <div className='main-container'>
      <section className="student_info">
                <div className="student">
                    <div className="student_name">
                        <h1> Name: {exampleStudent.name} </h1>
                    </div>
                    <div className="year_of_study">
                        <h1> Current year of study: {exampleStudent.year} </h1>
                    </div>
                    <div className="semester">
                        <h1> Semester: {exampleStudent.semester} </h1>
                    </div>
                    <div className="credit_status">
                        <h1> Available credits: {exampleStudent.credit_score} </h1>
                    </div>
                </div>
            </section>
      <DropdownModuleSearchBox />
    </div>
  )
}

export default BallotPage