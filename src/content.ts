export type Lang = 'ar' | 'en'

type ProjectDetails = {
  overview: string
  highlights: string[]
  metrics?: { label: string; value: string }[]
  previewMetrics?: { label: string; value: string }[]
  imageCount?: number
  images?: string[]
  imageLayout?: ('logo' | 'desktop' | 'mobile')[]
}

export const content = {
  ar: {
    dir: 'rtl' as 'rtl' | 'ltr',
    nav: {
      about: 'عني',
      experience: 'الخبرات',
      projects: 'المشاريع',
      skills: 'المهارات',
      contact: 'تواصل',
    },
    hero: {
      name: 'مهند الفوزان',
      subtitle: 'ذكاء اصطناعي · بيانات · برمجيات',
      headline: 'أشتغل على منتجات ذكية، بأسلوب هادئ وعملي.',
      description:
        'خريج علوم حاسب بمرتبة الشرف الأولى. اشتغلت على مشاريع في الذكاء الاصطناعي والبيانات وتطبيقات الجوال ومنصات الويب وذكاء الأعمال.',
      pills: ['معدل 4.96 من 5', 'برنامج كاوست للذكاء الاصطناعي'],
      ctaProjects: 'شاهد المشاريع',
      ctaCV: 'السيرة الذاتية',
    },
    experience: {
      heading: 'الخبرات',
      intro: 'أماكن تعلمت فيها، وبنيت، وطبقت اللي أعرفه.',
      items: [
        {
          company: 'إجادة للنظم',
          role: 'متدرب ذكاء أعمال',
          date: '06/2025 - 08/2025',
          desc: 'بنيت لوحات Power BI على بيانات AdventureWorks باستخدام Power Query و DAX ومؤشرات الأداء.',
          image: '/ejada.jpg',
        },
        {
          company: 'أكاديمية كاوست',
          role: 'خريج برنامج الذكاء الاصطناعي',
          date: '2026',
          desc: 'أكملت تدريباً مركزاً في الذكاء الاصطناعي ووصلت للمرحلة الأخيرة من برنامج أكاديمية كاوست.',
          image: '/kaust-image.jpg',
        },
        {
          company: 'جمعية تحفيظ القرآن ببريدة',
          role: 'مستشار تقني',
          date: '08/2024 - 06/2025',
          desc: 'بنيت سير عمل للتقارير التشغيلية باستخدام Coda وGoogle Sheets، خفّضت من إدخال البيانات والمتابعة اليدوية بنسبة 30%، وساعدت الفرق الإدارية على الوصول للتقارير والبيانات بشكل أوضح وأسرع.',
          image: '/quran.jpg',
        },
        {
          company: 'ورشة Git و GitHub',
          role: 'مقدم ورشة',
          date: '30/9/2025',
          desc: 'قدمت ورشة عملية عن Git و GitHub لطلاب جامعة القصيم.',
          image: '/github-image.jpg',
        },
      ],
    },
    projects: {
      heading: 'المشاريع',
      items: [
        {
          name: 'نواة',
          category: 'تطبيق جوال / ذكاء اصطناعي',
          desc: 'منصة عائلية مدعومة بالذكاء الاصطناعي، مبنية بـ Flutter و Firebase و Gemini. تشمل محادثات فورية، تقويم مشترك، مهام، تصويتات، مشاركة موقع، تخزين وسائط، ومساعد ذكي.',
          tech: ['Flutter', 'Firebase', 'Gemini AI'],
          details: {
            overview: 'بنيت نواة كمنصة عائلية عربية تجمع التواصل والتنظيم والمساعدة الذكية في تطبيق واحد.',
            highlights: [
              'محادثات فورية وتقويم مشترك ومهام وتصويتات داخل تجربة موحدة.',
              'تكامل مع Gemini لتقديم مساعد ذكي داخل التطبيق.',
              'إطلاق فعلي على الجوال مع بنية Firebase قابلة للتوسع.',
            ],
            imageCount: 3,
            images: ['/nawah-1.jpg', '/nawah-2.jpg', '/nawah-3.jpg'],
            imageLayout: ['logo', 'mobile', 'mobile'],
          } satisfies ProjectDetails,
          buttons: [
            { label: 'الموقع', href: 'https://nawahfamily.com' },
            { label: 'App Store', href: 'https://apps.apple.com/tr/app/%D9%86%D9%88%D8%A7%D8%A9-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A9/id6764706130' },
            { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=app.nawah.family' },
            { label: 'التفاصيل', href: '#' },
          ],
        },
        {
          name: 'منصة عائلة الفوزان',
          category: 'منصة ويب',
          desc: 'منصة ويب عائلية مبنية بـ Next.js و Supabase لتنظيم أفراد العائلة والإعلانات والمعلومات الداخلية.',
          tech: ['Next.js', 'Supabase', 'TypeScript'],
          details: {
            overview: 'منصة داخلية للعائلة تركز على تنظيم المعلومات والإعلانات والوصول السريع للمحتوى المهم.',
            highlights: [
              'واجهة ويب مرتبة وسريعة مبنية بـ Next.js و TypeScript.',
              'استخدام Supabase لإدارة البيانات والمحتوى الداخلي.',
              'تصميم يسهل الوصول للإعلانات والمعلومات المشتركة.',
            ],
            imageCount: 3,
            images: ['/alfawzan-platform-1.jpg', '/alfawzan-platform-2.jpg', '/alfawzan-platform-3.jpg'],
            imageLayout: ['desktop', 'desktop', 'desktop'],
          } satisfies ProjectDetails,
          buttons: [
            { label: 'معاينة مباشرة', href: 'https://alfawzan-system-web.vercel.app' },
            { label: 'التفاصيل', href: '#' },
          ],
        },
        {
          name: 'هايڤ',
          category: 'لعبة ويب / تجربة جماعية',
          desc: 'لعبة جماعية تفاعلية للجمعات العائلية والأصدقاء، تعتمد على فريقين يتنافسان للإجابة على الأسئلة وبناء مسار متصل عبر خلية النحل باستخدام هاتف كل لاعب كجرس ذكي.',
          tech: ['Next.js', 'TypeScript', 'Realtime Gameplay'],
          details: {
            overview: 'هايڤ لعبة اجتماعية سريعة تجعل جلسة واحدة تكفي لتشغيل تحدٍ جماعي بدون أي معدات إضافية.',
            highlights: [
              'تقسيم اللاعبين إلى فريقين يتنافسان على ربط المسار داخل خلية النحل.',
              'هاتف كل لاعب يتحول إلى جرس تفاعلي عبر المتصفح فقط.',
              'بنك أسئلة يتجاوز 2000 سؤال لتجديد اللعبة في كل مرة.',
            ],
            imageCount: 3,
            images: ['/hive-game-1.jpg', '/hive-game-2.jpg', '/hive-game-3.jpg'],
            imageLayout: ['logo', 'desktop', 'mobile'],
          } satisfies ProjectDetails,
          buttons: [
            { label: 'الموقع', href: 'https://mdgames.store' },
            { label: 'التفاصيل', href: '#' },
          ],
        },
        {
          name: 'لوحة ذكاء الأعمال',
          category: 'بيانات / ذكاء أعمال',
          desc: 'لوحة Power BI متعددة الصفحات بنيتها خلال تدريبي في إجادة باستخدام بيانات AdventureWorks.',
          tech: ['Power BI', 'DAX', 'Power Query'],
          details: {
            overview: 'لوحة مؤشرات تركز على تحويل بيانات AdventureWorks إلى قراءة أوضح للأداء والمبيعات.',
            highlights: [
              'نمذجة البيانات وتنظيفها باستخدام Power Query.',
              'بناء مقاييس DAX ولوحات مؤشرات متعددة الصفحات.',
              'عرض بصري واضح للمبيعات والأداء والمؤشرات الرئيسية.',
            ],
            imageCount: 3,
            images: ['/bi-dashboard-1.jpg', '/bi-dashboard-2.jpg', '/bi-dashboard-3.jpg'],
            imageLayout: ['desktop', 'desktop', 'desktop'],
          } satisfies ProjectDetails,
          buttons: [{ label: 'التفاصيل', href: '#' }],
        },
      ],
    },
    skills: {
      heading: 'المهارات',
      intro: 'الأدوات اللي أشتغل فيها، وأستخدمها في بناء المنتجات وتطويرها.',
      groups: [
        { title: 'ذكاء اصطناعي وبيانات', items: ['Python', 'TensorFlow', 'Keras', 'Machine Learning', 'Deep Learning', 'Power BI', 'DAX'] },
        { title: 'جوال وويب', items: ['Flutter', 'Dart', 'Next.js', 'React', 'Django', 'Firebase', 'Supabase'] },
        { title: 'برمجيات وأدوات', items: ['Java', 'C++', 'Git', 'GitHub', 'SQL', 'REST APIs'] },
      ],
    },
    about: {
      heading: 'عني',
      text: 'أنا مهند الفوزان، خريج علوم حاسب من جامعة القصيم بمعدل 4.96 من 5، والأول على دفعتي. أعمل على بناء تطبيقات ومنصات رقمية عملية، ولدي اهتمام بالذكاء الاصطناعي وتحليل البيانات. وصلت للمرحلة النهائية في برنامج أكاديمية كاوست للذكاء الاصطناعي، وعملت على مشاريع تجمع بين البرمجة، البيانات، وتجربة المستخدم.',
    },
    contact: {
      heading: 'عندك فرصة مناسبة أو مشروع تقني؟ تواصل معي.',
      buttons: {
        email: 'البريد',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        cv: 'تحميل السيرة الذاتية',
      },
      footer: 'مهند الفوزان — جميع الحقوق محفوظة',
    },
  },
  en: {
    dir: 'ltr' as 'rtl' | 'ltr',
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      name: 'Muhannad Alfawzan',
      subtitle: 'AI, Data & Software',
      headline: 'Building intelligent products with a calm, practical mindset.',
      description:
        'Computer Science graduate with 1st class honor, with hands-on work across AI, data, mobile apps, web platforms, and business intelligence.',
      pills: ['4.96 / 5 GPA', 'KAUST AI Program'],
      ctaProjects: 'View Projects',
      ctaCV: 'View CV',
    },
    experience: {
      heading: 'Experience',
      intro: 'A few places where I learned, built, and applied what I know.',
      items: [
        {
          company: 'Ejada Systems',
          role: 'Business Intelligence Intern',
          date: '06/2025 - 08/2025',
          desc: 'Built Power BI dashboards using AdventureWorks data, applying Power Query, DAX, KPIs, and dashboard design.',
          image: '/ejada.jpg',
        },
        {
          company: 'KAUST Academy',
          role: 'AI Program Graduate',
          date: '2026',
          desc: 'Completed AI-focused training and reached the final stage of the KAUST Academy AI program.',
          image: '/kaust-image.jpg',
        },
        {
          company: 'Quran Memorization Association Buraydah',
          role: 'Technical Consultant',
          date: '08/2024 - 06/2025',
          desc: 'Automated operational reporting workflows using Coda and Google Sheets, reducing manual effort by 30%, and improved data organization and reporting visibility for administrative teams.',
          image: '/quran.jpg',
        },
        {
          company: 'Git & GitHub Workshop',
          role: 'Workshop Instructor',
          date: '30/9/2025',
          desc: 'Delivered a practical Git and GitHub workshop for students at Qassim University.',
          image: '/github-image.jpg',
        },
      ],
    },
    projects: {
      heading: 'Projects',
      items: [
        {
          name: 'Nawah',
          category: 'Mobile App / AI',
          desc: 'AI-powered family organization platform built with Flutter, Firebase, and Gemini AI. Includes real-time messaging, shared calendars, tasks, polls, location sharing, media storage, and AI assistance.',
          tech: ['Flutter', 'Firebase', 'Gemini AI'],
          details: {
            overview: 'Nawah is an Arabic-first family platform that combines coordination, communication, and AI support in one product.',
            highlights: [
              'Real-time messaging, shared calendars, tasks, and polls in one workflow.',
              'Gemini integration for in-app AI assistance.',
              'Shipped on mobile with a scalable Firebase-backed architecture.',
            ],
            imageCount: 3,
            images: ['/nawah-1.jpg', '/nawah-2.jpg', '/nawah-3.jpg'],
            imageLayout: ['logo', 'mobile', 'mobile'],
          } satisfies ProjectDetails,
          buttons: [
            { label: 'Website', href: 'https://nawahfamily.com' },
            { label: 'App Store', href: 'https://apps.apple.com/tr/app/%D9%86%D9%88%D8%A7%D8%A9-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A9/id6764706130' },
            { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=app.nawah.family' },
            { label: 'Details', href: '#' },
          ],
        },
        {
          name: 'Alfawzan Family Platform',
          category: 'Web Platform',
          desc: 'A family web platform built with Next.js and Supabase for organizing family members, announcements, and internal information.',
          tech: ['Next.js', 'Supabase', 'TypeScript'],
          details: {
            overview: 'An internal family platform focused on organizing shared information and making announcements easier to access.',
            highlights: [
              'Structured web interface built with Next.js and TypeScript.',
              'Supabase-backed data and content management.',
              'Designed around quick access to internal updates and shared info.',
            ],
            imageCount: 3,
            images: ['/alfawzan-platform-1.jpg', '/alfawzan-platform-2.jpg', '/alfawzan-platform-3.jpg'],
            imageLayout: ['desktop', 'desktop', 'desktop'],
          } satisfies ProjectDetails,
          buttons: [
            { label: 'Live Demo', href: 'https://alfawzan-system-web.vercel.app' },
            { label: 'Details', href: '#' },
          ],
        },
        {
          name: 'Hive',
          category: 'Web Game / Group Experience',
          desc: 'An interactive team-based party game for family gatherings and friends, where players answer questions to build a connected path across the hive using their phones as smart buzzers.',
          tech: ['Next.js', 'TypeScript', 'Realtime Gameplay'],
          details: {
            overview: 'Hive is a social browser game designed to create fast, competitive group play without requiring extra hardware.',
            highlights: [
              'Two teams compete by answering questions and linking paths inside the hive.',
              'Each player uses a phone as an interactive buzzer through the browser.',
              'A question bank with 2000+ prompts keeps each round fresh.',
            ],
            imageCount: 3,
            images: ['/hive-game-1.jpg', '/hive-game-2.jpg', '/hive-game-3.jpg'],
            imageLayout: ['logo', 'desktop', 'mobile'],
          } satisfies ProjectDetails,
          buttons: [
            { label: 'Website', href: 'https://mdgames.store' },
            { label: 'Details', href: '#' },
          ],
        },
        {
          name: 'Business Intelligence Dashboard',
          category: 'Data / BI',
          desc: 'Multi-page Power BI dashboard built during the Ejada internship using AdventureWorks data.',
          tech: ['Power BI', 'DAX', 'Power Query'],
          details: {
            overview: 'A BI dashboard project turning AdventureWorks data into clearer views of sales, performance, and KPIs.',
            highlights: [
              'Prepared and shaped data with Power Query.',
              'Built DAX measures and multi-page reporting views.',
              'Focused on readable visual structure and useful KPI tracking.',
            ],
            imageCount: 3,
            images: ['/bi-dashboard-1.jpg', '/bi-dashboard-2.jpg', '/bi-dashboard-3.jpg'],
            imageLayout: ['desktop', 'desktop', 'desktop'],
          } satisfies ProjectDetails,
          buttons: [{ label: 'Details', href: '#' }],
        },
      ],
    },
    skills: {
      heading: 'Skills',
      intro: 'The tools I use to build and ship products.',
      groups: [
        { title: 'AI & Data', items: ['Python', 'TensorFlow', 'Keras', 'Machine Learning', 'Deep Learning', 'Power BI', 'DAX'] },
        { title: 'Mobile & Web', items: ['Flutter', 'Dart', 'Next.js', 'React', 'Django', 'Firebase', 'Supabase'] },
        { title: 'Software & Tools', items: ['Java', 'C++', 'Git', 'GitHub', 'SQL', 'REST APIs'] },
      ],
    },
    about: {
      heading: 'About',
      text: "I'm Muhannad Alfawzan, a Computer Science graduate from Qassim University with a 4.96/5 GPA and ranked 1st in my graduating class. I like building useful digital products, especially where software, AI, data, and user experience meet.",
    },
    contact: {
      heading: "Let's build something useful.",
      buttons: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        cv: 'Download CV',
      },
      footer: 'Muhannad Alfawzan — All rights reserved',
    },
  },
}

export const links = {
  email: 'mailto:mohanad.alfawzan1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/muhannad-alfawzan',
  github: 'https://github.com/iMD10',
  cv: '/Muhannad-Alfawzan-CV.pdf',
}
