import React, { useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { VscCopy } from "react-icons/vsc";

const GetDocument = ({ width, height, details, Icon, onUpload }) => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
      setSelectedFileName(file.name);
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div onClick={handleBoxClick} style={{ cursor: "pointer" }}>
      <Box
        my="10"
        borderRadius={8}
        bg="#F8F8FD"
        h={height}
        w={width}
        borderWidth={10}
        style={{ border: "2px dashed #4640DE" }}
      >
        <Box h="100%" mt="2" display={"flex"} justifyContent="center" alignItems="center" flexDirection="column">
          {Icon}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".pdf, .doc, .docx"
          />
          <Text color={"#4640DE"} style={{ cursor: "pointer" }}>
            {selectedFileName || "Click to upload documents"}
          </Text>
          <Text color={"#7C8493"}>{details}</Text>
        </Box>
      </Box>
    </div>
  );
};

export default GetDocument;
