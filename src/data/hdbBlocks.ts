export interface HdbBlockItem {
  block: string;
  street: string;
  town: string;
  fullAddress: string;
  leaseCommenceYear?: number;
}

export const HDB_TOWNS_LIST = [
  'ANG MO KIO',
  'BEDOK',
  'BISHAN',
  'BUKIT BATOK',
  'BUKIT MERAH',
  'BUKIT PANJANG',
  'BUKIT TIMAH',
  'CENTRAL AREA',
  'CHOA CHU KANG',
  'CLEMENTI',
  'GEYLANG',
  'HOUGANG',
  'JURONG EAST',
  'JURONG WEST',
  'KALLANG/WHAMPOA',
  'MARINE PARADE',
  'PASIR RIS',
  'PUNGGOL',
  'QUEENSTOWN',
  'SEMBAWANG',
  'SENGKANG',
  'SERANGOON',
  'TAMPINES',
  'TOA PAYOH',
  'WOODLANDS',
  'YISHUN',
];

export const SUB_ESTATE_TO_TOWN: Record<string, string> = {
  'AMK': 'ANG MO KIO',
  'ANG MO KIO': 'ANG MO KIO',
  'BEDOK': 'BEDOK',
  'BEDOK NORTH': 'BEDOK',
  'BEDOK SOUTH': 'BEDOK',
  'BEDOK RESERVOIR': 'BEDOK',
  'BISHAN': 'BISHAN',
  'BRIGHT HILL': 'BISHAN',
  'BUKIT BATOK': 'BUKIT BATOK',
  'BUKIT BATOK WEST': 'BUKIT BATOK',
  'BUKIT BATOK EAST': 'BUKIT BATOK',
  'BUKIT MERAH': 'BUKIT MERAH',
  'REDHILL': 'BUKIT MERAH',
  'TIONG BAHRU': 'BUKIT MERAH',
  'TELOK BLANGAH': 'BUKIT MERAH',
  'KIM TIAN': 'BUKIT MERAH',
  'LENGKOK BAHRU': 'BUKIT MERAH',
  'BUKIT PURMEI': 'BUKIT MERAH',
  'HAVELOCK': 'BUKIT MERAH',
  'BUKIT PANJANG': 'BUKIT PANJANG',
  'FAJAR': 'BUKIT PANJANG',
  'SEGAR': 'BUKIT PANJANG',
  'SENJA': 'BUKIT PANJANG',
  'JELAPANG': 'BUKIT PANJANG',
  'PENDING': 'BUKIT PANJANG',
  'BANGKIT': 'BUKIT PANJANG',
  'SAUJANA': 'BUKIT PANJANG',
  'BUKIT TIMAH': 'BUKIT TIMAH',
  'TOH YI': 'BUKIT TIMAH',
  'FARRER': 'BUKIT TIMAH',
  'HOLLAND': 'BUKIT TIMAH',
  'CENTRAL AREA': 'CENTRAL AREA',
  'CANTONMENT': 'CENTRAL AREA',
  'PINNACLE': 'CENTRAL AREA',
  'TANJONG PAGAR': 'CENTRAL AREA',
  'CHINATOWN': 'CENTRAL AREA',
  'WATERLOO': 'CENTRAL AREA',
  'BRAS BASAH': 'CENTRAL AREA',
  'KRETA AYER': 'CENTRAL AREA',
  'CHOA CHU KANG': 'CHOA CHU KANG',
  'CCK': 'CHOA CHU KANG',
  'TECK WHYE': 'CHOA CHU KANG',
  'YEW TEE': 'CHOA CHU KANG',
  'KEAT HONG': 'CHOA CHU KANG',
  'CLEMENTI': 'CLEMENTI',
  'CLEMENTI WEST': 'CLEMENTI',
  'PASIR PANJANG': 'CLEMENTI',
  'GEYLANG': 'GEYLANG',
  'ALJUNIED': 'GEYLANG',
  'DAKOTA': 'GEYLANG',
  'EUNOS': 'GEYLANG',
  'MACPHERSON': 'GEYLANG',
  'CIRCUIT ROAD': 'GEYLANG',
  'HOUGANG': 'HOUGANG',
  'JURONG EAST': 'JURONG EAST',
  'TOH GUAN': 'JURONG EAST',
  'TEBAN': 'JURONG EAST',
  'PANDAN': 'JURONG EAST',
  'JURONG WEST': 'JURONG WEST',
  'BOON LAY': 'JURONG WEST',
  'PIONEER': 'JURONG WEST',
  'TAMAN JURONG': 'JURONG WEST',
  'KALLANG/WHAMPOA': 'KALLANG/WHAMPOA',
  'KALLANG': 'KALLANG/WHAMPOA',
  'WHAMPOA': 'KALLANG/WHAMPOA',
  'BOON KENG': 'KALLANG/WHAMPOA',
  'BENDEMEER': 'KALLANG/WHAMPOA',
  'TOWNER': 'KALLANG/WHAMPOA',
  'MCNAIR': 'KALLANG/WHAMPOA',
  'MARINE PARADE': 'MARINE PARADE',
  'MARINE DRIVE': 'MARINE PARADE',
  'MARINE CRESCENT': 'MARINE PARADE',
  'MARINE TERRACE': 'MARINE PARADE',
  'PASIR RIS': 'PASIR RIS',
  'PUNGGOL': 'PUNGGOL',
  'EDGEDALE': 'PUNGGOL',
  'WATERWAY': 'PUNGGOL',
  'SUMANG': 'PUNGGOL',
  'QUEENSTOWN': 'QUEENSTOWN',
  'DOVER': 'QUEENSTOWN',
  'TANGLIN HALT': 'QUEENSTOWN',
  'COMMONWEALTH': 'QUEENSTOWN',
  'STRATHMORE': 'QUEENSTOWN',
  'STIRLING': 'QUEENSTOWN',
  'DAWSON': 'QUEENSTOWN',
  'GHIM MOH': 'QUEENSTOWN',
  'SEMBAWANG': 'SEMBAWANG',
  'CANBERRA': 'SEMBAWANG',
  'MONTREAL': 'SEMBAWANG',
  'WELLINGTON': 'SEMBAWANG',
  'SENGKANG': 'SENGKANG',
  'RIVERVALE': 'SENGKANG',
  'COMPASSVALE': 'SENGKANG',
  'ANCHORVALE': 'SENGKANG',
  'FERNVALE': 'SENGKANG',
  'BUANGKOK': 'SENGKANG',
  'SERANGOON': 'SERANGOON',
  'SERANGOON NORTH': 'SERANGOON',
  'SERANGOON CENTRAL': 'SERANGOON',
  'TAMPINES': 'TAMPINES',
  'TOA PAYOH': 'TOA PAYOH',
  'TPY': 'TOA PAYOH',
  'POTONG PASIR': 'TOA PAYOH',
  'WOODLANDS': 'WOODLANDS',
  'MARSILING': 'WOODLANDS',
  'YISHUN': 'YISHUN',
  'KHATIB': 'YISHUN',
  'CHONG PANG': 'YISHUN',
};

export const HDB_BLOCKS: HdbBlockItem[] = [
  // Toa Payoh (Commenced ~1970 - 1984)
  { block: '142', street: 'Lorong 2 Toa Payoh', town: 'TOA PAYOH', fullAddress: 'Blk 142 Lorong 2 Toa Payoh', leaseCommenceYear: 1970 },
  { block: '68', street: 'Lorong 4 Toa Payoh', town: 'TOA PAYOH', fullAddress: 'Blk 68 Lorong 4 Toa Payoh', leaseCommenceYear: 1971 },
  { block: '85', street: 'Lorong 4 Toa Payoh', town: 'TOA PAYOH', fullAddress: 'Blk 85 Lorong 4 Toa Payoh', leaseCommenceYear: 1972 },
  { block: '125', street: 'Potong Pasir Ave 1', town: 'TOA PAYOH', fullAddress: 'Blk 125 Potong Pasir Ave 1', leaseCommenceYear: 1984 },
  { block: '178', street: 'Toa Payoh Central', town: 'TOA PAYOH', fullAddress: 'Blk 178 Toa Payoh Central', leaseCommenceYear: 1973 },
  { block: '234', street: 'Lorong 8 Toa Payoh', town: 'TOA PAYOH', fullAddress: 'Blk 234 Lorong 8 Toa Payoh', leaseCommenceYear: 1975 },
  { block: '53', street: 'Lorong 5 Toa Payoh', town: 'TOA PAYOH', fullAddress: 'Blk 53 Lorong 5 Toa Payoh', leaseCommenceYear: 1973 },

  // Bishan (Commenced ~1986 - 1991)
  { block: '508', street: 'Bishan Street 11', town: 'BISHAN', fullAddress: 'Blk 508 Bishan Street 11', leaseCommenceYear: 1987 },
  { block: '112', street: 'Bishan Street 12', town: 'BISHAN', fullAddress: 'Blk 112 Bishan Street 12', leaseCommenceYear: 1986 },
  { block: '173', street: 'Bishan Street 13', town: 'BISHAN', fullAddress: 'Blk 173 Bishan Street 13', leaseCommenceYear: 1987 },
  { block: '248', street: 'Bishan Street 22', town: 'BISHAN', fullAddress: 'Blk 248 Bishan Street 22', leaseCommenceYear: 1991 },
  { block: '446', street: 'Bright Hill Drive', town: 'BISHAN', fullAddress: 'Blk 446 Bright Hill Drive', leaseCommenceYear: 1991 },
  { block: '210', street: 'Bishan Street 23', town: 'BISHAN', fullAddress: 'Blk 210 Bishan Street 23', leaseCommenceYear: 1988 },

  // Tampines (Commenced ~1984 - 1997)
  { block: '216', street: 'Tampines Street 23', town: 'TAMPINES', fullAddress: 'Blk 216 Tampines Street 23', leaseCommenceYear: 1985 },
  { block: '142', street: 'Tampines Street 12', town: 'TAMPINES', fullAddress: 'Blk 142 Tampines Street 12', leaseCommenceYear: 1984 },
  { block: '401', street: 'Tampines Ave 7', town: 'TAMPINES', fullAddress: 'Blk 401 Tampines Ave 7', leaseCommenceYear: 1986 },
  { block: '712', street: 'Tampines Street 71', town: 'TAMPINES', fullAddress: 'Blk 712 Tampines Street 71', leaseCommenceYear: 1992 },
  { block: '824', street: 'Tampines Street 81', town: 'TAMPINES', fullAddress: 'Blk 824 Tampines Street 81', leaseCommenceYear: 1988 },
  { block: '920', street: 'Tampines Street 91', town: 'TAMPINES', fullAddress: 'Blk 920 Tampines Street 91', leaseCommenceYear: 1989 },
  { block: '485B', street: 'Tampines Ave 9', town: 'TAMPINES', fullAddress: 'Blk 485B Tampines Ave 9', leaseCommenceYear: 1997 },

  // Ang Mo Kio
  { block: '101', street: 'Ang Mo Kio Ave 3', town: 'ANG MO KIO', fullAddress: 'Blk 101 Ang Mo Kio Ave 3', leaseCommenceYear: 1978 },
  { block: '205', street: 'Ang Mo Kio Ave 1', town: 'ANG MO KIO', fullAddress: 'Blk 205 Ang Mo Kio Ave 1', leaseCommenceYear: 1979 },
  { block: '332', street: 'Ang Mo Kio Ave 1', town: 'ANG MO KIO', fullAddress: 'Blk 332 Ang Mo Kio Ave 1', leaseCommenceYear: 1979 },
  { block: '406', street: 'Ang Mo Kio Ave 10', town: 'ANG MO KIO', fullAddress: 'Blk 406 Ang Mo Kio Ave 10', leaseCommenceYear: 1980 },
  { block: '512', street: 'Ang Mo Kio Ave 8', town: 'ANG MO KIO', fullAddress: 'Blk 512 Ang Mo Kio Ave 8' },
  { block: '634', street: 'Ang Mo Kio Ave 6', town: 'ANG MO KIO', fullAddress: 'Blk 634 Ang Mo Kio Ave 6' },
  { block: '711', street: 'Ang Mo Kio Ave 8', town: 'ANG MO KIO', fullAddress: 'Blk 711 Ang Mo Kio Ave 8' },

  // Bedok
  { block: '10', street: 'Bedok South Ave 2', town: 'BEDOK', fullAddress: 'Blk 10 Bedok South Ave 2' },
  { block: '123', street: 'Bedok Reservoir Road', town: 'BEDOK', fullAddress: 'Blk 123 Bedok Reservoir Road' },
  { block: '218', street: 'Bedok North Street 1', town: 'BEDOK', fullAddress: 'Blk 218 Bedok North Street 1' },
  { block: '418', street: 'Bedok North Ave 2', town: 'BEDOK', fullAddress: 'Blk 418 Bedok North Ave 2' },
  { block: '534', street: 'Bedok North Street 3', town: 'BEDOK', fullAddress: 'Blk 534 Bedok North Street 3' },
  { block: '701', street: 'Bedok Reservoir Road', town: 'BEDOK', fullAddress: 'Blk 701 Bedok Reservoir Road' },

  // Bukit Batok
  { block: '154', street: 'Bukit Batok West Ave 6', town: 'BUKIT BATOK', fullAddress: 'Blk 154 Bukit Batok West Ave 6' },
  { block: '289', street: 'Bukit Batok Street 25', town: 'BUKIT BATOK', fullAddress: 'Blk 289 Bukit Batok Street 25' },
  { block: '372', street: 'Bukit Batok Street 31', town: 'BUKIT BATOK', fullAddress: 'Blk 372 Bukit Batok Street 31' },
  { block: '506', street: 'Bukit Batok Street 52', town: 'BUKIT BATOK', fullAddress: 'Blk 506 Bukit Batok Street 52' },

  // Bukit Merah
  { block: '10', street: 'Jalan Bukit Merah', town: 'BUKIT MERAH', fullAddress: 'Blk 10 Jalan Bukit Merah' },
  { block: '55', street: 'Lengkok Bahru', town: 'BUKIT MERAH', fullAddress: 'Blk 55 Lengkok Bahru' },
  { block: '89', street: 'Redhill Close', town: 'BUKIT MERAH', fullAddress: 'Blk 89 Redhill Close' },
  { block: '108', street: 'Jalan Bukit Merah', town: 'BUKIT MERAH', fullAddress: 'Blk 108 Jalan Bukit Merah' },
  { block: '128', street: 'Kim Tian Road', town: 'BUKIT MERAH', fullAddress: 'Blk 128 Kim Tian Road' },
  { block: '50', street: 'Telok Blangah Drive', town: 'BUKIT MERAH', fullAddress: 'Blk 50 Telok Blangah Drive' },

  // Bukit Panjang
  { block: '102', street: 'Gangsa Road', town: 'BUKIT PANJANG', fullAddress: 'Blk 102 Gangsa Road' },
  { block: '225', street: 'Pending Road', town: 'BUKIT PANJANG', fullAddress: 'Blk 225 Pending Road' },
  { block: '411', street: 'Saujana Road', town: 'BUKIT PANJANG', fullAddress: 'Blk 411 Saujana Road' },
  { block: '520', street: 'Jelapang Road', town: 'BUKIT PANJANG', fullAddress: 'Blk 520 Jelapang Road' },
  { block: '601', street: 'Senja Road', town: 'BUKIT PANJANG', fullAddress: 'Blk 601 Senja Road' },

  // Bukit Timah
  { block: '1', street: 'Toh Yi Drive', town: 'BUKIT TIMAH', fullAddress: 'Blk 1 Toh Yi Drive' },
  { block: '8', street: 'Toh Yi Drive', town: 'BUKIT TIMAH', fullAddress: 'Blk 8 Toh Yi Drive' },
  { block: '12', street: 'Toh Yi Drive', town: 'BUKIT TIMAH', fullAddress: 'Blk 12 Toh Yi Drive' },
  { block: '18', street: 'Farrer Road', town: 'BUKIT TIMAH', fullAddress: 'Blk 18 Farrer Road' },

  // Central Area
  { block: '1', street: 'Cantonment Road (Pinnacle@Duxton)', town: 'CENTRAL AREA', fullAddress: 'Blk 1 Cantonment Road' },
  { block: '2', street: 'Tanjong Pagar Plaza', town: 'CENTRAL AREA', fullAddress: 'Blk 2 Tanjong Pagar Plaza' },
  { block: '261', street: 'Waterloo Street', town: 'CENTRAL AREA', fullAddress: 'Blk 261 Waterloo Street' },
  { block: '335', street: 'Smith Street (Chinatown)', town: 'CENTRAL AREA', fullAddress: 'Blk 335 Smith Street' },
  { block: '531', street: 'Upper Cross Street', town: 'CENTRAL AREA', fullAddress: 'Blk 531 Upper Cross Street' },

  // Choa Chu Kang
  { block: '204', street: 'Choa Chu Kang Central', town: 'CHOA CHU KANG', fullAddress: 'Blk 204 Choa Chu Kang Central' },
  { block: '302', street: 'Choa Chu Kang Ave 4', town: 'CHOA CHU KANG', fullAddress: 'Blk 302 Choa Chu Kang Ave 4' },
  { block: '412', street: 'Choa Chu Kang Ave 3', town: 'CHOA CHU KANG', fullAddress: 'Blk 412 Choa Chu Kang Ave 3' },
  { block: '682', street: 'Choa Chu Kang Crescent', town: 'CHOA CHU KANG', fullAddress: 'Blk 682 Choa Chu Kang Crescent' },
  { block: '752', street: 'Choa Chu Kang North 5', town: 'CHOA CHU KANG', fullAddress: 'Blk 752 Choa Chu Kang North 5' },

  // Clementi
  { block: '201', street: 'Clementi Ave 6', town: 'CLEMENTI', fullAddress: 'Blk 201 Clementi Ave 6' },
  { block: '328', street: 'Clementi Ave 2', town: 'CLEMENTI', fullAddress: 'Blk 328 Clementi Ave 2' },
  { block: '441A', street: 'Clementi Ave 3', town: 'CLEMENTI', fullAddress: 'Blk 441A Clementi Ave 3' },
  { block: '601', street: 'Clementi West Street 1', town: 'CLEMENTI', fullAddress: 'Blk 601 Clementi West Street 1' },

  // Geylang
  { block: '8', street: 'Eunos Crescent', town: 'GEYLANG', fullAddress: 'Blk 8 Eunos Crescent' },
  { block: '39', street: 'Jalan Tiga', town: 'GEYLANG', fullAddress: 'Blk 39 Jalan Tiga' },
  { block: '58', street: 'Dakota Crescent', town: 'GEYLANG', fullAddress: 'Blk 58 Dakota Crescent' },
  { block: '101', street: 'Aljunied Crescent', town: 'GEYLANG', fullAddress: 'Blk 101 Aljunied Crescent' },
  { block: '128', street: 'Geylang East Ave 1', town: 'GEYLANG', fullAddress: 'Blk 128 Geylang East Ave 1' },

  // Hougang
  { block: '210', street: 'Hougang Street 21', town: 'HOUGANG', fullAddress: 'Blk 210 Hougang Street 21' },
  { block: '325', street: 'Hougang Ave 5', town: 'HOUGANG', fullAddress: 'Blk 325 Hougang Ave 5' },
  { block: '401', street: 'Hougang Ave 10', town: 'HOUGANG', fullAddress: 'Blk 401 Hougang Ave 10' },
  { block: '534', street: 'Hougang Ave 8', town: 'HOUGANG', fullAddress: 'Blk 534 Hougang Ave 8' },
  { block: '681', street: 'Hougang Ave 8', town: 'HOUGANG', fullAddress: 'Blk 681 Hougang Ave 8' },

  // Jurong East
  { block: '102', street: 'Jurong East Street 13', town: 'JURONG EAST', fullAddress: 'Blk 102 Jurong East Street 13' },
  { block: '234', street: 'Jurong East Street 21', town: 'JURONG EAST', fullAddress: 'Blk 234 Jurong East Street 21' },
  { block: '288', street: 'Toh Guan Road', town: 'JURONG EAST', fullAddress: 'Blk 288 Toh Guan Road' },
  { block: '316', street: 'Jurong East Street 31', town: 'JURONG EAST', fullAddress: 'Blk 316 Jurong East Street 31' },

  // Jurong West
  { block: '183', street: 'Boon Lay Ave', town: 'JURONG WEST', fullAddress: 'Blk 183 Boon Lay Ave' },
  { block: '267', street: 'Boon Lay Drive', town: 'JURONG WEST', fullAddress: 'Blk 267 Boon Lay Drive' },
  { block: '412', street: 'Jurong West Street 42', town: 'JURONG WEST', fullAddress: 'Blk 412 Jurong West Street 42' },
  { block: '501', street: 'Jurong West Street 51', town: 'JURONG WEST', fullAddress: 'Blk 501 Jurong West Street 51' },
  { block: '652', street: 'Pioneer Road North', town: 'JURONG WEST', fullAddress: 'Blk 652 Pioneer Road North' },
  { block: '715', street: 'Jurong West Street 71', town: 'JURONG WEST', fullAddress: 'Blk 715 Jurong West Street 71' },
  { block: '842', street: 'Jurong West Street 81', town: 'JURONG WEST', fullAddress: 'Blk 842 Jurong West Street 81' },

  // Kallang/Whampoa
  { block: '13', street: 'Lorong 3 Geylang', town: 'KALLANG/WHAMPOA', fullAddress: 'Blk 13 Lorong 3 Geylang' },
  { block: '22', street: 'Boon Keng Road', town: 'KALLANG/WHAMPOA', fullAddress: 'Blk 22 Boon Keng Road' },
  { block: '34', street: 'Whampoa West', town: 'KALLANG/WHAMPOA', fullAddress: 'Blk 34 Whampoa West' },
  { block: '66', street: 'Kallang Bahru', town: 'KALLANG/WHAMPOA', fullAddress: 'Blk 66 Kallang Bahru' },
  { block: '102', street: 'Towner Road', town: 'KALLANG/WHAMPOA', fullAddress: 'Blk 102 Towner Road' },
  { block: '113', street: 'McNair Road', town: 'KALLANG/WHAMPOA', fullAddress: 'Blk 113 McNair Road' },

  // Marine Parade
  { block: '1', street: 'Marine Terrace', town: 'MARINE PARADE', fullAddress: 'Blk 1 Marine Terrace' },
  { block: '15', street: 'Marine Crescent', town: 'MARINE PARADE', fullAddress: 'Blk 15 Marine Crescent' },
  { block: '58', street: 'Marine Drive', town: 'MARINE PARADE', fullAddress: 'Blk 58 Marine Drive' },
  { block: '78', street: 'Marine Drive', town: 'MARINE PARADE', fullAddress: 'Blk 78 Marine Drive' },

  // Pasir Ris
  { block: '120', street: 'Pasir Ris Street 11', town: 'PASIR RIS', fullAddress: 'Blk 120 Pasir Ris Street 11' },
  { block: '214', street: 'Pasir Ris Street 21', town: 'PASIR RIS', fullAddress: 'Blk 214 Pasir Ris Street 21' },
  { block: '442', street: 'Pasir Ris Drive 6', town: 'PASIR RIS', fullAddress: 'Blk 442 Pasir Ris Drive 6' },
  { block: '523', street: 'Pasir Ris Street 52', town: 'PASIR RIS', fullAddress: 'Blk 523 Pasir Ris Street 52' },
  { block: '738', street: 'Pasir Ris Drive 10', town: 'PASIR RIS', fullAddress: 'Blk 738 Pasir Ris Drive 10' },

  // Punggol
  { block: '168', street: 'Punggol Field', town: 'PUNGGOL', fullAddress: 'Blk 168 Punggol Field' },
  { block: '211', street: 'Punggol Walk', town: 'PUNGGOL', fullAddress: 'Blk 211 Punggol Walk' },
  { block: '301', street: 'Punggol Central', town: 'PUNGGOL', fullAddress: 'Blk 301 Punggol Central' },
  { block: '408', street: 'Punggol Way', town: 'PUNGGOL', fullAddress: 'Blk 408 Punggol Way' },
  { block: '601', street: 'Edgedale Plains', town: 'PUNGGOL', fullAddress: 'Blk 601 Edgedale Plains' },

  // Queenstown
  { block: '28', street: 'Dover Crescent', town: 'QUEENSTOWN', fullAddress: 'Blk 28 Dover Crescent' },
  { block: '48', street: 'Tanglin Halt Road', town: 'QUEENSTOWN', fullAddress: 'Blk 48 Tanglin Halt Road' },
  { block: '83', street: 'Commonwealth Close', town: 'QUEENSTOWN', fullAddress: 'Blk 83 Commonwealth Close' },
  { block: '90', street: 'Strathmore Ave', town: 'QUEENSTOWN', fullAddress: 'Blk 90 Strathmore Ave' },
  { block: '168', street: 'Stirling Road', town: 'QUEENSTOWN', fullAddress: 'Blk 168 Stirling Road' },

  // Sembawang
  { block: '312', street: 'Sembawang Vista', town: 'SEMBAWANG', fullAddress: 'Blk 312 Sembawang Vista' },
  { block: '408', street: 'Sembawang Drive', town: 'SEMBAWANG', fullAddress: 'Blk 408 Sembawang Drive' },
  { block: '502', street: 'Canberra Link', town: 'SEMBAWANG', fullAddress: 'Blk 502 Canberra Link' },
  { block: '588', street: 'Montreal Drive', town: 'SEMBAWANG', fullAddress: 'Blk 588 Montreal Drive' },

  // Sengkang
  { block: '112', street: 'Rivervale Walk', town: 'SENGKANG', fullAddress: 'Blk 112 Rivervale Walk' },
  { block: '205', street: 'Compassvale Lane', town: 'SENGKANG', fullAddress: 'Blk 205 Compassvale Lane' },
  { block: '303', street: 'Anchorvale Link', town: 'SENGKANG', fullAddress: 'Blk 303 Anchorvale Link' },
  { block: '405', street: 'Fernvale Lane', town: 'SENGKANG', fullAddress: 'Blk 405 Fernvale Lane' },
  { block: '501', street: 'Buangkok Crescent', town: 'SENGKANG', fullAddress: 'Blk 501 Buangkok Crescent' },

  // Serangoon
  { block: '142', street: 'Serangoon North Ave 1', town: 'SERANGOON', fullAddress: 'Blk 142 Serangoon North Ave 1' },
  { block: '215', street: 'Serangoon Ave 4', town: 'SERANGOON', fullAddress: 'Blk 215 Serangoon Ave 4' },
  { block: '318', street: 'Serangoon Ave 2', town: 'SERANGOON', fullAddress: 'Blk 318 Serangoon Ave 2' },
  { block: '405', street: 'Serangoon Ave 1', town: 'SERANGOON', fullAddress: 'Blk 405 Serangoon Ave 1' },

  // Woodlands
  { block: '112', street: 'Woodlands Street 13', town: 'WOODLANDS', fullAddress: 'Blk 112 Woodlands Street 13' },
  { block: '325', street: 'Woodlands Street 32', town: 'WOODLANDS', fullAddress: 'Blk 325 Woodlands Street 32' },
  { block: '512', street: 'Woodlands Drive 14', town: 'WOODLANDS', fullAddress: 'Blk 512 Woodlands Drive 14' },
  { block: '680', street: 'Woodlands Drive 62', town: 'WOODLANDS', fullAddress: 'Blk 680 Woodlands Drive 62' },
  { block: '801', street: 'Woodlands Street 81', town: 'WOODLANDS', fullAddress: 'Blk 801 Woodlands Street 81' },
  { block: '892', street: 'Woodlands Drive 50', town: 'WOODLANDS', fullAddress: 'Blk 892 Woodlands Drive 50' },

  // Yishun
  { block: '115', street: 'Yishun Ring Road', town: 'YISHUN', fullAddress: 'Blk 115 Yishun Ring Road' },
  { block: '223', street: 'Yishun Street 21', town: 'YISHUN', fullAddress: 'Blk 223 Yishun Street 21' },
  { block: '318', street: 'Yishun Ring Road', town: 'YISHUN', fullAddress: 'Blk 318 Yishun Ring Road' },
  { block: '601', street: 'Yishun Street 61', town: 'YISHUN', fullAddress: 'Blk 601 Yishun Street 61' },
  { block: '754', street: 'Yishun Street 72', town: 'YISHUN', fullAddress: 'Blk 754 Yishun Street 72' },
  { block: '846', street: 'Yishun Ring Road', town: 'YISHUN', fullAddress: 'Blk 846 Yishun Ring Road' },
];

/**
 * Robust town detection from address string
 */
export function detectHdbTown(address: string): string | null {
  if (!address || !address.trim()) return null;
  const upper = address.toUpperCase().trim();

  // 1. Direct town matching
  for (const town of HDB_TOWNS_LIST) {
    if (upper.includes(town)) {
      return town;
    }
  }

  // 2. Sub-estate & neighborhood matching
  for (const [subEstate, town] of Object.entries(SUB_ESTATE_TO_TOWN)) {
    if (upper.includes(subEstate)) {
      return town;
    }
  }

  return null;
}

/**
 * Search HDB blocks given user typing query
 */
export function searchHdbBlocks(query: string, maxResults = 8): HdbBlockItem[] {
  const clean = query.trim();
  if (!clean || clean.length < 1) {
    return HDB_BLOCKS.slice(0, maxResults);
  }

  const upper = clean.toUpperCase();
  // Strip "BLK", "BLOCK", "#" prefixes if present
  const queryWithoutBlk = upper.replace(/^(BLK|BLOCK|\#)\s*/i, '').trim();

  // 1. Match from existing database
  const matches: HdbBlockItem[] = [];

  for (const item of HDB_BLOCKS) {
    const blockUpper = item.block.toUpperCase();
    const streetUpper = item.street.toUpperCase();
    const townUpper = item.town.toUpperCase();
    const fullUpper = item.fullAddress.toUpperCase();

    // Exact block prefix or match
    const isBlockMatch =
      blockUpper === queryWithoutBlk ||
      blockUpper.startsWith(queryWithoutBlk) ||
      fullUpper.includes(upper);

    const isStreetOrTownMatch =
      streetUpper.includes(upper) ||
      townUpper.includes(upper) ||
      fullUpper.includes(upper);

    if (isBlockMatch || isStreetOrTownMatch) {
      matches.push(item);
    }
  }

  // Sort: prioritize exact block or address startsWith
  matches.sort((a, b) => {
    const aStarts = a.fullAddress.toUpperCase().startsWith(upper) || a.block.toUpperCase() === queryWithoutBlk;
    const bStarts = b.fullAddress.toUpperCase().startsWith(upper) || b.block.toUpperCase() === queryWithoutBlk;
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  });

  const sliced = matches.slice(0, maxResults);

  // 2. If the user typed a specific block number and a recognized estate or street not yet in the sliced list,
  // synthesize a valid recognized option so they don't get trapped if typing their own unique block
  const blockNumberMatch = clean.match(/(?:blk|block)?\s*(\d+[a-zA-Z]?)/i);
  const detectedTown = detectHdbTown(clean);

  if (detectedTown && blockNumberMatch) {
    const blockNum = blockNumberMatch[1].toUpperCase();
    const synthesizedAddress = clean.toLowerCase().startsWith('blk')
      ? clean
      : `Blk ${blockNum} ${clean.replace(new RegExp(`^(?:blk|block)?\\s*${blockNum}\\s*`, 'i'), '')}`.trim();

    const alreadyExists = sliced.some(
      (m) => m.block.toUpperCase() === blockNum && m.town.toUpperCase() === detectedTown
    );

    if (!alreadyExists) {
      sliced.unshift({
        block: blockNum,
        street: clean,
        town: detectedTown,
        fullAddress: synthesizedAddress,
      });
    }
  }

  return sliced.slice(0, maxResults);
}

/**
 * Historical lease commencement era estimates for each Singapore HDB Town
 * Reflects development periods from HDB records (e.g. 1970s for Toa Payoh / Queenstown).
 */
export const TOWN_TYPICAL_LEASE_COMMENCE: Record<string, number> = {
  'TOA PAYOH': 1972,
  'BUKIT MERAH': 1974,
  'QUEENSTOWN': 1972,
  'ANG MO KIO': 1979,
  'BEDOK': 1980,
  'CLEMENTI': 1980,
  'CENTRAL AREA': 1980,
  'GEYLANG': 1982,
  'KALLANG/WHAMPOA': 1980,
  'MARINE PARADE': 1976,
  'JURONG EAST': 1984,
  'JURONG WEST': 1986,
  'BISHAN': 1987,
  'YISHUN': 1986,
  'HOUGANG': 1988,
  'BUKIT BATOK': 1986,
  'TAMPINES': 1988,
  'SERANGOON': 1987,
  'PASIR RIS': 1991,
  'WOODLANDS': 1994,
  'CHOA CHU KANG': 1995,
  'BUKIT PANJANG': 1997,
  'SEMBAWANG': 2001,
  'SENGKANG': 2003,
  'PUNGGOL': 2009,
  'BUKIT TIMAH': 1988,
};

/**
 * Derives the estimated remaining lease and origin note for any HDB address.
 * Matches specific block records where known, or defaults to the official estate build era.
 */
export function getEstimatedRemainingLease(
  address: string,
  town?: string | null
): { remainingLease: number; commenceYear: number; note: string } {
  const currentYear = new Date().getFullYear();
  const clean = address.toUpperCase().trim();

  // 1. Try to match specific block record
  const matched = HDB_BLOCKS.find((b) => {
    return clean.includes(b.block) && clean.includes(b.street.toUpperCase());
  });

  if (matched && matched.leaseCommenceYear) {
    const remaining = Math.max(1, Math.min(99, 99 - (currentYear - matched.leaseCommenceYear)));
    return {
      remainingLease: remaining,
      commenceYear: matched.leaseCommenceYear,
      note: `System assumption: ~${remaining} yrs remaining based on Blk ${matched.block} completion (c. ${matched.leaseCommenceYear}).`,
    };
  }

  // 2. Try detected town historical baseline
  const detectedTown = town || detectHdbTown(address);
  if (detectedTown && TOWN_TYPICAL_LEASE_COMMENCE[detectedTown]) {
    const commenceYear = TOWN_TYPICAL_LEASE_COMMENCE[detectedTown];
    const remaining = Math.max(1, Math.min(99, 99 - (currentYear - commenceYear)));
    return {
      remainingLease: remaining,
      commenceYear,
      note: `System assumption: ~${remaining} yrs remaining based on ${detectedTown} estate historical baseline (c. ${commenceYear}).`,
    };
  }

  // 3. Fallback generic Singapore HDB resale baseline
  return {
    remainingLease: 60,
    commenceYear: currentYear - 39,
    note: 'System assumption: ~60 yrs remaining based on Singapore national HDB resale average.',
  };
}
