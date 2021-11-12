import { AspectRatio, Flex, Grid, Heading, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import {
  AiOutlineDollarCircle,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import theme from "../../styles/theme";

interface IconButtonProps {
  label: string;
  icon: ReactElement;
}

export const iconButtons: IconButtonProps[] = [
  {
    label: "Favorites",
    icon: <AiOutlineHeart />,
  },
  {
    label: "Payments",
    icon: <AiOutlineDollarCircle />,
  },
  {
    label: "Contact",
    icon: <AiOutlineWhatsApp />,
  },
  {
    label: "Info",
    icon: <AiOutlineInfoCircle />,
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
              <IconButton disabled aria-label={icon.label} icon={icon.icon} />
            </AspectRatio>
            <Heading as="h2" className="icon-label">
              {icon.label}
            </Heading>
          </Flex>
        );
      })}
    </Container>
  );
};

const Container = styled(Grid)`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  .icon {
    margin: 0.5rem;
  }
  .chakra-aspect-ratio {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.white};
    margin-bottom: 0.25rem;
    border-radius: ${theme.radii.lg};
    box-shadow: ${theme.shadows.lg};
  }
  button {
    position: static;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.white};
    color: ${theme.colors.brand};
    border-radius: ${theme.radii.lg};
  }
  svg {
    width: 45%;
    height: 45%;
  }
  .icon-label {
    text-align: center;
    font-size: ${theme.fontSizes.sm};
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.gray[500]};
  }
`;
