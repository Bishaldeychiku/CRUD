import {
    Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell,
    TableHead, TableRow, Paper, Button
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyle = makeStyles({
    stulistcolor: {
        background: orange[400],
        color: "white"
    },
    tableHeadSell: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16
    },

})
export default function View() {
    const classes = useStyle()
    const { id } = useParams()
    const navigate = useNavigate()
    const [singleview, setsingleview] = useState([])
    useEffect(() => {
        async function getsiglesstudentdata() {
            try {
                const singleview = await axios.get(`http://localhost:3004/students/${id}`)

                setsingleview(singleview.data)

            }
            catch (error) {
                console.log(error)
            }

        }
        getsiglesstudentdata()
    }, [id])

    function handlebackclick() {
        navigate('/')
    }
    return (
        <>
            <Box align="center" p={2} className={classes.stulistcolor} mb={2}>
                <Typography variant='h4'>Student Details</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell align="center" className={classes.tableHeadSell}>
                                No
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeadSell}>
                                Name
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeadSell}>
                                Email
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center'>{singleview.id}</TableCell>
                            <TableCell align='center'>{singleview.student}</TableCell>
                            <TableCell align='center'>{singleview.email}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={3} align='center'>
                <Button variant='contained' color='primary' onClick={handlebackclick}>
                    Back to Home
                </Button>
            </Box>
        </>
    )
}
