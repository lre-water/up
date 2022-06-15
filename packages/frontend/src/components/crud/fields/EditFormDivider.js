import React from "react";
import { Divider, Grid } from "@mui/material";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) =>
  <WrappedComponent {...props} width="xs" />;

function EditFormDivider({ field }) {
  return (
    <Grid item xs={12}>
      <Divider />
    </Grid>
  );
}

export default withWidth()(EditFormDivider);
