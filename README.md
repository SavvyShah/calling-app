# Assumptions

- Missing fields
  - If the `call_type` is not present then it is assumed to be `voicemail`
  - If the `from`, `to` and `via` fields are not present then it is assumed to be `Anonymous`
  - If the `duration` field is not present then it is assumed to be `0`
  - If the `created_at` field is not present then it is assumed to be `Date.now()`
- We assume that this app is going to be used on mobile mostly. So, we have made the layout such that it only takes a width of mobile screen on the desktop too.
