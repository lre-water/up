import React from "react";
import styled from "styled-components/macro";
import { useTheme } from "@mui/material/styles";

import {
  Grid,
  Hidden,
  List,
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
  Stack,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import DevTools from "./dev/DevTools";
import AdminVisibilityFilter from "./AdminVisibilityFilter";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1).replace("px", "") / 4}px
    ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  &.MuiListItem-root {
    display: inline-block;
    width: auto;
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
  &.MuiListItem-root,
  &.MuiListItem-root:hover,
  &.MuiListItem-root:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

const BrandLogo = styled.img`
  width: 86px;
  height: 36px;
  margin-top: ${(props) => props.theme.spacing(3)};
  margin-right: ${(props) => props.theme.spacing(4)};
`;

function Footer() {
  const theme = useTheme();

  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Hidden mdDown>
          <Grid container item xs={12} md={7} justifyContent="flex-end">
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Tooltip title="Built by LRE Water">
                  <Link
                    href="https://lrewater.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <BrandLogo
                      src={
                        theme.palette.mode === "dark"
                          ? "/static/img/lrewater-logo-simple.svg"
                          : "/static/img/lrewater-logo-simple.svg"
                      }
                      alt={"LREWater.com"}
                    />
                  </Link>
                </Tooltip>
              </Grid>
              <Grid item>
                <List component={Stack} direction="row">
                  <ListItem
                    button={true}
                    component="a"
                    href="/documentation/introduction"
                  >
                    <ListItemText primary="Documentation" />
                  </ListItem>
                  <ListItem button={true} component="a" href="#">
                    <ListItemText primary="Privacy" />
                  </ListItem>
                  <ListItem button={true} component="a" href="#">
                    <ListItemText primary="Terms of Service" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid container item xs={12} md={5} justifyContent="flex-end">
          <List component={Stack} direction="row">
            <ListItem>
              <ListItemText
                primary={`© ${new Date().getFullYear()} - Leonard Rice Engineers, Inc.`}
              />
            </ListItem>
            <AdminVisibilityFilter>
              <ListItem button={true}>
                <DevTools />
              </ListItem>
            </AdminVisibilityFilter>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
