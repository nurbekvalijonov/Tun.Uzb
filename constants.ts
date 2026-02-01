import { Article, ArticleCategory, ShortVideo, Language, Comment } from './types';

export const CATEGORIES: ArticleCategory[] = ['POLITICS', 'TECH', 'CULTURE', 'ECONOMY'];

export const TRANSLATIONS = {
    en: {
        nav: { politics: 'POLITICS', tech: 'TECH', culture: 'CULTURE', economy: 'ECONOMY' },
        ui: { viewAll: 'View All', readMore: 'Read more on TUN.UZ', share: 'Share', askAI: 'Ask AI', liveTrends: 'Live Trends', shareQuote: 'Share Quote', shareStory: 'Share to Story', download: 'Download Image', comments: 'Comments', addComment: 'Add a comment...', post: 'Post', related: 'Related Stories', resetProgress: 'Reset Progress', continued: 'Continue Reading' }
    },
    uz: {
        nav: { politics: 'SIYOSAT', tech: 'TEXNOLOGIYA', culture: 'MADANIYAT', economy: 'IQTISOD' },
        ui: { viewAll: 'Barchasi', readMore: 'TUN.UZ da o‘qing', share: 'Ulashish', askAI: 'AI dan so‘rang', liveTrends: 'Jonli Trendlar', shareQuote: 'Iqtibosni ulashish', shareStory: 'Storyga joylash', download: 'Rasmni yuklab olish', comments: 'Izohlar', addComment: 'Izoh qoldiring...', post: 'Yuborish', related: 'O‘xshash Xabarlar', resetProgress: 'Progressni tiklash', continued: 'O‘qishni davom ettirish' }
    },
    ru: {
        nav: { politics: 'ПОЛИТИКА', tech: 'ТЕХНО', culture: 'КУЛЬТУРА', economy: 'ЭКОНОМИКА' },
        ui: { viewAll: 'Все', readMore: 'Читать на TUN.UZ', share: 'Поделиться', askAI: 'Спросить AI', liveTrends: 'Тренды', shareQuote: 'Поделиться цитатой', shareStory: 'В сторис', download: 'Скачать', comments: 'Комментарии', addComment: 'Добавить комментарий...', post: 'Отправить', related: 'Похожие Новости', resetProgress: 'Сбросить прогресс', continued: 'Продолжить чтение' }
    }
};

const YOUTUBE_IDS = ['LXb3EKWsInQ', 'lX7kYDCIZ3A', 'Imp4637g2Xk', 'ysz5S6P_z-U', 'jNQXAC9IVRw', '9bZkp7q19f0'];
const AUDIO_URLS = [
    'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
    'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav',
    'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav'
];

// Sample 3D models (GLB format)
const MODELS_3D = [
    'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb', 
    'https://storage.googleapis.com/search-ar-edu/periodic-table/element_001_hydrogen/hydrogen.glb'
];

export const MOCK_SHORTS: ShortVideo[] = [
    { id: 'founder_pin', title: 'Meet the Founder: Nurbek Valijonov 🚀', thumbnail: 'https://loremflickr.com/400/700/ceo,man', views: '5.2M', youtubeId: 'founder_shorts_1' },
    { id: 's1', title: 'AI Breakthrough in Tashkent 🇺🇿', thumbnail: 'https://loremflickr.com/400/700/robot', views: '1.2M', youtubeId: 'shorts_id_1' },
    { id: 's2', title: 'Crypto Mining Laws Changed 📉', thumbnail: 'https://loremflickr.com/400/700/bitcoin', views: '850K', youtubeId: 'shorts_id_2' },
    { id: 's3', title: 'New Metro Line Opening 🚇', thumbnail: 'https://loremflickr.com/400/700/subway', views: '2.1M', youtubeId: 'shorts_id_3' },
    { id: 's4', title: 'Fashion Week Highlights ✨', thumbnail: 'https://loremflickr.com/400/700/fashion', views: '500K', youtubeId: 'shorts_id_4' },
    { id: 's5', title: 'Tech Park Expansion 🏗️', thumbnail: 'https://loremflickr.com/400/700/building', views: '300K', youtubeId: 'shorts_id_5' },
    { id: 's6', title: 'Cultural Heritage Sites 🏛️', thumbnail: 'https://loremflickr.com/400/700/mosque', views: '1.5M', youtubeId: 'shorts_id_6' },
];

const getTitles = (lang: Language): Record<ArticleCategory, string[]> => {
    if (lang === 'uz') {
        return {
            POLITICS: ["Raqamli Suverenitet Farmoni", "Chegara Munosabatlari: Yangi Bob", "Sammit Natijalari 2025", "Saylovlar: Yoshlar Ovozi", "Strategik Siyosat O'zgarishlari", "Yevropa bilan Diplomatik Aloqalar", "Mintaqaviy Xavfsizlik Protokollari"],
            TECH: ["Samarqandda AI Inqilobi", "Kripto Mayning Qoidalari", "Startaplar Yuksalishi", "5G Tarmoqlari To'liq Ishga Tushdi", "Kiberxavfsizlik Qalqoni", "Bank Tizimida Fintech", "EdTech O'sish Ko'rsatkichlari"],
            CULTURE: ["Ipak Yo'li Sadolari", "Zamonaviy San'at Uyg'onishi", "Toshkent Kinofestivali", "Milliy Taomlar Global Sahna", "Indi Musiqa Sahnasi", "Teatrni Qayta Tiklash Loyihalari", "Adabiyot Haftaligi"],
            ECONOMY: ["YaIM O'sishi Kutilganidan Yuqori", "Inflyatsiyani Nazorat Qilish", "Fond Bozori Rivoji", "Kichik Biznes Imtiyozlari", "Eksport Hajmi Oshdi", "Import Tariflari O'zgartirildi", "Soliq Islohoti"]
        } as any;
    }
    if (lang === 'ru') {
        return {
            POLITICS: ["Указ о Цифровом Суверенитете", "Пограничные Отношения: Новая Глава", "Итоги Саммита 2025", "Выборы: Голос Молодежи", "Стратегические Изменения", "Дипломатия с Европой", "Протоколы Безопасности"],
            TECH: ["ИИ Революция в Самарканде", "Правила Криптомайнинга", "Бум Стартапов", "Запуск 5G", "Щит Кибербезопасности", "Финтех в Банках", "Рост EdTech"],
            CULTURE: ["Эхо Шелкового Пути", "Ренессанс Современного Искусства", "Ташкентский Кинофестиваль", "Кулинарное Наследие", "Инди Музыка", "Возрождение Театра", "Неделя Литературы"],
            ECONOMY: ["Рост ВВП Выше Прогнозов", "Контроль Инфляции", "Ралли Фондового Рынка", "Стимулы для МСБ", "Анализ Экспорта", "Тарифы на Импорт", "Налоговая Реформа"]
        } as any;
    }
    return {
        POLITICS: ["The New Decree on Digital Sovereignty", "Border Relations: A New Chapter", "Summit Outcomes 2025", "Elections: The Youth Vote", "Strategic Policy Shifts", "Diplomatic Ties with Europe", "Regional Security Protocols"],
        TECH: ["AI Revolution in Samarkand", "Crypto Mining Regulations", "The Startup Boom", "5G Rollout Complete", "Cybersecurity Shield", "Fintech Waves in Banking", "EdTech Growth Charts"],
        CULTURE: ["Echoes of the Silk Road", "Modern Art Renaissance", "Tashkent Film Festival", "Culinary Heritage Globalized", "The Indie Music Scene", "Theater Revival Projects", "Literature Week Highlights"],
        ECONOMY: ["GDP Growth Exceeds Forecast", "Inflation Control Measures", "The Stock Market Rally", "Small Business Incentives", "Export Data Q1 Analysis", "Import Tariffs Adjusted", "Tax Reform Simplified"]
    } as any;
};

const generateComments = (count: number): Comment[] => {
    const comments: Comment[] = [];
    const users = ['Alex', 'Jahongir', 'Olimjon', 'Sophia', 'Dmitry', 'Malika'];
    const texts = [
        "Great analysis!", "This is exactly what we needed.", "Could be better.", "I disagree with the second point.", 
        "Waiting for the next update.", "Interesting perspective.", "Uzbekistan is moving fast!", "Love the design of this site."
    ];
    for (let i = 0; i < count; i++) {
        comments.push({
            id: `c${i}`,
            author: users[Math.floor(Math.random() * users.length)],
            text: texts[Math.floor(Math.random() * texts.length)],
            timestamp: `${Math.floor(Math.random() * 59) + 1}m ago`,
            likes: Math.floor(Math.random() * 50)
        });
    }
    return comments;
};

// Founder Article Content
const FOUNDER_ARTICLE: Article = {
    id: 'special-founder-1',
    category: 'TECH',
    title: 'Nurbek Valijonov: Architecting the Future of Digital Media',
    subtitle: 'An exclusive look into the mind of the founder behind TUN.UZ and his vision for a connected Central Asia.',
    author: { id: 'nv1', name: 'Editorial Board', avatar: 'https://loremflickr.com/100/100/logo', role: 'TUN.UZ Staff' },
    publishedAt: '2 hours ago',
    readTime: 12,
    coverImage: 'https://placehold.co/1200x800/0a0a0a/ff0033/png?text=TUN.UZ',
    tags: ['Founder', 'Visionary', 'Exclusive', 'NYT Integration'],
    comments: generateComments(20),
    content: [
        { type: 'heading', content: 'The Visionary Step' },
        { type: 'text', content: 'In an era where information travels at the speed of light, clarity becomes the most valuable currency. Nurbek Valijonov, the founder of TUN.UZ, understood this long before the current digital boom in Central Asia. His journey wasn’t just about creating a website; it was about building an ecosystem that respects the intelligence of its audience.' },
        { type: 'image', content: 'https://loremflickr.com/800/600/meeting,startup', metadata: { caption: 'Valijonov at the early strategy meetings for TUN.' } },
        { type: 'quote', content: 'We are not just reporting news; we are documenting history as it happens, with the precision of technology and the heart of journalism.', metadata: { caption: 'Nurbek Valijonov' } },
        { type: 'text', content: 'Under his leadership, TUN.UZ has integrated state-of-the-art AI technologies, ensuring that language barriers are dissolved and that content is accessible to everyone, from Tashkent to New York. This aligns with global standards set by giants like The New York Times, with whom TUN.UZ shares a philosophy of unwavering journalistic integrity.' },
        { type: 'heading', content: 'Partner Spotlight: The New York Times' },
        { type: 'text', content: 'In a move to bridge East and West, Valijonov has championed the integration of high-caliber international reporting standards. "The New York Times has set the bar for a century," Valijonov notes. "Our goal is to bring that level of rigor to the Uzbek digital space, enhancing it with our unique cultural perspective and advanced tech stack."' },
        { type: 'video', content: 'lX7kYDCIZ3A', metadata: { caption: 'Interview: The Future of Media in Uzbekistan' } },
        { type: 'text', content: 'The road ahead is paved with challenges, but the foundation is solid. With plans to expand into AR/VR newsrooms and Web3 content verification, Valijonov is ensuring that TUN.UZ remains not just a participant in the media landscape, but a leader defining its horizons.' },
        { type: 'model3d', content: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', metadata: { caption: 'Exploring new frontiers in media technology.' } }
    ]
};

export const generateArticles = (lang: Language = 'en'): Article[] => {
    const articles: Article[] = [];
    
    // Add Founder Article first if English (or adapt for others)
    if (lang === 'en') {
        articles.push(FOUNDER_ARTICLE);
    }

    const titles = getTitles(lang);
    
    const categoryKeywords: Record<ArticleCategory, string> = {
        POLITICS: 'politics,government,meeting',
        TECH: 'technology,computer,robot,cyberpunk',
        CULTURE: 'culture,art,music,museum,uzbekistan',
        ECONOMY: 'finance,business,money,office'
    };

    const authors = [
        { id: 'a1', name: 'Azizov Rustam', avatar: 'https://loremflickr.com/100/100/man,business', role: 'Tech Editor' },
        { id: 'a2', name: 'Elena Kim', avatar: 'https://loremflickr.com/100/100/woman,journalist', role: 'Senior Correspondent' },
        { id: 'a3', name: 'Malika Z.', avatar: 'https://loremflickr.com/100/100/woman,artist', role: 'Culture Lead' },
        { id: 'a4', name: 'Davron B.', avatar: 'https://loremflickr.com/100/100/man,suit', role: 'Financial Analyst' }
    ];

    let idCounter = 0;

    CATEGORIES.forEach(cat => {
        const catTitles = titles[cat] || [];
        const keyword = categoryKeywords[cat];

        // Increased to 50
        for (let i = 0; i < 50; i++) {
            const author = authors[i % authors.length];
            const titleBase = catTitles[i % catTitles.length];
            const title = i < catTitles.length ? titleBase : `${titleBase} #${i+1}`;
            
            const hasVideo = i % 5 === 0;
            const has3DModel = i % 8 === 0;

            // Extended content generation
            const content: any[] = [
                { type: 'text', content: lang === 'uz' 
                    ? `Ushbu ${cat.toLowerCase()} sohasidagi so'nggi o'zgarishlar mintaqa rivoji uchun muhim ahamiyatga ega. Ekspertlarning fikricha, bu yangi davrning boshlanishidir. Tahlilchilar so'nggi oylarda kuzatilgan tendentsiyalarni diqqat bilan o'rganib chiqdilar va kelajakdagi o'zgarishlar haqida ijobiy prognozlar berdilar.`
                    : lang === 'ru'
                    ? `Эти изменения в сфере ${cat.toLowerCase()} имеют решающее значение для развития региона. Эксперты полагают, что это начало новой эры. Аналитики внимательно изучили тенденции последних месяцев и дали позитивные прогнозы на будущее.`
                    : `In a significant development for the ${cat.toLowerCase()} sector, new data suggests a paradigm shift. Experts have long debated the trajectory of this trend, but recent events have clarified the path forward. Analysts have closely monitored the trends over the past few months and offered positive forecasts for the future.` 
                },
                { type: 'heading', content: lang === 'uz' ? 'Asosiy Masalalar' : lang === 'ru' ? 'Главные Вопросы' : 'The Core of the Matter' },
                { type: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { type: 'image', content: `https://loremflickr.com/800/600/${keyword}?lock=${idCounter}`, metadata: { caption: 'Visual context derived from recent events.' } },
                { type: 'text', content: lang === 'uz' ? 'Innovatsiya va barqarorlik bizning asosiy maqsadimizdir. Bu yo‘lda biz xalqaro hamkorlar bilan birgalikda ish olib bormoqdamiz.' : lang === 'ru' ? 'Инновации и устойчивость - наша главная цель. Мы работаем вместе с международными партнерами.' : 'Innovation and stability are our primary goals moving forward. We are working together with international partners on this path.' },
                { type: 'quote', content: lang === 'uz' ? `Bu shunchaki o'zgarish emas, bu ${cat.toLowerCase()} evolyutsiyasi.` : lang === 'ru' ? `Это не просто изменение, это эволюция ${cat.toLowerCase()}.` : `This is not just a change; it is an evolution of our fundamental approach to ${cat.toLowerCase()}.`, metadata: { caption: author.name } },
                { type: 'text', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { type: 'image', content: `https://loremflickr.com/800/600/${keyword}?lock=${idCounter + 500}`, metadata: { caption: 'Detailed analysis chart.' } },
            ];

            if (hasVideo) {
                content.splice(4, 0, {
                    type: 'video',
                    content: YOUTUBE_IDS[i % YOUTUBE_IDS.length],
                    metadata: { caption: 'Watch: Related Coverage' }
                });
            }

            if (has3DModel) {
                content.push({
                    type: 'model3d',
                    content: MODELS_3D[i % MODELS_3D.length],
                    metadata: { caption: 'Interactive 3D Visualization' }
                });
            }

            articles.push({
                id: `${cat}-${lang}-${i}`,
                category: cat,
                title: title,
                subtitle: lang === 'uz' 
                    ? `${cat} sohasidagi so'nggi yangiliklarning chuqur tahlili va kelajak istiqbollari.` 
                    : lang === 'ru' 
                    ? `Глубокий анализ последних новостей в сфере ${cat} и перспективы на будущее.`
                    : `An in-depth analysis of the recent developments in the ${cat.toLowerCase()} sector and future perspectives.`,
                author: author,
                publishedAt: `${Math.floor(Math.random() * 24) + 1}h`,
                readTime: 5 + Math.floor(Math.random() * 10),
                // Using Placeholder for TUN.UZ Logo on all articles
                coverImage: 'https://placehold.co/1200x800/0a0a0a/ff0033/png?text=TUN.UZ',
                tags: [cat, 'Uzbekistan', '2025', 'Innovation'],
                content: content,
                comments: generateComments(3 + Math.floor(Math.random() * 5))
            });
            idCounter++;
        }
    });

    return articles;
};