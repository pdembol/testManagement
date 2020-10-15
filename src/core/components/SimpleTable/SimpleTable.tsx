import React, {useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CircularProgress, TableSortLabel, Typography} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import {useStore} from "../../stores/stores";
import {useHistory, useLocation} from "react-router";
import CommonsStore from "../../stores/CommonsStore";
import {stringToColour} from "../../helpers/stringToColour";
import {theme} from "../../config/theme";
import {SearchField} from "../SearchField/SearchField";

export const useUniversalStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    title: {
        padding: '10px',
        flex: '1 1 100%',
        color: theme.palette.primary.dark,
        float: 'left'
    },
    headerCell: {
        fontWeight: 'bold'
    },
    carousel: {
        height: '830px',
    }
});

export interface ColumnModel {
    name: string;
    title: string;
}

interface SimpleTableProps {
    title: string;
    columns: ColumnModel[];
    resourceName: string;
    filterField?: string;
}

type Order = 'asc' | 'desc';


const getInitParams = (urlParams: URLSearchParams, commonsStore: CommonsStore) => {
    let page = 0;
    Array.from(urlParams).map((param) => {
        if (param[0] === "page" && !isNaN(+param[1]) && +param[1] > -1) {
            page = +param[1]
        } else {
            commonsStore.newError(`Page should be number > 0`)
        }
    });
    return page;
};


export default function SimpleTable(props: SimpleTableProps) {

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
    const [searchText, setSearchText] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<string>(props.columns[0].name);
    const [total, setTotal] = React.useState<number>(0);
    const [data, setData] = React.useState<any>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

    const classes = useUniversalStyles();
    const {title, columns, resourceName} = props;
    const {api} = useStore();

    useEffect(() => {
        loadData();
    }, [page, rowsPerPage, order, orderBy, searchText]);


    useEffect(() => {
        updateUrl();
    }, [page]);


    const updateUrl = () => {
        if (urlParams.get("page") === "0") {
            urlParams.delete("page")
        }
        history.push({
            pathname: location.pathname,
            search: `?${urlParams}`
        })
    };

    const getConfig = () => {
        const searchConfig: any = {
            limit: rowsPerPage,
            offset: rowsPerPage * page,
            sort_by: orderBy + ":" + order
        };
        if (props.filterField && searchText!=="") {
            searchConfig[props.filterField] = searchText
        }
        return searchConfig;
    };

    const loadData = () => {
        setLoading(true);
        api.getList(resourceName, getConfig()).then((data: any) => {
            setLoading(false);
            setData(data[resourceName]);
            setTotal(data['@pagination'].count);
        }).catch((e: any) => {
            commonsStore.newError(e.message)
        })
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        urlParams.set("page", newPage.toString());
        setPage(newPage);
    };

    const toggleOrder = () => {
        if (order === 'asc') {
            setOrder('desc')
        } else {
            setOrder('asc')
        }
    };

    const setSorting = (property: any) => (event: React.MouseEvent<unknown>) => {
        if (property === orderBy) {
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

    const handleSearch = (text: string) => {
        setSearchText(text)
    };

    const pickColor = (name: string, idx: number) => {
        if (idx % 2 === 0 && name) {
            return stringToColour(name);
        } else {
            return "rgb(255,255,255)"
        }
    };

    return <div>
        <Typography className={classes.title} variant="h5" id="tableTitle">
            {title}
        </Typography>

        {props.filterField ?
            <SearchField
                placeholder={"Search by " + props.filterField}
                executeSearch={handleSearch}/>
            :
            null
        }

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow key={"headerRow"}>
                        {columns.map((column, idx) =>
                            <TableCell align="center"
                                       key={"headCell" + idx}
                                       className={classes.headerCell}
                                       sortDirection={orderBy === column.name ? order : false}>
                                <TableSortLabel
                                    active={orderBy === column.name}
                                    key={"sortLabel" + idx}
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
                    {data.length ?
                        data.map((row: any, idx: number) => (
                            <TableRow key={"genericRow" + idx}
                                      style={{backgroundColor: pickColor(row.number || row.name, idx)}}>
                                {columns.map((column, idx2) =>
                                    <TableCell align="center"
                                               key={"genericCell" + idx + "at" + idx2}>{row[column.name] + ""}</TableCell>
                                )}
                            </TableRow>
                        ))
                        :
                        <TableRow key={'empty'}>
                            <TableCell colSpan={columns.length} align="center" key={"emptyCell"}>
                                {
                                    loading ? <CircularProgress/> : <>No data to show</>
                                }

                            </TableCell>
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