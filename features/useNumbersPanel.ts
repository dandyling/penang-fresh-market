import { useNumberInput, UseNumberInputProps } from "@chakra-ui/react";

type Unit =
  | "kg"
  | "gram"
  | "pcs"
  | "pac"
  | "pack"
  | "box"
  | "bunch"
  | "nos"
  | "can"
  | "bottle"
  | "tray";

interface useNumbersPanelProps {
  unit: Unit;
  defaultValue?: number;
}

export const useNumbersPanel = ({
  unit,
  defaultValue,
}: useNumbersPanelProps) => {
  const unitConfig = getUnitConfig(unit);
  const config = defaultValue ? { ...unitConfig, defaultValue } : unitConfig;
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput(config);

  return {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  };
};

const getUnitConfig = (unit: Unit): UseNumberInputProps => {
  switch (unit) {
    case "kg":
    case "gram":
      return {
        step: 0.5,
        defaultValue: 0.5,
        min: 0.5,
        max: 99,
        precision: 1,
      };
    default:
      return {
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 99,
        precision: 0,
      };
  }
};
