// Günlük Hadisler - 7 Dilde
// Hz. Muhammed (s.a.v.) Hadisleri
// Konular: Ramazan, Yardımlaşma, Affetme, Barış

export interface HadithTranslations {
    tr: string;
    en: string;
    ar: string;
    de: string;
    fr: string;
    id: string;
    ur: string;
}

export interface Hadith {
    id: number;
    text: HadithTranslations;
    source: string;
    category: 'ramazan' | 'yardim' | 'affetme' | 'baris';
}

export const dailyHadiths: Hadith[] = [
    // RAMAZAN (1-10)
    {
        id: 1,
        text: {
            tr: "Kim inanarak ve sevabını Allah'tan bekleyerek Ramazan orucunu tutarsa, geçmiş günahları bağışlanır.",
            en: "Whoever fasts during Ramadan with faith and seeking reward, their past sins will be forgiven.",
            ar: "من صام رمضان إيماناً واحتساباً غُفر له ما تقدم من ذنبه.",
            de: "Wer im Ramadan mit Glauben und Hoffnung auf Belohnung fastet, dem werden seine vergangenen Sünden vergeben.",
            fr: "Quiconque jeûne pendant le Ramadan avec foi et espérance de récompense, ses péchés passés seront pardonnés.",
            id: "Barangsiapa berpuasa Ramadan dengan iman dan mengharap pahala, dosanya yang lalu akan diampuni.",
            ur: "جو رمضان میں ایمان اور ثواب کی امید سے روزہ رکھے، اس کے پچھلے گناہ معاف ہو جائیں گے۔"
        },
        source: "Buhârî",
        category: "ramazan"
    },
    {
        id: 2,
        text: {
            tr: "Oruç bir kalkandır. Oruçlu kimse kötü söz söylemesin, bağırıp çağırmasın.",
            en: "Fasting is a shield. The fasting person should not speak ill or shout.",
            ar: "الصيام جُنّة، فلا يرفث ولا يجهل.",
            de: "Das Fasten ist ein Schutzschild. Der Fastende soll nicht schlecht reden oder schreien.",
            fr: "Le jeûne est un bouclier. Le jeûneur ne doit pas dire de mal ni crier.",
            id: "Puasa adalah perisai. Orang yang berpuasa tidak boleh berkata buruk atau berteriak.",
            ur: "روزہ ڈھال ہے۔ روزہ دار برا نہ بولے اور نہ چیخے۔"
        },
        source: "Buhârî",
        category: "ramazan"
    },
    {
        id: 3,
        text: {
            tr: "Ramazan ayı geldiğinde cennetin kapıları açılır, cehennemin kapıları kapanır.",
            en: "When Ramadan arrives, the gates of Paradise are opened and the gates of Hell are closed.",
            ar: "إذا جاء رمضان فُتحت أبواب الجنة وغُلقت أبواب النار.",
            de: "Wenn der Ramadan kommt, werden die Tore des Paradieses geöffnet und die Tore der Hölle geschlossen.",
            fr: "Quand le Ramadan arrive, les portes du Paradis s'ouvrent et les portes de l'Enfer se ferment.",
            id: "Ketika Ramadan tiba, pintu surga dibuka dan pintu neraka ditutup.",
            ur: "جب رمضان آتا ہے تو جنت کے دروازے کھول دیے جاتے ہیں اور جہنم کے دروازے بند کر دیے جاتے ہیں۔"
        },
        source: "Buhârî",
        category: "ramazan"
    },
    {
        id: 4,
        text: {
            tr: "Oruçlu için iki sevinç vardır: İftar ettiğinde ve Rabbine kavuştuğunda.",
            en: "The fasting person has two moments of joy: when breaking fast and when meeting their Lord.",
            ar: "للصائم فرحتان: فرحة عند فطره، وفرحة عند لقاء ربه.",
            de: "Der Fastende hat zwei Freuden: beim Fastenbrechen und bei der Begegnung mit seinem Herrn.",
            fr: "Le jeûneur a deux joies: à la rupture du jeûne et à la rencontre de son Seigneur.",
            id: "Orang yang berpuasa memiliki dua kegembiraan: saat berbuka dan saat bertemu Tuhannya.",
            ur: "روزہ دار کے لیے دو خوشیاں ہیں: افطار کے وقت اور اپنے رب سے ملاقات کے وقت۔"
        },
        source: "Müslim",
        category: "ramazan"
    },
    {
        id: 5,
        text: {
            tr: "Sahura kalkın, çünkü sahurda bereket vardır.",
            en: "Have suhoor, for there is blessing in suhoor.",
            ar: "تسحروا فإن في السحور بركة.",
            de: "Esst Suhoor, denn im Suhoor liegt Segen.",
            fr: "Prenez le suhoor, car il y a de la bénédiction dans le suhoor.",
            id: "Makanlah sahur, karena dalam sahur ada keberkahan.",
            ur: "سحری کھاؤ کیونکہ سحری میں برکت ہے۔"
        },
        source: "Buhârî",
        category: "ramazan"
    },
    {
        id: 6,
        text: {
            tr: "Kim bir oruçluya iftar ettirirse, onun ecri kadar sevap alır.",
            en: "Whoever provides iftar for a fasting person earns the same reward.",
            ar: "من فطّر صائماً كان له مثل أجره.",
            de: "Wer einem Fastenden das Fastenbrechen gibt, erhält die gleiche Belohnung.",
            fr: "Quiconque offre l'iftar à un jeûneur reçoit la même récompense.",
            id: "Barangsiapa memberi buka puasa kepada orang yang berpuasa, ia mendapat pahala yang sama.",
            ur: "جو کسی روزہ دار کو افطار کرائے، اسے اتنا ہی ثواب ملے گا۔"
        },
        source: "Tirmizî",
        category: "ramazan"
    },
    {
        id: 7,
        text: {
            tr: "Cennette Reyyan adlı bir kapı vardır, oradan sadece oruçlular girecektir.",
            en: "In Paradise there is a gate called Reyyan, through which only those who fast will enter.",
            ar: "في الجنة باب يُقال له الريان، لا يدخل منه إلا الصائمون.",
            de: "Im Paradies gibt es ein Tor namens Reyyan, durch das nur Fastende eintreten.",
            fr: "Au Paradis, il y a une porte appelée Reyyan, par laquelle seuls les jeûneurs entreront.",
            id: "Di surga ada pintu bernama Reyyan, yang hanya dimasuki oleh orang-orang yang berpuasa.",
            ur: "جنت میں ریان نامی دروازہ ہے، جس سے صرف روزہ دار داخل ہوں گے۔"
        },
        source: "Buhârî",
        category: "ramazan"
    },
    {
        id: 8,
        text: {
            tr: "Oruç, sabrın yarısıdır.",
            en: "Fasting is half of patience.",
            ar: "الصوم نصف الصبر.",
            de: "Fasten ist die Hälfte der Geduld.",
            fr: "Le jeûne est la moitié de la patience.",
            id: "Puasa adalah setengah dari kesabaran.",
            ur: "روزہ صبر کا نصف ہے۔"
        },
        source: "Tirmizî",
        category: "ramazan"
    },
    {
        id: 9,
        text: {
            tr: "Allah buyurdu: Oruç benim içindir ve onun mükâfatını ben vereceğim.",
            en: "Allah said: Fasting is for Me, and I will reward it.",
            ar: "قال الله: الصوم لي وأنا أجزي به.",
            de: "Allah sprach: Das Fasten ist für Mich, und Ich werde es belohnen.",
            fr: "Allah a dit: Le jeûne est pour Moi, et Je le récompenserai.",
            id: "Allah berfirman: Puasa adalah untuk-Ku, dan Aku yang akan membalasnya.",
            ur: "اللہ نے فرمایا: روزہ میرے لیے ہے اور میں ہی اس کا اجر دوں گا۔"
        },
        source: "Buhârî",
        category: "ramazan"
    },
    {
        id: 10,
        text: {
            tr: "Ramazan'ın son on gününde itikâfa girin.",
            en: "Observe I'tikaf in the last ten days of Ramadan.",
            ar: "اعتكفوا في العشر الأواخر من رمضان.",
            de: "Beobachtet I'tikaf in den letzten zehn Tagen des Ramadan.",
            fr: "Observez l'I'tikaf durant les dix derniers jours du Ramadan.",
            id: "Lakukan I'tikaf di sepuluh hari terakhir Ramadan.",
            ur: "رمضان کے آخری دس دنوں میں اعتکاف کرو۔"
        },
        source: "Buhârî",
        category: "ramazan"
    },

    // YARDIMLAŞMA (11-18)
    {
        id: 11,
        text: {
            tr: "Müslüman, Müslümanın kardeşidir. Ona zulmetmez, onu yalnız bırakmaz.",
            en: "A Muslim is a brother to another Muslim. He does not oppress or abandon him.",
            ar: "المسلم أخو المسلم، لا يظلمه ولا يخذله.",
            de: "Ein Muslim ist der Bruder eines anderen Muslims. Er unterdrückt ihn nicht und lässt ihn nicht im Stich.",
            fr: "Un musulman est le frère d'un autre musulman. Il ne l'opprime pas et ne l'abandonne pas.",
            id: "Seorang Muslim adalah saudara Muslim lainnya. Dia tidak menzalimi dan tidak menelantarkannya.",
            ur: "مسلمان مسلمان کا بھائی ہے۔ وہ اس پر ظلم نہیں کرتا اور اسے تنہا نہیں چھوڑتا۔"
        },
        source: "Buhârî",
        category: "yardim"
    },
    {
        id: 12,
        text: {
            tr: "Komşusu açken tok yatan bizden değildir.",
            en: "He who sleeps full while his neighbor is hungry is not one of us.",
            ar: "ليس منا من بات شبعان وجاره جائع.",
            de: "Wer satt schläft, während sein Nachbar hungert, gehört nicht zu uns.",
            fr: "Celui qui dort rassasié alors que son voisin a faim n'est pas des nôtres.",
            id: "Bukan dari golongan kami yang tidur kenyang sementara tetangganya kelaparan.",
            ur: "وہ ہم میں سے نہیں جو پیٹ بھر کر سوئے جبکہ اس کا پڑوسی بھوکا ہو۔"
        },
        source: "Müslim",
        category: "yardim"
    },
    {
        id: 13,
        text: {
            tr: "İnsanların en hayırlısı, insanlara faydalı olandır.",
            en: "The best of people is the one who is most beneficial to others.",
            ar: "خير الناس أنفعهم للناس.",
            de: "Der beste Mensch ist derjenige, der anderen am meisten nützt.",
            fr: "Le meilleur des gens est celui qui est le plus utile aux autres.",
            id: "Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain.",
            ur: "لوگوں میں بہترین وہ ہے جو لوگوں کو سب سے زیادہ فائدہ پہنچائے۔"
        },
        source: "Taberânî",
        category: "yardim"
    },
    {
        id: 14,
        text: {
            tr: "Sadaka malı eksiltmez.",
            en: "Charity does not decrease wealth.",
            ar: "ما نقصت صدقة من مال.",
            de: "Spenden vermindern das Vermögen nicht.",
            fr: "La charité ne diminue pas la richesse.",
            id: "Sedekah tidak mengurangi harta.",
            ur: "صدقہ مال کو کم نہیں کرتا۔"
        },
        source: "Müslim",
        category: "yardim"
    },
    {
        id: 15,
        text: {
            tr: "Güler yüzle karşılaşmak da sadakadır.",
            en: "Meeting others with a cheerful face is also charity.",
            ar: "تبسمك في وجه أخيك صدقة.",
            de: "Jemanden mit einem freundlichen Gesicht zu treffen ist auch Wohltätigkeit.",
            fr: "Rencontrer les autres avec un visage souriant est aussi une charité.",
            id: "Bertemu orang dengan wajah ceria juga merupakan sedekah.",
            ur: "مسکراتے چہرے سے ملنا بھی صدقہ ہے۔"
        },
        source: "Müslim",
        category: "yardim"
    },
    {
        id: 16,
        text: {
            tr: "Bir Müslümanın sıkıntısını gideren, Allah da onun kıyamet günü sıkıntısını giderir.",
            en: "Whoever relieves a Muslim's hardship, Allah will relieve his hardship on Judgment Day.",
            ar: "من نفّس عن مسلم كربة، نفّس الله عنه كربة من كرب يوم القيامة.",
            de: "Wer einem Muslim eine Not lindert, dem wird Allah am Tag des Gerichts eine Not lindern.",
            fr: "Quiconque soulage la difficulté d'un musulman, Allah soulagera sa difficulté le Jour du Jugement.",
            id: "Barangsiapa melepaskan kesulitan seorang Muslim, Allah akan melepaskan kesulitannya di Hari Kiamat.",
            ur: "جو کسی مسلمان کی تکلیف دور کرے، اللہ قیامت کے دن اس کی تکلیف دور کرے گا۔"
        },
        source: "Buhârî",
        category: "yardim"
    },
    {
        id: 17,
        text: {
            tr: "Veren el, alan elden üstündür.",
            en: "The giving hand is better than the receiving hand.",
            ar: "اليد العليا خير من اليد السفلى.",
            de: "Die gebende Hand ist besser als die nehmende Hand.",
            fr: "La main qui donne est meilleure que la main qui reçoit.",
            id: "Tangan yang memberi lebih baik dari tangan yang menerima.",
            ur: "دینے والا ہاتھ لینے والے ہاتھ سے بہتر ہے۔"
        },
        source: "Buhârî",
        category: "yardim"
    },
    {
        id: 18,
        text: {
            tr: "Yetimi koruyup gözetenle cennette yan yana olacağız.",
            en: "The one who cares for an orphan will be with me in Paradise like this.",
            ar: "أنا وكافل اليتيم في الجنة هكذا.",
            de: "Der, der sich um Waisen kümmert, wird mit mir im Paradies so sein.",
            fr: "Celui qui s'occupe d'un orphelin sera avec moi au Paradis comme ceci.",
            id: "Orang yang merawat anak yatim akan bersamaku di surga seperti ini.",
            ur: "یتیم کی کفالت کرنے والا جنت میں میرے ساتھ ایسے ہوگا۔"
        },
        source: "Buhârî",
        category: "yardim"
    },

    // AFFETME (19-24)
    {
        id: 19,
        text: {
            tr: "Affetmek, insanın şerefini artırır.",
            en: "Forgiveness increases a person's honor.",
            ar: "ما زاد الله عبداً بعفو إلا عزاً.",
            de: "Vergebung erhöht die Ehre eines Menschen.",
            fr: "Le pardon augmente l'honneur d'une personne.",
            id: "Memaafkan meningkatkan kehormatan seseorang.",
            ur: "معاف کرنا انسان کی عزت بڑھاتا ہے۔"
        },
        source: "Müslim",
        category: "affetme"
    },
    {
        id: 20,
        text: {
            tr: "Merhamet etmeyene, merhamet edilmez.",
            en: "He who does not show mercy will not be shown mercy.",
            ar: "من لا يرحم لا يُرحم.",
            de: "Wer keine Barmherzigkeit zeigt, dem wird keine Barmherzigkeit gezeigt.",
            fr: "Celui qui ne montre pas de miséricorde ne recevra pas de miséricorde.",
            id: "Siapa yang tidak menyayangi, tidak akan disayangi.",
            ur: "جو رحم نہیں کرتا اس پر رحم نہیں کیا جائے گا۔"
        },
        source: "Buhârî",
        category: "affetme"
    },
    {
        id: 21,
        text: {
            tr: "Kul, affettikçe Allah onun izzetini artırır.",
            en: "The more a servant forgives, the more Allah increases his dignity.",
            ar: "ما زاد الله عبداً بعفو إلا عزاً.",
            de: "Je mehr ein Diener vergibt, desto mehr erhöht Allah seine Würde.",
            fr: "Plus un serviteur pardonne, plus Allah augmente sa dignité.",
            id: "Semakin seorang hamba memaafkan, semakin Allah meningkatkan kemuliaannya.",
            ur: "جتنا بندہ معاف کرے، اللہ اس کی عزت بڑھاتا ہے۔"
        },
        source: "Müslim",
        category: "affetme"
    },
    {
        id: 22,
        text: {
            tr: "Öfkelendiğinde öfkesini yenen, Allah katında en güçlü insandır.",
            en: "The strongest person is the one who controls his anger.",
            ar: "ليس الشديد بالصُّرَعة، إنما الشديد الذي يملك نفسه عند الغضب.",
            de: "Der Stärkste ist derjenige, der seinen Zorn beherrscht.",
            fr: "Le plus fort est celui qui maîtrise sa colère.",
            id: "Orang yang terkuat adalah yang mengendalikan kemarahannya.",
            ur: "سب سے طاقتور وہ ہے جو غصے میں اپنے آپ پر قابو رکھے۔"
        },
        source: "Buhârî",
        category: "affetme"
    },
    {
        id: 23,
        text: {
            tr: "Birbirinize haset etmeyin, kin tutmayın, kardeş olun.",
            en: "Do not envy one another, do not hold grudges, be brothers.",
            ar: "لا تحاسدوا ولا تباغضوا وكونوا عباد الله إخواناً.",
            de: "Beneidet einander nicht, hegt keinen Groll, seid Brüder.",
            fr: "Ne vous enviez pas, ne gardez pas rancune, soyez frères.",
            id: "Jangan saling iri, jangan dendam, jadilah saudara.",
            ur: "ایک دوسرے سے حسد نہ کرو، کینہ نہ رکھو، بھائی بن جاؤ۔"
        },
        source: "Buhârî",
        category: "affetme"
    },
    {
        id: 24,
        text: {
            tr: "Bir Müslümanı affeden, Allah da onu affeder.",
            en: "Whoever forgives a Muslim, Allah will forgive him.",
            ar: "من عفا عن مسلم عفا الله عنه.",
            de: "Wer einem Muslim vergibt, dem vergibt Allah.",
            fr: "Quiconque pardonne à un musulman, Allah lui pardonnera.",
            id: "Barangsiapa memaafkan seorang Muslim, Allah akan memaafkannya.",
            ur: "جو کسی مسلمان کو معاف کرے، اللہ اسے معاف کرے گا۔"
        },
        source: "Ahmed",
        category: "affetme"
    },

    // BARIŞ (25-30)
    {
        id: 25,
        text: {
            tr: "Selâmı aranızda yayın.",
            en: "Spread peace among yourselves.",
            ar: "أفشوا السلام بينكم.",
            de: "Verbreitet Frieden unter euch.",
            fr: "Répandez la paix entre vous.",
            id: "Sebarkanlah salam di antara kalian.",
            ur: "آپس میں سلام پھیلاؤ۔"
        },
        source: "Müslim",
        category: "baris"
    },
    {
        id: 26,
        text: {
            tr: "Müslüman, elinden ve dilinden insanların güvende olduğu kimsedir.",
            en: "A Muslim is one from whose hand and tongue people are safe.",
            ar: "المسلم من سلم المسلمون من لسانه ويده.",
            de: "Ein Muslim ist jemand, vor dessen Hand und Zunge die Menschen sicher sind.",
            fr: "Un musulman est celui dont la main et la langue ne nuisent pas aux gens.",
            id: "Muslim adalah orang yang tangannya dan lisannya tidak menyakiti orang lain.",
            ur: "مسلمان وہ ہے جس کے ہاتھ اور زبان سے لوگ محفوظ رہیں۔"
        },
        source: "Buhârî",
        category: "baris"
    },
    {
        id: 27,
        text: {
            tr: "İnsanlarla güzel geçinin.",
            en: "Treat people well.",
            ar: "خالقوا الناس بخلق حسن.",
            de: "Behandelt die Menschen gut.",
            fr: "Traitez bien les gens.",
            id: "Bergaullah dengan baik kepada orang lain.",
            ur: "لوگوں سے اچھے اخلاق سے پیش آؤ۔"
        },
        source: "Tirmizî",
        category: "baris"
    },
    {
        id: 28,
        text: {
            tr: "Küsüşmek haramdır, üç günden fazla küs durmayın.",
            en: "Estrangement is forbidden. Do not stay apart for more than three days.",
            ar: "لا يحل لمسلم أن يهجر أخاه فوق ثلاث.",
            de: "Entfremdung ist verboten. Bleibt nicht länger als drei Tage getrennt.",
            fr: "L'éloignement est interdit. Ne restez pas séparés plus de trois jours.",
            id: "Memutus hubungan itu haram. Jangan saling mendiamkan lebih dari tiga hari.",
            ur: "قطع تعلق حرام ہے۔ تین دن سے زیادہ بول چال بند نہ رکھو۔"
        },
        source: "Buhârî",
        category: "baris"
    },
    {
        id: 29,
        text: {
            tr: "Birbirinizi sevmedikçe cennete giremezsiniz. Selâmı yayarsanız birbirinizi seversiniz.",
            en: "You will not enter Paradise until you love one another. Spread peace and you will love one another.",
            ar: "لا تدخلوا الجنة حتى تحابوا، أفشوا السلام تحابوا.",
            de: "Ihr werdet das Paradies nicht betreten, bis ihr einander liebt. Verbreitet Frieden und ihr werdet einander lieben.",
            fr: "Vous n'entrerez pas au Paradis tant que vous ne vous aimerez pas. Répandez la paix et vous vous aimerez.",
            id: "Kalian tidak akan masuk surga sampai kalian saling mencintai. Sebarkanlah salam, kalian akan saling mencintai.",
            ur: "تم جنت میں داخل نہیں ہوگے جب تک ایک دوسرے سے محبت نہ کرو۔ سلام پھیلاؤ، محبت ہوگی۔"
        },
        source: "Müslim",
        category: "baris"
    },
    {
        id: 30,
        text: {
            tr: "İki kişinin arasını düzeltmek, nafile namaz ve oruçtan faziletlidir.",
            en: "Reconciling two people is greater in reward than voluntary prayer and fasting.",
            ar: "إصلاح ذات البين أفضل من صلاة التطوع والصيام.",
            de: "Zwei Menschen zu versöhnen ist verdienstvoller als freiwilliges Gebet und Fasten.",
            fr: "Réconcilier deux personnes est plus méritoire que la prière et le jeûne volontaires.",
            id: "Mendamaikan dua orang lebih utama dari shalat dan puasa sunnah.",
            ur: "دو لوگوں میں صلح کرانا نفلی نماز اور روزے سے افضل ہے۔"
        },
        source: "Ebû Dâvûd",
        category: "baris"
    }
];

// Günün hadisini getir (dil parametresi ile)
export function getDailyHadith(language: string = 'tr'): { text: string; source: string } {
    const today = new Date();
    const ramadanStart = new Date('2026-02-19');

    let index: number;

    if (today < ramadanStart) {
        // Ramazan başlamadıysa, yılın gününe göre
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        index = dayOfYear % 30;
    } else {
        // Ramazan başladıysa, Ramazan gününe göre (1-30)
        const diffTime = today.getTime() - ramadanStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        index = Math.min(diffDays, 29);
    }

    const hadith = dailyHadiths[index];
    const langKey = language as keyof HadithTranslations;

    return {
        text: hadith.text[langKey] || hadith.text.tr,
        source: hadith.source
    };
}
