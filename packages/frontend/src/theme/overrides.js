import { customHighlight } from "./variants";

const overrides = {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
        boxShadow:
          "rgba(50, 50, 93, 0.025) 0px 2px 5px -1px, rgba(0, 0, 0, 0.05) 0px 1px 3px -1px",
      },
    },
  },
  MuiMobileStepper: {
    styleOverrides: {
      root: {
        background: "none",
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      action: {
        marginTop: "-4px",
        marginRight: "-4px",
      },
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      day: {
        fontWeight: "300",
      },
    },
  },
  MuiPickersYear: {
    styleOverrides: {
      root: {
        height: "64px",
      },
    },
  },
  MuiPickersCalendar: {
    styleOverrides: {
      transitionContainer: {
        marginTop: "6px",
      },
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      iconButton: {
        backgroundColor: "transparent",
        "& > *": {
          backgroundColor: "transparent",
        },
      },
      switchHeader: {
        marginTop: "2px",
        marginBottom: "4px",
      },
    },
  },
  MuiPickersClock: {
    styleOverrides: {
      container: {
        margin: `32px 0 4px`,
      },
    },
  },
  MuiPickersClockNumber: {
    styleOverrides: {
      clockNumber: {
        left: `calc(50% - 16px)`,
        width: "32px",
        height: "32px",
      },
    },
  },
  MuiPickerDTHeader: {
    styleOverrides: {
      dateHeader: {
        "& h4": {
          fontSize: "2.125rem",
          fontWeight: 400,
        },
      },
      timeHeader: {
        "& h3": {
          fontSize: "3rem",
          fontWeight: 400,
        },
      },
    },
  },
  MuiPickersTimePicker: {
    styleOverrides: {
      hourMinuteLabel: {
        "& h2": {
          fontSize: "3.75rem",
          fontWeight: 300,
        },
      },
    },
  },
  MuiPickersToolbar: {
    styleOverrides: {
      toolbar: {
        "& h4": {
          fontSize: "2.125rem",
          fontWeight: 400,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: "0.65rem",
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      "::-moz-selection": {
        color: "white",
        background: customHighlight[500],
      },
      "::selection": {
        color: "white",
        background: customHighlight[500],
      },
      "*::-webkit-scrollbar": {
        width: "0.8em",
      },
      "*::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255,255,255,.2)",
        border: "none",
        borderRadius: "8px",
      },
    },
  },
};

export default overrides;
