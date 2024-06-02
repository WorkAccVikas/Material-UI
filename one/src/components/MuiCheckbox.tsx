import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const MuiCheckbox = () => {
  const [accept, setAccept] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  console.log({ accept });
  console.log({ skills });
  console.log({ colors });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccept(e.target.checked);
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = skills.indexOf(e.target.value);

    if (index === -1) {
      setSkills([...skills, e.target.value]);
    } else {
      setSkills(skills.filter((skill) => skill !== e.target.value));
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setColors((prevColors) => {
      if (checked) {
        return [...prevColors, value];
      } else {
        return prevColors.filter((color) => color !== value);
      }
    });
  };

  return (
    <>
      <Box>
        <Box>
          <FormControlLabel
            label="I accept terms & condition"
            control={<Checkbox checked={accept} onChange={handleChange} />}
          />
          <FormControlLabel
            label="Are you ok"
            control={<Checkbox color="secondary" size="large" />}
          />
        </Box>

        <hr />

        {/* Checkbox with icon only */}
        <Box>
          <Checkbox
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            checked={accept}
            onChange={handleChange}
          />
        </Box>

        <hr />

        {/* In group vertically */}
        <Box>
          <FormControl>
            <FormLabel>Skills</FormLabel>
            <FormGroup>
              <FormControlLabel
                label="HTML"
                value="html"
                control={
                  <Checkbox
                    checked={skills.includes("html")}
                    onChange={handleSkillsChange}
                  />
                }
              />
              <FormControlLabel
                label="CSS"
                value="css"
                control={
                  <Checkbox
                    checked={skills.includes("css")}
                    onChange={handleSkillsChange}
                  />
                }
              />
              <FormControlLabel
                label="JAVASCRIPT"
                value="js"
                control={
                  <Checkbox
                    checked={skills.includes("js")}
                    onChange={handleSkillsChange}
                  />
                }
              />
            </FormGroup>
            <FormHelperText>Helper Text here</FormHelperText>
          </FormControl>
        </Box>

        <hr />

        {/* In group horizontally */}
        <Box>
          <FormControl>
            <FormLabel>Skills</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="HTML"
                value="html"
                control={
                  <Checkbox
                    checked={skills.includes("html")}
                    onChange={handleSkillsChange}
                  />
                }
              />
              <FormControlLabel
                label="CSS"
                value="css"
                control={
                  <Checkbox
                    checked={skills.includes("css")}
                    onChange={handleSkillsChange}
                  />
                }
              />
              <FormControlLabel
                label="JAVASCRIPT"
                value="js"
                control={
                  <Checkbox
                    checked={skills.includes("js")}
                    onChange={handleSkillsChange}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Box>

        <hr />

        {/* show error */}
        <Box>
          <FormControl error>
            <FormLabel>Skills</FormLabel>
            <FormGroup>
              <FormControlLabel
                label="HTML"
                value="html"
                control={
                  <Checkbox
                    checked={skills.includes("html")}
                    onChange={handleSkillsChange}
                  />
                }
              />
              <FormControlLabel
                label="CSS"
                value="css"
                control={
                  <Checkbox
                    checked={skills.includes("css")}
                    onChange={handleSkillsChange}
                  />
                }
              />
              <FormControlLabel
                label="JAVASCRIPT"
                value="js"
                control={
                  <Checkbox
                    checked={skills.includes("js")}
                    onChange={handleSkillsChange}
                  />
                }
              />
            </FormGroup>
            <FormHelperText>Helper Text here</FormHelperText>
          </FormControl>
        </Box>

        <hr />

        {/* labelPlacement : default = end */}
        <Box>
          <FormControlLabel
            label="Are you ok"
            labelPlacement="bottom"
            required
            control={<Checkbox color="secondary" size="large" />}
          />
        </Box>

        <hr />

        <Box onChange={handleColorChange}>
          <FormControlLabel
            control={<Checkbox value="red" checked={colors.includes("red")} />}
            label="Red"
          />
          <FormControlLabel
            control={
              <Checkbox value="green" checked={colors.includes("green")} />
            }
            label="Green"
          />
          <FormControlLabel
            control={
              <Checkbox value="blue" checked={colors.includes("blue")} />
            }
            label="Blue"
          />
        </Box>
      </Box>
    </>
  );
};

export default MuiCheckbox;
