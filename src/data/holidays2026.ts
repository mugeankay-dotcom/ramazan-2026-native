// Kandil Günleri 2026 (Diyanet Takvimi)
export const kandilDays2026 = [
    {
        date: '2026-01-22',
        hijriDate: '1 Recep 1447',
        name: {
            tr: 'Regaip Kandili',
            en: 'Ragaib Night',
            ar: 'ليلة الرغائب',
            de: 'Regaib-Nacht',
            fr: 'Nuit de Ragaib',
            id: 'Malam Ragaib',
            ur: 'شب رغائب'
        },
        description: {
            tr: 'Recep ayının ilk Cuma gecesi',
            en: 'First Friday night of Rajab',
            ar: 'أول ليلة جمعة في شهر رجب',
            de: 'Erste Freitagnacht des Rajab',
            fr: 'Première nuit de vendredi du Rajab',
            id: 'Malam Jumat pertama bulan Rajab',
            ur: 'رجب کی پہلی جمعہ کی رات'
        }
    },
    {
        date: '2026-02-12',
        hijriDate: '22 Recep 1447',
        name: {
            tr: 'Miraç Kandili',
            en: 'Isra and Miraj',
            ar: 'ليلة الإسراء والمعراج',
            de: 'Nacht der Himmelfahrt',
            fr: 'Nuit du Voyage Nocturne',
            id: 'Isra Miraj',
            ur: 'شب معراج'
        },
        description: {
            tr: 'Hz. Muhammed\'in göğe yükselişi',
            en: 'Prophet Muhammad\'s ascension to heaven',
            ar: 'معراج النبي محمد إلى السماء',
            de: 'Himmelfahrt des Propheten Muhammad',
            fr: 'Ascension du Prophète Muhammad',
            id: 'Perjalanan malam dan kenaikan Nabi Muhammad',
            ur: 'حضور نبی کریم کا آسمان پر عروج'
        }
    },
    {
        date: '2026-03-01',
        hijriDate: '15 Şaban 1447',
        name: {
            tr: 'Berat Kandili',
            en: 'Mid-Shaban Night',
            ar: 'ليلة النصف من شعبان',
            de: 'Nacht der Vergebung',
            fr: 'Nuit du Pardon',
            id: 'Malam Nisfu Syaban',
            ur: 'شب برات'
        },
        description: {
            tr: 'Günahların affedildiği gece',
            en: 'Night of forgiveness',
            ar: 'ليلة المغفرة',
            de: 'Nacht der Vergebung der Sünden',
            fr: 'Nuit du pardon des péchés',
            id: 'Malam pengampunan dosa',
            ur: 'گناہوں کی معافی کی رات'
        }
    },
    {
        date: '2026-03-16',
        hijriDate: '27 Ramazan 1447',
        name: {
            tr: 'Kadir Gecesi',
            en: 'Night of Power',
            ar: 'ليلة القدر',
            de: 'Nacht der Bestimmung',
            fr: 'Nuit du Destin',
            id: 'Lailatul Qadr',
            ur: 'شب قدر'
        },
        description: {
            tr: 'Kuran\'ın indirildiği gece, bin aydan hayırlı',
            en: 'Night when Quran was revealed, better than thousand months',
            ar: 'ليلة نزول القرآن، خير من ألف شهر',
            de: 'Nacht der Offenbarung des Korans, besser als tausend Monate',
            fr: 'Nuit de la révélation du Coran, meilleure que mille mois',
            id: 'Malam turunnya Al-Quran, lebih baik dari seribu bulan',
            ur: 'قرآن نازل ہونے کی رات، ہزار مہینوں سے بہتر'
        }
    },
    {
        date: '2026-05-29',
        hijriDate: '12 Zilhicce 1447',
        name: {
            tr: 'Mevlid Kandili',
            en: 'Prophet\'s Birthday',
            ar: 'المولد النبوي',
            de: 'Geburtstag des Propheten',
            fr: 'Anniversaire du Prophète',
            id: 'Maulid Nabi',
            ur: 'میلاد النبی'
        },
        description: {
            tr: 'Hz. Muhammed\'in doğum günü',
            en: 'Birth of Prophet Muhammad',
            ar: 'ذكرى ميلاد النبي محمد',
            de: 'Geburtstag des Propheten Muhammad',
            fr: 'Naissance du Prophète Muhammad',
            id: 'Peringatan kelahiran Nabi Muhammad',
            ur: 'حضور نبی کریم کی ولادت'
        }
    }
];

// Ülke bazlı resmi tatiller 2026
export const fallbackHolidays2026: Record<string, Array<{date: string, name: string, localName: string}>> = {
    TR: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'Yılbaşı' },
        { date: '2026-03-20', name: 'Eid al-Fitr Eve', localName: 'Ramazan Bayramı Arefesi' },
        { date: '2026-03-21', name: 'Eid al-Fitr 1st Day', localName: 'Ramazan Bayramı 1. Gün' },
        { date: '2026-03-22', name: 'Eid al-Fitr 2nd Day', localName: 'Ramazan Bayramı 2. Gün' },
        { date: '2026-03-23', name: 'Eid al-Fitr 3rd Day', localName: 'Ramazan Bayramı 3. Gün' },
        { date: '2026-04-23', name: 'National Sovereignty Day', localName: 'Ulusal Egemenlik ve Çocuk Bayramı' },
        { date: '2026-05-01', name: 'Labour Day', localName: 'Emek ve Dayanışma Günü' },
        { date: '2026-05-19', name: 'Youth Day', localName: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı' },
        { date: '2026-05-27', name: 'Eid al-Adha Eve', localName: 'Kurban Bayramı Arefesi' },
        { date: '2026-05-28', name: 'Eid al-Adha 1st Day', localName: 'Kurban Bayramı 1. Gün' },
        { date: '2026-05-29', name: 'Eid al-Adha 2nd Day', localName: 'Kurban Bayramı 2. Gün' },
        { date: '2026-05-30', name: 'Eid al-Adha 3rd Day', localName: 'Kurban Bayramı 3. Gün' },
        { date: '2026-05-31', name: 'Eid al-Adha 4th Day', localName: 'Kurban Bayramı 4. Gün' },
        { date: '2026-07-15', name: 'Democracy Day', localName: 'Demokrasi ve Milli Birlik Günü' },
        { date: '2026-08-30', name: 'Victory Day', localName: 'Zafer Bayramı' },
        { date: '2026-10-29', name: 'Republic Day', localName: 'Cumhuriyet Bayramı' }
    ],
    DE: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'Neujahr' },
        { date: '2026-04-03', name: 'Good Friday', localName: 'Karfreitag' },
        { date: '2026-04-06', name: 'Easter Monday', localName: 'Ostermontag' },
        { date: '2026-05-01', name: 'Labour Day', localName: 'Tag der Arbeit' },
        { date: '2026-05-14', name: 'Ascension Day', localName: 'Christi Himmelfahrt' },
        { date: '2026-05-25', name: 'Whit Monday', localName: 'Pfingstmontag' },
        { date: '2026-10-03', name: 'German Unity Day', localName: 'Tag der Deutschen Einheit' },
        { date: '2026-12-25', name: 'Christmas Day', localName: 'Erster Weihnachtstag' },
        { date: '2026-12-26', name: 'St. Stephen\'s Day', localName: 'Zweiter Weihnachtstag' }
    ],
    FR: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'Jour de l\'An' },
        { date: '2026-04-06', name: 'Easter Monday', localName: 'Lundi de Pâques' },
        { date: '2026-05-01', name: 'Labour Day', localName: 'Fête du Travail' },
        { date: '2026-05-08', name: 'Victory Day', localName: 'Fête de la Victoire 1945' },
        { date: '2026-05-14', name: 'Ascension Day', localName: 'Ascension' },
        { date: '2026-05-25', name: 'Whit Monday', localName: 'Lundi de Pentecôte' },
        { date: '2026-07-14', name: 'Bastille Day', localName: 'Fête Nationale' },
        { date: '2026-08-15', name: 'Assumption Day', localName: 'Assomption' },
        { date: '2026-11-01', name: 'All Saints\' Day', localName: 'Toussaint' },
        { date: '2026-11-11', name: 'Armistice Day', localName: 'Armistice' },
        { date: '2026-12-25', name: 'Christmas Day', localName: 'Noël' }
    ],
    GB: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day' },
        { date: '2026-04-03', name: 'Good Friday', localName: 'Good Friday' },
        { date: '2026-04-06', name: 'Easter Monday', localName: 'Easter Monday' },
        { date: '2026-05-04', name: 'Early May Bank Holiday', localName: 'Early May Bank Holiday' },
        { date: '2026-05-25', name: 'Spring Bank Holiday', localName: 'Spring Bank Holiday' },
        { date: '2026-08-31', name: 'Summer Bank Holiday', localName: 'Summer Bank Holiday' },
        { date: '2026-12-25', name: 'Christmas Day', localName: 'Christmas Day' },
        { date: '2026-12-28', name: 'Boxing Day', localName: 'Boxing Day' }
    ],
    US: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'New Year\'s Day' },
        { date: '2026-01-19', name: 'Martin Luther King Jr. Day', localName: 'Martin Luther King Jr. Day' },
        { date: '2026-02-16', name: 'Presidents\' Day', localName: 'Presidents\' Day' },
        { date: '2026-05-25', name: 'Memorial Day', localName: 'Memorial Day' },
        { date: '2026-07-03', name: 'Independence Day (Observed)', localName: 'Independence Day (Observed)' },
        { date: '2026-09-07', name: 'Labor Day', localName: 'Labor Day' },
        { date: '2026-10-12', name: 'Columbus Day', localName: 'Columbus Day' },
        { date: '2026-11-11', name: 'Veterans Day', localName: 'Veterans Day' },
        { date: '2026-11-26', name: 'Thanksgiving Day', localName: 'Thanksgiving Day' },
        { date: '2026-12-25', name: 'Christmas Day', localName: 'Christmas Day' }
    ],
    SA: [
        { date: '2026-03-21', name: 'Eid al-Fitr', localName: 'عيد الفطر' },
        { date: '2026-03-22', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-03-23', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-05-28', name: 'Eid al-Adha', localName: 'عيد الأضحى' },
        { date: '2026-05-29', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-05-30', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-05-31', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-09-23', name: 'Saudi National Day', localName: 'اليوم الوطني' }
    ],
    AE: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'رأس السنة الميلادية' },
        { date: '2026-03-21', name: 'Eid al-Fitr', localName: 'عيد الفطر' },
        { date: '2026-03-22', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-03-23', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-05-28', name: 'Eid al-Adha', localName: 'عيد الأضحى' },
        { date: '2026-05-29', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-05-30', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-06-17', name: 'Islamic New Year', localName: 'رأس السنة الهجرية' },
        { date: '2026-08-26', name: 'Prophet\'s Birthday', localName: 'المولد النبوي' },
        { date: '2026-12-02', name: 'National Day', localName: 'اليوم الوطني' },
        { date: '2026-12-03', name: 'National Day Holiday', localName: 'اليوم الوطني' }
    ],
    ID: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'Tahun Baru Masehi' },
        { date: '2026-01-29', name: 'Chinese New Year', localName: 'Tahun Baru Imlek' },
        { date: '2026-03-14', name: 'Isra and Miraj', localName: 'Isra Miraj Nabi Muhammad' },
        { date: '2026-03-17', name: 'Nyepi', localName: 'Hari Raya Nyepi' },
        { date: '2026-03-21', name: 'Eid al-Fitr', localName: 'Hari Raya Idul Fitri' },
        { date: '2026-03-22', name: 'Eid al-Fitr Holiday', localName: 'Hari Raya Idul Fitri' },
        { date: '2026-04-03', name: 'Good Friday', localName: 'Wafat Isa Almasih' },
        { date: '2026-05-01', name: 'Labour Day', localName: 'Hari Buruh Internasional' },
        { date: '2026-05-14', name: 'Ascension Day', localName: 'Kenaikan Isa Almasih' },
        { date: '2026-05-26', name: 'Waisak', localName: 'Hari Raya Waisak' },
        { date: '2026-05-28', name: 'Eid al-Adha', localName: 'Hari Raya Idul Adha' },
        { date: '2026-06-01', name: 'Pancasila Day', localName: 'Hari Lahir Pancasila' },
        { date: '2026-06-17', name: 'Islamic New Year', localName: 'Tahun Baru Islam' },
        { date: '2026-08-17', name: 'Independence Day', localName: 'Hari Kemerdekaan' },
        { date: '2026-08-26', name: 'Prophet\'s Birthday', localName: 'Maulid Nabi Muhammad' },
        { date: '2026-12-25', name: 'Christmas Day', localName: 'Hari Raya Natal' }
    ],
    PK: [
        { date: '2026-02-05', name: 'Kashmir Day', localName: 'یوم کشمیر' },
        { date: '2026-03-21', name: 'Eid al-Fitr', localName: 'عید الفطر' },
        { date: '2026-03-22', name: 'Eid al-Fitr Holiday', localName: 'عید الفطر' },
        { date: '2026-03-23', name: 'Pakistan Day', localName: 'یوم پاکستان' },
        { date: '2026-05-01', name: 'Labour Day', localName: 'یوم مزدور' },
        { date: '2026-05-28', name: 'Eid al-Adha', localName: 'عید الاضحی' },
        { date: '2026-05-29', name: 'Eid al-Adha Holiday', localName: 'عید الاضحی' },
        { date: '2026-05-30', name: 'Eid al-Adha Holiday', localName: 'عید الاضحی' },
        { date: '2026-08-14', name: 'Independence Day', localName: 'یوم آزادی' },
        { date: '2026-08-26', name: 'Prophet\'s Birthday', localName: 'عید میلاد النبی' },
        { date: '2026-11-09', name: 'Iqbal Day', localName: 'یوم اقبال' },
        { date: '2026-12-25', name: 'Quaid-e-Azam Day', localName: 'یوم قائداعظم' }
    ],
    MY: [
        { date: '2026-01-01', name: 'New Year\'s Day', localName: 'Tahun Baru' },
        { date: '2026-01-29', name: 'Chinese New Year', localName: 'Tahun Baru Cina' },
        { date: '2026-01-30', name: 'Chinese New Year Holiday', localName: 'Tahun Baru Cina' },
        { date: '2026-02-01', name: 'Federal Territory Day', localName: 'Hari Wilayah Persekutuan' },
        { date: '2026-03-21', name: 'Eid al-Fitr', localName: 'Hari Raya Aidilfitri' },
        { date: '2026-03-22', name: 'Eid al-Fitr Holiday', localName: 'Hari Raya Aidilfitri' },
        { date: '2026-05-01', name: 'Labour Day', localName: 'Hari Pekerja' },
        { date: '2026-05-26', name: 'Wesak Day', localName: 'Hari Wesak' },
        { date: '2026-05-28', name: 'Eid al-Adha', localName: 'Hari Raya Aidiladha' },
        { date: '2026-06-06', name: 'King\'s Birthday', localName: 'Hari Keputeraan Yang di-Pertuan Agong' },
        { date: '2026-08-31', name: 'National Day', localName: 'Hari Kebangsaan' },
        { date: '2026-08-26', name: 'Prophet\'s Birthday', localName: 'Maulidur Rasul' },
        { date: '2026-09-16', name: 'Malaysia Day', localName: 'Hari Malaysia' },
        { date: '2026-10-29', name: 'Deepavali', localName: 'Deepavali' },
        { date: '2026-12-25', name: 'Christmas Day', localName: 'Hari Krismas' }
    ],
    EG: [
        { date: '2026-01-07', name: 'Coptic Christmas', localName: 'عيد الميلاد المجيد' },
        { date: '2026-01-25', name: 'Revolution Day', localName: 'ثورة 25 يناير' },
        { date: '2026-03-21', name: 'Eid al-Fitr', localName: 'عيد الفطر' },
        { date: '2026-03-22', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-03-23', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-04-20', name: 'Coptic Easter', localName: 'عيد الفصح القبطي' },
        { date: '2026-04-25', name: 'Sinai Liberation Day', localName: 'عيد تحرير سيناء' },
        { date: '2026-05-01', name: 'Labour Day', localName: 'عيد العمال' },
        { date: '2026-05-28', name: 'Eid al-Adha', localName: 'عيد الأضحى' },
        { date: '2026-05-29', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-05-30', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-05-31', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-06-17', name: 'Islamic New Year', localName: 'رأس السنة الهجرية' },
        { date: '2026-06-30', name: 'Revolution Day', localName: 'ثورة 30 يونيو' },
        { date: '2026-07-23', name: 'Revolution Day', localName: 'ثورة 23 يوليو' },
        { date: '2026-08-26', name: 'Prophet\'s Birthday', localName: 'المولد النبوي الشريف' },
        { date: '2026-10-06', name: 'Armed Forces Day', localName: 'عيد القوات المسلحة' }
    ],
    QA: [
        { date: '2026-03-21', name: 'Eid al-Fitr', localName: 'عيد الفطر' },
        { date: '2026-03-22', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-03-23', name: 'Eid al-Fitr Holiday', localName: 'عيد الفطر' },
        { date: '2026-05-28', name: 'Eid al-Adha', localName: 'عيد الأضحى' },
        { date: '2026-05-29', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-05-30', name: 'Eid al-Adha Holiday', localName: 'عيد الأضحى' },
        { date: '2026-12-18', name: 'National Day', localName: 'اليوم الوطني' }
    ]
};

// Şehir adından ülke kodu çıkaran fonksiyon
export function getCountryCode(city: string): string {
    const cityLower = city.toLowerCase();

    // Türkiye şehirleri
    const turkishCities = ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'adana', 'konya', 'gaziantep', 'mersin', 'diyarbakır', 'kayseri', 'eskişehir', 'samsun', 'denizli', 'şanlıurfa', 'malatya', 'trabzon', 'erzurum', 'van', 'batman', 'elazığ', 'manisa', 'kocaeli', 'balıkesir', 'sakarya', 'kahramanmaraş', 'hatay', 'mardin', 'aydın', 'tekirdağ', 'muğla', 'aksaray', 'afyon', 'çanakkale', 'edirne', 'kırklareli', 'türkiye', 'turkey'];
    if (turkishCities.some(c => cityLower.includes(c))) return 'TR';

    // Almanya
    const germanCities = ['berlin', 'hamburg', 'münchen', 'munich', 'köln', 'cologne', 'frankfurt', 'stuttgart', 'düsseldorf', 'dortmund', 'essen', 'leipzig', 'bremen', 'dresden', 'hannover', 'nürnberg', 'duisburg', 'bochum', 'wuppertal', 'bielefeld', 'bonn', 'münster', 'karlsruhe', 'mannheim', 'augsburg', 'wiesbaden', 'germany', 'deutschland'];
    if (germanCities.some(c => cityLower.includes(c))) return 'DE';

    // Fransa
    const frenchCities = ['paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille', 'rennes', 'reims', 'saint-etienne', 'toulon', 'le havre', 'grenoble', 'dijon', 'angers', 'nîmes', 'france'];
    if (frenchCities.some(c => cityLower.includes(c))) return 'FR';

    // İngiltere
    const ukCities = ['london', 'birmingham', 'manchester', 'leeds', 'liverpool', 'newcastle', 'sheffield', 'bristol', 'nottingham', 'leicester', 'coventry', 'bradford', 'cardiff', 'belfast', 'edinburgh', 'glasgow', 'uk', 'united kingdom', 'england', 'britain'];
    if (ukCities.some(c => cityLower.includes(c))) return 'GB';

    // Amerika
    const usCities = ['new york', 'los angeles', 'chicago', 'houston', 'phoenix', 'philadelphia', 'san antonio', 'san diego', 'dallas', 'san jose', 'austin', 'jacksonville', 'san francisco', 'columbus', 'fort worth', 'charlotte', 'seattle', 'denver', 'washington', 'boston', 'el paso', 'detroit', 'nashville', 'memphis', 'portland', 'las vegas', 'miami', 'atlanta', 'usa', 'united states', 'america'];
    if (usCities.some(c => cityLower.includes(c))) return 'US';

    // Suudi Arabistan
    const saudiCities = ['riyadh', 'jeddah', 'mecca', 'makkah', 'medina', 'madinah', 'dammam', 'taif', 'tabuk', 'buraidah', 'khamis mushait', 'abha', 'najran', 'yanbu', 'al khobar', 'saudi arabia'];
    if (saudiCities.some(c => cityLower.includes(c))) return 'SA';

    // BAE
    const uaeCities = ['dubai', 'abu dhabi', 'sharjah', 'ajman', 'ras al khaimah', 'fujairah', 'umm al quwain', 'uae', 'emirates'];
    if (uaeCities.some(c => cityLower.includes(c))) return 'AE';

    // Endonezya
    const indonesianCities = ['jakarta', 'surabaya', 'bandung', 'medan', 'semarang', 'palembang', 'makassar', 'tangerang', 'depok', 'bekasi', 'padang', 'denpasar', 'bali', 'yogyakarta', 'malang', 'solo', 'indonesia'];
    if (indonesianCities.some(c => cityLower.includes(c))) return 'ID';

    // Pakistan
    const pakistaniCities = ['karachi', 'lahore', 'faisalabad', 'rawalpindi', 'islamabad', 'multan', 'gujranwala', 'peshawar', 'quetta', 'sialkot', 'pakistan'];
    if (pakistaniCities.some(c => cityLower.includes(c))) return 'PK';

    // Malezya
    const malaysianCities = ['kuala lumpur', 'george town', 'penang', 'johor bahru', 'ipoh', 'kuching', 'kota kinabalu', 'shah alam', 'petaling jaya', 'malaysia'];
    if (malaysianCities.some(c => cityLower.includes(c))) return 'MY';

    // Mısır
    const egyptianCities = ['cairo', 'alexandria', 'giza', 'shubra el kheima', 'port said', 'suez', 'luxor', 'asyut', 'ismailia', 'fayoum', 'egypt'];
    if (egyptianCities.some(c => cityLower.includes(c))) return 'EG';

    // Katar
    const qatarCities = ['doha', 'al wakrah', 'al khor', 'qatar'];
    if (qatarCities.some(c => cityLower.includes(c))) return 'QA';

    // Varsayılan: Türkiye
    return 'TR';
}

// Ülke koduna göre tatilleri getir
export function getHolidays(countryCode: string): Array<{date: string, name: string, localName: string}> {
    return fallbackHolidays2026[countryCode] || fallbackHolidays2026['TR'];
}

// Bugün kandil mi kontrol et
export function isTodayKandil(): { isKandil: boolean; kandil: typeof kandilDays2026[0] | null } {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const kandil = kandilDays2026.find(k => k.date === todayStr);

    return {
        isKandil: !!kandil,
        kandil: kandil || null
    };
}

// Yaklaşan kandili getir
export function getUpcomingKandil(): { kandil: typeof kandilDays2026[0] | null; daysLeft: number } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const kandil of kandilDays2026) {
        const kandilDate = new Date(kandil.date);
        kandilDate.setHours(0, 0, 0, 0);

        if (kandilDate >= today) {
            const diffTime = kandilDate.getTime() - today.getTime();
            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return { kandil, daysLeft };
        }
    }

    return { kandil: null, daysLeft: 0 };
}
