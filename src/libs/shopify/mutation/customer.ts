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
`