import React from "react";
import { Meta, Story } from "@storybook/react";
import { CheckBoxProps, CheckBox } from "./CheckBox";

const meta: Meta = {
  title: "CheckBox",
  component: CheckBox,
  argTypes: {
    label: {
      defaultValue: "Checkbox",
    },
    variant: {
      defaultValue: "primary",
    },
  },
};

export default meta;

const Template: Story<CheckBoxProps> = (args) => <CheckBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary",
  variant: "secondary",
};
