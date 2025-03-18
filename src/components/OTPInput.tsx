import { useRef, useState } from "react";

interface OtpInputProps {
    length?: number
    onComplete:(otp: string) => void
}
export const OtpInput = ({ length = 6, onComplete }: OtpInputProps) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

   const handleChange = (index: number, value: string) => {
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };


  const handleKeyDown = (index: number, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleGenerateRandomOtp = () => {
    const otpValue = String(Math.floor(100000 + Math.random() * 900000));
    navigator.clipboard.writeText(otpValue).then(() => {
      alert(`OTP generated copied to clipboard! ${otpValue}`, );
    });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").replace(/\D/g, ""); // Remove non-digits

    if (pastedText.length === length) {
      const newOtp = pastedText.split("");
      setOtp(newOtp);

      newOtp.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });

      inputRefs.current[length - 1].focus();
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div 
        style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px" }}
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
          />
        ))}
      </div>
      <button 
        onClick={handleGenerateRandomOtp} 
        style={{
          padding: "8px 15px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate Randoom OTP to test the copy feature
      </button>
    </div>
  );
};
