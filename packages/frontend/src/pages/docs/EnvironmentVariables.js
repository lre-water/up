import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Box,
  Divider,
  Grid as MuiGrid,
  Hidden,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);
const Grid = styled(MuiGrid)(spacing);
const GridKey = styled(Grid)`
  ${(props) => props.theme.breakpoints.down("md")} {
    border-top: 1px solid ${(props) => props.theme.palette.divider};
  }
`;

const envData = {
  frontend: {
    required: [
      {
        key: "APP_KEY",
        value: "Application/Project Key",
        eg: "lre-up-xxxxxxx",
      },
      {
        key: "AUTH0_CLIENT_ID",
        value: "Auth0 Application Client ID",
        eg: "32 character alpha-numeric string",
      },
    ],
    optional: [
      {
        key: "APP_TZ",
        value: "Application Time Zone",
        eg: "America/Denver",
      },
      {
        key: "AUTH0_AUDIENCE",
        value: "Auth0 Audience",
        eg: "https://APP_KEY",
      },
      {
        key: "AUTH0_DOMAIN",
        value: "Auth0 Domain",
        eg: "APP_KEY.us.auth0.com",
      },
      {
        key: "SENTRY_DSN",
        value: "Sentry.io DSN",
        eg: "https://xxxx@xxxx.ingest.sentry.io/xxxx",
      },
      {
        key: "BACKEND_ENDPOINT",
        value: "Backend REST API Endpoint",
        eg: "https://APP_KEY.herokuapp.com",
      },
      {
        key: "PORT",
        value: "Application Port",
        eg: "3000",
      },
      {
        key: "DEBUG",
        value: "Debug Level",
        eg: "0 = OFF, 1 = NORMAL, or 2 = VERBOSE",
      },
    ],
  },
  backend: {
    required: [
      {
        key: "APP_KEY",
        value: "UP Application/Project Key",
        eg: "lre-up-xxxxxxx",
      },
      {
        key: "AUTH0_CLIENT_ID",
        value: "Auth0 Application Client ID",
        eg: "32 character alpha-numeric string",
      },
      {
        key: "AUTH0_CLIENT_SECRET",
        value: "Auth0 Application Client Secret",
        eg: "64 character string",
      },
    ],
    optional: [
      {
        key: "APP_TZ",
        value: "Application Time Zone",
        eg: "America/Denver",
      },
      {
        key: "DB_ENABLED",
        value: "Connect to database on startup?",
        eg: "true",
      },
      {
        key: "DB_CONN",
        value: "Database Connection String",
        eg: "DB_DIALECT://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME",
      },
      {
        key: "DB_DIALECT",
        value: "Database Dialect",
        eg: "postgres",
      },
      {
        key: "DB_PORT",
        value: "Database Port",
        eg: "5432",
      },
      {
        key: "DB_HOST",
        value: "Database Host",
        eg: "localhost",
      },
      {
        key: "DB_USER",
        value: "Database Username",
        eg: "xxxxxxx",
      },
      {
        key: "DB_PASS",
        value: "Database Password",
        eg: "xxxxxxx",
      },
      {
        key: "DB_NAME",
        value: "Database Name",
        eg: "lre-up-xxxxxxx",
      },
      {
        key: "SENTRY_DSN",
        value: "Sentry.io DSN",
        eg: "https://xxxx@xxxx.ingest.sentry.io/xxxx",
      },
      {
        key: "FRONTEND_ORIGIN",
        value: "Frontend Allowed Origin",
        eg: "http://localhost:3000",
      },
      {
        key: "PORT",
        value: "Express Application Port",
        eg: "3005",
      },
      {
        key: "DEBUG",
        value: "Debug Level",
        eg: "0 = OFF, 1 = NORMAL, or 2 = VERBOSE",
      },
    ],
  },
};

function EnvVarList({ name = "", required, optional }) {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom my={4}>
        {name} Environment Variables{" "}
        <Typography
          variant="overline"
          gutterBottom
          my={4}
          mx={4}
          color="secondary"
          component="span"
        >
          Required
        </Typography>
        <Typography
          variant="overline"
          gutterBottom
          my={4}
          color="textSecondary"
          component="span"
        >
          Optional
        </Typography>
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        my={4}
        color="secondary"
        component="div"
      >
        <EnvVarListHeader />
        <EnvVarListData data={required} />
        <EnvVarListData data={optional} color="textSecondary" />
      </Typography>
      <Divider />
    </React.Fragment>
  );
}

function EnvVarListData({ data, color = "secondary" }) {
  return (
    <Box pb={2}>
      <Grid container spacing={2}>
        {data.map((x) => (
          <React.Fragment key={x.key}>
            <GridKey item xs={12} lg={4}>
              <Typography variant="body1" color={color}>
                <strong>{x.key}</strong>
              </Typography>
            </GridKey>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="body1" color={color}>
                <em>{x.value}</em>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="caption" color={color}>
                {x.eg}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}

function EnvVarListHeader() {
  return (
    <Box p={0} pb={0} pt={0}>
      <Grid container spacing={2} style={{ paddingBottom: 0 }}>
        <Hidden lgUp>
          <Grid item xs={6}>
            <Typography variant="overline" color="textPrimary">
              <strong>NAME/DESCRIPTION</strong>
            </Typography>
          </Grid>
        </Hidden>
        <Hidden mdDown>
          <Grid item xs={4} lg={4}>
            <Typography variant="overline" color="textPrimary">
              <strong>NAME</strong>
            </Typography>
          </Grid>
          <Grid item xs={4} sm={6} lg={4}>
            <Typography variant="overline" color="textPrimary">
              <strong>DESCRIPTION</strong>
            </Typography>
          </Grid>
        </Hidden>

        <Hidden xsDown>
          <Grid item xs={6} lg={4}>
            <Typography variant="overline" color="textPrimary">
              <strong>EXAMPLE VALUE</strong>
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
}

function EnvironmentVariables() {
  return (
    <React.Fragment>
      <Helmet title="Environment Variables" />

      <EnvVarList
        name={"Frontend"}
        required={envData.frontend.required}
        optional={envData.frontend.optional}
      />
      <EnvVarList
        name={"Backend"}
        required={envData.backend.required}
        optional={envData.backend.optional}
      />
    </React.Fragment>
  );
}

export default EnvironmentVariables;
