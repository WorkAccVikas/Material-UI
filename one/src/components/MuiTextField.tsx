import { InputAdornment, Stack, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MuiTextField = () => {
  return (
    <Stack spacing={4}>
      {/* variant : default = outlined */}
      <Stack direction="row" spacing={2}>
        <TextField />
        <TextField label="name" />
        <TextField label="name" variant="outlined" />
        <TextField label="name" variant="filled" />
        <TextField label="name" variant="standard" />
      </Stack>

      {/* size : default = medium */}
      <Stack direction="row" spacing={2}>
        <TextField label="Small secondary" color="secondary" />
        <TextField label="Small secondary" size="medium" color="secondary" />
        <TextField label="Small secondary" size="small" color="secondary" />
      </Stack>

      <Stack direction="row" spacing={2}>
        {/* required : default = false */}
        <TextField label="Required Input" required />
        {/* helperText */}

        <TextField
          label="Helper Text Input"
          helperText="Don't share you password with anyone"
        />

        {/* type = password */}
        <TextField label="password" type="password" />

        {/* disabled */}
        <TextField label="username" disabled />

        {/* read only */}
        <TextField label="Read Only" InputProps={{ readOnly: true }} />
      </Stack>

      <Stack direction="row" spacing={2}>
        {/* Prefix */}
        <TextField
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />

        {/* Suffix */}
        <TextField
          label="Weight"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
        <TextField
          label="password"
          type="password"
          InputProps={{
            endAdornment: <VisibilityIcon />,
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        {/* autoFocus : default = false */}
        <TextField label="username" autoFocus />

        {/* classes : takes object */}
        <TextField
          label="username1"
          classes={{
            root: "custom-class", // You
          }}
        />

        {/* defaultValue */}
        <TextField label="username2" defaultValue={"ram"} />

        {/* InputLabelProps */}
        <TextField
          label="username3"
          InputLabelProps={{
            shrink: true,
            style: { color: "orange" }, // You can add custom styles here
          }}
        />

        {/* inputProps : to pass additional props directly to the input element rendered by the TextField */}
        <TextField
          label="username4"
          inputProps={{
            maxLength: 5,
            autoFocus: true,
          }}
        />
      </Stack>

      {/* margin : default = none */}
      <div style={{ background: "pink" }}>
        <span>Hello</span>
        <TextField label="Standard Margin" />
        <TextField label="None Margin" margin="none" />
        <TextField label="Normal Margin" margin="normal" />
        <TextField label="Dense Margin" margin="dense" />
      </div>

      <div style={{ background: "orange" }}>
        <span>Hello</span>
        <TextField label="Standard Margin" margin="normal" />
      </div>

      {/* multiline : default = false */}
      {/* DESC : rows, minRows, maxRows */}
      <div>
        {/* rows : Number of rows to display */}
        <TextField label="multiline1" multiline rows={4} />
        <TextField label="multiline2" multiline minRows={2} />
        <TextField label="multiline3" multiline maxRows={4} />
        <TextField label="multiline4" multiline />
        <TextField
          label="multiline5"
          multiline
          rows={4}
          minRows={2}
          maxRows={6}
        />
        <TextField label="multiline6" multiline minRows={2} maxRows={6} />
      </div>

      {/* placeholder */}
      <Stack direction="row" spacing={2}>
        <TextField placeholder="Enter your name" label="Name" />
        <TextField placeholder="Enter your city" />
      </Stack>
    </Stack>
  );
};

export default MuiTextField;
