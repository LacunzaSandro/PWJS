Feature: User Authentication tests

  Background: 
    Given User navigates to the application
    And User click on the login link

  @test
  Scenario: Login should not be success
    Given User enter the username as "koushik"
    Given User enter the password as "Passkoushik"
    When User click on the login button
    Then Login should fail

  @authentication
  Scenario: Login should be success
    And User enter the username as "ortoni11"
    And User enter the password as "Pass1234"
    When User click on the login button
    Then Login should be success

  @fail
  Scenario Outline: Login should not be success <username>
    And User enter the username as "<username>"
    And User enter the password as "<password>"
    When User click on the login button
    Then Login should be success

    Examples: 
      | username | password  |
      | ortoni   | pass1234$ |
      | ortonikc | pass1234  |
