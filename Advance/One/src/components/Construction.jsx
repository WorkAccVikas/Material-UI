import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";

const Construction = ({ title }) => {
  return (
    <>
      <Stack gap={2}>
        <Typography variant="h1">New Page</Typography>
        <Typography variant="h2">{title}</Typography>
      </Stack>
    </>
  );
};

Construction.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Construction;
