// This Context is made to manage the form values in the multistep form
// WITHOUT using localStorage (resets on refresh)

import { createContext, useState } from "react";

interface FormContextType {
  formData: Record<string, any>;
  updateForm: (data: Record<string, any>) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  applId: string;
  setApplId: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string;
  setSessionId: React.Dispatch<React.SetStateAction<string>>;
  merchantData: any;
  setMerchantData: React.Dispatch<React.SetStateAction<any>>;
  showNafathModal: boolean;
  setShowNafathModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// Default value
export const FormContext = createContext<FormContextType>({
  formData: {},
  updateForm: () => { },
  step: 0,
  setStep: () => { },
  applId: "",
  setApplId: () => { },
  sessionId: "",
  setSessionId: () => { },
  merchantData: "",
  setMerchantData: () => { },
  showNafathModal: false,
  setShowNafathModal: () => {}
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [step, setStep] = useState<number>(0);
  const [applId, setApplId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [merchantData, setMerchantData] = useState<any>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [showNafathModal, setShowNafathModal] = useState(false);
  

  const updateForm = (newData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateForm, step, setStep, applId, setApplId, setSessionId, sessionId, merchantData, setMerchantData, showNafathModal, setShowNafathModal,  }}>
      {children}
    </FormContext.Provider>
  );
};
