import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import DropdownModuleSearchBox from "../../components/DropdownModuleSearchBox";
import RadioForm from "../../components/Radioform";
import MuiCheckBox from "../../components/MuiCheckBox";
import MuiTable from "../../components/MuiTable";

// For swapping of modules
function ForumPage() {
    const [ModToSwap, setModToSwap] = useState("");
    const [IndexToSwap, setIndexToSwap] = useState([])
    const [DesiredIndex,setDesiredIndex] = useState([])

    const onRadioChange = (value) => {
        setModToSwap(value);
        console.log("Selected module: ", ModToSwap);
    };

    const onCheckboxChange = (value) => {
        if (IndexToSwap.includes(value)) {
            setIndexToSwap(IndexToSwap.filter((option) => option!=value));
        } else {
            setIndexToSwap([...IndexToSwap, value]);
        }
        console.log("Selected indexes are ", IndexToSwap);
    }

    const exampleStudentModule = {
        "CC0001": ["10101", ["10102", "10103"], "Pending"],
        "MH1810": ["20202", ["20203", "20204"], "Pending"],
        "SP0061": ["30303", ["30301"], "Pending"]
    }

    const exampleRows = [
        {'Course Code': 'CC0001' , 'Current Index': 'MH1810', 'Desired Index':["10102", "10103"]}
    ]

    const headers = ['Course Code','Current Index','Desired Index','Status']
    // const rows = exampleRows
    const getExampleCourse = async () => {
        try{
            const response = await fetch(
            `http://localhost:3001/user/652421361a4e6f2e49c4224a`,
            {
                method: "GET"
            }
            )
            const data = await response.json()
            console.log(data)
            data.modulesCurrentIndex //id,name,index
            data.modulesDesiredIndex //[[id,name,[index,...]],...]
            // desired output format
            // coursecode,current ind,desired index,status
            
            let rows = []
            data.modulesDesiredIndex.forEach(arr => {
                let row = {}
                row['Course Code'] = arr[1]
                row['Current Index'] = data.modulesCurrentIndex.find(array=>array[1]==arr[1])[2]
                row['Desired Index'] = arr[2]
                row['Status'] = 'Pending'
                rows.push(row)
            })
            
            setDesiredIndex(rows)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getExampleCourse()
    },[])
    // let rows = getExampleCourse()
    // console.log(headers)

    return ( //TODO: Change into table format, where each entry is a new row element
        <div className="page"> 
        <MuiTable
            headers = {headers}
            rows = {DesiredIndex}
        />
            {/* <section className="mod_information_section">
                <div className="mod_information">
                    <div className="course_code">
                        <h1> Course code </h1>
                        <h1> CC0001 </h1>
                    </div>
                    <div className="current_index">
                        <h1> Current Index </h1>
                        <h1> {exampleStudentModule.CC0001[0]} </h1>
                    </div>
                    <div className="desired_index">
                        <h1> Desired Index </h1>
                        <h1> {exampleStudentModule.CC0001[1]} </h1>
                    </div>
                    <div className="status">
                        <h1> Status </h1>
                        <h1> {exampleStudentModule.CC0001[2]} </h1>
                    </div>
                </div>
            </section> */}
            <section className="mod_swapping_section">
                <RadioForm
                    options={["SC1001", "SC1002", "SC1003", "AD1102", "AB1601"]} // TOOD: link to API call to current registered modules
                    onRadioChange={onRadioChange}
                    className="radioform_mods"
                />

                <MuiCheckBox
                    options={["10101", "10102", "10103"]} // TODO: link to API call to available indexes to module swap
                    onCheckboxChange={onCheckboxChange}
                    className="checkbox_index"
                />
            </section>
        </div>
    );
}

export default ForumPage;
