import React from 'react'
import { useState, useEffect } from 'react'

function DropdownModuleSearchBox() {
    const [selectedOption, setSelectedOption] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const options = ['SC1001', 'SC1002', 'SC1003', 'SC1004', 'SC1005']; // Replace with your options
  
    // Function to handle input changes and filter options
    const handleInputChange = (e) => {
      const inputValue = e.target.value.toLowerCase();
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(inputValue)
      );
      setFilteredOptions(filtered);
      setSelectedOption('');
    };
  
    // Function to handle option selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setFilteredOptions([]);
    };
  
    return (
      <div className="dropdown-search-box">
        <input
          className='search-box'
          type="text"
          placeholder="Search options..."
          onChange={handleInputChange}
          value={selectedOption}
        />
        {filteredOptions.length > 0 && (
          <ul className="dropdown-options">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default DropdownModuleSearchBox