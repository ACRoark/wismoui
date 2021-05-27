Feature: Form Invalidation

  Scenario: Error message when Order Number is missing
    Given I am an unauthenticated user
      And I browse to the Order Tracker app
      And I enter "Smith" in the Name input field
    When I click the Submit button
    Then the window title is "Order Tracker | DTE Energy"
