import React from "react";
import styled from "styled-components/macro";
import { Card as MuiCard } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Card = styled(MuiCard)`
  height: calc(100% - 24px);

  margin-top: ${(props) => props.theme.spacing(30)};
  padding-top: ${(props) => props.theme.spacing(6)};
  padding-bottom: ${(props) => props.theme.spacing(4)};

  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-top: ${(props) => props.theme.spacing(6)};
  }
  ${(props) => props.theme.breakpoints.only("sm")} {
    margin-top: ${(props) => props.theme.spacing(20)};
  }

  .MuiCardContent-root {
    text-align: center;
  }
`;

export function ErrorCard({ title, subtitle, actions }) {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            {title && <Typography variant="h5">{title}</Typography>}
            {subtitle && <Typography>{subtitle}</Typography>}
            {actions && <Box mt={6}>{actions}</Box>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
