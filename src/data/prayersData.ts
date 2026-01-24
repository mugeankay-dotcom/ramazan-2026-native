import { YASIN_FULL } from './yasin';

// Helper to clean HTML for React Native Text
const cleanHtml = (html: string) => {
    return html
        .replace(/<br>/g, '\n')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(/<i>/g, '')
        .replace(/<\/i>/g, '');
};

export const PRAYERS_FULL_DATA = [
    {
        id: "fatiha",
        title: "Fatiha Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3",
        arabic: cleanHtml("بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ<br>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ<br>الرَّحْمَنِ الرَّحِيمِ<br>مَالِكِ يَوْمِ الدِّينِ<br>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ<br>اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ<br>صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلاَ الضَّالِّينَ"),
        reading: cleanHtml("Bismillahirrahmanirrahîm.<br>Elhamdü lillâhi rabbil'alemin.<br>Errahmânir'rahim.<br>Mâliki yevmid'din.<br>İyyâke na'budü ve iyyâke neste'în.<br>İhdinessırâtal müstakîm.<br>Sırâtallezine en'amte aleyhim ğayrilmağdûbi aleyhim ve leddâllîn."),
        meaning: cleanHtml("Rahmân ve Rahîm olan Allah'ın adıyla.<br>Hamd (övme ve övülme), âlemlerin Rabbi Allah'a mahsustur.<br>O, Rahmân'dır ve Rahîm'dir.<br>Ceza gününün mâlikidir.<br>(Rabbimiz!) Ancak sana kulluk ederiz ve yalnız senden medet umarız.<br>Bize doğru yolu göster.<br>Kendilerine lütuf ve ikramda bulunduğun kimselerin yolunu; gazaba uğramışların ve sapmışların yolunu değil!")
    },
    {
        id: "ayetelkursi",
        title: "Ayetel Kürsi",
        audio: "https://cdn.islamic.network/quran/ayah/128/ar.alafasy/262.mp3",
        arabic: "اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        reading: "Allahü lâ ilâhe illâ hüvel hayyül kayyûm. Lâ te'huzühû sinetün ve lâ nevm. Lehû mâ fis-semâvâti vemâ fil erd. Menzellezî yeşfeu indehû illâ biiznih. Ya'lemü mâ beyne eydîhim vemâ halfehüm velâ yühîtûne bişey'in min ilmihî illâ bimâ şâ'. Vesia kürsiyyühüssemâvâti vel erd. Velâ yeûdühû hıfzuhumâ ve hüvel aliyyül azîm.",
        meaning: "Allah, O'ndan başka ilah yoktur; O, hayydır (diridir), kayyumdur. O'nu ne bir uyuklama tutabilir, ne de bir uyku. Göklerdeki her şey, yerdeki her şey O'nundur. İzni olmaksızın O'nun katında şefaatte bulunacak kimdir? O, kulların önlerindekileri ve arkalarındakileri (yaptıklarını ve yapacaklarını) bilir. Onlar O'nun ilminden, kendisinin dilediği kadarından başka bir şey kavrayamazlar. O'nun kürsüsü bütün gökleri ve yeri kaplayıp kuşatmıştır. (O, göklere, yere, bütün evrene hükmetmektedir.) Gökleri ve yeri koruyup gözetmek O'na güç gelmez. O, yücedir, büyüktür."
    },
    {
        id: "yasin",
        title: "Yasin Suresi (Tamamı)",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/36.mp3",
        arabic: YASIN_FULL.arabic,
        reading: YASIN_FULL.reading,
        meaning: YASIN_FULL.meaning
    },
    {
        id: "fil",
        title: "Fil Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/105.mp3",
        arabic: cleanHtml("أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ<br>أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ<br>وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ<br>تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ<br>فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ"),
        reading: cleanHtml("Elem tera keyfe fe'ale rabbüke biashâbilfîl.<br>Elem yec'al keydehüm fî tadlîl.<br>Ve ersele aleyhim tayran ebâbîl.<br>Termîhim bihicâratin min siccîl.<br>Fece'alehüm ke'asfin me'kûl."),
        meaning: cleanHtml("Rabbinin, fil sahiplerine ne yaptığını görmedin mi?<br>Onların tuzaklarını boşa çıkarmadı mı?<br>Üzerlerine sürü sürü kuşlar gönderdi.<br>Onlara çamurdan sertleşmiş taşlar atıyorlardı.<br>Nihayet onları yenilmiş ekin yaprağı gibi yaptı.")
    },
    {
        id: "kureys",
        title: "Kureyş Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/106.mp3",
        arabic: cleanHtml("لِإِيلَافِ قُرَيْشٍ<br>إِيلَافِهِمْ رِحْلَةَ الشِّتَاء وَالصَّيْفِ<br>فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ<br>الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ"),
        reading: cleanHtml("Liîlâfi Kurayşin.<br>Îlâfihim rihleteşşitâi vessayf.<br>Felya'budû rabbe hâzelbeyt.<br>Ellezî et'amehüm min cû'in ve âmenehüm min havf."),
        meaning: cleanHtml("Kureyş'i ısındırıp alıştırdığı için.<br>Onları kış ve yaz yolculuğuna alıştırdığı için.<br>Şu Beyt'in (Kabe'nin) Rabbine kulluk etsinler.<br>O ki kendilerini açlıktan doyurdu ve korkudan emin kıldı.")
    },
    {
        id: "maun",
        title: "Maun Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/107.mp3",
        arabic: cleanHtml("أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ<br>فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ<br>وَلَا يَحُضُّ عَلَى طَعَامِ الْمِسْكِينِ<br>فَوَيْلٌ لِّلْمُصَلِّينَ<br>الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ<br>الَّذِينَ هُمْ يُرَاؤُونَ<br>وَيَمْنَعُونَ الْمَاعُونَ"),
        reading: cleanHtml("Era'eytellezî yükezzibü biddîn.<br>Fezâlikellezî yedu'ul-yetîm.<br>Ve lâ yehuddu alâ ta'âmil-miskîn.<br>Feveylün lil-musallîn.<br>Ellezîne hüm an salâtihim sâhûn.<br>Ellezîne hüm yürâûne.<br>Ve yemne'ûnel-mâ'ûn."),
        meaning: cleanHtml("Gördün mü, o hesap ve ceza gününü yalanlayanı!<br>İşte o, yetimi itip kakan,<br>Yoksulu doyurmaya teşvik etmeyendir.<br>Yazıklar olsun o namaz kılanlara ki,<br>Onlar namazlarını ciddiye almazlar.<br>Onlar (namazlarıyla) gösteriş yaparlar.<br>Ufacık bir yardıma bile engel olurlar.")
    },
    {
        id: "kevser",
        title: "Kevser Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/108.mp3",
        arabic: cleanHtml("إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ<br>فَصَلِّ لِرَبِّكَ وَانْحَرْ<br>إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"),
        reading: cleanHtml("İnnâ a'taynâkel-kevser.<br>Fesalli lirabbike venhar.<br>İnne şâni'eke hüvel-ebter."),
        meaning: cleanHtml("Şüphesiz biz sana Kevser'i verdik.<br>Öyleyse Rabbin için namaz kıl ve kurban kes.<br>Asıl soyu kesik olan, şüphesiz sana hınç besleyendir.")
    },
    {
        id: "kafirun",
        title: "Kafirun Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/109.mp3",
        arabic: cleanHtml("قُلْ يَا أَيُّهَا الْكَافِرُونَ<br>لَا أَعْبُدُ مَا تَعْبُدُونَ<br>وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ<br>وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ<br>وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ<br>لَكُمْ دِينُكُمْ وَلِيَ دِينِ"),
        reading: cleanHtml("Kul yâ eyyühel-kâfirûn.<br>Lâ a'büdü mâ ta'büdûn.<br>Ve lâ entüm âbidûne mâ a'büd.<br>Ve lâ ene âbidün mâ abedtüm.<br>Ve lâ entüm âbidûne mâ a'büd.<br>leküm dînüküm veliye dîn."),
        meaning: cleanHtml("De ki: Ey kâfirler!<br>Ben sizin taptıklarınıza tapmam.<br>Siz de benim taptığıma tapacak değilsiniz.<br>Ben sizin taptıklarınıza tapacak değilim.<br>Siz de benim taptığıma tapacak değilsiniz.<br>Sizin dininiz size, benim dinim banadır.")
    },
    {
        id: "nasr",
        title: "Nasr Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/110.mp3",
        arabic: cleanHtml("إِذَا جَاء نَصْرُ اللَّهِ وَالْفَتْحُ<br>وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا<br>فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا"),
        reading: cleanHtml("İzâ câe nasrullâhi velfeth.<br>Ve raeytennâse yedhulûne fî dînillâhi efvâcâ.<br>Fesebbih bihamdi rabbike vestağfirh. İnnehû kâne tevvâbâ."),
        meaning: cleanHtml("Allah'ın yardımı ve fetih geldiği zaman,<br>Ve insanların dalga dalga Allah'ın dinine girdiklerini gördüğün zaman,<br>Rabbini hamd ile tesbih et ve O'ndan bağışlanma dile. Şüphesiz O, tövbeleri çok kabul edendir.")
    },
    {
        id: "tebbet",
        title: "Tebbet Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/111.mp3",
        arabic: cleanHtml("تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ<br>مَا أَغْنَى عَنْهُ مَالُهُ وَمَا كَسَبَ<br>سَيَصْلَى نَارًا ذَاتَ لَهَبٍ<br>وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ<br>فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ"),
        reading: cleanHtml("Tebbet yedâ ebî lehebin ve tebb.<br>Mâ eğnâ anhü mâlühû ve mâ keseb.<br>Seyaslâ nâran zâte leheb.<br>Vemraetühû hammâletelhatab.<br>Fî cîdihâ hablün min mesed."),
        meaning: cleanHtml("Ebû Leheb'in iki eli kurusun! Kurudu da.<br>Malı ve kazandıkları ona fayda vermedi.<br>O, alevli bir ateşte yanacak.<br>Odun taşıyıcı olarak karısı da (ateşe girecek).<br>Boynunda hurma lifinden bükülmüş bir ip olduğu halde.")
    },
    {
        id: "ihlas",
        title: "İhlas Suresi (Kul hüvellâh)",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/112.mp3",
        arabic: cleanHtml("قُلْ هُوَ اللَّهُ أَحَدٌ<br>اللَّهُ الصَّمَدُ<br>لَمْ يَلِدْ وَلَمْ يُولَدْ<br>وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"),
        reading: cleanHtml("Kul hüvellâhü ehad.<br>Allâhüssamed.<br>Lem yelid ve lem yûled.<br>Ve lem yekün lehû küfüven ehad."),
        meaning: cleanHtml("De ki: O, Allah'tır, tektir.<br>Allah Samed'dir. (Her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir.)<br>O, doğurmamış ve doğmamıştır.<br>O'nun hiçbir dengi yoktur.")
    },
    {
        id: "felak",
        title: "Felak Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/113.mp3",
        arabic: cleanHtml("قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ<br>مِن شَرِّ مَا خَلَقَ<br>وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ<br>وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ<br>وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"),
        reading: cleanHtml("Kul e'ûzü birabbil felak.<br>Min şerri mâ halak.<br>Ve min şerri ğâsikın izâ vekab.<br>Ve min şerri neffâsâti fil ukad.<br>Ve min şerri hâsidin izâ hased."),
        meaning: cleanHtml("De ki: Yarattığı şeylerin şerrinden,<br>Karanlığı çöktüğü zaman gecenin şerrinden,<br>Düğümlere üfleyenlerin şerrinden,<br>Ve haset ettiği zaman hasetçinin şerrinden,<br>Sabahın Rabbine sığınırım.")
    },
    {
        id: "nas",
        title: "Nas Suresi",
        audio: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/114.mp3",
        arabic: cleanHtml("قُلْ أَعُوذُ بِرَبِّ النَّاسِ<br>مَلِكِ النَّاسِ<br>إِلَهِ النَّASİ<br>مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ<br>الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ<br>مِنَ الْجِنَّةِ وَ النَّاسِ"),
        reading: cleanHtml("Kul e'ûzü birabbin-nâs.<br>Melikin-nâs.<br>İlâhin-nâs.<br>Min şerril-vesvâsil-hannâs.<br>Ellezî yüvesvisü fî sudûrin-nâs.<br>Minel-cinneti ven-nâs."),
        meaning: cleanHtml("De ki: İnsanların Rabbine sığınırım.<br>İnsanların Melik'ine (hakimine/kralına).<br>İnsanların İlah'ına.<br>O sinsi vesvesecinin şerrinden.<br>O ki, insanların göğüslerine vesvese verir.<br>Gerek cinlerden, gerek insanlardan (olan vesvesecilerin şerrinden).")
    },
    {
        id: "nazar",
        title: "Nazar Duası (Kalem 51-52)",
        audio: "https://server8.mp3quran.net/afs/068.mp3", // Sadece Nazar için Tam sure veya özel kesit (Bunu kontrol edeceğim)
        arabic: cleanHtml("وَإِن يَكَادُ الَّذِينَ كَفَرُوا لَيُزْلِقُونَكَ بِأَبْصَارِهِمْ لَمَّا سَمِعُوا الذِّكْرَ وَيَقُولُونَ إِنَّهُ لَمَجْنُونٌ<br>وَمَا هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ"),
        reading: cleanHtml("Ve in yekâdüllezîne keferû leyüzlikûneke biebsârihim lemmâ semiûz zikra ve yekûlûne innehû lemecnûn. Ve mâ hüve illâ zikrun lil âlemîn."),
        meaning: cleanHtml("O inkâr edenler Zikr'i (Kur'an'ı) işittikleri zaman, seni neredeyse gözleriyle devireceklerdi. 'O, gerçekten bir delidir' diyorlar. Oysa o (Kur'an), âlemlerin için ancak bir öğüttür.")
    },
    {
        id: "yemek",
        title: "Yemek Duası (Bereket)",
        // Yemek duası için özel kayıt yoksa, genel bir dua sesi verilebilir veya boş bırakılabilir
        arabic: cleanHtml("الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ"),
        reading: cleanHtml("Elhamdülillâhillezî et'amenâ ve sekânâ ve cealenâ müslimîn."),
        meaning: cleanHtml("Bizi yediren, içiren ve bizi Müslümanlardan kılan Allah'a hamdolsun.")
    },
    {
        id: "rabbena",
        title: "Rabbena Duaları",
        // Bakara 201 ve Ibrahim 41
        audio: "https://server8.mp3quran.net/afs/002.mp3", // Tam Bakara yerine kesit gerekebilir ama şimdilik placeholder
        arabic: cleanHtml("رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ<br><br>رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ"),
        reading: cleanHtml("Rabbena Atina:\nRabbenâ âtinâ fiddünyâ haseneten ve fil âhireti haseneten ve kınâ azâbennâr.\n\nRabbenağfirli:\nRabbenâğfirlî ve li-vâlideyye ve lil-mü'minîne yevme yekûmül hisâb."),
        meaning: cleanHtml("Rabbena Atina:\nRabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.\n\nRabbenağfirli:\nRabbimiz! Beni, anamı-babamı ve bütün mü'minleri hesap gününde (herkesin sorguya çekileceği günde) bağışla.")
    }
];
