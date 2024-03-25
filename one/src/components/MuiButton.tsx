import { Button, IconButton, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MuiButton = () => {
  return (
    <>
      // NOTE : stack default flex is column
      <Stack spacing={4}>
        <Stack direction="row" spacing={2}>
          {/* variant prop : default = text */}
          <Button>Default</Button>
          <Button variant="text">Text</Button>
          {/* E.g : Primary Button like login, register */}
          <Button variant="contained">Contained</Button>
          {/* E.g : Secondary Button like cancel, go back */}
          <Button variant="outlined">Outlined</Button>

          {/* POINT : Button turned as anchor when we used href */}
          <Button variant="text" href="https://www.google.com" target="_blank">
            Google
          </Button>
        </Stack>

        {/* color prop :  default = primary */}
        <Stack direction="row" spacing={2}>
          <Button color="primary" variant="contained">
            Primary
          </Button>
          <Button color="secondary" variant="contained">
            Secondary
          </Button>
          <Button color="error" variant="contained">
            Error
          </Button>
          <Button color="warning" variant="contained">
            Warning
          </Button>
          <Button color="info" variant="contained">
            Info
          </Button>
          <Button color="success" variant="contained">
            Success
          </Button>
          <Button color="inherit" variant="contained">
            Inherit
          </Button>
        </Stack>

        {/* size prop : default = medium */}
        <Stack display="block" direction="row" spacing={2}>
          <Button variant="contained">Default</Button>
          <Button variant="contained" size="small">
            Small
          </Button>
          <Button variant="contained" size="medium">
            Medium
          </Button>
          <Button variant="contained" size="large">
            Large
          </Button>
        </Stack>

        {/* POINT : Add Icon in button */}
        <Stack direction="row" spacing={2} display="block">
          {/* Icon before text */}
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            disableElevation
            onClick={() => alert("Clicked")}
          >
            Send
          </Button>
          {/* Icon after text */}
          <Button variant="contained" endIcon={<SendIcon />} disableRipple>
            Send
          </Button>
          {/* NOTE : IconButton
            - used when we only want icon in button
        */}
          <IconButton aria-label="send" color="error" size="small">
            <SendIcon />
          </IconButton>
          <IconButton aria-label="send" color="error" size="large">
            <SendIcon />
          </IconButton>
        </Stack>
      </Stack>
      {/* full width button */}
      <Button variant="contained" fullWidth>Full width button</Button>
    </>
  );
};

export default MuiButton;
