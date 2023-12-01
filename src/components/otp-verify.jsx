import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import '../style/otp-verify.css';

const OtpVerify = () => {
  const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  const [email, setEmail] = useState('');
  const [genOtp, setGenOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleGetOtp = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        const generatedOtp = Math.floor(1000 + Math.random() * 9000);
        setGenOtp(generatedOtp)
        await emailjs.send(
          'YOUR SERVICE  ID FROM EMAIL-JS.COM', // Replace with your service ID
          'YOUR TEMPLATE ID FROM EMAIL-JS.COM', // Replace with your template ID
          {
            to_email: email,
            otp: generatedOtp.toString(),
          },
          'YOUR USER ID FROM EMAIL-JS.COM' // Replace with your user ID
        );
        setOtpSent(true);
        setOtp('');
      } else {
        alert('Wrong Email..');
      }
    } catch (error) { 
      console.log('Error while sending otp:-', error)
    }
  };

  const handleVerify = () => {
    if(Number(genOtp)===Number(otp)) {
      alert('Otp verified successfully!')
      setOtpSent(false);
      setOtp('');
      setEmail('')
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
    setOtp((prevOtp) => {
      const newOtp = prevOtp.split('');
      newOtp[index] = value;
      return newOtp.join('');
    });
  };

  return (
    <div className="otp-form">
      <h3>OTP VERIFY CARD</h3>
      <div className="otp-form__primary">
        <div className="otp-form__primary-value">
          <div className="otp-form__email-feild">
            <div className="otp-form__label">
              <label>Email:</label>
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={otpSent}
            />
          </div>
          {!otpSent ? (
            <div className="otp-form__btn">
              <button onClick={handleGetOtp}>Get OTP</button>
            </div>
          ) : (
            <>
              <div className="otp-form__otp-field">
                <div className="otp-form__label">
                  <label>OTP:</label>
                </div>
                {inputRefs.current.map((inputRef, index) => (
                  <input
                    className="otp-form__input"
                    key={index}
                    ref={inputRef}
                    type="text"
                    maxLength={1}
                    onChange={(e) => handleOtpChange(index, e)}
                  />
                ))}
              </div>
              <div className="otp-form__btn">
                <button onClick={handleVerify} className="otp-form__verify-btn">
                  Verify
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
