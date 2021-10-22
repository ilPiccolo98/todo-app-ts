import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

const meta: Meta = {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Default text",
    },
  },
};

export default meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "primary text",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "secondary text",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: "tertiary",
  children: "tertiary text",
};
