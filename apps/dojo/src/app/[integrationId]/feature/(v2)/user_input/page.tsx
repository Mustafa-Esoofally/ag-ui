"use client";
import React from "react";
import "@copilotkit/react-core/v2/styles.css";
import {
  useHumanInTheLoop,
  useConfigureSuggestions,
  CopilotChat,
  CopilotChatConfigurationProvider,
} from "@copilotkit/react-core/v2";
import { CopilotKit } from "@copilotkit/react-core";
import { z } from "zod";
import { UserInputFormCard } from "../hitl-components";

interface UserInputProps {
  params: Promise<{ integrationId: string }>;
}

const UserInput: React.FC<UserInputProps> = ({ params }) => {
  const { integrationId } = React.use(params);

  return (
    <CopilotKit
      runtimeUrl={`/api/copilotkit/${integrationId}`}
      showDevConsole={false}
      agent="user_input"
    >
      <CopilotChatConfigurationProvider agentId="user_input">
        <ChatContent />
      </CopilotChatConfigurationProvider>
    </CopilotKit>
  );
};

const ChatContent = () => {
  useConfigureSuggestions({
    suggestions: [
      { title: "Search", message: "Search the database for customer records" },
      { title: "API Key", message: "Configure my OpenAI API key" },
    ],
    available: "always",
  });

  useHumanInTheLoop({
    agentId: "user_input",
    name: "get_user_input",
    description: "Collect missing information from the user before continuing",
    parameters: z.object({
      user_input_fields: z.array(
        z.object({
          field_name: z.string(),
          field_type: z.string().optional(),
          field_description: z.string().optional(),
        }),
      ),
    }),
    render: ({ args, respond, status }: any) => (
      <UserInputFormCard args={args} respond={respond} status={status} />
    ),
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="h-full w-full md:w-8/10 md:h-8/10 rounded-lg">
        <CopilotChat
          agentId="user_input"
          className="h-full rounded-2xl max-w-6xl mx-auto"
        />
      </div>
    </div>
  );
};

export default UserInput;
