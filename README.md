## Progress & Notes

### Utility

- seeding script for data table setup [DEFER]

  - user [DONE]
  - accreditations [DONE]
  - uploads
  - transactions
  - notifications

- add docker compose postgres and adminer (reduce hosting cost) [DONE]

- add prisma to the project for migrations and query utilities [DONE]
  - install packages [DONE]
  - baseline database [DEFER]
    - > > empty
  - create basic schema [DONE]
    - user
  - create client [DONE]
  - create migration [DONE]
  - test query utility for registration page [DONE]
  - create a global scoped prisma client and module to use throughout app [DONE]

### Functionality

- replace certify name & logo [DONE]
- landing page

  - adjust text for certify [DONE]
  - add register button [DONE]
  - adjust image [DEFER]

- user flow [DONE]

  - create data model for user [DONE]
    - > > definitions.ts [DONE]
  - create registration page ui [DONE]
    - add login link with redirect [DONE]
    - add Name field [DONE]
    - add confirmPassword field [DONE]
  - create actions for registration
    - compare passwords [DONE]
      - raise error if not match [DONE]
    - check if user exists [DONE]
    - create user [DONE]
    - show successful creation [DEFER]
    - redirect to login [DONE]
  - seed table with certify_user table [DONE]
  - hook up ui with login [DONE]
    - add registration link to login [DONE]
  - migrate login and auth to prisma [DONE]
    - added UserDoesntExist error [DONE]

- create accreditation flow

  - add accreditation schema [DONE]
    - added upload [DONE]
    - added transaction [DONE]
    - added enum for accreditation_type [DONE]
    - added enum for transaction_status [DONE]
  - fix accreditation page
    - update page wording [DONE]
      - update search input ui [DONE]
  - update table
    - update layout []
    - update search function []
      - access session/cookie to get user []
      - migrate accreditation query to user []
