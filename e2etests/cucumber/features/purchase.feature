Feature: To Test the Purchase Functionality

  @prod @staging @int
  Scenario: Test login as a registered user and place an order
    Given User is on login page
    When User login as a registered user "vuduchoang2019@gmail.com" and password "test123@Xx"
    And User go to the shopping cart
    And User clear the shopping cart
    And User add 2 items of "Men" "Tops" "Jackets" to Cart
    And User add 1 items of "Men" "Bottoms" "Pants" to Cart
    And User go to the shopping cart
    And User proceed to checkout
    Then User verify the order summary
    And User enter a valid delivery address
    And User select delivery method "Best Way"
    Then User place the order
    And User verify order submission under My Orders

