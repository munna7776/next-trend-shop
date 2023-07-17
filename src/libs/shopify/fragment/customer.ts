const addressFragment = `
    fragment address on MailingAddress {
        address1
        address2
        city
        company
        country
        countryCodeV2
        firstName
        formatted(withName:true,withCompany:false)
        formattedArea
        id
        lastName
        latitude
        longitude
        name
        phon
        province
        provinceCode
        zip
    }
`

export const customerFragment = `
 fragment customer on Customer {
    email
    firstName
    lastName
    id
    phone
    tags
 }
`

