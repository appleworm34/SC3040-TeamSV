// import React from 'react'
import { AppBar, Tab, Tabs, Toolbar, useMediaQuery, Typography, IconButton } from "@mui/material"
import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import MuiDrawer from './MuiDrawer';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/index";

function Navbar() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [name, setName] = useState("")
    const linksArr = isLoggedIn ? ["logout", "home", "forum"] : ["login", "home", "forum"]
    const [value, setValue] = useState()
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  
    useEffect(() => {
        if(user && user !== null && token !== null) {
            setIsLoggedIn(true)
            if(user.name)
                setName(`${user.name}`)    
        } else {
            setIsLoggedIn(false)
        }
    }, [user])

    return (
        
        <AppBar component="nav" sx={{bgcolor: "white"}}>
            <Toolbar>
                <IconButton style={{ backgroundColor: 'transparent' }} onClick={() => {
                        navigate("/")
                    }}>
                <img src={"https://www.ntu.edu.sg/images/default-source/corporate/ntu_logo.png?sfvrsn=b5dd1d82_5"} alt='Logo' width="150"/>
                </IconButton>
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => {
                        navigate("/")
                        
                    }}
                    sx={{
                        "&:hover": {
                        cursor: "pointer",
                        },
                    }}
                    >
                    {/* can insert title on top left of page here if needed, currently ntu logo */}
                </Typography>

                {/* DESKTOP NAV n Mobile NAV*/}
                {isNonMobileScreens ? (
                <Tabs TabIndicatorProps={{ style: { backgroundColor: "white" } }} value={value} onChange={(e, val) => setValue(val)} sx={{ ml: "auto", textDecoration: "none" }}>
                    {isLoggedIn ? (
                    <>
                        <Tab
                        key="welcome"
                        label={`Welcome, ${name}`}
                        sx={{
                            textDecoration: "none",
                            ":hover": {
                            textDecoration: "underline",
                            textUnderlineOffset: "18px"
                            },
                            color: "#007bff"
                        }}
                        />
                        <Tab
                        key="logout"
                        onClick={() => {
                            dispatch(setLogout());
                            setValue(1);
                        }}
                        sx={{
                            textDecoration: "none",
                            ":hover": {
                            textDecoration: "underline",
                            textUnderlineOffset: "18px"
                            },
                            color: "black"
                        }}
                        label="Logout"
                        />
                        <Tab
                        key="index"
                        LinkComponent={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            ":hover": {
                            textDecoration: "underline",
                            textUnderlineOffset: "18px"
                            },
                            color: "black"
                        }}
                        label="Home"
                        />
                        <Tab
                        key="forum"
                        LinkComponent={Link}
                        to="/forum"
                        sx={{
                            textDecoration: "none",
                            ":hover": {
                            textDecoration: "underline",
                            textUnderlineOffset: "18px"
                            },
                            color: "black" 
                        }}
                        label="Forum"
                        />
                    </>
                    ) : (
                    linksArr.map((link) => (
                        <Tab
                        key={link}
                        LinkComponent={Link}
                        to={`${link === "home" ? "/" : link}`}
                        sx={{
                            textDecoration: "none",
                            ":hover": {
                            textDecoration: "underline",
                            textUnderlineOffset: "18px"
                            },
                            color: "#black"
                        }}
                        label={link === "login" ? "Login" : link}
                        />
                    ))
                    )}
                </Tabs>
                ) : (
                <MuiDrawer />
                )} 
            </Toolbar>
        </AppBar>
    )
}

export default Navbar