import React from "react";
import { Meta, Story } from "@storybook/react";
import { Submit, SubmitProps } from "./Submit";

const meta: Meta = {
  title: "Submit",
  component: Submit,
  argTypes: {
    children: {
      defaultValue: "Default text",
    },
    variant: {
      defaultValue: "primary",
    },
  },
};

export default meta;

const Template: Story<SubmitProps> = (args) => <Submit {...args} />;
export const primary = Template.bind({});
primary.args = {
  children: "Primary",
  variant: "primary",
};

export const secondary = Template.bind({});
secondary.args = {
  children: "Secondary",
  variant: "secondary",
};

export const tertiary = Template.bind({});
tertiary.args = {
  children: "Tertiary",
  variant: "tertiary",
};
