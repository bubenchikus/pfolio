import React from 'react';
import {Link} from 'react-router-dom';

import logo from './../../uiPictures/logo-web.svg';

import styles from './SideBar.module.scss';


import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


export const SideBar = () => {

    const [currentPage, setCurrentPage] = React.useState();

    let menuItemStyle = {
        border: "solid rgb(80,80,80) 2px",
        borderTop: "none",
        boxSizing: "content-box",
        backgroundColor : "rgb(200,200,200)"
    };

    let menuItemStylePressed = {
        border: "solid rgb(80,80,80) 2px",
        borderTop: "none",
        boxSizing: "content-box",
        backgroundColor : "blue"
    };

    // var menuItemStylePressed = structuredClone(menuItemStyle);
    // menuItemStylePressed.backgroundColor = "blue";

    const capitalize = (s) => { 
        var replaced = s.replace(/(-.)/g, x=> ' ' + x[1]);
        return replaced.charAt(0).toUpperCase() + replaced.slice(1);
    }

    function pressButton(id){document.getElementById(id)?.setAttribute("class", styles.buttonPressed)}

    function unpressButton(id){document.getElementById(id)?.setAttribute("class", styles.button)}

    return (
    <Sidebar style={{ height: "100vh", width: "400px", backgroundColor : "rgb(180,180,180)", borderTop: "solid black 2px"}}>
        <Menu>
            <MenuItem style={menuItemStyle}>
            <div className={styles.logoBox}>
                <img className={styles.imageLogo} src={logo} alt="Not found" />
                <div className={styles.textLogo}>Admin panel</div>
            </div>
            </MenuItem>
            {["edit-images", "edit-series-descriptions", "edit-journal", "edit-pages-descriptions"]
            .map((page)=> {return (
                <div id={page} className={styles.button} onClick={() => {pressButton(page); unpressButton(currentPage); setCurrentPage(page)}}>
                <MenuItem>
                    <Link to={`/${page}`}>
                        <div className={styles.sideBarLink}>{capitalize(page)}</div>
                    </Link>
                </MenuItem>
                </div>)})}
        </Menu>
        </Sidebar>
    );
};
