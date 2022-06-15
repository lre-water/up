import React from "react";
import styled, { withTheme } from "styled-components/macro";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";

import { Doughnut } from "react-chartjs-2";

import { orange, red } from "@mui/material/colors";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;

function DoughnutChart({ theme }) {
  const data = {
    labels: ["Social", "Search Engines", "Direct", "Other"],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: [
          theme.palette.secondary.main,
          orange[500],
          red[500],
          theme.palette.grey[300],
        ],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutoutPercentage: 65,
    legend: {
      display: false,
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Doughnut Chart
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Doughnut data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(DoughnutChart);
