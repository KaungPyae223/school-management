import { useState } from "react";
import { useNavigate } from "react-router";

export const useBackupCodes = (backupCodes: string[]) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    if (!backupCodes.length) return;

    await navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = async () => {
    await handleCopy();
    navigate(-1);
  };

  return {
    copied,
    handleCopy,
    handleBack,
  };
};
