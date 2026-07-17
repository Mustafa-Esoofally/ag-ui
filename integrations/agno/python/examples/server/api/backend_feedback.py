"""Example: Agno Agent with backend user feedback (UserFeedbackTools).

Demonstrates the AG-UI dojo ``backend_feedback`` feature. The agent uses
``UserFeedbackTools`` (the ``ask_user`` tool) to pause and ask the user to
choose from structured options before continuing. Over AG-UI the pause surfaces
as a ``TOOL_CALL_*`` for ``ask_user`` whose args carry the questions and their
options; the client renders the choices and returns the answer as a
``ToolMessage`` with content ``{"selections": {"<question>": ["<label>", ...]}}``.
"""

from agno.agent.agent import Agent
from agno.db.in_memory import InMemoryDb
from agno.models.openai import OpenAIResponses
from agno.os import AgentOS
from agno.os.interfaces.agui import AGUI
from agno.tools.user_feedback import UserFeedbackTools

agent = Agent(
    model=OpenAIResponses(id="gpt-5.6"),
    db=InMemoryDb(),
    tools=[UserFeedbackTools()],
    description="You help the user make decisions by asking clarifying questions.",
    instructions=(
        "When a choice would benefit from the user's input, call the `ask_user` tool with a "
        "clear question and 2-4 concise options instead of guessing. Wait for the user's "
        "selection, then continue using exactly what they picked and briefly confirm the "
        "chosen option in your final answer."
    ),
)

agent_os = AgentOS(agents=[agent], interfaces=[AGUI(agent=agent)])

app = agent_os.get_app()
