"""Example: Agno Team with a member tool requiring confirmation.

Demonstrates the AG-UI dojo ``team_human_in_the_loop`` feature. A support team
routes email requests to an Emailer member whose ``send_email`` tool is gated by
``requires_confirmation=True``. When the member pauses, the pause surfaces over
AG-UI as a ``TOOL_CALL_*`` for ``send_email`` -- exactly like the single-agent
case; the client confirms with ``{"accepted": true}`` and the team continues.
"""

from agno.agent.agent import Agent
from agno.db.in_memory import InMemoryDb
from agno.models.openai import OpenAIResponses
from agno.os import AgentOS
from agno.os.interfaces.agui import AGUI
from agno.team import Team
from agno.tools import tool

db = InMemoryDb()


@tool(requires_confirmation=True)
def send_email(to: str, subject: str, body: str) -> str:
    """Send an email. Pauses for human confirmation before it is sent."""
    return f"Email sent to {to} with subject '{subject}'."


researcher = Agent(
    name="Researcher",
    model=OpenAIResponses(id="gpt-5.6"),
    db=db,
    instructions="Answer factual questions concisely. You do not send emails.",
)

emailer = Agent(
    name="Emailer",
    model=OpenAIResponses(id="gpt-5.6"),
    db=db,
    tools=[send_email],
    instructions=(
        "You send emails. ALWAYS call send_email immediately with the recipient, a subject, "
        "and a body; if the user did not give a subject or body, draft a reasonable one. "
        "NEVER ask for permission or confirmation in chat -- the send_email tool itself pauses "
        "for the user's confirmation before anything is sent. After a confirmed send, briefly "
        "say the email was sent. If the user declines, do not resend; acknowledge it was "
        "cancelled."
    ),
)

support_team = Team(
    name="support_team",
    model=OpenAIResponses(id="gpt-5.6"),
    db=db,
    members=[researcher, emailer],
    instructions=(
        "Route email requests directly to the Emailer and factual questions to the Researcher. "
        "Do not ask the user follow-up questions about email content -- the Emailer drafts "
        "anything missing and the user confirms before any email is sent."
    ),
    add_history_to_context=True,
)

agent_os = AgentOS(teams=[support_team], interfaces=[AGUI(team=support_team)])

app = agent_os.get_app()
