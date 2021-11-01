import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import { Box, Typography as MuiTypography } from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);

function ConfigureGitHub() {
  return (
    <React.Fragment>
      <Helmet title="Configure GitHub" />

      <Box mb={10}>
        <Typography variant="h3" gutterBottom>
          Configure GitHub
        </Typography>

        <Typography variant="body1" gutterBottom my={4}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          architecto assumenda consectetur dignissimos dolor dolorum est, ex
          facilis fuga impedit iusto possimus quasi quia recusandae sapiente
          unde vitae voluptatem voluptatibus.
        </Typography>
      </Box>
    </React.Fragment>
  );
}

export default ConfigureGitHub;