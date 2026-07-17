import { test, expect } from "../../test-isolation-helper";
import { TeamHumanInTheLoopPage } from "../../pages/agnoPages/TeamHumanInTheLoopPage";

test.describe("Team Human in the Loop Feature", () => {
  test("[Agno] should send the email after user approval", async ({
    page,
  }) => {
    const teamHitl = new TeamHumanInTheLoopPage(page);

    await page.goto("/agno/feature/team_human_in_the_loop");

    await teamHitl.openChat();

    await teamHitl.sendMessage(
      "Send an email to alice@example.com — subject 'Tomorrow's Meeting', body 'Reminder about our 10am meeting.'",
    );
    await expect(teamHitl.confirmEmailCard).toBeVisible();

    await teamHitl.approveEmailAndAwait();

    await teamHitl.sendMessage("was the email sent?");
    await teamHitl.assertAgentReplyVisible(/Yes/);
  });

  test("[Agno] should cancel the email when the user declines", async ({
    page,
  }) => {
    const teamHitl = new TeamHumanInTheLoopPage(page);

    await page.goto("/agno/feature/team_human_in_the_loop");

    await teamHitl.openChat();

    await teamHitl.sendMessage(
      "Send an email to alice@example.com — subject 'Tomorrow's Meeting', body 'Reminder about our 10am meeting.'",
    );
    await expect(teamHitl.confirmEmailCard).toBeVisible();

    await teamHitl.declineEmailAndAwait();
  });
});
