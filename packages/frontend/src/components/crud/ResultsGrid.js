import React from "react";
import styled from "styled-components/macro";
import { Grid } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import { ActionsDropdown, ActionsDropdownTypes } from "./ActionsDropdown";
import Card from "@mui/material/Card";
import { useHistory } from "react-router-dom";
import { useCrud } from "../../CrudProvider";

const DataCard = styled(Card)`
  height: 100%;
  border-radius: 0;
  border-bottom: 1px solid
    ${(props) =>
      props.theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(0, 0, 0, 0.12)"};
`;

export function ResultsGrid({ modelName, data, displayName }) {
  const history = useHistory();
  const crud = useCrud();

  return (
    <div style={{ padding: "16px" }}>
      <Grid container spacing={4}>
        {data.map((row) => {
          return (
            <Grid key={row.id} item xs={12} sm={6} md={6} lg={4}>
              <DataCard>
                <CardActionArea
                  onClick={() => {
                    history.push(`${crud.getModelBasePath()}/${row.id}`);
                  }}
                  style={{ height: "100%" }}
                >
                  <CardHeader
                    avatar={
                      <ActionsDropdown
                        modelName={modelName}
                        params={{ id: row.id, row: row }}
                        type={ActionsDropdownTypes.INDEX}
                      />
                    }
                    title={displayName(row)}
                    subheader={row.email}
                  />
                </CardActionArea>
              </DataCard>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
