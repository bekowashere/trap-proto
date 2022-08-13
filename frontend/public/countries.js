const countriesData = [
    {
        "id": 1,
        "name": "Afghanistan",
        "iso2": "AF"
    },
    {
        "id": 2,
        "name": "Aland Islands",
        "iso2": "AX"
    },
    {
        "id": 3,
        "name": "Albania",
        "iso2": "AL"
    },
    {
        "id": 4,
        "name": "Algeria",
        "iso2": "DZ"
    },
    {
        "id": 5,
        "name": "American Samoa",
        "iso2": "AS"
    },
    {
        "id": 6,
        "name": "Andorra",
        "iso2": "AD"
    },
    {
        "id": 7,
        "name": "Angola",
        "iso2": "AO"
    },
    {
        "id": 8,
        "name": "Anguilla",
        "iso2": "AI"
    },
    {
        "id": 9,
        "name": "Antarctica",
        "iso2": "AQ"
    },
    {
        "id": 10,
        "name": "Antigua And Barbuda",
        "iso2": "AG"
    },
    {
        "id": 11,
        "name": "Argentina",
        "iso2": "AR"
    },
    {
        "id": 12,
        "name": "Armenia",
        "iso2": "AM"
    },
    {
        "id": 13,
        "name": "Aruba",
        "iso2": "AW"
    },
    {
        "id": 14,
        "name": "Australia",
        "iso2": "AU"
    },
    {
        "id": 15,
        "name": "Austria",
        "iso2": "AT"
    },
    {
        "id": 16,
        "name": "Azerbaijan",
        "iso2": "AZ"
    },
    {
        "id": 17,
        "name": "Bahrain",
        "iso2": "BH"
    },
    {
        "id": 18,
        "name": "Bangladesh",
        "iso2": "BD"
    },
    {
        "id": 19,
        "name": "Barbados",
        "iso2": "BB"
    },
    {
        "id": 20,
        "name": "Belarus",
        "iso2": "BY"
    },
    {
        "id": 21,
        "name": "Belgium",
        "iso2": "BE"
    },
    {
        "id": 22,
        "name": "Belize",
        "iso2": "BZ"
    },
    {
        "id": 23,
        "name": "Benin",
        "iso2": "BJ"
    },
    {
        "id": 24,
        "name": "Bermuda",
        "iso2": "BM"
    },
    {
        "id": 25,
        "name": "Bhutan",
        "iso2": "BT"
    },
    {
        "id": 26,
        "name": "Bolivia",
        "iso2": "BO"
    },
    {
        "id": 27,
        "name": "Bonaire, Sint Eustatius and Saba",
        "iso2": "BQ"
    },
    {
        "id": 28,
        "name": "Bosnia and Herzegovina",
        "iso2": "BA"
    },
    {
        "id": 29,
        "name": "Botswana",
        "iso2": "BW"
    },
    {
        "id": 30,
        "name": "Bouvet Island",
        "iso2": "BV"
    },
    {
        "id": 31,
        "name": "Brazil",
        "iso2": "BR"
    },
    {
        "id": 32,
        "name": "British Indian Ocean Territory",
        "iso2": "IO"
    },
    {
        "id": 33,
        "name": "Brunei",
        "iso2": "BN"
    },
    {
        "id": 34,
        "name": "Bulgaria",
        "iso2": "BG"
    },
    {
        "id": 35,
        "name": "Burkina Faso",
        "iso2": "BF"
    },
    {
        "id": 36,
        "name": "Burundi",
        "iso2": "BI"
    },
    {
        "id": 37,
        "name": "Cambodia",
        "iso2": "KH"
    },
    {
        "id": 38,
        "name": "Cameroon",
        "iso2": "CM"
    },
    {
        "id": 39,
        "name": "Canada",
        "iso2": "CA"
    },
    {
        "id": 40,
        "name": "Cape Verde",
        "iso2": "CV"
    },
    {
        "id": 41,
        "name": "Cayman Islands",
        "iso2": "KY"
    },
    {
        "id": 42,
        "name": "Central African Republic",
        "iso2": "CF"
    },
    {
        "id": 43,
        "name": "Chad",
        "iso2": "TD"
    },
    {
        "id": 44,
        "name": "Chile",
        "iso2": "CL"
    },
    {
        "id": 45,
        "name": "China",
        "iso2": "CN"
    },
    {
        "id": 46,
        "name": "Christmas Island",
        "iso2": "CX"
    },
    {
        "id": 47,
        "name": "Cocos (Keeling) Islands",
        "iso2": "CC"
    },
    {
        "id": 48,
        "name": "Colombia",
        "iso2": "CO"
    },
    {
        "id": 49,
        "name": "Comoros",
        "iso2": "KM"
    },
    {
        "id": 50,
        "name": "Congo",
        "iso2": "CG"
    },
    {
        "id": 51,
        "name": "Cook Islands",
        "iso2": "CK"
    },
    {
        "id": 52,
        "name": "Costa Rica",
        "iso2": "CR"
    },
    {
        "id": 53,
        "name": "Cote D'Ivoire (Ivory Coast)",
        "iso2": "CI"
    },
    {
        "id": 54,
        "name": "Croatia",
        "iso2": "HR"
    },
    {
        "id": 55,
        "name": "Cuba",
        "iso2": "CU"
    },
    {
        "id": 56,
        "name": "Curaçao",
        "iso2": "CW"
    },
    {
        "id": 57,
        "name": "Cyprus",
        "iso2": "CY"
    },
    {
        "id": 58,
        "name": "Czech Republic",
        "iso2": "CZ"
    },
    {
        "id": 59,
        "name": "Democratic Republic of the Congo",
        "iso2": "CD"
    },
    {
        "id": 60,
        "name": "Denmark",
        "iso2": "DK"
    },
    {
        "id": 61,
        "name": "Djibouti",
        "iso2": "DJ"
    },
    {
        "id": 62,
        "name": "Dominica",
        "iso2": "DM"
    },
    {
        "id": 63,
        "name": "Dominican Republic",
        "iso2": "DO"
    },
    {
        "id": 64,
        "name": "East Timor",
        "iso2": "TL"
    },
    {
        "id": 65,
        "name": "Ecuador",
        "iso2": "EC"
    },
    {
        "id": 66,
        "name": "Egypt",
        "iso2": "EG"
    },
    {
        "id": 67,
        "name": "El Salvador",
        "iso2": "SV"
    },
    {
        "id": 68,
        "name": "Equatorial Guinea",
        "iso2": "GQ"
    },
    {
        "id": 69,
        "name": "Eritrea",
        "iso2": "ER"
    },
    {
        "id": 70,
        "name": "Estonia",
        "iso2": "EE"
    },
    {
        "id": 71,
        "name": "Ethiopia",
        "iso2": "ET"
    },
    {
        "id": 72,
        "name": "Falkland Islands",
        "iso2": "FK"
    },
    {
        "id": 73,
        "name": "Faroe Islands",
        "iso2": "FO"
    },
    {
        "id": 74,
        "name": "Fiji Islands",
        "iso2": "FJ"
    },
    {
        "id": 75,
        "name": "Finland",
        "iso2": "FI"
    },
    {
        "id": 76,
        "name": "France",
        "iso2": "FR"
    },
    {
        "id": 77,
        "name": "French Guiana",
        "iso2": "GF"
    },
    {
        "id": 78,
        "name": "French Polynesia",
        "iso2": "PF"
    },
    {
        "id": 79,
        "name": "French Southern Territories",
        "iso2": "TF"
    },
    {
        "id": 80,
        "name": "Gabon",
        "iso2": "GA"
    },
    {
        "id": 81,
        "name": "Gambia The",
        "iso2": "GM"
    },
    {
        "id": 82,
        "name": "Georgia",
        "iso2": "GE"
    },
    {
        "id": 83,
        "name": "Germany",
        "iso2": "DE"
    },
    {
        "id": 84,
        "name": "Ghana",
        "iso2": "GH"
    },
    {
        "id": 85,
        "name": "Gibraltar",
        "iso2": "GI"
    },
    {
        "id": 86,
        "name": "Greece",
        "iso2": "GR"
    },
    {
        "id": 87,
        "name": "Greenland",
        "iso2": "GL"
    },
    {
        "id": 88,
        "name": "Grenada",
        "iso2": "GD"
    },
    {
        "id": 89,
        "name": "Guadeloupe",
        "iso2": "GP"
    },
    {
        "id": 90,
        "name": "Guam",
        "iso2": "GU"
    },
    {
        "id": 91,
        "name": "Guatemala",
        "iso2": "GT"
    },
    {
        "id": 92,
        "name": "Guernsey and Alderney",
        "iso2": "GG"
    },
    {
        "id": 93,
        "name": "Guinea",
        "iso2": "GN"
    },
    {
        "id": 94,
        "name": "Guinea-Bissau",
        "iso2": "GW"
    },
    {
        "id": 95,
        "name": "Guyana",
        "iso2": "GY"
    },
    {
        "id": 96,
        "name": "Haiti",
        "iso2": "HT"
    },
    {
        "id": 97,
        "name": "Heard Island and McDonald Islands",
        "iso2": "HM"
    },
    {
        "id": 98,
        "name": "Honduras",
        "iso2": "HN"
    },
    {
        "id": 99,
        "name": "Hong Kong S.A.R.",
        "iso2": "HK"
    },
    {
        "id": 100,
        "name": "Hungary",
        "iso2": "HU"
    },
    {
        "id": 101,
        "name": "Iceland",
        "iso2": "IS"
    },
    {
        "id": 102,
        "name": "India",
        "iso2": "IN"
    },
    {
        "id": 103,
        "name": "Indonesia",
        "iso2": "ID"
    },
    {
        "id": 104,
        "name": "Iran",
        "iso2": "IR"
    },
    {
        "id": 105,
        "name": "Iraq",
        "iso2": "IQ"
    },
    {
        "id": 106,
        "name": "Ireland",
        "iso2": "IE"
    },
    {
        "id": 107,
        "name": "Israel",
        "iso2": "IL"
    },
    {
        "id": 108,
        "name": "Italy",
        "iso2": "IT"
    },
    {
        "id": 109,
        "name": "Jamaica",
        "iso2": "JM"
    },
    {
        "id": 110,
        "name": "Japan",
        "iso2": "JP"
    },
    {
        "id": 111,
        "name": "Jersey",
        "iso2": "JE"
    },
    {
        "id": 112,
        "name": "Jordan",
        "iso2": "JO"
    },
    {
        "id": 113,
        "name": "Kazakhstan",
        "iso2": "KZ"
    },
    {
        "id": 114,
        "name": "Kenya",
        "iso2": "KE"
    },
    {
        "id": 115,
        "name": "Kiribati",
        "iso2": "KI"
    },
    {
        "id": 116,
        "name": "Kosovo",
        "iso2": "XK"
    },
    {
        "id": 117,
        "name": "Kuwait",
        "iso2": "KW"
    },
    {
        "id": 118,
        "name": "Kyrgyzstan",
        "iso2": "KG"
    },
    {
        "id": 119,
        "name": "Laos",
        "iso2": "LA"
    },
    {
        "id": 120,
        "name": "Latvia",
        "iso2": "LV"
    },
    {
        "id": 121,
        "name": "Lebanon",
        "iso2": "LB"
    },
    {
        "id": 122,
        "name": "Lesotho",
        "iso2": "LS"
    },
    {
        "id": 123,
        "name": "Liberia",
        "iso2": "LR"
    },
    {
        "id": 124,
        "name": "Libya",
        "iso2": "LY"
    },
    {
        "id": 125,
        "name": "Liechtenstein",
        "iso2": "LI"
    },
    {
        "id": 126,
        "name": "Lithuania",
        "iso2": "LT"
    },
    {
        "id": 127,
        "name": "Luxembourg",
        "iso2": "LU"
    },
    {
        "id": 128,
        "name": "Macau S.A.R.",
        "iso2": "MO"
    },
    {
        "id": 129,
        "name": "Macedonia",
        "iso2": "MK"
    },
    {
        "id": 130,
        "name": "Madagascar",
        "iso2": "MG"
    },
    {
        "id": 131,
        "name": "Malawi",
        "iso2": "MW"
    },
    {
        "id": 132,
        "name": "Malaysia",
        "iso2": "MY"
    },
    {
        "id": 133,
        "name": "Maldives",
        "iso2": "MV"
    },
    {
        "id": 134,
        "name": "Mali",
        "iso2": "ML"
    },
    {
        "id": 135,
        "name": "Malta",
        "iso2": "MT"
    },
    {
        "id": 136,
        "name": "Man (Isle of)",
        "iso2": "IM"
    },
    {
        "id": 137,
        "name": "Marshall Islands",
        "iso2": "MH"
    },
    {
        "id": 138,
        "name": "Martinique",
        "iso2": "MQ"
    },
    {
        "id": 139,
        "name": "Mauritania",
        "iso2": "MR"
    },
    {
        "id": 140,
        "name": "Mauritius",
        "iso2": "MU"
    },
    {
        "id": 141,
        "name": "Mayotte",
        "iso2": "YT"
    },
    {
        "id": 142,
        "name": "Mexico",
        "iso2": "MX"
    },
    {
        "id": 143,
        "name": "Micronesia",
        "iso2": "FM"
    },
    {
        "id": 144,
        "name": "Moldova",
        "iso2": "MD"
    },
    {
        "id": 145,
        "name": "Monaco",
        "iso2": "MC"
    },
    {
        "id": 146,
        "name": "Mongolia",
        "iso2": "MN"
    },
    {
        "id": 147,
        "name": "Montenegro",
        "iso2": "ME"
    },
    {
        "id": 148,
        "name": "Montserrat",
        "iso2": "MS"
    },
    {
        "id": 149,
        "name": "Morocco",
        "iso2": "MA"
    },
    {
        "id": 150,
        "name": "Mozambique",
        "iso2": "MZ"
    },
    {
        "id": 151,
        "name": "Myanmar",
        "iso2": "MM"
    },
    {
        "id": 152,
        "name": "Namibia",
        "iso2": "NA"
    },
    {
        "id": 153,
        "name": "Nauru",
        "iso2": "NR"
    },
    {
        "id": 154,
        "name": "Nepal",
        "iso2": "NP"
    },
    {
        "id": 155,
        "name": "Netherlands",
        "iso2": "NL"
    },
    {
        "id": 156,
        "name": "New Caledonia",
        "iso2": "NC"
    },
    {
        "id": 157,
        "name": "New Zealand",
        "iso2": "NZ"
    },
    {
        "id": 158,
        "name": "Nicaragua",
        "iso2": "NI"
    },
    {
        "id": 159,
        "name": "Niger",
        "iso2": "NE"
    },
    {
        "id": 160,
        "name": "Nigeria",
        "iso2": "NG"
    },
    {
        "id": 161,
        "name": "Niue",
        "iso2": "NU"
    },
    {
        "id": 162,
        "name": "Norfolk Island",
        "iso2": "NF"
    },
    {
        "id": 163,
        "name": "North Korea",
        "iso2": "KP"
    },
    {
        "id": 164,
        "name": "Northern Mariana Islands",
        "iso2": "MP"
    },
    {
        "id": 165,
        "name": "Norway",
        "iso2": "NO"
    },
    {
        "id": 166,
        "name": "Oman",
        "iso2": "OM"
    },
    {
        "id": 167,
        "name": "Pakistan",
        "iso2": "PK"
    },
    {
        "id": 168,
        "name": "Palau",
        "iso2": "PW"
    },
    {
        "id": 169,
        "name": "Palestinian Territory Occupied",
        "iso2": "PS"
    },
    {
        "id": 170,
        "name": "Panama",
        "iso2": "PA"
    },
    {
        "id": 171,
        "name": "Papua new Guinea",
        "iso2": "PG"
    },
    {
        "id": 172,
        "name": "Paraguay",
        "iso2": "PY"
    },
    {
        "id": 173,
        "name": "Peru",
        "iso2": "PE"
    },
    {
        "id": 174,
        "name": "Philippines",
        "iso2": "PH"
    },
    {
        "id": 175,
        "name": "Pitcairn Island",
        "iso2": "PN"
    },
    {
        "id": 176,
        "name": "Poland",
        "iso2": "PL"
    },
    {
        "id": 177,
        "name": "Portugal",
        "iso2": "PT"
    },
    {
        "id": 178,
        "name": "Puerto Rico",
        "iso2": "PR"
    },
    {
        "id": 179,
        "name": "Qatar",
        "iso2": "QA"
    },
    {
        "id": 180,
        "name": "Reunion",
        "iso2": "RE"
    },
    {
        "id": 181,
        "name": "Romania",
        "iso2": "RO"
    },
    {
        "id": 182,
        "name": "Russia",
        "iso2": "RU"
    },
    {
        "id": 183,
        "name": "Rwanda",
        "iso2": "RW"
    },
    {
        "id": 184,
        "name": "Saint Helena",
        "iso2": "SH"
    },
    {
        "id": 185,
        "name": "Saint Kitts And Nevis",
        "iso2": "KN"
    },
    {
        "id": 186,
        "name": "Saint Lucia",
        "iso2": "LC"
    },
    {
        "id": 187,
        "name": "Saint Pierre and Miquelon",
        "iso2": "PM"
    },
    {
        "id": 188,
        "name": "Saint Vincent And The Grenadines",
        "iso2": "VC"
    },
    {
        "id": 189,
        "name": "Saint-Barthelemy",
        "iso2": "BL"
    },
    {
        "id": 190,
        "name": "Saint-Martin (French part)",
        "iso2": "MF"
    },
    {
        "id": 191,
        "name": "Samoa",
        "iso2": "WS"
    },
    {
        "id": 192,
        "name": "San Marino",
        "iso2": "SM"
    },
    {
        "id": 193,
        "name": "Sao Tome and Principe",
        "iso2": "ST"
    },
    {
        "id": 194,
        "name": "Saudi Arabia",
        "iso2": "SA"
    },
    {
        "id": 195,
        "name": "Senegal",
        "iso2": "SN"
    },
    {
        "id": 196,
        "name": "Serbia",
        "iso2": "RS"
    },
    {
        "id": 197,
        "name": "Seychelles",
        "iso2": "SC"
    },
    {
        "id": 198,
        "name": "Sierra Leone",
        "iso2": "SL"
    },
    {
        "id": 199,
        "name": "Singapore",
        "iso2": "SG"
    },
    {
        "id": 200,
        "name": "Sint Maarten (Dutch part)",
        "iso2": "SX"
    },
    {
        "id": 201,
        "name": "Slovakia",
        "iso2": "SK"
    },
    {
        "id": 202,
        "name": "Slovenia",
        "iso2": "SI"
    },
    {
        "id": 203,
        "name": "Solomon Islands",
        "iso2": "SB"
    },
    {
        "id": 204,
        "name": "Somalia",
        "iso2": "SO"
    },
    {
        "id": 205,
        "name": "South Africa",
        "iso2": "ZA"
    },
    {
        "id": 206,
        "name": "South Georgia",
        "iso2": "GS"
    },
    {
        "id": 207,
        "name": "South Korea",
        "iso2": "KR"
    },
    {
        "id": 208,
        "name": "South Sudan",
        "iso2": "SS"
    },
    {
        "id": 209,
        "name": "Spain",
        "iso2": "ES"
    },
    {
        "id": 210,
        "name": "Sri Lanka",
        "iso2": "LK"
    },
    {
        "id": 211,
        "name": "Sudan",
        "iso2": "SD"
    },
    {
        "id": 212,
        "name": "Suriname",
        "iso2": "SR"
    },
    {
        "id": 213,
        "name": "Svalbard And Jan Mayen Islands",
        "iso2": "SJ"
    },
    {
        "id": 214,
        "name": "Swaziland",
        "iso2": "SZ"
    },
    {
        "id": 215,
        "name": "Sweden",
        "iso2": "SE"
    },
    {
        "id": 216,
        "name": "Switzerland",
        "iso2": "CH"
    },
    {
        "id": 217,
        "name": "Syria",
        "iso2": "SY"
    },
    {
        "id": 218,
        "name": "Taiwan",
        "iso2": "TW"
    },
    {
        "id": 219,
        "name": "Tajikistan",
        "iso2": "TJ"
    },
    {
        "id": 220,
        "name": "Tanzania",
        "iso2": "TZ"
    },
    {
        "id": 221,
        "name": "Thailand",
        "iso2": "TH"
    },
    {
        "id": 222,
        "name": "The Bahamas",
        "iso2": "BS"
    },
    {
        "id": 223,
        "name": "Togo",
        "iso2": "TG"
    },
    {
        "id": 224,
        "name": "Tokelau",
        "iso2": "TK"
    },
    {
        "id": 225,
        "name": "Tonga",
        "iso2": "TO"
    },
    {
        "id": 226,
        "name": "Trinidad And Tobago",
        "iso2": "TT"
    },
    {
        "id": 227,
        "name": "Tunisia",
        "iso2": "TN"
    },
    {
        "id": 228,
        "name": "Turkey",
        "iso2": "TR"
    },
    {
        "id": 229,
        "name": "Turkmenistan",
        "iso2": "TM"
    },
    {
        "id": 230,
        "name": "Turks And Caicos Islands",
        "iso2": "TC"
    },
    {
        "id": 231,
        "name": "Tuvalu",
        "iso2": "TV"
    },
    {
        "id": 232,
        "name": "Uganda",
        "iso2": "UG"
    },
    {
        "id": 233,
        "name": "Ukraine",
        "iso2": "UA"
    },
    {
        "id": 234,
        "name": "United Arab Emirates",
        "iso2": "AE"
    },
    {
        "id": 235,
        "name": "United Kingdom",
        "iso2": "GB"
    },
    {
        "id": 236,
        "name": "United States",
        "iso2": "US"
    },
    {
        "id": 237,
        "name": "United States Minor Outlying Islands",
        "iso2": "UM"
    },
    {
        "id": 238,
        "name": "Uruguay",
        "iso2": "UY"
    },
    {
        "id": 239,
        "name": "Uzbekistan",
        "iso2": "UZ"
    },
    {
        "id": 240,
        "name": "Vanuatu",
        "iso2": "VU"
    },
    {
        "id": 241,
        "name": "Vatican City State (Holy See)",
        "iso2": "VA"
    },
    {
        "id": 242,
        "name": "Venezuela",
        "iso2": "VE"
    },
    {
        "id": 243,
        "name": "Vietnam",
        "iso2": "VN"
    },
    {
        "id": 244,
        "name": "Virgin Islands (British)",
        "iso2": "VG"
    },
    {
        "id": 245,
        "name": "Virgin Islands (US)",
        "iso2": "VI"
    },
    {
        "id": 246,
        "name": "Wallis And Futuna Islands",
        "iso2": "WF"
    },
    {
        "id": 247,
        "name": "Western Sahara",
        "iso2": "EH"
    },
    {
        "id": 248,
        "name": "Yemen",
        "iso2": "YE"
    },
    {
        "id": 249,
        "name": "Zambia",
        "iso2": "ZM"
    },
    {
        "id": 250,
        "name": "Zimbabwe",
        "iso2": "ZW"
    }
]

export default countriesData