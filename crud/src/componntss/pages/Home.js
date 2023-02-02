import React from 'react';
import { Box, makeStyles, Grid } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { deepPurple } from '@material-ui/core/colors';
import List from './students/List';
import Studentform from './students/Studentform';


const useStyle = makeStyles({
    headigColor: {
        background: deepPurple[400],
        color: "white"
    }
})


export default function Home() {
    const classes = useStyle()

    return (
        <>
            <Box align="center" className={classes.headigColor} p={2} mb={2}>
                <Typography variant='h3'>React CRUD operation</Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <Studentform />
                </Grid>
                <Grid item md={6} xs={12}>
                    <List />
                </Grid>
            </Grid>
        </>
    )
}
