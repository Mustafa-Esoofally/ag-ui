"""Example API for a AG-UI compatible Agno Agent UI."""

from __future__ import annotations

from .agentic_chat import app as agentic_chat_app
from .agentic_chat_multimodal import app as agentic_chat_multimodal_app
from .agentic_chat_reasoning import app as agentic_chat_reasoning_app
from .agentic_generative_ui import app as agentic_generative_ui_app
from .backend_feedback import app as backend_feedback_app
from .backend_tool_rendering import app as backend_tool_rendering_app
from .human_in_the_loop import app as human_in_the_loop_app
from .predictive_state_updates import app as predictive_state_updates_app
from .shared_state import app as shared_state_app
from .team_human_in_the_loop import app as team_human_in_the_loop_app
from .tool_based_generative_ui import app as tool_based_generative_ui_app
from .user_input import app as user_input_app

__all__ = [
    "agentic_chat_app",
    "agentic_chat_multimodal_app",
    "agentic_chat_reasoning_app",
    "agentic_generative_ui_app",
    "backend_feedback_app",
    "backend_tool_rendering_app",
    "human_in_the_loop_app",
    "predictive_state_updates_app",
    "shared_state_app",
    "team_human_in_the_loop_app",
    "tool_based_generative_ui_app",
    "user_input_app",
]
