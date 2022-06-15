import { Button as MuiButton, useMediaQuery, useTheme } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import React from "react";
import * as PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useCrud } from "../../CrudProvider";
import * as inflector from "inflected";

const Button = styled(MuiButton)`
  white-space: nowrap;
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 40px;
    min-width: 40px;
    height: 34px;

    .MuiButton-startIcon {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

function CreateModelButton(props) {
  const history = useHistory();
  const crud = useCrud();
  const theme = useTheme();
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Button
      fullWidth={props.fullWidth}
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => history.push(`${crud.getModelBasePath()}/add`)}
    >
      {isWidthUpSm && "Create"}
      {isWidthUpMd && ` ${inflector.titleize(props.modelName)}`}
    </Button>
  );
}

// TODO: dkulak: Decide if you want to use this style of component
CreateModelButton.defaultProps = {
  fullWidth: true,
};

CreateModelButton.propTypes = {
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  width: PropTypes.any,
  modelName: PropTypes.any,
};

export default CreateModelButton;
