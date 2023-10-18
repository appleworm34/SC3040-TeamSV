import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import DropdownModuleSearchBox from "../../components/DropdownModuleSearchBox";
import RadioForm from "../../components/Radioform";
import MuiCheckBox from "../../components/MuiCheckBox";
import MuiTable from "../../components/MuiTable";
import BasicButtons from "../../components/MuiButton";

// For swapping of modules
function ForumPage() {
    const [ModToSwap, setModToSwap] = useState("");
    const [IndexToSwap, setIndexToSwap] = useState([])
    const [DesiredIndex,setDesiredIndex] = useState([])
    const [ModsTaken, setModTaken] = useState([])
    const [IndexAvailable,setIndexAvail] = useState([])
    const [AddVisibility,setAddVisibility]=useState(false)

    const onRadioChange = async (value) => {
        setModToSwap(value);
        setAddVisibility(false)
        console.log("Selected module: ", ModToSwap);
        let courseId = await getCourseId(value)
        console.log(courseId)
        let availIndex = await getAvailIndex(courseId)
        console.log(availIndex)
        setIndexAvail(availIndex)
    };
    const getCourseId = async (courseCode) =>{
        const response = await fetch(
        `http://localhost:3001/user/652421361a4e6f2e49c4224a`,
        {
            method: "GET"
        }
        )
        const data = await response.json()
        console.log(data)
        let courseId = data.modulesCurrentIndex.find(array=>array[1]==courseCode)
        console.log(courseId)
        courseId = courseId[0]
        return courseId
    }
    const getAvailIndex = async (courseId) =>{
        const indexes = await fetch(
            `http://localhost:3001/course/index/${courseId}`,
            {
                method: "GET"
            }
        )
        let temp = await indexes.json()
        return temp['indexes']
    }
    const onCheckboxChange = (value) => {
        if (IndexToSwap.includes(value)) {
            if (IndexToSwap.length==1){
                setAddVisibility(false)
            }
            setIndexToSwap(IndexToSwap.filter((option) => option!=value));
        } else {
            setIndexToSwap([...IndexToSwap, value]);
            setAddVisibility(true)
        }
        
        console.log("Selected indexes are ", IndexToSwap);
        
    }
    const clearSelection = () =>{
        setModToSwap("")
        setIndexToSwap([])
    }
    const addDesiredIndexHandler = async () =>{
        // call backend api to chcek for match and perform swap
        try{
            const url = 'http://localhost:3001/swap/add'; // Replace with your API endpoint
          
            const data = {
                userId:"653038f9f57af2505a5f8614",
                courseCode:"SC1010",
                currentIndex:"105",
                desiredIndex:["106","107"]
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', // Specify the content type as JSON
                  // Add any other headers if needed
                },
                body: JSON.stringify(data), // Convert data to a JSON string
              };
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const responseData = await response.json(); // Parse the response as JSON
              console.log('Response data:', responseData);
              if (responseData.swap){
                    alert("Dear Student, MOONS has found a matching swap and performed the swap on your behalf!")
                }
                else{
                    alert("Dear Student, MOONS did not find a matching swap and will continue to look out for them.")
                }
              // Handle the response data as needed
            } catch (error) {
              console.error('Fetch error:', error);
              // Handle any errors
            } 
        // alert if matched
        // let match = true
        // if (match){
        //     alert("Dear Student, MOONS has found a matching swap and performed the swap on your behalf!")
        // }
        // else{
        //     alert("Dear Student, MOONS did not find a matching swap and will continue to look out for them.")
        // }
        // clearSelection()
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

            let moduleTaken = await Promise.all(data.modulesTaken.map(async (courseId)=>{
                const courseResponse = await fetch(
                    `http://localhost:3001/course/${courseId}`,
                    {
                        method: "GET"
                    }
                    )
                let temp = await courseResponse.json()
                console.log(temp)
                return temp.courseCode
            }))
            setModTaken(moduleTaken)

            // let modulesTaken = await data.modulesTaken.map(async (courseId)=>{
            //     const courseResponse = await fetch(
            //         `http://localhost:3001/course/${courseId}`,
            //         {
            //             method: "GET"
            //         }
            //     )
            //     const courseData = await courseResponse.json()
            //     setModTaken([...ModsTaken,courseData.courseCode])
            //     const indexes = await fetch(
            //         `http://localhost:3001/course/index/${courseId}`,
            //         {
            //             method: "GET"
            //         }
            //     )
            //     let temp = await indexes.json()
            //     // console.log(temp['indexes'])
            //     setIndexAvail(temp['indexes'])
            // })

            
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
            <section className="mod_swapping_section">
                <RadioForm
                    options={ModsTaken?ModsTaken:["abc"]} // TOOD: link to API call to current registered modules
                    onRadioChange={onRadioChange}
                    className="radioform_mods"
                />

                <MuiCheckBox
                    options={IndexAvailable?IndexAvailable:["10101", "10102", "10103"]} // TODO: link to API call to available indexes to module swap
                    onCheckboxChange={onCheckboxChange}
                    className="checkbox_index"
                />
                <div>
                <BasicButtons
                    choice="contained"
                    text="add"
                    visibility={AddVisibility}
                    func={addDesiredIndexHandler}
                />
                </div>
            </section>
        </div>
    );
}

export default ForumPage;
