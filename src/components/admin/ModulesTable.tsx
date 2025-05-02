import {Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import {
    Link as RouterLink,
} from 'react-router-dom';
import ModulesTableMoreMenu from "./ModulesTableMoreMenu.tsx";
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import {TModule} from "@/services/api/module-api.ts";

interface ModulesTableProps {
    modules: TModule[];
    changeOrder: (id: string, direction: 'up' | 'down') => void,
    disabled: boolean
}

const ModulesTable: React.FC<ModulesTableProps> = ({modules, changeOrder, disabled}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Picture</TableCell>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='center'>Description</TableCell>
                        <TableCell align='center'>Published</TableCell>
                        <TableCell align='center'>Order</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {modules.map((module, index) => (
                        <TableRow
                            key={module.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row"
                                       sx={{'& img': {width: 1, height: 1, objectFit: 'cover'}}}>

                                <Box sx={{width: '250px', height: '130px', display: 'block'}} component={RouterLink}
                                     to={module.id}>
                                    <img src={module.image}/>
                                </Box>

                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {module.name}
                            </TableCell>
                            <TableCell align="left">{module.description}</TableCell>
                            <TableCell align="center">
                                {module.published ?
                                    <Chip color='success' label="Released"/> :
                                    <Chip color='warning' label="Unseen"/>
                                }
                            </TableCell>
                            <TableCell align="center">
                                <Stack spacing={1}>
                                    {index !== 0 &&
                                        <IconButton disabled={disabled} onClick={() => changeOrder(module.id, 'up')}>
                                            <ArrowDropUpIcon/>
                                        </IconButton>}
                                    {index !== modules.length - 1 &&
                                        <IconButton disabled={disabled} onClick={() => changeOrder(module.id, 'down')}>
                                            <ArrowDropDown/>
                                        </IconButton>}
                                </Stack>
                            </TableCell>
                            <TableCell align="left"><ModulesTableMoreMenu module={module}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ModulesTable;