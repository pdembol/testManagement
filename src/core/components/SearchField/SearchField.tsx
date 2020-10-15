import {IconButton} from "@material-ui/core";
import {Theme} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import OrgTextField from "@material-ui/core/TextField/TextField";
import {Search} from "@material-ui/icons";
import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 5,
            display: "inline-block"
        },
        searchBar: {
            margin: '0 auto',
            width: 300,
        },
        iconButton: {
            padding: 10,
        }
    })
);

export interface SearchFieldProps {
    placeholder?: string,
    executeSearch: (text: string) => void
}

export const SearchField = (props: SearchFieldProps) => {

    const [text, setText] = React.useState<string>("");
    const {placeholder, executeSearch} = props;
    const classes = useStyles();

    const handleKeySearch = (event: any) => {
        if (event.key === "Enter") {
            executeSearch(text);
        }
    };

    const handleChange = (event: any) => {
        setText(event.target.value);
    };

    const handleSearch = () => {
        executeSearch(text);
    };

    return (
        <div className={classes.root}>
            <OrgTextField
                placeholder={placeholder}
                onChange={handleChange}
                onKeyPress={handleKeySearch}
                value={text}
                variant="outlined"
                className={classes.searchBar}
                margin="dense"
                InputProps={{
                    endAdornment: (
                        <IconButton className={classes.iconButton}
                                    aria-label="search"
                                    onClick={handleSearch}>
                            <Search/>
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
};
