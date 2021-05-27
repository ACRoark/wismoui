Feature: Routing

  #
  # TODO: Replace credentials with username and password that actually work
  #
  # Scenario: Authenticated user with multiple active orders is routed to the Summary page
  #   Given I login as "BP1100057320@DTEACCEPT.COM" with "TEST1234"
  #     And I have multiple active orders
  #   When I browse to the Order Tracker app
  #   Then I am routed to the "Summary" page
  #     And I see all of my active orders listed

  #
  # TODO: Replace credentials with username and password that actually work
  #
  # Scenario: Authenticated user with no active orders is routed to the Summary page
  #   Given I login as "BP1100057320@DTEACCEPT.COM" with "TEST1234"
  #     And I have no active orders
  #   When I browse to the Order Tracker app
  #   Then I am routed to the "Summary" page
  #     And I see the banner message "You have no active orders to track within our Order Tracker."

  #
  # TODO: Replace credentials with username and password that actually work
  #
  # Scenario: Authenticated user with one active order is routed to the Status page
  #   Given I login as "BP1100057320@DTEACCEPT.COM" with "TEST1234"
  #     And I have one active order
  #   When I browse to the Order Tracker app
  #   Then I am routed to the "Status" page
  #     And I see the status of my active order

  #
  # For some reason the Track Orders button is not being recognized as clickable
  #
  # Scenario: Track Orders from Newlook routes to the Guest Login page
  #   Given I am an unauthenticated user
  #     And I browse to the "Unified Login" page
  #   When I click the Track Orders button
  #   Then I am routed to the "Guest Login" page

  Scenario: Unauthenticated users are routed to the Guest Login page
    Given I am an unauthenticated user
    When I browse to the Order Tracker app
    Then I am routed to the "Guest Login" page
