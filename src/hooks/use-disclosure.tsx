import { useState } from "react";

export const useDisclosure = (defaultValue = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);

  return { isOpen, setIsOpen, onOpen, onClose, onToggle };
};
