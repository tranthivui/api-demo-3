import { expect } from 'playwright/test';
import { test } from '../src/fixtures/api.fixture';
import { CreateRes } from '../src/types/user';

test('Get User', async ({ account }) => {
  const getUserRes=await account.api.get(`/Account/v1/User/${account.userID}`);
  const getUserData : CreateRes=await getUserRes.json();
  await expect(getUserRes).toBeOK();
  expect(getUserData.username).toEqual(account.user.userName);
});
