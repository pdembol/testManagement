import React, {useEffect, useMemo} from 'react';
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
import {useHistory, useLocation} from "react-router";
import CommonsStore from "../../core/stores/CommonsStore";
import {stringToColour} from "./stringToColour";
import {theme} from "../../core/config/theme";

export const useUniversalStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    title: {
        padding:'10px',
        flex: '1 1 100%',
        color:theme.palette.primary.dark
    },
    headerCell:{
        fontWeight:'bold'
    },
    carousel:{
        height:'830px',
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


const getInitParams = (urlParams: URLSearchParams, commonsStore:CommonsStore) => {
    let page = 0;
    Array.from(urlParams).map((param)=>{
        if(param[0]==="page" && !isNaN(+param[1]) && +param[1]>-1){
            page = +param[1]
        } else {
            commonsStore.newError(`Page should be number > 0` )
        }
    });

    return page ;
};


export default function SimpleTable(props:SimpleTableProps) {

    const location = useLocation();
    const history = useHistory();
    const {commonsStore} = useStore();

    const urlParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);

    const queryParams = useMemo(() => {
        return getInitParams(urlParams, commonsStore);
    }, [urlParams]);

    const [page, setPage] = React.useState<number>(+queryParams);
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<string>(props.columns[0].name);
    const [total, setTotal] = React.useState<number>(0);
    const [data, setData] = React.useState<any>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

    const classes = useUniversalStyles();
    const{title, columns, url} = props;
    const {api} = useStore();

    useEffect(() => {
        loadData();
    },[page,rowsPerPage,order,orderBy]);


    useEffect(() => {
        updateUrl();
    },[page]);


    const updateUrl = ()=>{
        if(urlParams.get("page")==="0"){
            urlParams.delete("page")
        }
        history.push({pathname:location.pathname,
                        search:`?${urlParams}`})
    };

    const getConfig = () => {
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
        urlParams.set("page", newPage.toString());
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

        const pickColor = (name:string, idx:number) => {
            if(idx%2 === 0) {
                return stringToColour(name);
            } else {
                return "rgb(255,255,255)"
            }
    };

    return <div>
        <Typography className={classes.title} variant="h5" id="tableTitle">
            {title}
        </Typography>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow key={"headerRow"}>
                        {columns.map((column)=>
                            <TableCell align="center"
                                       key={column.name}
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
                        data.map((row:any,idx:number) => (
                                <TableRow key={row.id} style={{backgroundColor:pickColor(row.number, idx)}}>
                                    {columns.map((column)=>
                                        <TableCell align="center" key={row.id + column.name}>{row[column.name]}</TableCell>
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