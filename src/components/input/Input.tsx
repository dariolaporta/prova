import React from "react";
import TextField from "@material-ui/core/TextField";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

interface Props {
  placeholder: string;
  label: string;
  id?: string;
  onFocusEvent?: () => void;
  getOutputValue?: (text: any) => void;
  error?: boolean;
}

const Input = (props: Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<string>("");
  const { placeholder, label, id, error } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.getOutputValue && props.getOutputValue(event.target.value);
  };

  const onFocus = () => {
    props.onFocusEvent && props.onFocusEvent();
  };

  return (
    <TextField
      error={error}
      value={value}
      className={classes.root}
      id={id}
      label={label}
      placeholder={placeholder}
      multiline
      onFocus={onFocus}
      onChange={onChange}
    />
  );
};

export default Input;
