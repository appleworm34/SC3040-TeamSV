import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Button, Divider } from '@mui/material';

function PlanSelector({ plans, savePlan, deletePlan, handleSelectPlan, selectedPlanIndex }) {
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [isPlanSelected, setIsPlanSelected] = useState(false);

  const planOptions = plans.map((plan, index) => (
    <MenuItem key={index} value={index}>
      Plan {index + 1}
    </MenuItem>
  ));
  
  useEffect(() => {
    selectedPlanIndex !== -1 ? setIsPlanSelected(true) : setIsPlanSelected(false);
  }, [selectedPlanIndex])

  return (
    <div className='flex-col'>
      <Button onClick={() => setShowPlanSelector(!showPlanSelector)}>Load Plan</Button>
      {showPlanSelector ? (
        <div>
        <Select value={selectedPlanIndex} onChange={(event) => handleSelectPlan(event.target.value)}>
          <MenuItem value={-1}>Select a Plan</MenuItem>
          {planOptions}
        </Select>
        {
          isPlanSelected ? (
            <div>
              <Button onClick={() => savePlan(selectedPlanIndex)}>Save Plan</Button>
              <Button onClick={() => deletePlan(selectedPlanIndex)}>Delete Plan</Button>
            </div>
          ) : null
        } 
      </div>) : null
      }
      <Divider />
    </div>
  );
}

export default PlanSelector;
