import { Meta, Story } from "@storybook/react";
import Message, { MessageProps } from "./Message";

const meta: Meta = {
  title: "Message",
  component: Message,
};

export default meta;

const Template: Story<MessageProps> = (args) => <Message {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Message to show",
  variant: "blue",
  size: "medium",
};
