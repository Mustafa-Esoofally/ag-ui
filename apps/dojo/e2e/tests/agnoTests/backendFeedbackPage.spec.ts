import { test, expect } from "../../test-isolation-helper";
import { BackendFeedbackPage } from "../../pages/agnoPages/BackendFeedbackPage";

test.describe("Backend Feedback Feature", () => {
  test("[Agno] should render the ask_user card and continue after a selection", async ({
    page,
  }) => {
    const backendFeedback = new BackendFeedbackPage(page);

    await page.goto("/agno/feature/backend_feedback");

    await backendFeedback.openChat();

    await backendFeedback.sendMessage("Help me pick a cuisine for dinner");
    await expect(backendFeedback.askUserCard).toBeVisible();

    await backendFeedback.selectOption("Italian");
    await backendFeedback.submitSelectionAndAwait();

    await backendFeedback.sendMessage("Which cuisine did I pick?");
    await backendFeedback.assertAgentReplyVisible(/Italian/);
  });
});
