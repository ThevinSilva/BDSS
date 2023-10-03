import { Button } from "@mui/material";

function Button(props) {
  return (
        <Button variant="contained" color="primary">
          {props.children}
        </Button>
  );
}

export default Button;
