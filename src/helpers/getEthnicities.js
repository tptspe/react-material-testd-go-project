const { clientServer } = require("actions/api");

// export default ['Asian', 'African American', 'Caucasian', 'Hatian', 'Indian', 'Native American', 'Pacific Islander', 'Indian American', 'Taiwanese Americans', 'Chinese Americans & Taiwanese Americans', 'Korean American', 'Filipino American', 'Australian American', 'South African American', 'Austrian American', 'Japanese American', 'Singaporean American', 'Russian American', 'Pakistani American', 'Bulgarian American', 'Lithuanian American', 'Israeli American', 'Slovene American', 'Iranian American', 'Basque American', 'Lebanese American', 'Croatian American', 'Sri Lankan American', 'Scandinavian American', 'Belgian American', 'Swiss American', 'Italian American', 'Ukrainian American', 'Romanian American', 'Greek American', 'Polish American', 'Danish American', 'Swedish American', 'Slavic American', 'Norwegian American', 'Indonesian American', 'Canadian American', 'Czech American', 'Finnish American', 'Serbian American', 'French Canadian American', 'Hungarian American', 'Portuguese American', 'Cambodian American', 'Slovak American', 'Armenian American', 'Hmong American', 'Vietnamese American', 'German American', 'Irish American', 'Ghanaian American', 'Turkish American', 'Laotian American', 'Thai Americans', 'Palestinian American', 'Egyptian American', 'Dutch American', 'French American', 'Median American Household Income', 'Syrian American', 'Nepalese American', 'Albanian American', 'Polynesian American', 'Guyanese American', 'Nigerian American', 'British American', 'British West Indian American', 'Cuban American', 'West Indian American', 'Brazilian American', 'Barbadian American', 'Argentine American', 'Scotch-Irish American', 'Jamaican American', 'Trinbagonian Americans', 'Cajun American', 'Moroccan American', 'Peruvian Americans', 'American Americans', 'Scottish American', 'Jordanian American', 'Welsh American', 'Pennsylvania German American', 'Ecuadorian American', 'Colombian American', 'Haitian American', 'English American', 'Cape Verdean American', 'Bangladeshi American', 'Burmese American', 'Assyrian/Chaldean/Syriac American', 'Afghan American', 'Bahamian American', 'Ethiopian American', 'Mexican American', 'Puerto Rican American', 'African Americans', 'Iraqi American', 'Dominican American', 'Somali American'];
// export default ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Hispanic or Latino', 'Native Hawaiian or Other Pacific Islander', 'White', 'Two or More Races', 'Not Defined'];

let ethnicity = [];

if (clientServer === 'prod001' || clientServer === 'prod006')
  ethnicity = ['Hispanic', 'Non-Hispanic'];
else
  ethnicity = ['Hispanic', 'Non-Hispanic', 'White', 'Back or African American', 'American Indian or Alaska Native', 'Asian', 'Asian Indian', 'Chinese', 'Filipino', 'Japanese', 'Korean', 'Vietnamese', 'Other Asian', 'Native Hawaiian', 'Guamanian or Chamorro', 'Samoan', 'Other Pacific Islander', 'Other Race'];

export default ethnicity;