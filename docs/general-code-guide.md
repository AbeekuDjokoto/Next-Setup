# General Code Guide

This guide contains assumptions we'll be making with regards to the code written in this repo.

### Assumptions

- Categorize components into either shared or feature.

1. Shared being reuseable components used throught out this repo. ie.

   - _./components/shared[**ComponentName**]_: shared components

2. Feature being components that are specific to a particular feature eg. user, admin, and website ie.
   - _./components/featured/user[**ComponentName**]_: components being used in user
   - _./components/featured/admin[**ComponentName**]_: components being used in admin
   - _./components/featured/website[**ComponentName**]_: components being used in website
