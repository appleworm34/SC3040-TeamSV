import React, { useState, useEffect } from "react";
import "./ForumPage.css";
import RadioForm from "../../components/Radioform";
import MuiCheckBox from "../../components/MuiCheckBox";
import MuiTable from "../../components/MuiTable";
import BasicButtons from "../../components/MuiButton";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import { useNavigate } from "react-router-dom";

// For swapping of modules
function ForumPage() {
    const [ModToSwap, setModToSwap] = useState("");
    const [IndexToSwap, setIndexToSwap] = useState([])
    const [DesiredIndex,setDesiredIndex] = useState([])
    const [ModsAssigned, setModAssigned] = useState([])
    const [IndexAvailable,setIndexAvail] = useState([])
    const [AddVisibility,setAddVisibility]=useState(false)
    let user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token) || "";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getModsAssigned = () =>{
        const courseCodes =  user.modulesCurrentIndex.map(course => course.courseCode)
        // const moduleAssignedList = user.modulesAssigned
        // const courseCodes = moduleAssignedList.map(course => course.courseCode);
        // console.log(user)    
        return courseCodes
    }

    const getRelevantSwaps = async (userId) => {
        // check swap table
        const swapList = await fetch(
            `http://localhost:3001/swap/`,
            {
                method: "GET"
            }
        )
        const data = await swapList.json()
        // iterate over all swaps and filter those with userId
        const filteredSwapList = data.filter(swap => swap.userId==userId)
        return filteredSwapList
    }

    // on load do these
    const setUp = async ()=>{
        
        const user_id = user._id;
        // get courseTaken by user
        const modsAssigned = getModsAssigned()
        setModAssigned(modsAssigned)

        let rows=[]
        const relevantSwapList = await getRelevantSwaps(user_id)
        relevantSwapList.forEach(swap => {
            let row = {}
            row['Course Code'] = swap.courseCode
            row['Current Index'] = swap.currentIndex
            row['Desired Index'] = swap.desiredIndex
            row['Status'] = 'Pending'
            rows.push(row)
        })
        console.log(relevantSwapList)
        setDesiredIndex(rows)
        // user = await fetch(
        //     `http://localhost:3001/user/${user._id}`,
        //     {
        //         method: "GET"
        //     }
        //     )
        // user = await user.json()
        // console.log(user)
    }

    useEffect(()=>{
        setUp()
        console.log("in useeffect")
    },[user])
    
    // Update the user state when opening forum page
    useEffect(() => {
        const getUser = async () => {
          const response = await fetch(
            `http://localhost:3001/user/${user._id}`,
            {
              method: 'GET',
            }
          );
          const data = await response.json();
    
          dispatch(
            setLogin({
              user: data,
              token: token,
            })
          );
        };
    
        getUser();
      }, []);

    const onRadioChange = async (value) => {
        setModToSwap(value);
        setAddVisibility(false)
        console.log("Selected module: ", ModToSwap);
        let courseId = await getCourseId(value)
        console.log(courseId)
        let availIndex = await getAvailIndex(courseId)
        console.log(availIndex)
        const user_id = user._id
        user = await fetch(
            `http://localhost:3001/user/${user_id}`,
            {
                method: "GET"
            }
            )
        user = await user.json()
        console.log(user)
        const mod = user.modulesCurrentIndex.filter(module=>module.courseCode==value)
        // console.log(mod[0].index)
        if (mod){
            availIndex = availIndex.filter(index=>index!==mod[0].index)
        }
        setIndexAvail(availIndex)
    };
    const getCourseId = async (courseCode) =>{
        const user_id = user._id;
        const courseList = await fetch(
            `http://localhost:3001/course/`,
            {
                method: "GET"
            }
            )
            const data = await courseList.json()
            let courseId =''
            data.map(course=>{
                console.log(course)
                if (course.courseCode==courseCode){
                    courseId = course._id
                }
            })
        console.log(courseId)
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
    
    const addDesiredIndexHandler = async () =>{
        // call backend api to chcek for match and perform swap
        try{
            const url = 'http://localhost:3001/swap/add'; // Replace with your API endpoint
            const user_id = user._id;
            const data = {
                userId:user_id,
                courseCode:ModToSwap,
                currentIndex:user.modulesCurrentIndex.filter(module=>module.courseCode===ModToSwap)[0].index,
                desiredIndex:IndexToSwap
            }
            console.log(data)
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', // Specify the content type as JSON
                  // Add any other headers if needed
                },
                body: JSON.stringify(data), // Convert data to a JSON string
              };
            console.log(data)
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const responseData = await response.json(); // Parse the response as JSON
              console.log('Response data:', responseData);
              if (responseData.swap){
                    alert("Dear Student, MOONS has found a matching swap and performed the swap on your behalf!")
                    navigate("/");
                }
                else{
                    alert("Dear Student, MOONS did not find a matching swap and will continue to look out for them.")
                    navigate("/");
                }
                await setUp()
              // Handle the response data as needed
            } catch (error) {
              console.error('Fetch error:', error);
              // Handle any errors
            } 
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

    return ( //TODO: Change into table format, where each entry is a new row element
        <div className="page"> 
        <MuiTable
            headers = {headers}
            rows = {DesiredIndex}
        />
            <section className="mod_swapping_section">
                <RadioForm
                    options={ModsAssigned?ModsAssigned:["abc"]} // TOOD: link to API call to current registered modules
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
