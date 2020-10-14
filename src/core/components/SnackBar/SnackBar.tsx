import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {useStore} from "../../stores/stores";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {observer} from "mobx-react-lite";
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const CustomSnackbar = observer(() => {
    const classes = useStyles();
    const {commonsStore} = useStore();
    const open = commonsStore.success !== undefined || commonsStore.error !== undefined;


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
            console.log(open);
        commonsStore.closeSnacks();
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={commonsStore.success? "success" : "error"}>
                    {commonsStore.success || commonsStore.error}
                </Alert>
            </Snackbar>
        </div>
    );
});