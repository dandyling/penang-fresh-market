import { AspectRatio, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import {
  FaDollarSign,
  FaHeart,
  FaInfoCircle,
  FaWhatsapp,
} from "react-icons/fa";
import theme from "../styles/theme";

interface IconButtonProps {
  label: string;
  icon: ReactElement;
}

export const iconButtons: IconButtonProps[] = [
  {
    label: "Favorites",
    icon: <FaHeart />,
  },
  {
    label: "Payments",
    icon: <FaDollarSign />,
  },
  {
    label: "WhatsApp",
    icon: <FaWhatsapp />,
  },
  {
    label: "Info",
    icon: <FaInfoCircle />,
  },
];

export const IconsPanel = () => {
  return (
    <Container
      width="100%"
      gridTemplateColumns="repeat(4, 1fr)"
      gridAutoRows="auto"
    >
      {iconButtons.map((icon) => {
        return (
          <Flex
            className="icon"
            flexDirection="column"
            justifyContent="center"
            key={icon.label}
          >
            <AspectRatio ratio={1}>
              <IconButton aria-label={icon.label} icon={icon.icon} />
            </AspectRatio>
            <Text className="icon-label">{icon.label}</Text>
          </Flex>
        );
      })}
    </Container>
  );
};

const Container = styled(Grid)`
  .icon {
    margin: 0.75rem;
  }
  .chakra-aspect-ratio {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.white};
    margin-bottom: 0.25rem;
    border-radius: ${theme.radii.lg};
    box-shadow: ${theme.shadows.md};
  }
  button {
    position: static;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.white};
    color: ${theme.colors.brand};
  }
  svg {
    width: 40%;
    height: 40%;
  }
  .icon-label {
    text-align: center;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.blackAlpha[700]};
  }
`;
