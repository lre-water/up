import React, { forwardRef, useEffect } from "react";
import {
  FormHelperText,
  TextField as MuiTextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EditFormFieldWrap } from "../EditFormFieldWrap";
import { DiffViewer } from "../DiffViewer";
import styled from "styled-components/macro";
import NumberFormat from "react-number-format";

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

const NumberFormatCustom = forwardRef((props, ref) => {
  let { config, onChange, ...other } = props;

  config = config ?? {};
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      defaultValue={config.defaultValue}
      decimalScale={config.decimalScale ?? 0}
      suffix={config.suffix ?? ""}
      prefix={config.prefix ?? ""}
      allowNegative={config.allowNegative ?? true}
      fixedDecimalScale={config.fixedDecimalScale ?? false}
      isNumericString={config.isNumericString ?? true}
      thousandSeparator={config.thousandSeparator ?? true}
    />
  );
});

function EditFormNumber({
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
      <MuiTextField
        name={field.key}
        value={values[field.key]}
        rows={5}
        error={hasError}
        fullWidth
        InputProps={{
          inputProps: {
            config: config,
            tabIndex: index + 1,
          },
          inputComponent: NumberFormatCustom,
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        className={
          valueCache &&
          currentVersion &&
          newValue[field.key] !== oldValue[field.key]
            ? "mismatch"
            : "match"
        }
        variant={variant}
        my={2}
      />

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

export default EditFormNumber;
