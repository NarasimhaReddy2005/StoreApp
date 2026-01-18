import {
  useController,
  type UseControllerProps,
  type FieldValues,
} from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

type Props<T extends FieldValues> = {
  name: keyof T;
} & UseControllerProps<T>;

export default function AppDropzone<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const fileWithPreview = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
        field.onChange(fileWithPreview);
      }
    },
    [field],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const dzStyle: React.CSSProperties = {
    display: "flex",
    border: "2px dashed #767676",
    borderColor: "#767676",
    borderRadius: "5px",
    paddingTop: "30px",
    alignItems: "center",
    height: "200px",
    width: "500px",
  };
  const dzActive: React.CSSProperties = {
    borderColor: "green",
  };

  return (
    <div {...getRootProps()}>
      <FormControl
        style={isDragActive ? { ...dzStyle, ...dzActive } : dzStyle}
        error={!!fieldState.error}
      >
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: "100px" }} />
        <Typography variant="h4">Drop image here</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
