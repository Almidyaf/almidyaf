# Almedyaf Linawadir Al Oud — المضياف لنوادر العود

الموقع الرسمي وبروفايل شركة **المضياف لنوادر العود** (`www.almidyaf.com`) — خبرة تمتد لأكثر من 25 عاماً في توفير وصناعة العود الطبيعي، العود المحسن، دهن العود، والبخور من إندونيسيا وجنوب شرق آسيا إلى أسواق الخليج والسعودية.

---

## المميزات الرئيسية (Features)

- **دعم تلقائي لثلاث لغات:** العربية (`RTL`)، الإندونيسية (`ID`)، والإنجليزية (`EN`) مع كشف تلقائي للغة الجهاز وإمكانية التبديل اليدوي الفوري.
- **تصميم متجاوب وفاخر:** متوافق مع الجوال والأجهزة اللوحية والشاشات الكبيرة بهوية لونية مستوحاة من شعار الشركة وأخشاب العود.
- **بيانات كاملة وموثقة:** عرض القيادة التنفيذية، الرؤية والرسالة والأهداف والقيم، المنتجات، المصانع، مراكز المبيعات الثلاثة في بونشاك، التراخيص الرسمية، والبيانات البنكية مع ميزة **النسخ الفوري**.
- **تواصل مباشر:** روابط واتساب جاهزة لكل منتج ولكل فرع، وزر واتساب عائم.

---

## هيكل المشروع (Project Structure)

```text
├── index.html                  # الصفحة الرئيسية
├── css/
│   └── styles.css              # التنسيقات والهوية البصرية
├── js/
│   ├── translations.js         # نصوص الترجمة (ar / id / en)
│   └── main.js                 # منطق كشف اللغة، النسخ، والتفاعل
├── assets/
│   ├── logo.png                # شعار الشركة الرسمي
│   ├── product-natural-oud.jpg
│   ├── product-improved-oud.jpg
│   ├── product-oud-oil.jpg
│   └── product-bakhoor.svg
└── .github/
    └── workflows/
        └── deploy.yml          # النشر التلقائي إلى Cloudflare Pages عند الرفع على main
```

---

## النشر التلقائي إلى Cloudflare Pages (Auto-Deploy)

تم إعداد ملف [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) ليرسل التحديثات تلقائياً إلى **Cloudflare Pages** عند كل `git push` على فرع `main`.

### الطريقة الأولى: عبر GitHub Actions (المُعدّة جاهزة)
أضف المتغيرات التالية في GitHub من خلال:
**Repository → Settings → Secrets and variables → Actions → New repository secret**

| اسم الـ Secret | الوصف |
| :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | مفتاح API من لوحة تحكم Cloudflare بصلاحية `Cloudflare Pages: Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | معرف الحساب (Account ID) الظاهر في لوحة تحكم Cloudflare |

> تأكد من إنشاء مشروع باسم `almidyaf` في Cloudflare Pages (أو تعديل `--project-name=almidyaf` في `deploy.yml`).

### الطريقة الثانية: الربط المباشر من لوحة تحكم Cloudflare Pages
يمكنك أيضاً ربط مستودع `Almidyaf/almidyaf` مباشرة من **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git** (بدون إعداد Build Command لأن الموقع ثابت)، وسيتم النشر تلقائياً عند كل تحديث.
