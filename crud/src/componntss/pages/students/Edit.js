import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Grid, TextField, Button, } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { green } from '@material-ui/core/colors';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
const useStyle = makeStyles({
    addStuColor: {
        background: green[400],
        color: "white"
    }
})
export default function Edit() {
    const classes = useStyle()
    const { id } = useParams()
    const navigate=useNavigate()
    const [editdata, seteditdata] = useState([{
        student:"",
        email:""
    }])
    useEffect(() => {
        async function getsigleeditdata() {
            try {
                const editdata = await axios.get(`http://localhost:3004/students/${id}`)
               
                seteditdata(editdata.data)
    
            }
            catch (error) {
                console.log(error)
            }
    
        }
        getsigleeditdata()

    },[id])
  
    async function sentformData(e) {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:3004/students/${id}`, editdata)
            navigate("/")
        }
        catch (error) {
            console.log(error)
        }
    }
    sentformData()
    function getInputData(e) {
        seteditdata(
            {
                ...editdata,
                [e.target.name]: e.target.value
            }
        )
   
    }

    function handlebackclick(){
        navigate("/")
    }
    return (

        <>

            <Box align="center" p={2} className={classes.addStuColor} mb={2}>
                <Typography variant='h3'>Edit Student</Typography>
            </Box>

            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField autoComplete='stuname' name='student'
                            variant="outlined" required fullWidth id='student' label='Name' autoFocus value={editdata.student} onChange={e => getInputData(e)}/> 
                    </Grid>

                    <Grid item xs={12} >
                        <TextField autoComplete='email' name='email'
                            variant="outlined" required fullWidth id='email' label='Email' autoFocus value={editdata.email} onChange={e => getInputData(e)} />
                    </Grid>
                </Grid >
                <Box m={3} spacing={2} whiteSpace={2}>
                    <Button type="submit" variant='contained' color='primary' fullWidth onClick={e => sentformData(e)}>
                       Update
                    </Button>
                </Box>
            </form>

            <Box m={3}  >
                <Button type="submit" onClick={handlebackclick} variant='contained' color='primary' fullWidth>
                    Back to Home
                </Button>
            </Box>

        </>
    )
}
