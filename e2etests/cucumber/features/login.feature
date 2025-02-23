Feature: To Test the Login Functionality

  @prod @staging @int
  Scenario: Test login with correct credential
    Given User is on login page
    When User enter the correct credential

  # Scenario: Test login with incorrect credential
  #   Given User is on login page
  #   When User enter the correct credential

  @prod
  Scenario: Test login with correct credential2
    Given User is on login page
    When User enter the correct credential

  Scenario: Test login with incorrect credential2
    Given User is on login page
    When User enter the correct credential
