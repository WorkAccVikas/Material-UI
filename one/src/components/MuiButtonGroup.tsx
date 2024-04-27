import { Button, ButtonGroup, Stack } from "@mui/material";

const MuiButtonGroup = () => {
  return (
    <>
      <Stack spacing={4}>
        {/* Without using button group */}
        <Stack direction="row">
          <Button variant="contained">Left</Button>
          <Button variant="contained">Center</Button>
          <Button variant="contained">Right</Button>
        </Stack>
        
        {/* using button group */}
        <Stack direction="row">
          <ButtonGroup variant="contained">
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Stack>

        {/* Vertical Button */}
        <Stack direction="row">
          <ButtonGroup
            variant="contained"
            orientation="vertical"
            color="secondary"
            aria-label="alignment button group"
          >
            <Button onClick={() => alert("Left Clicked")}>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </>
  );
};

export default MuiButtonGroup;
