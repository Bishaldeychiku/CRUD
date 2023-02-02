import React from 'react'
import { Link } from 'react-router-dom'
import {
    Box, makeStyles, TableContainer, Table, TableBody, TableCell,
    TableHead, TableRow, Paper, IconButton, Tooltip,
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios"
import { useState, useEffect } from 'react';
import Studentform from './Studentform';

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
export default function List() {
    const classes = useStyle()
    const [listdata, setlistdata] = useState([]);
    useEffect(() => {
        getAllStudentsData()
    }, [])

    async function getAllStudentsData() {
        try {
            const listdata = await axios.get("http://localhost:3004/students")
            // console.log(students.data)
            setlistdata(listdata.data)
        } catch (error) {
            console.log("error from list")
        }
    }
    const deletedata = async id => {
        await axios.delete(`http://localhost:3004/students/${id}`)
    }
    <Studentform listset={getAllStudentsData()} />
    return (
        <>
            <Box align="center" p={2} className={classes.stulistcolor} mb={2}>
                <Typography variant='h3'>Student List</Typography>
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
                            <TableCell align="center" className={classes.tableHeadSell}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listdata.map((listdata, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align='center'>{i + 1}</TableCell>
                                        <TableCell align='center'>{listdata.student}</TableCell>
                                        <TableCell align='center'>{listdata.email}</TableCell>
                                        <TableCell align='center'>
                                            <Tooltip title="View">
                                                <IconButton><Link to={`/view/${listdata.id}`}><VisibilityIcon color='primary'></VisibilityIcon></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton><Link to={`/edit/${listdata.id}`}><EditIcon ></EditIcon></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton><Link onClick={() => { deletedata(listdata.id) }}><DeleteIcon color='secondary'></DeleteIcon></Link></IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>

                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}
