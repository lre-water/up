import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Divider,
  Link,
  Typography as MuiTypography,
  useTheme,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import Code from "../../components/Code";
import { ROUTES } from "../../constants";

const Typography = styled(MuiTypography)(spacing);

function Cmd({ children }) {
  const theme = useTheme();

  return (
    <code style={{ color: theme.palette.secondary.main }}>{children}</code>
  );
}

function Intro() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        How to Create a New UP Project
      </Typography>
      {/*<Typography variant="body1" gutterBottom my={4}>*/}
      {/*  Prerequisites:*/}
      {/*  <ul>*/}
      {/*    <li>Database Created & Tables Preloaded</li>*/}
      {/*    <li>Sentry.io Project Created</li>*/}
      {/*    <li>Auth0 Application Created</li>*/}
      {/*    <li>*/}
      {/*      Auth0 Disable Signups in Authentication > Database >*/}
      {/*      Username-Password-Authentication, Add Branding*/}
      {/*    </li>*/}
      {/*    <li>Auth0 Roles Created (Administrator, Developer, User)</li>*/}
      {/*    <li>Auth0 User Created w/All Roles</li>*/}
      {/*    <li>Auth0 Hook to Inject Roles/Permissions Added</li>*/}
      {/*  </ul>*/}
      {/*</Typography>*/}
      <Typography variant="body1" gutterBottom my={4}>
        Creating a new project on the Unified Platform is simple. We'll walk you
        through the steps, including creating and configuring the new project
        in:
      </Typography>
      <ol>
        <li>GitHub</li>
        <li>Auth0</li>
        <li>Sentry.io</li>
        <li>Postgres</li>
        <li>Netlify</li>
        <li>Heroku</li>
      </ol>
      <Typography variant="body1" gutterBottom my={4}>
        To get started, just follow the steps below. If you run into any issues
        or have any questions, please visit our{" "}
        <Link component={NavLink} to={ROUTES.PAGE_DOCS_SUPPORT}>
          Support
        </Link>{" "}
        page.
      </Typography>
      <Divider />
      <Typography variant="h4" gutterBottom my={4}>
        Configuring GitHub
      </Typography>
      <Typography variant="body1" gutterBottom my={4}>
        The UP source code is stored in GitHub. Let's begin by copying it into a
        new repository.
      </Typography>
      <ol>
        <li>
          Open{" "}
          <Link href={"https://github.com/new/import"} target={"_blank"}>
            GitHub's Import
          </Link>{" "}
          tool
        </li>
        <li>
          For "Your old repository's clone URL" use: <br />
          <Cmd>https://github.com/lre-water/up.git</Cmd>
        </li>
        <li>
          For "Your new repository details" use: <br />
          Owner: <Cmd>lre-up</Cmd>
          <br />
          Repository Name: <Cmd>[enter repository name]</Cmd>
          <br />
          Privacy: <Cmd>Private</Cmd>
        </li>
      </ol>
      <Typography variant="body1" gutterBottom my={4}>
        Note: We recommend using <Cmd>lowercase-dashed-client-name</Cmd> for{" "}
        <strong>Repository Name</strong>. If a single client requires multiple
        UP projects, each project can be a separate branch within the same
        client repo (e.g. prj/project-name).
      </Typography>
      <Divider />
      <Typography variant="body1" gutterBottom my={4}>
        Clone the private client repo so you can work on it:
      </Typography>
      <Code language="text">
        git clone https://github.com/lre-up/yourreponame.git
      </Code>
      <Code language="text">cd yourreponame && yarn install</Code>
      <Divider />
      <Typography variant="body1" gutterBottom my={4}>
        Generate new <Cmd>.env</Cmd> files from the examples provided:
      </Typography>
      <Code language="text">
        cp packages/frontend/.env.example packages/frontend/.env
      </Code>
      <Code language="text">
        cp packages/backend/.env.example packages/backend/.env
      </Code>
      <Typography variant="body1" gutterBottom my={4}>
        Before we obtain the values for our project-specific environment
        variables, we'll take a quick look at what each variable means in the
        next section.
      </Typography>
      <Divider />

      <Typography variant="body1" gutterBottom my={4}>
        Finally, run the following commands to start the development server:
      </Typography>
      <Code language="text">yarn start:frontend && yarn start:backend</Code>
      <Typography variant="body1" gutterBottom my={4}>
        Your project should be live and running at{" "}
        <Link href={"http://localhost:3000"} target={"_blank"}>
          http://localhost:3000
        </Link>{" "}
        &mdash; Woohoo!
      </Typography>
    </Box>
  );
}

function Commands() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Available Commands
      </Typography>
      <Code
        language={"text"}
      >{`$ yarn start           > Start the development server
                         NOTE: We recommend starting frontend and backend
                         separately for stability and ease of debugging

$ yarn start:frontend  > Start the development frontend server

$ yarn start:backend   > Start the development backend server

$ yarn cli             > Start the development command-line wizard

$ yarn lint            > Lint the code

$ yarn format          > Format the code

$ yarn build           > Build and bundle the project

$ yarn commit          > Commit the code using a wizard
`}</Code>
    </Box>
  );
}
function GettingStarted() {
  return (
    <React.Fragment>
      <Helmet title="Getting Started" />

      <Intro />
      <Commands />
    </React.Fragment>
  );
}

export default GettingStarted;
