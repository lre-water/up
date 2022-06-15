import React, { useEffect } from "react";
import {
  FormHelperText,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EditFormFieldWrap } from "../EditFormFieldWrap";
import { DiffViewer } from "../DiffViewer";
import styled from "styled-components/macro";
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
  TimePicker as MuiTimePicker,
} from "@mui/lab";
import { CRUD_FIELD_TYPES, THEME } from "../../../constants";
import IconButton from "@mui/material/IconButton";
import { AccessTime, Event } from "@mui/icons-material";

const DiffWrap = styled.div`
  &.mismatch {
    border-bottom-left-radius: 4px;
    overflow: hidden;
    border-bottom-right-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-top: none;

    > table {
      margin-top: -1px;
      margin-bottom: -1px;
      font-size: 11px;

      [class*="-gutter"] {
        min-width: 30px;
      }

      [class*="-marker"] {
        display: none;
      }

      pre {
        line-height: 20px;
      }
    }
  }
`;

function EditFormDateTime({
  data,
  type,
  index,
  field,
  setFieldValue,
  currentVersion,
  hasError,
  toggleField,
  isFieldDirty,
  values,
  valueCache,
  touched,
  errors,
  handleBlur,
  handleChange,
  variant,
}) {
  const theme = useTheme();

  const isWidthDownXs = useMediaQuery(theme.breakpoints.down("xs"));

  const oldValue = { ...currentVersion };
  const newValue = { ...valueCache };

  const config = field.typeConfig ?? {};

  config.icon = config.icon ?? true;

  const DateComponent = MuiDatePicker;
  const TimeComponent = MuiTimePicker;
  const DateTimeComponent = MuiDateTimePicker;

  useEffect(() => {
    if (
      field.defaultValue !== null &&
      typeof field.defaultValue !== "undefined"
    ) {
      setFieldValue(field.key, field.defaultValue);
    }
  }, [field.defaultValue, setFieldValue, field.key]);

  return (
    <EditFormFieldWrap
      data={data}
      field={field}
      currentVersion={currentVersion}
      hasError={hasError}
      toggleField={toggleField}
      isFieldDirty={isFieldDirty}
      setFieldValue={setFieldValue}
    >
      {type === CRUD_FIELD_TYPES.DATE && (
        <DateComponent
          name={field.key}
          value={values[field.key] ?? null}
          error={hasError}
          fullWidth
          inputProps={{ tabIndex: index + 1 }}
          onBlur={handleBlur}
          onChange={(val) =>
            handleChange({ target: { name: field.key, value: val } })
          }
          className={
            valueCache &&
            currentVersion &&
            newValue[field.key] !== oldValue[field.key]
              ? "mismatch"
              : "match"
          }
          format={config.format ?? THEME.DATE_FORMAT_SHORT}
          inputVariant={variant}
          KeyboardButtonProps={config.keyboard ? { size: "small" } : undefined}
          InputProps={{
            endAdornment: config.icon && (
              <InputAdornment position="end">
                <IconButton size={"small"}>
                  <Event />
                </IconButton>
              </InputAdornment>
            ),
          }}
          my={2}
        />
      )}

      {type === CRUD_FIELD_TYPES.TIME && (
        <TimeComponent
          name={field.key}
          value={values[field.key] ?? null}
          error={hasError}
          fullWidth
          inputProps={{ tabIndex: index + 1 }}
          onBlur={handleBlur}
          onChange={(val) =>
            handleChange({ target: { name: field.key, value: val } })
          }
          className={
            valueCache &&
            currentVersion &&
            newValue[field.key] !== oldValue[field.key]
              ? "mismatch"
              : "match"
          }
          format={config.format ?? THEME.TIME_FORMAT_SHORT}
          inputVariant={variant}
          KeyboardButtonProps={config.keyboard ? { size: "small" } : undefined}
          keyboardIcon={<AccessTime />}
          InputProps={{
            endAdornment: config.icon && (
              <InputAdornment position="end">
                <IconButton size={"small"}>
                  <AccessTime />
                </IconButton>
              </InputAdornment>
            ),
          }}
          my={2}
        />
      )}

      {type === CRUD_FIELD_TYPES.DATETIME && (
        <DateTimeComponent
          name={field.key}
          value={values[field.key] ?? null}
          error={hasError}
          fullWidth
          inputProps={{ tabIndex: index + 1 }}
          onBlur={handleBlur}
          onChange={(val) =>
            handleChange({ target: { name: field.key, value: val } })
          }
          className={
            valueCache &&
            currentVersion &&
            newValue[field.key] !== oldValue[field.key]
              ? "mismatch"
              : "match"
          }
          format={config.format ?? THEME.DATETIME_FORMAT_SHORT}
          inputVariant={variant}
          KeyboardButtonProps={config.keyboard ? { size: "small" } : undefined}
          InputProps={{
            endAdornment: config.icon && (
              <InputAdornment position="end">
                <IconButton size={"small"}>
                  <Event />
                </IconButton>
              </InputAdornment>
            ),
          }}
          my={2}
        />
      )}

      {touched[field.key] && (
        <FormHelperText error>{errors[field.key]}</FormHelperText>
      )}

      {valueCache && currentVersion && (
        <DiffWrap
          className={
            newValue[field.key] === oldValue[field.key] ? "match" : "mismatch"
          }
        >
          <DiffViewer
            oldValue={newValue[field.key]}
            newValue={oldValue[field.key]}
            splitView={isWidthDownXs === false}
            useDarkTheme={theme.palette.mode === "dark"}
            compareMethod={"diffWordsWithSpace"}
            onLineNumberClick={(lineId) => {
              const [side] = lineId.split("-");

              if (side === "L") {
                setFieldValue(field.key, newValue[field.key]);
              } else {
                setFieldValue(field.key, oldValue[field.key]);
              }
            }}
          />
        </DiffWrap>
      )}
    </EditFormFieldWrap>
  );
}

export default EditFormDateTime;
