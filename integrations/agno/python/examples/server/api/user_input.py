"""Example: Agno Agent with backend user input (UserControlFlowTools).

Demonstrates the AG-UI dojo ``user_input`` feature. The agent uses
``UserControlFlowTools`` (the ``get_user_input`` tool) to pause and collect
missing information from the user as a form. Over AG-UI the pause surfaces as a
``TOOL_CALL_*`` for ``get_user_input`` whose args carry the requested fields;
the client renders the inputs and returns the answer as a ``ToolMessage`` with
content ``{"values": {"<field_name>": "<value>", ...}}``.
"""

from agno.agent.agent import Agent
from agno.db.in_memory import InMemoryDb
from agno.models.openai import OpenAIResponses
from agno.os import AgentOS
from agno.os.interfaces.agui import AGUI
from agno.tools.user_control_flow import UserControlFlowTools

agent = Agent(
    model=OpenAIResponses(id="gpt-5.6"),
    db=InMemoryDb(),
    tools=[UserControlFlowTools()],
    description="You collect any information you are missing before completing a task.",
    instructions=(
        "When you need information you don't have, call the `get_user_input` tool with the "
        "fields you require (each with a name, type, and short description) instead of "
        "guessing. Once the user provides the values, continue and complete the task."
    ),
)

agent_os = AgentOS(agents=[agent], interfaces=[AGUI(agent=agent)])

app = agent_os.get_app()
