import {useState} from 'react'
import {Link} from "react-router-dom"
import {Box, Typography, useTheme} from "@mui/material"
import FlexBetween from '@/components/FlexBetween'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Navbar = () => {
    const {palette} = useTheme();
    // State to determine which page we are on, so that we can highlight the text
    const [selected, setSelected] = useState("dashboard");
    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            <FlexBetween gap="0.75rem">
                <AttachMoneyIcon sx={{fontSize:"28px"}}/>
                <Typography variant='h4' fontSize="16px">Syft App</Typography>
            </FlexBetween>

            <FlexBetween gap="2rem">
                <Box sx={{"&:hover":{color:palette.primary[100]}}}>
                    <Link to='/' onClick={()=>setSelected("dashboard")}
                    style={{
                        color: selected === "dashboard" ? "inherit":palette.grey[700],
                        textDecoration:"inherit"
                    }}
                    >dashboard</Link>
                </Box>
                
                <Box sx={{"&:hover":{color:palette.primary[100]}}}>
                    <Link to='/predictions' onClick={()=>setSelected("predictions")}
                    style={{
                        color: selected === "predictions" ? "inherit":palette.grey[700],
                        textDecoration:"inherit"
                    }}
                    >predictions</Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar