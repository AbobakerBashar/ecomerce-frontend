# Dashboard/Settings Redesign - TODO

## Steps

- [x] Step 1: Add `UpdateProfileInput` and `ChangePasswordInput` types to `types/user.ts`
- [x] Step 2: Add `updateProfileAction` and `changePasswordAction` server actions to `lib/auth.ts`
- [x] Step 3: Add `useUpdateProfile()` and `useChangePassword()` hooks to `hooks/user.ts`
- [x] Step 4: Redesign `app/(protected)/dashboard/settings/page.tsx` with Profile + Password tabs
- [x] Step 5: Redirect `/dashboard/profile` to `/dashboard/settings`
