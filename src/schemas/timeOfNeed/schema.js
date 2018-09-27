
let schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'APPLICATION FOR TIME OF NEED BENEFITS IN A VA NATIONAL CEMETERY',
    type: 'object',
    additionalProperties: false,
    properties: {
        application: {
            type: 'object',
            required: [
                'burial_activity_type',
                'remains-type',
                'emblem_code',
                'cremains_type'
            ],
            properties: {
                burial_activity_type: {
                    type: 'string',
                    'enum': ['Disinterment',
                        'Interment',
                        'Reinterment',
                        'Memorial Service Only',
                        'Direct Interment']
                },
                remains_type: {
                    type: 'string',
                    'enum:': ['Casketed',
                        'Cremains',
                        'Memorial Service Only']
                },
                emblem_code: {
                    type: 'string',
                    'enum:': []
                },
                liner_type: {
                    type: 'string',
                    'enum:': ['Government Liner',
                        'No Liner Requested',
                        'Private Vault',
                        'Other']
                },
                liner_size: {
                    type: 'string',
                    'enum:': ['Standard',
                        'Oversize',
                        'Infant',
                        'Other']
                },
                cremains_type: {
                    type: 'string',
                    'enum:': ['In-Ground',
                        'Columbarium',
                        'Scattered',
                        'Ossuary',
                        'Other']
                },
                cemetery_type: {
                    type: 'string',
                    'enum:': ['01 - CHRISTIAN CROSS',
                        '02 - BUDDHIST (Wheel of Righteousness)',
                        '03 - HEBREW (Star of David)',
                        '04 - PRESBYTERIAN CROSS',
                        '05 - RUSSIAN ORTHODOX CROSS',
                        '06 - LUTHERAN CROSS',
                        '07 - EPISCOPAL CROSS',
                        '08 - UNITARIAN CHURCH (Flaming Chalice)',
                        '09 - UNITED METHODIST CHURCH',
                        '10 - AARONIC ORDER CHURCH',
                        '11 - MORMON (Angel Moroni)',
                        '12 - NATIVE AMERICAN CHURCH OF NORTH AMERICA',
                        '13 - SERBIAN ORTHODOX',
                        '14 - GREEK CROSS',
                        '15 - BAHAI (9 Pointed Star)',
                        '16 - ATHEIST',
                        '17 - MUSLIM (Crescent and Star)',
                        '18 - HINDU',
                        '19 - KONKO-KYO FAITH',
                        '20 - COMMUNITY OF CHRIST',
                        '21 - SUFISM REORIENTED',
                        '22 - TENRIKYO CHURCH',
                        '23 - SEICHO-NO-IE',
                        '24 - CHURCH OF WORLD MESSIANITY',
                        '25 - UNITED CHURCH OF RELIGIOUS SCIENCE',
                        '26 - CHRISTIAN REFORMED CHURCH',
                        '27 - UNITED MORAVIAN CHURCH',
                        '28 - ECKANKAR',
                        '29 - CHRISTIAN CHURCH',
                        '30 - CHRISTIAN & MISSIONARY ALLIANCE',
                        '31 - UNITED CHURCH OF CHRIST',
                        '32 - HUMANIST',
                        '33 - PRESBYTERIAN CHURCH (USA)',
                        '34 - IZUMO TAISHAKYO MISSION OF HAWAII',
                        '35 - SOKA GAKKAI INTERNATIONAL (USA)',
                        '36 - SIKH (KHANDA)',
                        '37 - WICCA (Pentacle)',
                        '38 - LUTHERAN CHURCH MISSOURI SYNOD',
                        '39 - NEW APOSTOLIC CHURCH',
                        '40 - SEVENTH DAY ADVENTIST CHURCH',
                        '41 - CELTIC CROSS',
                        '42 - ARMENIAN CROSS',
                        '43 - FAROHAR',
                        '44 - MESSIANIC JEWISH',
                        '45 - KOHEN HANDS',
                        '46 - CATHOLIC CELTIC CROSS',
                        '47 - CHRISTIAN SCIENTIST (Cross & Crown)',
                        '48 - MEDICINE WHEEL',
                        '49 - INFINITY',
                        '50 - SOUTHERN CROSS OF HONOR (Confederate States)',
                        '51 - LUTHER ROSE',
                        '52 - LANDING EAGLE',
                        '53 - FOUR DIRECTIONS',
                        '54 - CHURCH OF NAZARENE',
                        '55 - HAMMER OF THOR',
                        '56 - UNIFICATION CHURCH',
                        '57 - SANDHILL CRANE',
                        '58 - CHURCH OF GOD',
                        '59 - POMEGRANATE',
                        '60 - MESSIANIC',
                        '61 - SHINTO',
                        '62 - SACRED HEART',
                        '63 - Nyame Ye Ohene African Ancest',
                        '64 - MALTESE CROSS',
                        '65 - DRUID (AWEN)',
                        '66 - WISCONSIN EVANGELICAL LUTHERAN SYNOD',
                        '67 - POLISH NATIONAL CATHOLIC CHURCH',
                        '68 - GUARDIAN ANGEL',
                        '69 - HEART',
                        '70 - SHEPHERD AND FLAG',
                        '98 - MUSLIM (Islamic 5 Pointed Star)',
                        '99 - NONE REQUESTED',
                        'UNKNOWN']
                },
                subsequentIndicator: {
                    type: 'string',
                    'enum': ['First', 'Subsequent']
                }
            }
        }
    }
};

export default schema;
