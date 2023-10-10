import React, { useState, useEffect } from 'react';
import "./ForumPage.css"
import DropdownModuleSearchBox from '../../components/DropdownModuleSearchBox';

// For swapping of modules
function ForumPage() {
    return (
        <div className="test">
          <DropdownModuleSearchBox/>
          <h2 className='temp'>FORUM PAGE - MOD SWAP, BALLOT, POINTS ETC</h2>
        </div>
      );
}

export default ForumPage;
