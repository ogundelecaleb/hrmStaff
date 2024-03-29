import React, { useCallback, useState } from 'react';
import { Box } from "@chakra-ui/react"
import { useDropzone } from 'react-dropzone';

const DocumentUpload = ({ onUpload, width, height, Icon }) => {

  const [selectedFileName, setSelectedFileName] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFileName(acceptedFiles[0].name);
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box my='10' borderRadius={8} bg='#F8F8FD' h={height} w={width} borderWidth={10} style={{ border: '2px dashed #4640DE' }} >
       <Box h='100%' mt='2' display={'flex'} justifyContent='center' alignItems='center' flexDirection='column'>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p >Click to upload documents or drag and drop</p>
          
          <Box h='50%' display={'flex'} justifyContent='center' alignItems='center' flexDirection='column'>
          {Icon}
            {selectedFileName && (
              <p className="selected-file">{selectedFileName}</p>
            )}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default DocumentUpload;
