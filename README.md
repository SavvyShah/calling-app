# Website link

Netlify: [https://fantastic-licorice-eb25f9.netlify.app/](https://fantastic-licorice-eb25f9.netlify.app/)

# Assumptions

- Missing fields assumption. This can be changed by changing defaults in `useActivities` hook.
  - If the `call_type` is not present then it is assumed to be `voicemail`
  - If the `from`, `to` and `via` fields are not present then it is assumed to be `Anonymous`
  - If the `duration` field is not present then it is assumed to be `0`
  - If the `created_at` field is not present then it is assumed to be `Date.now()`
- I assume that this app is going to be used on mobile mostly. So, I have made the layout such that it only takes a width of mobile screen on the desktop too.

# Optimistic update

When we archive or unarchive an activity, we update the state optimistically. If the API call fails, we revert the state back to the previous state. Check `src/hooks/useActivities.js` for more details.

# Footer

There are additional icons in the footer, present for making UI look complete, which don't do anything. They are the two icons from the last namely contact-list and messages.

# How to run locally

```sh
yarn install
yarn dev
```
