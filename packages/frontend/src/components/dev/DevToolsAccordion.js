import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DebugJson } from "./DebugJson";
import { useDev } from "../../DevProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { useApp } from "../../AppProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    paddingLeft: theme.spacing(2),
  },
}));

export default function DevToolsAccordion() {
  const classes = useStyles();

  const app = useApp();
  const dev = useDev();
  const { user } = useAuth0();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>process.env</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DebugJson data={process.env} />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Raw Data from Last API Call
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DebugJson data={dev.rawApiData} />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            useApp().currentUser
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DebugJson data={app.currentUser} />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>useAuth0().user</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DebugJson data={user} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
