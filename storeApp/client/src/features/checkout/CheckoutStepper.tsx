import { Box, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import ShippingAddressForm from "./ShippingAddressForm";
import ReviewOrder from "./ReviewOrder";
import PaymentStep from "./PaymentStep";

const steps = ["Shipping address", "Review your order", "Payment details"];

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3 }}>
        {activeStep === 0 && <ShippingAddressForm onNext={handleNext} />}

        {activeStep === 1 && (
          <ReviewOrder onNext={handleNext} onBack={handleBack} />
        )}

        {activeStep === 2 && <PaymentStep onBack={handleBack} />}
      </Box>
    </Paper>
  );
}
