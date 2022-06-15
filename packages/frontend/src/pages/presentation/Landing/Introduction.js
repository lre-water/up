import React from "react";
import styled from "styled-components/macro";

import {
  Container,
  Grid,
  Tooltip,
  Typography as MuiTypography,
} from "@mui/material";

import { spacing } from "@mui/system";
import { BackgroundVideo } from "../../../components/BackgroundVideo";

const Typography = styled(MuiTypography)(spacing);

const Wrapper = styled.div`
  padding-top: 7rem;
  position: relative;
  text-align: center;
  overflow: hidden;

  color: ${(props) =>
    props.theme.palette.mode === "dark"
      ? props.theme.palette.text.secondary
      : props.theme.palette.text.primary};
`;

const Content = styled.div`
  position: relative;
  padding: ${(props) => props.theme.spacing(6)} 0;
  line-height: 150%;
`;

const Title = styled(Typography)`
  opacity: 0.9;
  line-height: 0.8;
  font-size: 2rem;
  font-weight: ${(props) => props.theme.typography.fontWeightXBold};

  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 3rem;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 4.5rem;
  }

  span {
    color: ${(props) => props.theme.palette.primary.main};
  }

  color: ${(props) =>
    props.theme.palette.mode === "dark"
      ? props.theme.palette.primary.contrastText
      : props.theme.palette.text.primary};
`;

const Subtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: ${(props) => props.theme.spacing(2)} 0;

  color: ${(props) =>
    props.theme.palette.mode === "dark"
      ? props.theme.palette.text.secondary
      : props.theme.palette.text.secondary};
`;

const BrandIcons = styled.div(spacing);

const BrandIcon = styled.img`
  vertical-align: middle;
  margin-right: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  height: auto;
`;

function Introduction() {
  return (
    <Wrapper>
      <Container>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid item xs={12} sm={9} md={8} lg={7}>
            <BackgroundVideo mp4={"/static/video/1048072384-preview.mp4"} />
            <Content>
              <Title variant="h1" gutterBottom>
                A water-centric <span>starter kit</span> for fast & modern web
                applications
              </Title>
              <Grid container justifyContent="center" spacing={4}>
                <Grid item xs={12} lg={10}>
                  <Subtitle color="textSecondary">
                    This is a web application starter kit tailor-made for water
                    engineering projects. It aims to be a fantastic starting
                    point for projects of any size.
                  </Subtitle>
                </Grid>
              </Grid>

              <BrandIcons my={4}>
                <Tooltip title="JavaScript">
                  <BrandIcon
                    alt="JavaScript"
                    src="/static/img/brands/javascript.svg"
                    style={{ width: "40px" }}
                  />
                </Tooltip>
                <Tooltip title="Material-UI">
                  <BrandIcon
                    alt="Material-UI"
                    src="/static/img/brands/material-ui.svg"
                    style={{ width: "40px" }}
                  />
                </Tooltip>
                <Tooltip title="React">
                  <BrandIcon
                    alt="React"
                    src="/static/img/brands/react.svg"
                    style={{ width: "45px" }}
                  />
                </Tooltip>
                <Tooltip title="Redux">
                  <BrandIcon
                    alt="Redux"
                    src="/static/img/brands/redux.svg"
                    style={{ width: "35px" }}
                  />
                </Tooltip>
                <Tooltip title="Node.js">
                  <BrandIcon
                    alt="Node.js"
                    src="/static/img/brands/nodejs.svg"
                    style={{ width: "37px" }}
                  />
                </Tooltip>
                <Tooltip title="Sequelize">
                  <BrandIcon
                    alt="Sequelize"
                    src="/static/img/brands/sequelizejs.svg"
                    style={{ width: "37px" }}
                  />
                </Tooltip>
                <Tooltip title="Netlify">
                  <BrandIcon
                    alt="Netlify"
                    src="/static/img/brands/netlify.svg"
                    style={{ width: "37px" }}
                  />
                </Tooltip>
                <Tooltip title="Heroku">
                  <BrandIcon
                    alt="Heroku"
                    src="/static/img/brands/heroku.svg"
                    style={{ width: "37px" }}
                  />
                </Tooltip>
                <Tooltip title="Auth0">
                  <BrandIcon
                    alt="Auth0"
                    src="/static/img/brands/auth0.svg"
                    style={{ width: "37px" }}
                  />
                </Tooltip>
                <Tooltip title="Mapbox">
                  <BrandIcon
                    alt="Mapbox"
                    src="/static/img/brands/mapbox.svg"
                    style={{ width: "37px" }}
                  />
                </Tooltip>
              </BrandIcons>
            </Content>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default Introduction;
