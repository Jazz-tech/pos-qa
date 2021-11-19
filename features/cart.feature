Feature: Add to cart feature

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the home page
    When I select <productIndex> and <productSize>
    Then Add the product to cart

    Examples:
      | productIndex | productSize |
      | 1            | L           |
      | 2            | M           |
