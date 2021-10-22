import React from "react";
import { Meta, Story } from "@storybook/react";
import { TextFieldProps, TextField } from "./TextField";

const meta: Meta = {
  title: "TextField",
  component: TextField,
  argTypes: {
    labelText: {
      defaultValue: "Default label text",
    },
    placeholder: {
      defaultValue: "Default placeholder",
    },
    type: {
      defaultValue: "text",
    },
    name: {
      defaultValue: "name",
    },
  },
};

export default meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const primary = Template.bind({});
primary.args = {
  variant: "primary",
  labelText: "primary",
  placeholder: "primary",
  name: "name",
};

export const secondary = Template.bind({});
secondary.args = {
  variant: "secondary",
  labelText: "secondary",
  placeholder: "secondary",
  name: "name",
};
