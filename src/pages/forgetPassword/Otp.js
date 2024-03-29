import { Input } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';

const OTPInput = ({ numInputs, onComplete, otp }) => {
  const inputRefs = useRef(new Array(numInputs));

  const inputStyle = {
    width: '40px',
    height: '40px',
    textAlign: 'center',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    margin: '0 5px',
    padding: '2px',
  };

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    onComplete(newOtp); // Notify the parent component of the OTP change
    if (e.target.nextSibling && e.target.value !== '') {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => (
        <Input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(input) => (inputRefs.current[index] = input)}
          style={inputStyle}
        />
      ))}
    </div>
  );
};

export default OTPInput;
