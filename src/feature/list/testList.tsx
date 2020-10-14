import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TableSortLabel, Typography} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import {useStore} from "../../core/stores/stores";
import {useParams} from "react-router";

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

type Order = 'asc' | 'desc';


export default function SimpleTable(props:SimpleTableProps) {

    const [page, setPage] = React.useState<number>(0);
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<string>(props.columns[0].name);

    const [total, setTotal] = React.useState<number>(0);
    const [data, setData] = React.useState<any>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    const {commonsStore} = useStore();

    const classes = useStyles();
    const{title, columns, url} = props;
    const {api} = useStore();
    const { p } = useParams();

    useEffect(() => {
        loadData();
    },[page,rowsPerPage,order,orderBy]);


    const getConfig = () => {
        console.log(rowsPerPage, rowsPerPage * page);
        return {
            limit:rowsPerPage,
            offset:rowsPerPage * page,
            sort_by:orderBy+":"+order
        }
    };

    const loadData = () =>{
        api.getList(url,getConfig()).then((data:any)=>{
            setData(data.builds);
            setTotal(data['@pagination'].count);
        }).catch((e:any)=>{
            commonsStore.newError(e.message)
        })
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const toggleOrder = () => {
        if(order ==='asc') {
            setOrder('desc')
        }else {
            setOrder('asc')
        }
    };

    const setSorting = (property: any) => (event: React.MouseEvent<unknown>) => {
        if(property === orderBy){
            toggleOrder()
        } else {
            setOrder('desc');
            setOrderBy(property)
        }
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
                            <TableCell align="center"
                                       className={classes.headerCell}
                                       sortDirection={orderBy === column.name ? order : false}>
                                <TableSortLabel
                                    active={orderBy === column.name}
                                    direction={orderBy === column.name ? order : 'asc'}
                                    onClick={setSorting(column.name)}
                                >
                                {column.title}
                                </TableSortLabel>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length?
                        data.map((row:any) => (
                                <TableRow key={row.id}>
                                    {columns.map((column)=>
                                        <TableCell align="center">{row[column.name]}</TableCell>
                                    )}
                                </TableRow>
                            ))
                        :
                        <TableRow key={'empty'}>
                                <TableCell colSpan={columns.length} align="center" >No data to show</TableCell>
                        </TableRow>

                    }

                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
}