import { When } from 'cucumber';

import { UnifiedLoginPage } from '../../page-objects';

When(/^I click the Track Orders button$/, async (): Promise<void> => UnifiedLoginPage.clickTrackOrderButton());
