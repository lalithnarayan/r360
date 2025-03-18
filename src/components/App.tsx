import { useState } from 'react'
import { OtpInput } from './OTPInput'

function App() {
  const [newOtp, setNewOtp] = useState("")
  const handleOtpComplete = (otp: string) => {
    setNewOtp(otp)
  }
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <label className='mx-auto block text-center'>{newOtp}</label>
        <OtpInput onComplete={handleOtpComplete} />
      </div>
    </div>
  )
}

export default App
