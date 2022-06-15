import React from "react";
import { Divider as MuiDivider, Grid, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import styled from "styled-components/macro";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) =>
  <WrappedComponent {...props} width="xs" />;

const Divider = styled(MuiDivider)(spacing);

function EditFormSectionHeader({ field }) {
  return (
    <Grid item xs={12}>
      <Typography variant={"h4"}>{field.title}</Typography>
      <Typography variant={"subtitle2"} color={"textSecondary"}>
        {field.subtitle}
      </Typography>
      <Divider mt={2} />
    </Grid>
  );
}

export default withWidth()(EditFormSectionHeader);
