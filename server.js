
//Flag constructor
class Flag {
    constructor(countryName, nombrePais, shortName, continent) {
    this.countryName = countryName;
    this.nombrePais = nombrePais;
    this.shortName = shortName;
    this.continent = continent;
    this.dir = `public/flags/svg/${shortName}.svg`;
  }
}

const express = require('express')  //Tell the server to use express
const app = express()               //Set app equal to express to simplify the sintaxis.
const PORT = 8000;  //Set the port to 8000
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.use(cors())

let db,
    dbConnectionStr = "mongodb+srv://matiasg11:asdqwe11@cluster0.rlfbyfp.mongodb.net/?retryWrites=true&w=majority" //process.env.DB_STRING,
    dbName = 'FlagsForApi'
    
    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName);
        dbCol = db.collection('flags')
       
    })

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())



// app.get('/', (request, response)=>{  //First we need to get an HTML file. That's what the root is telling us. Then we have a request and a response.
//     response.sendFile(__dirname + '/index.html')      //I want the response to send a file. First we look for the file index.html in the same folder where the server.js file is. 
// })

app.get('/',(request, response)=>{
    db.collection('flags').find().sort({_id: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.get('/api/?countryName=:countryName', (request, response)=>{
    
    console.log(request.body.countryName)
    
    db.collection('flags').find({countryName: request.body.country}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/flags', (req, res) => {
    dbCol.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

app.listen(process.env.PORT || PORT, ()=>{  //It chooses the port from the environment (Heroku) or the one we set for it
    console.log(`The server is running on port ${PORT}!`)
})





const countries = {
    "afghanistan": new Flag('Afghanistan','Afganistán','af','Asia'),
"åland islands": new Flag('Åland Islands','Åland','ax','Europa'),
"albania": new Flag('Albania','Albania','al','Europa'),
"algeria": new Flag('Algeria','Argelia','dz','Africa'),
"american samoa": new Flag('American Samoa','Samoa Americana','as','Oceania'),
"andorra": new Flag('Andorra','Andorra','ad','Europa'),
"angola": new Flag('Angola','Angola','ao','Africa'),
"anguilla": new Flag('Anguilla','Anguila','ai','América'),
"antarctica": new Flag('Antarctica','','',''),
"antigua and barbuda": new Flag('Antigua and Barbuda','Antigua y Barbuda','ag','América'),
"argentina": new Flag('Argentina','Argentina','ar','América'),
"armenia": new Flag('Armenia','Armenia','am','Asia'),
"aruba": new Flag('Aruba','Aruba','aw','América'),
"australia": new Flag('Australia','Australia','au','Oceania'),
"austria": new Flag('Austria','Austria','at','Europa'),
"azerbaijan": new Flag('Azerbaijan','Azerbaiyán','az','Asia'),
"bahamas": new Flag('Bahamas','Bahamas','bs','América'),
"bahrain": new Flag('Bahrain','Baréin','bh','Asia'),
"bangladesh": new Flag('Bangladesh','Bangladesh','bd','Asia'),
"barbados": new Flag('Barbados','Barbados','bb','América'),
"belarus": new Flag('Belarus','Bielorrusia','by','Europa'),
"belgium": new Flag('Belgium','Bélgica','be','Europa'),
"belize": new Flag('Belize','Belice','bz','América'),
"benin": new Flag('Benin','Benín','bj','Africa'),
"bermuda": new Flag('Bermuda','Bermudas','bm','América'),
"bhutan": new Flag('Bhutan','Bután','bt','Asia'),
"bolivia": new Flag('Bolivia','Bolivia','bo','América'),
"bosnia and herzegovina": new Flag('Bosnia and Herzegovina','Bosnia y Herzegovina','ba','Europa'),
"botswana": new Flag('Botswana','Botsuana','bw','Africa'),
"bouvet island": new Flag('Bouvet Island','','',''),
"brazil": new Flag('Brazil','Brasil','br','América'),
"british indian ocean territory": new Flag('British Indian Ocean Territory','','',''),
"british virgin islands": new Flag('British Virgin Islands','Islas Vírgenes Británicas','vg','América'),
"brunei": new Flag('Brunei','Brunéi','bn','Asia'),
"bulgaria": new Flag('Bulgaria','Bulgaria','bg','Europa'),
"burkina faso": new Flag('Burkina Faso','Burkina Faso','bf','Africa'),
"burundi": new Flag('Burundi','Burundi','bi','Africa'),
"cambodia": new Flag('Cambodia','Camboya','kh','Asia'),
"cameroon": new Flag('Cameroon','Camerún','cm','Africa'),
"canada": new Flag('Canada','Canadá','ca','América'),
"cape verde": new Flag('Cape Verde','Cabo Verde','cv','Africa'),
"caribbean netherlands": new Flag('Caribbean Netherlands','Caribe Neerlandés','bq','América'),
"cayman islands": new Flag('Cayman Islands','Islas Caimán','ky','América'),
"central african republic": new Flag('Central African Republic','Rep. Centroafricana','cf','Africa'),
"chad": new Flag('Chad','Chad','td','Africa'),
"chile": new Flag('Chile','Chile','cl','América'),
"china": new Flag('China','China','cn','Asia'),
"christmas island": new Flag('Christmas Island','Isla de Navidad','cx','Oceania'),
"cocos islands": new Flag('Cocos Islands','Islas Cocos','cc','Oceania'),
"colombia": new Flag('Colombia','Colombia','co','América'),
"comoros": new Flag('Comoros','Comoras','km','Africa'),
"cook islands": new Flag('Cook Islands','Islas Cook','ck','Oceania'),
"costa rica": new Flag('Costa Rica','Costa Rica','cr','América'),
"côte d'ivoire": new Flag('Côte d\'Ivoire','Costa de Marfil','ci','Africa'),
"croatia": new Flag('Croatia','Croacia','hr','Europa'),
"cuba": new Flag('Cuba','Cuba','cu','América'),
"curaçao": new Flag('Curaçao','Curazao','cw','América'),
"cyprus": new Flag('Cyprus','Chipre','cy','Europa'),
"czechia": new Flag('Czechia','República Checa','cz','Europa'),
"denmark": new Flag('Denmark','Dinamarca','dk','Europa'),
"djibouti": new Flag('Djibouti','Djibouti','cj','Africa'),
"dominica": new Flag('Dominica','Dominica','dm','América'),
"dominican republic": new Flag('Dominican Republic','República Dominicana','do','América'),
"dr congo": new Flag('DR Congo','Rep. Dem. Congo','cd','Africa'),
"ecuador": new Flag('Ecuador','Ecuador','ec','América'),
"egypt": new Flag('Egypt','Egipto','eg','Africa'),
"el salvador": new Flag('El Salvador','El Salvador','sv','América'),
"england": new Flag('England','Inglaterra','gb-eng','Europa'),
"equatorial guinea": new Flag('Equatorial Guinea','Guinea Ecuatorial','gq','Africa'),
"eritrea": new Flag('Eritrea','Eritrea','er','Africa'),
"estonia": new Flag('Estonia','Estonia','ee','Europa'),
"eswatini": new Flag('Eswatini','Suazilandia','sz','Africa'),
"ethiopia": new Flag('Ethiopia','Etiopía','et','Africa'),
"falkland islands": new Flag('Falkland Islands','Islas Malvinas','ar','America'),
"faroe islands": new Flag('Faroe Islands','Islas Feroe','fo','Europa'),
"fiji": new Flag('Fiji','Fiyi','fj','Oceania'),
"finland": new Flag('Finland','Finlandia','fi','Europa'),
"france": new Flag('France','Francia','fr','Europa'),
"french guiana": new Flag('French Guiana','Guayana Francesa','gf','América'),
"french polynesia": new Flag('French Polynesia','Polinesia Francesa','pf','Oceania'),
"french southern and antarctic lands": new Flag('French Southern and Antarctic Lands','','',''),
"gabon": new Flag('Gabon','Gabón','ga','Africa'),
"gambia": new Flag('Gambia','Gambia','gm','Africa'),
"georgia": new Flag('Georgia','Georgia','ge','Asia'),
"germany": new Flag('Germany','Alemania','de','Europa'),
"ghana": new Flag('Ghana','Ghana','gh','Africa'),
"gibraltar": new Flag('Gibraltar','Gibraltar','gi','Europa'),
"greece": new Flag('Greece','Grecia','gr','Europa'),
"greenland": new Flag('Greenland','Groenlandia','gl','América'),
"grenada": new Flag('Grenada','Granada','gd','América'),
"guadeloupe": new Flag('Guadeloupe','Guadalupe','gp','América'),
"guam": new Flag('Guam','Guam','gu','Oceania'),
"guatemala": new Flag('Guatemala','Guatemala','gt','América'),
"guernsey": new Flag('Guernsey','Guernsey','gg','Europa'),
"guinea": new Flag('Guinea','Guinea','gn','Africa'),
"guinea-bissau": new Flag('Guinea-Bissau','Guinea-Bissau','gw','Africa'),
"guyana": new Flag('Guyana','Guyana','gy','América'),
"haiti": new Flag('Haiti','Haití','ht','América'),
"heard island and mcdonald islands": new Flag('Heard Island and McDonald Islands','','',''),
"honduras": new Flag('Honduras','Honduras','hn','América'),
"hong kong": new Flag('Hong Kong','Hong Kong','hk','Asia'),
"hungary": new Flag('Hungary','Hungría','hu','Europa'),
"iceland": new Flag('Iceland','Islandia','is','Europa'),
"india": new Flag('India','India','in','Asia'),
"indonesia": new Flag('Indonesia','Indonesia','id','Asia'),
"iran": new Flag('Iran','Irán','ir','Asia'),
"iraq": new Flag('Iraq','Irak','iq','Asia'),
"ireland": new Flag('Ireland','Irlanda','ie','Europa'),
"isle of man": new Flag('Isle of Man','Isla de Man','im','Europa'),
"israel": new Flag('Israel','Israel','il','Asia'),
"italy": new Flag('Italy','Italia','it','Europa'),
"jamaica": new Flag('Jamaica','Jamaica','jm','América'),
"japan": new Flag('Japan','Japón','jp','Asia'),
"jersey": new Flag('Jersey','Jersey','je','Europa'),
"jordan": new Flag('Jordan','Jordania','jo','Asia'),
"kazakhstan": new Flag('Kazakhstan','Kazajistán','kz','Asia'),
"kenya": new Flag('Kenya','Kenia','ke','Africa'),
"kiribati": new Flag('Kiribati','Kiribati','ki','Oceania'),
"kosovo": new Flag('Kosovo','Kosovo','xk','Europa'),
"kuwait": new Flag('Kuwait','Kuwait','kw','Asia'),
"kyrgyzstan": new Flag('Kyrgyzstan','Kirguistán','kg','Asia'),
"laos": new Flag('Laos','Laos','la','Asia'),
"latvia": new Flag('Latvia','Letonia','lv','Europa'),
"lebanon": new Flag('Lebanon','Líbano','lb','Asia'),
"lesotho": new Flag('Lesotho','Lesoto','ls','Africa'),
"liberia": new Flag('Liberia','Liberia','lr','Africa'),
"libya": new Flag('Libya','Libia','ly','Africa'),
"liechtenstein": new Flag('Liechtenstein','Liechtenstein','li','Europa'),
"lithuania": new Flag('Lithuania','Lituania','lt','Europa'),
"luxembourg": new Flag('Luxembourg','Luxemburgo','lu','Europa'),
"macau": new Flag('Macau','Macao','mo','Asia'),
"madagascar": new Flag('Madagascar','Madagascar','mg','Africa'),
"malawi": new Flag('Malawi','Malawi','mw','Africa'),
"malaysia": new Flag('Malaysia','Malasia','my','Asia'),
"maldives": new Flag('Maldives','Maldivas','mv','Asia'),
"mali": new Flag('Mali','Malí','ml','Africa'),
"malta": new Flag('Malta','Malta','mt','Europa'),
"marshall islands": new Flag('Marshall Islands','Islas Marshall','mh','Oceania'),
"martinique": new Flag('Martinique','Martinica','mq','América'),
"mauritania": new Flag('Mauritania','Mauritania','mr','Africa'),
"mauritius": new Flag('Mauritius','Mauricio','mu','Africa'),
"mayotte": new Flag('Mayotte','Mayotte','yt','Africa'),
"mexico": new Flag('Mexico','México','mx','América'),
"micronesia": new Flag('Micronesia','Micronesia','fm','Oceania'),
"moldova": new Flag('Moldova','Moldavia','md','Europa'),
"monaco": new Flag('Monaco','Mónaco','mc','Europa'),
"mongolia": new Flag('Mongolia','Mongolia','mn','Asia'),
"montenegro": new Flag('Montenegro','Montenegro','me','Europa'),
"montserrat": new Flag('Montserrat','Montserrat','ms','América'),
"morocco": new Flag('Morocco','Marruecos','ma','Africa'),
"mozambique": new Flag('Mozambique','Mozambique','mz','Africa'),
"myanmar": new Flag('Myanmar','Myanmar','mm','Asia'),
"namibia": new Flag('Namibia','Namibia','na','Africa'),
"nauru": new Flag('Nauru','Nauru','nr','Oceania'),
"nepal": new Flag('Nepal','Nepal','np','Asia'),
"netherlands": new Flag('Netherlands','Países Bajos','nl','Europa'),
"new caledonia": new Flag('New Caledonia','Nueva Caledonia','nc','Oceania'),
"new zealand": new Flag('New Zealand','Nueva Zelanda','nz','Oceania'),
"nicaragua": new Flag('Nicaragua','Nicaragua','ni','América'),
"niger": new Flag('Niger','Níger','ne','Africa'),
"nigeria": new Flag('Nigeria','Nigeria','ng','Africa'),
"niue": new Flag('Niue','Niue','un','Oceania'),
"norfolk island": new Flag('Norfolk Island','Isla Norfolk','nf','Oceania'),
"north korea": new Flag('North Korea','Corea del Norte','kp','Asia'),
"north macedonia": new Flag('North Macedonia','Macedonia del Norte','mk','Europa'),
"northern ireland": new Flag('Northern Ireland','Northern Ireland','gb-nir','Europa'),
"northern mariana islands": new Flag('Northern Mariana Islands','Islas Marianas del Norte','mp','Oceania'),
"norway": new Flag('Norway','Noruega','no','Europa'),
"oman": new Flag('Oman','Omán','om','Asia'),
"pakistan": new Flag('Pakistan','Pakistán','pk','Asia'),
"palau": new Flag('Palau','Palaos','pw','Oceania'),
"palestine": new Flag('Palestine','Palestina','ps','Asia'),
"panama": new Flag('Panama','Panamá','pa','América'),
"papua new guinea": new Flag('Papua New Guinea','Papúa Nueva Guinea','pg','Oceania'),
"paraguay": new Flag('Paraguay','Paraguay','py','América'),
"peru": new Flag('Peru','Perú','pe','América'),
"philippines": new Flag('Philippines','Filipinas','ph','Asia'),
"pitcairn islands": new Flag('Pitcairn Islands','Islas Pitcairn','pn','Oceania'),
"poland": new Flag('Poland','Polonia','pl','Europa'),
"portugal": new Flag('Portugal','Portugal','pt','Europa'),
"puerto rico": new Flag('Puerto Rico','Puerto Rico','pr','América'),
"qatar": new Flag('Qatar','Catar','qa','Asia'),
"republic of the congo": new Flag('Republic of the Congo','R. Congo','cg','Africa'),
"réunion": new Flag('Réunion','Reunión','re','Africa'),
"romania": new Flag('Romania','Rumania','ro','Europa'),
"russia": new Flag('Russia','Rusia','ru','Europa'),
"rwanda": new Flag('Rwanda','Ruanda','rw','Africa'),
"saint barthélemy": new Flag('Saint Barthélemy','San Bartolomé','bl','América'),
"saint helena, ascension and tristan da cunha": new Flag('Saint Helena, Ascension and Tristan da Cunha','Santa Elena, Ascensión y Tristán de Acuña','sh','Africa'),
"saint kitts and nevis": new Flag('Saint Kitts and Nevis','San Cristóbal y Nieves','kn','América'),
"saint lucia": new Flag('Saint Lucia','Santa Lucía','lc','América'),
"saint martin": new Flag('Saint Martin','San Martín (Francia)','mf','América'),
"saint pierre and miquelon": new Flag('Saint Pierre and Miquelon','San Pedro y Miquelón','pm','América'),
"saint vincent and the grenadines": new Flag('Saint Vincent and the Grenadines','San Vicente y las Granadinas','vc','América'),
"samoa": new Flag('Samoa','Samoa','ws','Oceania'),
"san marino": new Flag('San Marino','San Marino','sm','Europa'),
"são tomé and príncipe": new Flag('São Tomé and Príncipe','Santo Tomé y Príncipe','st','Africa'),
"saudi arabia": new Flag('Saudi Arabia','Arabia Saudita','sa','Asia'),
"scotland": new Flag('Scotland','Scotland','gb-sct','Europa'),
"senegal": new Flag('Senegal','Senegal','sn','Africa'),
"serbia": new Flag('Serbia','Serbia','rs','Europa'),
"seychelles": new Flag('Seychelles','Seychelles','sc','Africa'),
"sierra leone": new Flag('Sierra Leone','Sierra Leona','sl','Africa'),
"singapore": new Flag('Singapore','Singapur','sg','Asia'),
"sint maarten": new Flag('Sint Maarten','San Martín (Países Bajos)','sm','América'),
"slovakia": new Flag('Slovakia','Eslovaquia','sk','Europa'),
"slovenia": new Flag('Slovenia','Eslovenia','si','Europa'),
"solomon islands": new Flag('Solomon Islands','Islas Salomón','sb','Oceania'),
"somalia": new Flag('Somalia','Somalia','so','Africa'),
"south africa": new Flag('South Africa','Sudáfrica','za','Africa'),
"south georgia": new Flag('South Georgia','Georgias del Sur','ar','America'),
"south korea": new Flag('South Korea','Corea del Sur','kr','Asia'),
"south sudan": new Flag('South Sudan','Sudán del Sur','ss','Africa'),
"spain": new Flag('Spain','España','es','Europa'),
"sri lanka": new Flag('Sri Lanka','Sri Lanka','lk','Asia'),
"sudan": new Flag('Sudan','Sudán','sd','Africa'),
"suriname": new Flag('Suriname','Surinam','sr','América'),
"svalbard and jan mayen": new Flag('Svalbard and Jan Mayen','Svalbard y Jan Mayen','bv','Europa'),
"sweden": new Flag('Sweden','Suecia','se','Europa'),
"switzerland": new Flag('Switzerland','Suiza','ch','Europa'),
"syria": new Flag('Syria','Siria','sy','Asia'),
"taiwan": new Flag('Taiwan','Tailandia','th','Asia'),
"tajikistan": new Flag('Tajikistan','Taiwan','tw','Asia'),
"tanzania": new Flag('Tanzania','Tanzania','tz','Africa'),
"thailand": new Flag('Thailand','Tayikistán','tj','Asia'),
"timor-leste": new Flag('Timor-Leste','Timor Oriental','tl','Asia'),
"togo": new Flag('Togo','Togo','tg','Africa'),
"tokelau": new Flag('Tokelau','Tokelau','tk','Oceania'),
"tonga": new Flag('Tonga','Tonga','to','Oceania'),
"trinidad and tobago": new Flag('Trinidad and Tobago','Trinidad y Tobago','tt','América'),
"tunisia": new Flag('Tunisia','Túnez','tn','Africa'),
"turkey": new Flag('Turkey','Turquía','tr','Europa'),
"turkmenistan": new Flag('Turkmenistan','Turkmenistán','tm','Asia'),
"turks and caicos islands": new Flag('Turks and Caicos Islands','Islas Turcas y Caicos','tc','América'),
"tuvalu": new Flag('Tuvalu','Tuvalu','tv','Oceania'),
"uganda": new Flag('Uganda','Uganda','ug','Africa'),
"ukraine": new Flag('Ukraine','Ucrania','ua','Europa'),
"united arab emirates": new Flag('United Arab Emirates','Emiratos Árabes Unidos','ae','Asia'),
"united kingdom": new Flag('United Kingdom','Reino Unido','uk','Europa'),
"united states": new Flag('United States','Estados Unidos','us','América'),
"united states minor outlying islands": new Flag('United States Minor Outlying Islands','Estados Unidos','us','América'),
"united states virgin islands": new Flag('United States Virgin Islands','Islas Vírgenes de los Estados Unidos','vi','América'),
"uruguay": new Flag('Uruguay','Uruguay','uy','América'),
"uzbekistan": new Flag('Uzbekistan','Uzbekistán','uz','Asia'),
"vanuatu": new Flag('Vanuatu','Vanuatu','vu','Oceania'),
"vatican city": new Flag('Vatican City','Ciudad del Vaticano','va','Europa'),
"venezuela": new Flag('Venezuela','Venezuela','ve','América'),
"vietnam": new Flag('Vietnam','Vietnam','vn','Asia'),
"wales": new Flag('Wales','Wales','gb-wls','Europa'),
"wallis and futuna": new Flag('Wallis and Futuna','','',''),
"western sahara": new Flag('Western Sahara','Rep. Dem. Sahara Occidental','eh','Africa'),
"yemen": new Flag('Yemen','Yemen','ye','Asia'),
"zambia": new Flag('Zambia','Zambia','zm','Africa'),
"zimbabwe": new Flag('Zimbabwe','Zimbabue','zw','Africa'),


    "blank": new Flag('blank', 'vz'),

}