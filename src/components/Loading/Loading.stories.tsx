import { Meta, Story } from "@storybook/react";
import Loading, { LoadingProps } from "./Loading";

const meta: Meta = {
  title: "Loading",
  component: Loading,
};

export default meta;

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "medium",
};
