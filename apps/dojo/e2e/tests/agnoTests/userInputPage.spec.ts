import { test, expect } from "../../test-isolation-helper";
import { UserInputPage } from "../../pages/agnoPages/UserInputPage";

test.describe("User Input Feature", () => {
  test("[Agno] should render the input form and continue after submission", async ({
    page,
  }) => {
    const userInput = new UserInputPage(page);

    await page.goto("/agno/feature/user_input");

    await userInput.openChat();

    await userInput.sendMessage("Configure my OpenAI API key");
    await expect(userInput.userInputForm).toBeVisible();

    await userInput.fillField("macOS");
    await userInput.submitFormAndAwait();

    await userInput.sendMessage("Which environment did I provide?");
    await userInput.assertAgentReplyVisible(/macOS/);
  });
});
