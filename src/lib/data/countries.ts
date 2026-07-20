/* ─── Country codes, names, flags, and their states/provinces ─── */

export interface CountryData {
  code: string;       // ISO 3166-1 alpha-2
  name: string;
  dialCode: string;
  flag: string;
  states: string[];
}

export const countries: CountryData[] = [
  {
    code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳",
    states: [
      "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
      "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
      "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
      "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
      "Uttar Pradesh","Uttarakhand","West Bengal",
      "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli and Daman & Diu",
      "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
    ],
  },
  {
    code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸",
    states: [
      "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
      "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
      "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
      "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
      "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
      "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
      "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
      "Wisconsin","Wyoming","District of Columbia",
    ],
  },
  {
    code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧",
    states: [
      "England","Scotland","Wales","Northern Ireland",
      "Bedfordshire","Berkshire","Bristol","Buckinghamshire","Cambridgeshire",
      "Cheshire","Cornwall","Cumbria","Derbyshire","Devon","Dorset","Durham",
      "East Sussex","Essex","Gloucestershire","Greater London","Greater Manchester",
      "Hampshire","Herefordshire","Hertfordshire","Isle of Wight","Kent","Lancashire",
      "Leicestershire","Lincolnshire","Merseyside","Norfolk","North Yorkshire",
      "Northamptonshire","Northumberland","Nottinghamshire","Oxfordshire","Rutland",
      "Shropshire","Somerset","South Yorkshire","Staffordshire","Suffolk","Surrey",
      "Tyne and Wear","Warwickshire","West Midlands","West Sussex","West Yorkshire",
      "Wiltshire","Worcestershire",
    ],
  },
  {
    code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪",
    states: ["Abu Dhabi","Ajman","Dubai","Fujairah","Ras Al Khaimah","Sharjah","Umm Al Quwain"],
  },
  {
    code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦",
    states: [
      "Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador",
      "Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island",
      "Quebec","Saskatchewan","Yukon",
    ],
  },
  {
    code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺",
    states: [
      "Australian Capital Territory","New South Wales","Northern Territory","Queensland",
      "South Australia","Tasmania","Victoria","Western Australia",
    ],
  },
  {
    code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪",
    states: [
      "Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg","Hesse",
      "Lower Saxony","Mecklenburg-Vorpommern","North Rhine-Westphalia","Rhineland-Palatinate",
      "Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia",
    ],
  },
  {
    code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷",
    states: [
      "Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Brittany","Centre-Val de Loire",
      "Corsica","Grand Est","Hauts-de-France","Île-de-France","Normandy",
      "Nouvelle-Aquitaine","Occitanie","Pays de la Loire","Provence-Alpes-Côte d'Azur",
    ],
  },
  {
    code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵",
    states: [
      "Hokkaido","Aomori","Iwate","Miyagi","Akita","Yamagata","Fukushima",
      "Ibaraki","Tochigi","Gunma","Saitama","Chiba","Tokyo","Kanagawa",
      "Niigata","Toyama","Ishikawa","Fukui","Yamanashi","Nagano","Gifu",
      "Shizuoka","Aichi","Mie","Shiga","Kyoto","Osaka","Hyogo","Nara",
      "Wakayama","Tottori","Shimane","Okayama","Hiroshima","Yamaguchi",
      "Tokushima","Kagawa","Ehime","Kochi","Fukuoka","Saga","Nagasaki",
      "Kumamoto","Oita","Miyazaki","Kagoshima","Okinawa",
    ],
  },
  {
    code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬",
    states: ["Central Region","East Region","North Region","North-East Region","West Region"],
  },
  {
    code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳",
    states: [
      "Anhui","Beijing","Chongqing","Fujian","Gansu","Guangdong","Guangxi","Guizhou",
      "Hainan","Hebei","Heilongjiang","Henan","Hubei","Hunan","Inner Mongolia","Jiangsu",
      "Jiangxi","Jilin","Liaoning","Ningxia","Qinghai","Shaanxi","Shandong","Shanghai",
      "Shanxi","Sichuan","Tianjin","Tibet","Xinjiang","Yunnan","Zhejiang",
    ],
  },
  {
    code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷",
    states: [
      "Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal",
      "Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul",
      "Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí",
      "Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia",
      "Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins",
    ],
  },
  {
    code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺",
    states: [
      "Moscow","Saint Petersburg","Novosibirsk Oblast","Sverdlovsk Oblast",
      "Tatarstan","Chelyabinsk Oblast","Nizhny Novgorod Oblast","Samara Oblast",
      "Rostov Oblast","Bashkortostan","Krasnoyarsk Krai","Krasnodar Krai",
      "Perm Krai","Voronezh Oblast","Volgograd Oblast",
    ],
  },
  {
    code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦",
    states: [
      "Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo",
      "Mpumalanga","North West","Northern Cape","Western Cape",
    ],
  },
  {
    code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽",
    states: [
      "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas",
      "Chihuahua","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo",
      "Jalisco","México","Mexico City","Michoacán","Morelos","Nayarit","Nuevo León",
      "Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí","Sinaloa",
      "Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas",
    ],
  },
  {
    code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷",
    states: [
      "Seoul","Busan","Daegu","Incheon","Gwangju","Daejeon","Ulsan","Sejong",
      "Gyeonggi","Gangwon","Chungbuk","Chungnam","Jeonbuk","Jeonnam",
      "Gyeongbuk","Gyeongnam","Jeju",
    ],
  },
  {
    code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹",
    states: [
      "Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna",
      "Friuli Venezia Giulia","Lazio","Liguria","Lombardy","Marche","Molise",
      "Piedmont","Puglia","Sardinia","Sicily","Trentino-Alto Adige","Tuscany",
      "Umbria","Valle d'Aosta","Veneto",
    ],
  },
  {
    code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸",
    states: [
      "Andalusia","Aragon","Asturias","Balearic Islands","Basque Country",
      "Canary Islands","Cantabria","Castilla-La Mancha","Castilla y León",
      "Catalonia","Extremadura","Galicia","La Rioja","Madrid","Murcia",
      "Navarre","Valencian Community",
    ],
  },
  {
    code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱",
    states: [
      "Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg",
      "North Brabant","North Holland","Overijssel","South Holland","Utrecht","Zeeland",
    ],
  },
  {
    code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦",
    states: [
      "Riyadh","Makkah","Madinah","Eastern Province","Asir","Tabuk",
      "Hail","Northern Borders","Jazan","Najran","Al-Baha","Al-Jouf","Al-Qassim",
    ],
  },
  {
    code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦",
    states: ["Ad Dawhah","Al Khawr","Al Wakrah","Ar Rayyan","Ash Shamal","Az Za'ayin","Umm Salal","Al Daayen"],
  },
  {
    code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼",
    states: ["Al Ahmadi","Al Asimah","Al Farwaniyah","Al Jahra","Hawalli","Mubarak Al-Kabeer"],
  },
  {
    code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭",
    states: ["Capital","Muharraq","Northern","Southern"],
  },
  {
    code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲",
    states: ["Ad Dakhiliyah","Ad Dhahirah","Al Batinah North","Al Batinah South","Al Buraimi","Al Wusta","Ash Sharqiyah North","Ash Sharqiyah South","Dhofar","Musandam","Muscat"],
  },
  {
    code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿",
    states: [
      "Auckland","Bay of Plenty","Canterbury","Gisborne","Hawke's Bay","Manawatū-Whanganui",
      "Marlborough","Nelson","Northland","Otago","Southland","Taranaki","Tasman",
      "Waikato","Wellington","West Coast",
    ],
  },
  {
    code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾",
    states: [
      "Johor","Kedah","Kelantan","Kuala Lumpur","Labuan","Melaka","Negeri Sembilan",
      "Pahang","Penang","Perak","Perlis","Putrajaya","Sabah","Sarawak",
      "Selangor","Terengganu",
    ],
  },
  {
    code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭",
    states: [
      "Bangkok","Chiang Mai","Chiang Rai","Chonburi","Khon Kaen","Nakhon Ratchasima",
      "Nonthaburi","Pathum Thani","Phuket","Samut Prakan","Songkhla","Surat Thani",
    ],
  },
  {
    code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩",
    states: [
      "Aceh","Bali","Banten","Bengkulu","Central Java","Central Kalimantan",
      "Central Sulawesi","East Java","East Kalimantan","East Nusa Tenggara",
      "Gorontalo","Jakarta","Jambi","Lampung","Maluku","North Kalimantan",
      "North Maluku","North Sulawesi","North Sumatra","Papua","Riau",
      "South Kalimantan","South Sulawesi","South Sumatra","Southeast Sulawesi",
      "West Java","West Kalimantan","West Nusa Tenggara","West Papua",
      "West Sulawesi","West Sumatra","Yogyakarta",
    ],
  },
  {
    code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭",
    states: [
      "Ilocos Region","Cagayan Valley","Central Luzon","CALABARZON","MIMAROPA",
      "Bicol Region","Western Visayas","Central Visayas","Eastern Visayas",
      "Zamboanga Peninsula","Northern Mindanao","Davao Region","SOCCSKSARGEN",
      "Caraga","NCR","CAR","BARMM",
    ],
  },
  {
    code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳",
    states: ["Hanoi","Ho Chi Minh City","Da Nang","Hai Phong","Can Tho"],
  },
  {
    code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩",
    states: ["Barishal","Chattogram","Dhaka","Khulna","Mymensingh","Rajshahi","Rangpur","Sylhet"],
  },
  {
    code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰",
    states: ["Azad Kashmir","Balochistan","Gilgit-Baltistan","Islamabad","Khyber Pakhtunkhwa","Punjab","Sindh"],
  },
  {
    code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰",
    states: ["Central","Eastern","North Central","North Western","Northern","Sabaragamuwa","Southern","Uva","Western"],
  },
  {
    code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵",
    states: ["Bagmati","Gandaki","Karnali","Koshi","Lumbini","Madhesh","Sudurpashchim"],
  },
  {
    code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬",
    states: [
      "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
      "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
      "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
      "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
    ],
  },
  {
    code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪",
    states: ["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret"],
  },
  {
    code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬",
    states: ["Cairo","Alexandria","Giza","Luxor","Aswan","Port Said","Suez"],
  },
  {
    code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷",
    states: ["Adana","Ankara","Antalya","Bursa","Gaziantep","Istanbul","Izmir","Konya","Mersin"],
  },
  {
    code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱",
    states: ["Central","Haifa","Jerusalem","Northern","Southern","Tel Aviv"],
  },
  {
    code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪",
    states: [
      "Blekinge","Dalarna","Gävleborg","Gotland","Halland","Jämtland","Jönköping",
      "Kalmar","Kronoberg","Norrbotten","Örebro","Östergötland","Skåne","Södermanland",
      "Stockholm","Uppsala","Värmland","Västerbotten","Västernorrland","Västmanland",
      "Västra Götaland",
    ],
  },
  {
    code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴",
    states: ["Agder","Innlandet","Møre og Romsdal","Nordland","Oslo","Rogaland","Troms og Finnmark","Trøndelag","Vestfold og Telemark","Vestland","Viken"],
  },
  {
    code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰",
    states: ["Capital Region","Central Denmark","North Denmark","Region Zealand","South Denmark"],
  },
  {
    code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮",
    states: ["Åland","Central Finland","Lapland","North Ostrobothnia","Pirkanmaa","Southwest Finland","Uusimaa"],
  },
  {
    code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭",
    states: ["Aargau","Basel-Stadt","Bern","Fribourg","Geneva","Lucerne","St. Gallen","Ticino","Vaud","Zurich"],
  },
  {
    code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹",
    states: ["Burgenland","Carinthia","Lower Austria","Salzburg","Styria","Tyrol","Upper Austria","Vienna","Vorarlberg"],
  },
  {
    code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱",
    states: [
      "Greater Poland","Kuyavian-Pomeranian","Lesser Poland","Łódź","Lower Silesian",
      "Lublin","Lubusz","Masovian","Opole","Podkarpackie","Podlaskie","Pomeranian",
      "Silesian","Świętokrzyskie","Warmian-Masurian","West Pomeranian",
    ],
  },
  {
    code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹",
    states: ["Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro","Guarda","Leiria","Lisbon","Portalegre","Porto","Santarém","Setúbal","Viana do Castelo","Vila Real","Viseu"],
  },
  {
    code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪",
    states: ["Carlow","Cavan","Clare","Cork","Donegal","Dublin","Galway","Kerry","Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth","Mayo","Meath","Monaghan","Offaly","Roscommon","Sligo","Tipperary","Waterford","Westmeath","Wexford","Wicklow"],
  },
  {
    code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪",
    states: ["Brussels-Capital","Flanders","Wallonia"],
  },
  {
    code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷",
    states: ["Attica","Central Greece","Central Macedonia","Crete","Eastern Macedonia and Thrace","Epirus","Ionian Islands","North Aegean","Peloponnese","South Aegean","Thessaly","Western Greece","Western Macedonia"],
  },
  {
    code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷",
    states: ["Buenos Aires","CABA","Catamarca","Chaco","Chubut","Córdoba","Corrientes","Entre Ríos","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquén","Río Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"],
  },
  {
    code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱",
    states: ["Arica y Parinacota","Tarapacá","Antofagasta","Atacama","Coquimbo","Valparaíso","O'Higgins","Maule","Ñuble","Biobío","Araucanía","Los Ríos","Los Lagos","Aysén","Magallanes","Santiago Metropolitan"],
  },
  {
    code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴",
    states: ["Amazonas","Antioquia","Arauca","Atlántico","Bogotá","Bolívar","Boyacá","Caldas","Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca","Guainía","Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño","Norte de Santander","Putumayo","Quindío","Risaralda","San Andrés y Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupés","Vichada"],
  },
  {
    code: "PE", name: "Peru", dialCode: "+51", flag: "🇵🇪",
    states: ["Amazonas","Áncash","Apurímac","Arequipa","Ayacucho","Cajamarca","Callao","Cusco","Huancavelica","Huánuco","Ica","Junín","La Libertad","Lambayeque","Lima","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno","San Martín","Tacna","Tumbes","Ucayali"],
  },
  {
    code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰",
    states: ["Hong Kong Island","Kowloon","New Territories"],
  },
  {
    code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼",
    states: ["Taipei","New Taipei","Taoyuan","Taichung","Tainan","Kaohsiung"],
  },
];

/** Sorted by name for dropdowns */
export const countriesSorted = [...countries].sort((a, b) => {
  // Keep India first
  if (a.code === "IN") return -1;
  if (b.code === "IN") return 1;
  return a.name.localeCompare(b.name);
});

/** Quick lookup */
export function getCountryByCode(code: string): CountryData | undefined {
  return countries.find((c) => c.code === code);
}

/** Quick lookup by dial code — returns first match */
export function getCountryByDialCode(dialCode: string): CountryData | undefined {
  return countries.find((c) => c.dialCode === dialCode);
}
