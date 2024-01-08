Feature: User Authentication tests

  Background: 
    Given User navigates to the application

  @add @severity:critical
  Scenario Outline: Authenticated Users - Add to cart <book>
    When user search for a "<book>"
    And user add the book to the cart
    Then the cart badge should get updated

    Examples: 
      | username | password  | book            |
      | ortoni   | pass1234$ | Roomies         |
      | ortonikc | pass1234  | The Simple Wild |
