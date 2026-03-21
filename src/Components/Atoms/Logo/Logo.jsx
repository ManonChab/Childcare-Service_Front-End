import React from 'react'
import {Box} from "@mui/material";
import { NavLink } from 'react-router';

const Logo = () => {
    return (
        <NavLink to="/">
            <Box
                component="img"
                sx={{
                    height: 115,
                    width: 175,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    margin: 0
                }}
                alt="EB Logo"
                src="../public/asset/EB_logo.png"
                />
        </NavLink>
    )
}

export default Logo