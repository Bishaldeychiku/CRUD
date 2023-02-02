import React from 'react';
import { Box, makeStyles, Grid, TextField, Button, } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { green } from '@material-ui/core/colors';
import { useState } from 'react';
import axios from 'axios';

const useStyle = makeStyles({
    addStuColor: {
        background: green[400],
        color: "white"
    }
})
export default function Studentform(props) {
    const classes = useStyle()
    // const [status,setstatus]=useState()
    const [studentData, setstudentData] = useState({
        stuname: "",
        email: ""
    });
    function getInputData(e) {
        setstudentData(
            {
                ...studentData,
                [e.target.name]: e.target.value
            }
        )
        
    }
    async function sentformData(ev) {
        ev.preventDefault()
        try {
            await axios.post(`http://localhost:3004/students`, studentData)
            props.listset()
        }
        catch (error) {
            console.log(error)
        }
    }
   
    
    return (
        <>

            <Box align="center" p={2} className={classes.addStuColor} mb={2}>
                <Typography variant='h3'>Student</Typography>
            </Box>
            <form noValidate>

                <Grid item xs={12} >
                    <TextField autoComplete='stuname' name='student' onChange={e => getInputData(e)}
                        variant="outlined" required fullWidth id='stuname' label='Studet-Name' autoFocus />
                </Grid>

                <Grid item xs={12} >
                    <TextField autoComplete='email' name='email' onChange={e => getInputData(e)}
                        variant="outlined" required fullWidth id='email' label='Email' autoFocus />
                </Grid>

                <Box m={3}>
                    <Button type="submit" variant='contained' color='primary' fullWidth onClick={e => sentformData(e)}>
                        Add Student
                    </Button>
                </Box>
            </form>

        </>
    )
}
