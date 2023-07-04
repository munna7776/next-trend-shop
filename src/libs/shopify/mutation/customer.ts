export const customerCreate = `
mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
}
`;

export const customerAccessTokenCreate = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`