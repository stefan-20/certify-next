## Progress & Notes

### Utility

- seeding script for data table setup [DONE]

  - > > using prisma. utilities is done

  - user [DONE]
  - accreditations [DONE]
  - uploads [DEFER]
  - transactions [DEFER]
  - notifications [DEFER]

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

- **user flow** [DONE]

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

- **create accreditation flow** [DONE]

  - add accreditation schema [DONE]
    - added upload [DONE]
    - added transaction [DONE]
    - added enum for accreditation_type [DONE]
    - added enum for transaction_status [DONE]
  - fix accreditation page
    - update page wording [DONE]
      - update search input ui [DONE]
  - update table

    - update accreditation home layout [DONE]

      - update create accreditation button [DONE]

      - update table headers [DONE]
      - update row generation [DONE]
        - add description field [DONE]
        - change status column & component to transaction_status [DONE]
        - add owner and creator [DONE]
          - fetch nested object fields from schema [DONE]
        - fix update, delete [DONE]
          - fix data flow [DONE]
          - > > UPDATE [DONE]
        - add transact button
          - add ui button [DONE]
            - > > see transaction workflow

    - update search function [DONE]

      - access session/cookie to get user [DONE]
        - https://github.com/nextauthjs/next-auth/issues/7913
        - how to access session
          - https://next-auth.js.org/configuration/nextjs#in-app-directory
          - > > not needed. call auth() directly
      - migrate accreditation query to user [DONE]
      - add query field to data query [DONE]
        - > > change query to accreditations and use user relation due to many-to-one relation
        - for name [DONE]
        - for description [DONE]
      - change query to go via accreditation flow [DONE]

        - flow:
          - get accred where owner or creator name = logged in user [DONE]
        - for utility: add user id to token [DONE]

      - add last transaction status to accreditation schema [DONE]
        - > > to show in table. uses the status (null, pending, confirmed) of the current / latest transaction. Will be needed to ensure that no accreditation can be transacted to two people at the same time and allow a cleaner workflow (e.g.: sending a notification when managing accreditation)
      - add description field to accreditation schema [DONE]

  - update create UI [DONE]
    - add name field [DONE]
    - add text field [DONE]
    - add file upload [DONE]
    - add select type [DONE]
      - data query for enum [DONE]
    - add valid from [DONE]
      - create datepicker component [DONE]
      - pass arguments: id and default date [DONE]
    - check data from form [DONE]
      - fix dispatch function
        - create validation form [DONE]
        - correctly parse dates for postgres injestion [DONE]
          - check if datepicker output can be changed
        - prisma create accreditation statement [DONE]
        - redirect to accreditation overview [DONE]

- **edit accreditation flow**

  - update edit page [DONE]
    - update breadcrumbs [DONE]
    - update data fetch functions and imports [DONE]
  - update edit form ui [DONE]
  - prefill form [DONE]
  - update fetch accreditationById [DONE]
  - update pencil button routing [DONE]
  - update updateAccreditation function [DONE]

- **transact accreditation flow**

  - update routing of send button (accreditation page) [DONE]
  - add to sidebar [DONE]
  - create transaction page ui [DONE]
    - create table []
      - headers [DONE]
      - row generation [DONE]
      - ACTIONS [DONE]
    - create button to create new transaction [DONE]
    - create search functionality [DONE]
    - create fetch function [DONE]
      - structure query [DONE]
      - date and object formatting [DONE]
      - update transaction model [DEFER]
  - update schema with to, from and created on [DONE]
    - > > required to quickly retreive target user and query by creator
  - create **create transaction** page []
    - dropdown transaction select accreditation []
    - dropdown transaction select user []
      - create a searchable dropdown []
    - toggle to add notification
    - cancel button
    - create button

- **validate user flow**

  - add validation to navbar and create route and page [DONE]

- **other**
- create accreditation view / review page []
  - > > required to preview before creating
  - > > required after verification to actually view
- make tables filterable []
  - accreditation []
  - transaction []
  - validation []
- make dropdown (transactions) searchable []
- properly hook up nextui []

  - https://nextui.org/docs/guide/installation

- improvementts

  - fixed column widths for edit, transcribe, ...
  - required for valid from
  - Date column naming
  - change order in sidebar
  - form label namings shorten to input type
  - add option to not allow continuous transactions

- resolving fs module error when importing things on client side that are not bundled
  - https://maikelveen.com/blog/how-to-solve-module-not-found-cant-resolve-fs-in-nextjs
