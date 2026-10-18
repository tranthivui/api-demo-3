import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';
import { GetUserRes } from '../src/types/user';

test('Get User with correct token', async ({ account }) => {
  const getUserRes = await account.api.get(`/Account/v1/User/${account.userID}`);
  const getUserData: GetUserRes = await getUserRes.json();
  await expect(getUserRes).toBeOK();
  expect(getUserData.username).toEqual(account.user.userName);
  expect(getUserData.userId).toEqual(account.userID);
});

test('Get User without token', async ({ account, request }) => {
  const getUserRes = await request.get(`/Account/v1/User/${account.userID}`);
  expect(getUserRes.status()).toEqual(401);
});

test('Get User incorrect token', async ({ account, request }) => {
  const getUserRes = await request.get(`/Account/v1/User/${account.userID}`, {
    headers: {
      Authorization: `Bearer ABSJFHFS`
    }
  });
  expect(getUserRes.status()).toEqual(401);
});