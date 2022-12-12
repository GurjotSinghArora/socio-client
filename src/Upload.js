import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "./Files";

const uploadFileMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }]
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the selected files here......</p>
      ) : (
        <p>Drag 'n' Drop your photos here, or click <i>Select +</i> to upload your photo</p>
      )}
    </div>
  );
};