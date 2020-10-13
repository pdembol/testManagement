import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import {useStore} from "../../core/stores/stores";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    title: {
        padding:'10px',
        flex: '1 1 100%',
    },
    headerCell:{
        fontWeight:'bold'
    }
});


export interface ColumnModel {
    name:string;
    title:string;
}


interface SimpleTableProps {
    title:string;
    columns:ColumnModel[];
    url:string;
}

const data:any = [];


export default function SimpleTable(props:SimpleTableProps) {

    const [page, setPage] = React.useState<number>(1);
    const [config, setConfig] = React.useState<any>({});
    const [data, setData] = React.useState<any>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

    const classes = useStyles();
    const length = 10;
    const{title, columns, url} = props;
    const {api} = useStore();

    useEffect(() => {
        loadData();
    },[]);


    const loadData = () =>{
        api.getList(url,config).then((data:any)=>{
            setData(data.builds)
        })
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return <div>
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
            {title}
        </Typography>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column)=>
                            <TableCell align="center" className={classes.headerCell}>{column.title}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row:any) => (
                        <TableRow key={row.id}>
                            {columns.map((column)=>
                                <TableCell align="center">{row[column.name]}</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
}