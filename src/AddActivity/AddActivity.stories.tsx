import React from "react";
import { Meta, Story } from "@storybook/react";
import { AddActivity, AddActivityProps } from "./AddActivity";
import store from "../activities/activitiesStore";
import { Provider } from "react-redux";

const meta: Meta = {
  title: "AddActivity",
  component: AddActivity,
  argTypes: {},
};

export default meta;
const Template: Story<AddActivityProps> = (args) => (
  <Provider store={store}>
    <AddActivity {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {};
