export const getCustomerQuery = `
query customer($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      email
      firstName
      lastName
      phone
    }
}
`