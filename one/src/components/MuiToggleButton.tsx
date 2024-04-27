import { Divider, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material";
import { useState } from "react";

const MuiToggleButton = () => {
  console.log("MuiToggleButton render");

  const [first, setFirst] = useState<string[]>([]);
  const [second, setSecond] = useState<string | null>(null);
  console.log(`🚀 ~ MuiToggleButton ~ second:`, second);

  const handleChangeFirst = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    updatedValues: string[]
  ) => {
    setFirst(updatedValues);
  };

  const handleChangeSecond = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    updatedValues: string | null
  ) => {
    setSecond(updatedValues);
  };

  return (
    <>
      <Stack spacing={4}>
        {/* First */}
        <Stack direction="row">
          <ToggleButtonGroup
            aria-label="text formatting"
            value={first}
            onChange={handleChangeFirst}
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBold />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalic />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlined />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Divider />

        <Stack direction="row">
          <ToggleButtonGroup
            aria-label="text formatting"
            value={first}
            onChange={handleChangeFirst}
            size="small"
            // fullWidth
            color="success"
            orientation="vertical"
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBold />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalic />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlined />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Divider />

        {/* Second */}
        <Stack direction="row">
          <ToggleButtonGroup
            aria-label="text formatting"
            value={second}
            onChange={handleChangeSecond}
            exclusive
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBold />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalic />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlined />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
    </>
  );
};

export default MuiToggleButton;
