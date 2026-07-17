import { Page, Locator, expect } from "@playwright/test";
import { CopilotSelectors } from "../../utils/copilot-selectors";
import { sendAndAwaitResponse } from "../../utils/copilot-actions";
import { DEFAULT_WELCOME_MESSAGE } from "../../lib/constants";

export class BackendFeedbackPage {
  readonly page: Page;
  readonly chatInput: Locator;
  readonly sendButton: Locator;
  readonly agentGreeting: Locator;
  readonly agentMessage: Locator;
  readonly userMessage: Locator;
  readonly askUserCard: Locator;
  readonly askUserOptions: Locator;
  readonly askUserSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.agentGreeting = page.getByText(DEFAULT_WELCOME_MESSAGE);
    this.chatInput = CopilotSelectors.chatTextarea(page);
    this.sendButton = CopilotSelectors.sendButton(page);
    this.agentMessage = CopilotSelectors.assistantMessages(page);
    this.userMessage = CopilotSelectors.userMessages(page);
    this.askUserCard = page.getByTestId("ask-user-card");
    this.askUserOptions = page.getByTestId("ask-user-option");
    this.askUserSubmitButton = page.getByTestId("ask-user-submit");
  }

  async openChat() {
    await expect(this.agentGreeting).toBeVisible();
  }

  async sendMessage(message: string) {
    await sendAndAwaitResponse(this.page, message);
  }

  async selectOption(label: string | RegExp) {
    await this.askUserOptions.filter({ hasText: label }).first().click();
  }

  async submitSelectionAndAwait() {
    const countBefore = await this.page
      .locator('[data-testid="copilot-assistant-message"]')
      .count();
    await this.askUserSubmitButton.click();
    await this.askUserSubmitButton.waitFor({ state: "hidden" });
    await this.page.waitForFunction(
      (before) =>
        document.querySelectorAll('[data-testid="copilot-assistant-message"]')
          .length > before,
      countBefore,
      { timeout: 30000 },
    );
    await this.page.waitForFunction(
      () => document.querySelector('[data-copilot-running="false"]') !== null,
      null,
      { timeout: 60000 },
    );
  }

  async assertAgentReplyVisible(expectedText: RegExp) {
    await expect(
      this.agentMessage.last().getByText(expectedText),
    ).toBeVisible();
  }
}
