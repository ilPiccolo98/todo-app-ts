import React from "react";
import { Meta, Story } from "@storybook/react";
import { AddActivity, AddActivityProps } from "./AddActivity";

const meta: Meta = {
  title: "AddActivity",
  component: AddActivity,
  argTypes: {},
};

export default meta;
const Template: Story<AddActivityProps> = (args) => <AddActivity {...args} />;

export const Default = Template.bind({});
Default.args = {};
