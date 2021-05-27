Feature: N/A

  Scenario: Guest page has proper title
    Given I am an unauthenticated user
    When I browse to the "Guest Login" page
    Then the window title is "Order Tracker | DTE Energy"
