import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import CourseList from '../../components/CourseList';

function TimetablePage() {
    return (
        <div className="container mt-50">
          <div className="container mt-5">
            <div className="row custom-row">
              <div className="col-md-6">
                <SearchBar />
                <CourseList />
                <h1>FORUM PAGE - MOD SWAP, BALLOT, POINTS ETC</h1>
              </div>
            </div>
          </div>
        </div>
        
      );
}

export default TimetablePage;
