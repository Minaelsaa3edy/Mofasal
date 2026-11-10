export type Region = "كتف" | "مرفق وساعد" | "ورك" | "ركبة" | "كاحل" | "جذع وعنق";

export type Muscle = {
  id: string;
  en: string;
  ar: string;
  region: Region;
  group: string;
  origin: string;
  insertion: string;
  action: string;
  nerve: string;
  practical: string;
  note: string;
};

export type Motion = {
  id: string;
  joint: string;
  jointEn: string;
  motion: string;
  motionEn: string;
  norm: string;
  end: number;
};

export type StudyCard = {
  id: string;
  topic: "عضلة" | "اختبار" | "عصب" | "مدى";
  front: string;
  back: string;
  detail: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  tag: string;
  vignette: string;
  question: string;
  choices: string[];
  answer: number;
  explain: string;
  pearl: string;
};

export type QuizItem = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export const regions: Region[] = ["كتف", "مرفق وساعد", "ورك", "ركبة", "كاحل", "جذع وعنق"];

export const muscles: Muscle[] = [
  {
    id: "supraspinatus",
    en: "Supraspinatus",
    ar: "فوق الشوكة",
    region: "كتف",
    group: "الكفة المدورة",
    origin: "Supraspinous fossa",
    insertion: "الوجه العلوي للحديبة الكبرى — greater tubercle",
    action: "يبدأ التبعيد ويثبّت رأس العضد داخل التجويف الحقّاني",
    nerve: "Suprascapular C5–C6",
    practical: "اختبار Empty can: تبعيد في مستوى لوح الكتف مع إبهام لأسفل، والمقاومة للأسفل.",
    note: "أكثر عضلات الكفة عرضة للاصطدام تحت الأخرم.",
  },
  {
    id: "infraspinatus",
    en: "Infraspinatus",
    ar: "تحت الشوكة",
    region: "كتف",
    group: "الكفة المدورة",
    origin: "Infraspinous fossa",
    insertion: "الوجه الأوسط للحديبة الكبرى",
    action: "دوران العضد للخارج، وتثبيت المفصل الحقّاني العضدي",
    nerve: "Suprascapular C5–C6",
    practical: "المرفق ملاصق للجذع ومثني ٩٠°، والمقاومة ضد الدوران للخارج.",
    note: "مع Teres minor هما المحرّكان الأساسيان للدوران الخارجي.",
  },
  {
    id: "subscapularis",
    en: "Subscapularis",
    ar: "تحت الكتف",
    region: "كتف",
    group: "الكفة المدورة",
    origin: "Subscapular fossa",
    insertion: "الحديبة الصغرى — lesser tubercle",
    action: "دوران العضد للداخل",
    nerve: "Upper & lower subscapular C5–C6",
    practical: "Lift-off أو Belly press إذا كان الدوران الداخلي محدودًا.",
    note: "العضلة الأمامية الوحيدة في الكفة المدورة.",
  },
  {
    id: "deltoid",
    en: "Deltoid",
    ar: "الدالية",
    region: "كتف",
    group: "الكتف السطحي",
    origin: "الثلث الوحشي للترقوة، الأخرم، وشوكة لوح الكتف",
    insertion: "Deltoid tuberosity",
    action: "الأوسط: تبعيد بعد ١٥°. الأمامي: ثني ودوران للداخل. الخلفي: بسط ودوران للخارج",
    nerve: "Axillary C5–C6",
    practical: "جلوس، تبعيد ٩٠°، المقاومة للأسفل عند الطرف البعيد للعضد.",
    note: "إصابة العصب الإبطي تُضعف التبعيد وتُفقد الإحساس فوق الدالية (badge area).",
  },
  {
    id: "biceps",
    en: "Biceps brachii",
    ar: "ذات الرأسين العضدية",
    region: "مرفق وساعد",
    group: "الحيز الأمامي للعضد",
    origin: "الطويل: Supraglenoid tubercle. القصير: Coracoid process",
    insertion: "Radial tuberosity والصفاق ذات الرأسين",
    action: "ثني المرفق، بطح الساعد، وثني الكتف (الرأس الطويل)",
    nerve: "Musculocutaneous C5–C6",
    practical: "المرفق ٩٠° والساعد مبطوح، المقاومة ضد الثني.",
    note: "اختبار Speed's يثير الرأس الطويل في الميزاب بين الحديبتين.",
  },
  {
    id: "triceps",
    en: "Triceps brachii",
    ar: "ثلاثية الرؤوس العضدية",
    region: "مرفق وساعد",
    group: "الحيز الخلفي للعضد",
    origin: "الطويل: Infraglenoid tubercle. الوحشي والإنسي: الوجه الخلفي للعضد",
    insertion: "Olecranon",
    action: "بسط المرفق. الرأس الطويل يساعد في بسط الكتف وتقريبه",
    nerve: "Radial C7–C8",
    practical: "انبطاح أو جلوس، الكتف ٩٠° والمرفق مثني، المقاومة ضد البسط.",
    note: "الانعكاس الوتري ثلاثي الرؤوس يفحص جذر C7.",
  },
  {
    id: "brachioradialis",
    en: "Brachioradialis",
    ar: "العضدية الكعبرية",
    region: "مرفق وساعد",
    group: "الحيز الخلفي للساعد",
    origin: "Lateral supracondylar ridge",
    insertion: "الناتئ الإبري للكعبرة",
    action: "ثني المرفق والساعد في الوضع المتوسط بين الكب والبطح",
    nerve: "Radial C5–C6",
    practical: "الساعد mid-position (إبهام لأعلى)، المقاومة ضد الثني.",
    note: "عضلة ثني يعصّبها العصب الكعبري، لا المتوسط.",
  },
  {
    id: "fcr",
    en: "Flexor carpi radialis",
    ar: "الكعبرية المثنية للرسغ",
    region: "مرفق وساعد",
    group: "المثنيات السطحية",
    origin: "اللقيمة الإنسية — common flexor origin",
    insertion: "قاعدة المشط الثاني",
    action: "ثني الرسغ وانحراف كعبري",
    nerve: "Median C6–C7",
    practical: "الرسغ مثني ومنحرف كعبريًا، المقاومة للبسط والانحراف الزندي.",
    note: "ألم اللقيمة الإنسية (مرفق الغولف) يشمل منشأ هذه المجموعة.",
  },
  {
    id: "iliopsoas",
    en: "Iliopsoas",
    ar: "الحرقفية القطنية",
    region: "ورك",
    group: "مثنيات الورك",
    origin: "Iliacus: الحفرة الحرقفية. Psoas: أجسام وفروع T12–L5",
    insertion: "Lesser trochanter",
    action: "ثني الورك. القطنية تثبّت العمود القطني",
    nerve: "Femoral (iliacus) والفروع الأمامية L1–L3 (psoas)",
    practical: "جلوس، ثني الورك فوق ٩٠°، المقاومة للأسفل على الفخذ.",
    note: "اختبار Thomas يكشف قِصر المثنية الحرقفية القطنية.",
  },
  {
    id: "gmax",
    en: "Gluteus maximus",
    ar: "الألوية الكبرى",
    region: "ورك",
    group: "الألوية",
    origin: "الحرقفة خلف الخط الألوي الخلفي، العجز، العصعص، والرباط العجزي الحدبي",
    insertion: "الحدبة الألوية والسبيل الحرقفي الظنبوبي",
    action: "بسط الورك ودورانه للخارج. الألياف العلوية تساعد في التبعيد",
    nerve: "Inferior gluteal L5–S2",
    practical: "انبطاح مع ثني الركبة (لتثبيط أوتار المأبض)، المقاومة ضد بسط الورك.",
    note: "أقوى باسطة للورك، أساسية في النهوض من الجلوس وصعود السلم.",
  },
  {
    id: "gmed",
    en: "Gluteus medius",
    ar: "الألوية الوسطى",
    region: "ورك",
    group: "الألوية",
    origin: "الحرقفة بين الخطين الألويين الأمامي والخلفي",
    insertion: "الوجه الوحشي للمدور الكبير",
    action: "تبعيد الورك وتثبيت الحوض في طور الاستناد",
    nerve: "Superior gluteal L4–S1",
    practical: "استلقاء جانبي، الطرف العلوي مبعّد، المقاومة للأسفل.",
    note: "ضعفها يعطي علامة Trendelenburg: هبوط الحوض للجهة المقابلة عند الوقوف على الطرف الضعيف.",
  },
  {
    id: "rectus",
    en: "Rectus femoris",
    ar: "المستقيمة الفخذية",
    region: "ركبة",
    group: "رباعية الرؤوس",
    origin: "AIIS وحافة الحقّ",
    insertion: "الأحدوبة الظنبوبية عبر الرباط الرضفي",
    action: "بسط الركبة وثني الورك",
    nerve: "Femoral L2–L4",
    practical: "جلوس، بسط الركبة من ٩٠°، المقاومة فوق الكاحل للأسفل.",
    note: "الرأس الوحيد في الرباعية الذي يعبر مفصلين.",
  },
  {
    id: "vmo",
    en: "Vastus medialis",
    ar: "المتسعة الإنسية",
    region: "ركبة",
    group: "رباعية الرؤوس",
    origin: "الخط بين المدورين والشفة الإنسية للخط الخشن",
    insertion: "الحافة الإنسية للرضفة والرباط الرضفي",
    action: "بسط الركبة، والألياف المائلة توجّه الرضفة في آخر المدى",
    nerve: "Femoral L2–L4",
    practical: "يُلاحظ انقباضها في آخر ١٥–٢٠° من البسط.",
    note: "ضعفها يُناقش في تتبع الرضفة، مع عدم اختزال إعادة التأهيل فيها وحدها.",
  },
  {
    id: "biceps-fem",
    en: "Biceps femoris",
    ar: "ذات الرأسين الفخذية",
    region: "ركبة",
    group: "أوتار المأبض",
    origin: "الطويل: الأحدوبة الإسكية. القصير: الخط الخشن",
    insertion: "رأس الشظية",
    action: "ثني الركبة وبسط الورك (الطويل) ودوران الساق للخارج والركبة مثنية",
    nerve: "الطويل: Tibial. القصير: Common fibular. L5–S2",
    practical: "انبطاح، ثني الركبة ٤٥–٩٠°، المقاومة ضد الثني.",
    note: "الرأس القصير لا يعبر الورك، لذلك لا يبسطه.",
  },
  {
    id: "tibant",
    en: "Tibialis anterior",
    ar: "الظنبوبية الأمامية",
    region: "كاحل",
    group: "الحيز الأمامي للساق",
    origin: "اللُقمة الوحشية والثلثان العلويان للوجه الوحشي للظنبوب",
    insertion: "العظم الإسفيني الإنسي وقاعدة المشط الأول",
    action: "ثني ظهري وانقلاب للداخل",
    nerve: "Deep fibular L4–L5",
    practical: "جلوس، ثني ظهري مع انقلاب للداخل، المقاومة للأخمص والخارج.",
    note: "هبوط القدم (foot drop) الكلاسيكي مع إصابة العصب الشظوي العميق أو العصب الشظوي الأصلي.",
  },
  {
    id: "gastroc",
    en: "Gastrocnemius",
    ar: "الساقية / البطّية",
    region: "كاحل",
    group: "السمانة",
    origin: "لقمتا الفخذ الإنسية والوحشية",
    insertion: "العقب عبر وتر أخيل",
    action: "ثني أخمصي، وثني الركبة",
    nerve: "Tibial S1–S2",
    practical: "الوقوف على أطراف الأصابع والركبة ممدودة، أو مقاومة الثني الأخمصي والركبة مستقيمة.",
    note: "انعكاس أخيل يفحص جذر S1.",
  },
  {
    id: "soleus",
    en: "Soleus",
    ar: "النعلية",
    region: "كاحل",
    group: "السمانة",
    origin: "الخط النعلي للظنبوب والوجه الخلفي لرأس الشظية",
    insertion: "العقب عبر وتر أخيل",
    action: "ثني أخمصي مع ثني الركبة (تُعزل عن الساقية)",
    nerve: "Tibial S1–S2",
    practical: "رفع الكعب والركبة مثنية حوالي ٣٠–٤٥°.",
    note: "عضلة وضعية بطيئة الألياف، مهمة في الوقوف الطويل.",
  },
  {
    id: "peroneus",
    en: "Fibularis longus",
    ar: "الشظوية الطويلة",
    region: "كاحل",
    group: "الحيز الوحشي",
    origin: "رأس الشظية والثلثان العلويان لوجهها الوحشي",
    insertion: "الإسفيني الإنسي وقاعدة المشط الأول من الجهة الأخمصية",
    action: "انقلاب للخارج وثني أخمصي، وتدعم القوس المستعرضة",
    nerve: "Superficial fibular L5–S1",
    practical: "الكاحل أخمصي قليلًا، المقاومة ضد الانقلاب للخارج.",
    note: "ضعفها يُفقد التحكم بعد التواء الكاحل المتكرر للداخل.",
  },
  {
    id: "trap",
    en: "Upper trapezius",
    ar: "شبه المنحرفة العلوية",
    region: "جذع وعنق",
    group: "حزام الكتف",
    origin: "الناشزة القذالية الظاهرة والرباط القفوي حتى C7",
    insertion: "الثلث الوحشي للترقوة والآخرم",
    action: "رفع لوح الكتف وتدويره للأعلى",
    nerve: "Accessory CN XI والجذور C3–C4",
    practical: "الجلوس، رفع الكتف نحو الأذن ضد مقاومة للأسفل.",
    note: "إصابة العصب الإضافي تُضعف رفع الكتف وتدوير اللوح للأعلى.",
  },
  {
    id: "scm",
    en: "Sternocleidomastoid",
    ar: "القصية الترقوية الخشائية",
    region: "جذع وعنق",
    group: "الرقبة",
    origin: "قبضة القص والثلث الإنسي للترقوة",
    insertion: "الناتئ الخشائي",
    action: "من جانب واحد: إمالة لنفس الجهة ودوران للجهة المقابلة. من الجانبين: ثني الرقبة",
    nerve: "Accessory CN XI وC2–C3",
    practical: "استلقاء، تدوير الرأس للجهة المقابلة ثم رفعها ضد مقاومة.",
    note: "قِصرها أحادي الجانب من أسباب الصعر (torticollis).",
  },
  {
    id: "lat",
    en: "Latissimus dorsi",
    ar: "العريضة الظهرية",
    region: "جذع وعنق",
    group: "الظهر السطحي",
    origin: "النواتئ الشوكية T7–L5، اللفافة الصدرية القطنية، عرف الحرقفة، والأضلاع السفلية",
    insertion: "قاع الميزاب بين الحديبتين",
    action: "بسط العضد وتقريبه ودورانه للداخل",
    nerve: "Thoracodorsal C6–C8",
    practical: "انبطاح، الذراع ممدودة للخلف وللداخل، المقاومة ضد البسط.",
    note: "تُستخدم وظيفيًا في الدفع على العكازات والانتقال من الكرسي.",
  },
  {
    id: "pec",
    en: "Pectoralis major",
    ar: "الصدرية الكبرى",
    region: "جذع وعنق",
    group: "الجدار الصدري",
    origin: "الترقوة، القص، والغضاريف الضلعية ١–٦",
    insertion: "الشفة الوحشية للميزاب بين الحديبتين",
    action: "تقريب ودوران للداخل. الرأس الترقوي: ثني. الرأس القصي: بسط من وضع الثني",
    nerve: "Lateral & medial pectoral C5–T1",
    practical: "استلقاء، أفقي تقريب عند ٩٠° تبعيد، المقاومة للخارج.",
    note: "قِصرها يسحب الكتف للأمام ويضيّق المساحة تحت الأخرم.",
  },
  {
    id: "ql",
    en: "Quadratus lumborum",
    ar: "المربعة القطنية",
    region: "جذع وعنق",
    group: "الجدار الخلفي للبطن",
    origin: "عرف الحرقفة",
    insertion: "الضلع الثاني عشر والنواتئ المستعرضة L1–L4",
    action: "إمالة الجذع لنفس الجهة، وتثبيت الضلع ١٢ أثناء الشهيق",
    nerve: "الفروع الأمامية T12–L4",
    practical: "استلقاء جانبي، رفع الحوض عن السرير (hip hike) ضد مقاومة.",
    note: "تُذكر كثيرًا في ألم الخاصرة الميكانيكي، دون أن تكون التشخيص الوحيد.",
  },
];

export const motions: Motion[] = [
  { id: "sh-flex", joint: "الكتف", jointEn: "Shoulder", motion: "ثني", motionEn: "Flexion", norm: "0–180", end: 180 },
  { id: "sh-ext", joint: "الكتف", jointEn: "Shoulder", motion: "بسط", motionEn: "Extension", norm: "0–60", end: 60 },
  { id: "sh-abd", joint: "الكتف", jointEn: "Shoulder", motion: "تبعيد", motionEn: "Abduction", norm: "0–180", end: 180 },
  { id: "sh-ir", joint: "الكتف", jointEn: "Shoulder", motion: "دوران للداخل", motionEn: "Internal rotation", norm: "0–70", end: 70 },
  { id: "sh-er", joint: "الكتف", jointEn: "Shoulder", motion: "دوران للخارج", motionEn: "External rotation", norm: "0–90", end: 90 },
  { id: "el-flex", joint: "المرفق", jointEn: "Elbow", motion: "ثني", motionEn: "Flexion", norm: "0–150", end: 150 },
  { id: "fa-pro", joint: "الساعد", jointEn: "Forearm", motion: "كب", motionEn: "Pronation", norm: "0–80", end: 80 },
  { id: "fa-sup", joint: "الساعد", jointEn: "Forearm", motion: "بطح", motionEn: "Supination", norm: "0–80", end: 80 },
  { id: "wr-flex", joint: "الرسغ", jointEn: "Wrist", motion: "ثني", motionEn: "Flexion", norm: "0–80", end: 80 },
  { id: "wr-ext", joint: "الرسغ", jointEn: "Wrist", motion: "بسط", motionEn: "Extension", norm: "0–70", end: 70 },
  { id: "wr-rd", joint: "الرسغ", jointEn: "Wrist", motion: "انحراف كعبري", motionEn: "Radial deviation", norm: "0–20", end: 20 },
  { id: "wr-ud", joint: "الرسغ", jointEn: "Wrist", motion: "انحراف زندي", motionEn: "Ulnar deviation", norm: "0–30", end: 30 },
  { id: "hip-flex", joint: "الورك", jointEn: "Hip", motion: "ثني", motionEn: "Flexion", norm: "0–120", end: 120 },
  { id: "hip-ext", joint: "الورك", jointEn: "Hip", motion: "بسط", motionEn: "Extension", norm: "0–30", end: 30 },
  { id: "hip-abd", joint: "الورك", jointEn: "Hip", motion: "تبعيد", motionEn: "Abduction", norm: "0–45", end: 45 },
  { id: "hip-ir", joint: "الورك", jointEn: "Hip", motion: "دوران للداخل", motionEn: "Internal rotation", norm: "0–45", end: 45 },
  { id: "hip-er", joint: "الورك", jointEn: "Hip", motion: "دوران للخارج", motionEn: "External rotation", norm: "0–45", end: 45 },
  { id: "kn-flex", joint: "الركبة", jointEn: "Knee", motion: "ثني", motionEn: "Flexion", norm: "0–135", end: 135 },
  { id: "an-df", joint: "الكاحل", jointEn: "Ankle", motion: "ثني ظهري", motionEn: "Dorsiflexion", norm: "0–20", end: 20 },
  { id: "an-pf", joint: "الكاحل", jointEn: "Ankle", motion: "ثني أخمصي", motionEn: "Plantarflexion", norm: "0–50", end: 50 },
  { id: "an-inv", joint: "الكاحل", jointEn: "Ankle", motion: "انقلاب للداخل", motionEn: "Inversion", norm: "0–35", end: 35 },
  { id: "an-ev", joint: "الكاحل", jointEn: "Ankle", motion: "انقلاب للخارج", motionEn: "Eversion", norm: "0–15", end: 15 },
  { id: "cx-flex", joint: "العنق", jointEn: "Cervical", motion: "ثني", motionEn: "Flexion", norm: "0–45", end: 45 },
  { id: "cx-ext", joint: "العنق", jointEn: "Cervical", motion: "بسط", motionEn: "Extension", norm: "0–45", end: 45 },
  { id: "cx-rot", joint: "العنق", jointEn: "Cervical", motion: "دوران", motionEn: "Rotation", norm: "0–60", end: 60 },
  { id: "lx-flex", joint: "القطن", jointEn: "Lumbar", motion: "ثني", motionEn: "Flexion", norm: "0–60", end: 60 },
];

export const mmtGrades = [
  { grade: "0", name: "Zero", ar: "لا انقباض", detail: "لا يُجسّ انقباض ولا تحدث حركة." },
  { grade: "1", name: "Trace", ar: "أثر", detail: "انقباض يُرى أو يُجسّ بلا حركة في المفصل." },
  { grade: "2", name: "Poor", ar: "ضعيف", detail: "مدى كامل مع إلغاء الجاذبية، بلا مقاومة." },
  { grade: "3", name: "Fair", ar: "مقبول", detail: "مدى كامل ضد الجاذبية، بلا مقاومة خارجية." },
  { grade: "4", name: "Good", ar: "جيّد", detail: "مدى كامل ضد الجاذبية مع مقاومة متوسطة." },
  { grade: "5", name: "Normal", ar: "طبيعي", detail: "مدى كامل ضد الجاذبية مع مقاومة قصوى." },
];

export const cards: StudyCard[] = [
  {
    id: "c-supra-n",
    topic: "عصب",
    front: "ما تعصيب Supraspinatus؟",
    back: "Suprascapular nerve (C5–C6)",
    detail: "نفس العصب يعصّب Infraspinatus. يمر من الثلمة فوق لوح الكتف.",
  },
  {
    id: "c-start-abd",
    topic: "عضلة",
    front: "أي عضلة تبدأ تبعيد الكتف؟",
    back: "Supraspinatus",
    detail: "ثم تكمل Deltoid التبعيد. الشلل المعزول يُضعف بدء الحركة أكثر من قوتها في المنتصف.",
  },
  {
    id: "c-axillary",
    topic: "عصب",
    front: "إصابة العصب الإبطي تُضعف أي عضلة أساسًا؟",
    back: "Deltoid وTeres minor",
    detail: "ويضعف الإحساس في منطقة الشارة فوق الدالية. شائعة بعد خلع أمامي للكتف.",
  },
  {
    id: "c-empty",
    topic: "اختبار",
    front: "اختبار Empty can (Jobe) يفحص؟",
    back: "Supraspinatus",
    detail: "تبعيد في مستوى اللوح مع دوران داخلي (إبهام لأسفل) ومقاومة للأسفل. الألم أو الضعف إيجابي.",
  },
  {
    id: "c-hawkins",
    topic: "اختبار",
    front: "Hawkins–Kennedy إيجابي يعني غالبًا؟",
    back: "اصطدام تحت الأخرم",
    detail: "الكتف ٩٠° ثني، ثم دوران داخلي قسري. ليس تشخيصًا نسيجيًا وحده.",
  },
  {
    id: "c-lachman",
    topic: "اختبار",
    front: "Lachman يفحص أي رباط؟",
    back: "ACL — الرباط الصليبي الأمامي",
    detail: "الركبة مثنية ٢٠–٣٠°. أكثر حساسية من الدرج الأمامي في الإصابة الحادة.",
  },
  {
    id: "c-mcmurray",
    topic: "اختبار",
    front: "McMurray يُستخدم لأي بنية؟",
    back: "الغضروف الهلالي",
    detail: "دوران الساق مع ثني وبسط الركبة. الطقطقة مع ألم تدعم إصابة الهلالي، ولا تنفيها وحدها.",
  },
  {
    id: "c-thomas",
    topic: "اختبار",
    front: "اختبار Thomas الإيجابي يدل على؟",
    back: "قِصر Iliopsoas",
    detail: "المريض يمسك ركبة نحو الصدر. ارتفاع الفخذ الآخر عن السرير = قِصر مثنية الورك.",
  },
  {
    id: "c-trend",
    topic: "اختبار",
    front: "علامة Trendelenburg الإيجابية تعني ضعف؟",
    back: "Gluteus medius في طرف الوقوف",
    detail: "الحوض يهبط في الجهة المقابلة. العصب: Superior gluteal.",
  },
  {
    id: "c-slr",
    topic: "اختبار",
    front: "رفع الساق ممدودة (SLR) يستثير غالبًا؟",
    back: "جذور قطنية / توتر العصب الوركي",
    detail: "ألم مشع تحت الركبة قبل ٧٠° أكثر دلالة من شد أوتار المأبض.",
  },
  {
    id: "c-phalen",
    topic: "اختبار",
    front: "Phalen الإيجابي يوجّه إلى؟",
    back: "متلازمة النفق الرسغي — Median nerve",
    detail: "ثني الرسغين كاملًا لـ ٦٠ ثانية. يزداد الضغط داخل النفق.",
  },
  {
    id: "c-tinel",
    topic: "اختبار",
    front: "Tinel عند الرسغ ينقر على أي عصب؟",
    back: "Median nerve",
    detail: "التنميل في الإبهام والسبابة والوسطى ونصف البنصر الكعبري يدعم التهيج.",
  },
  {
    id: "c-atfl",
    topic: "اختبار",
    front: "الدرج الأمامي للكاحل يفحص؟",
    back: "ATFL — الرباط الكاحلي الشظوي الأمامي",
    detail: "أكثر أربطة الكاحل تمزقًا في الالتواء للداخل والثني الأخمصي.",
  },
  {
    id: "c-thompson",
    topic: "اختبار",
    front: "اختبار Thompson السلبي (بلا ثني أخمصي) يعني؟",
    back: "تمزق وتر أخيل",
    detail: "عصر بطن الساق والمريض منبطح. غياب الحركة علامة قوية على القطع.",
  },
  {
    id: "c-c7",
    topic: "عصب",
    front: "انعكاس Triceps يفحص أي جذر غالبًا؟",
    back: "C7",
    detail: "C5: ذات الرأسين. C6: العضدية الكعبرية. S1: أخيل. L3–L4: الرضفة.",
  },
  {
    id: "c-footdrop",
    topic: "عصب",
    front: "هبوط القدم بعد ضغط رأس الشظية يصيب أي عصب؟",
    back: "Common fibular (peroneal) nerve",
    detail: "يضعف Tibialis anterior والشظويات: سقوط القدم وصعوبة الانقلاب للخارج.",
  },
  {
    id: "c-df-norm",
    topic: "مدى",
    front: "المدى الطبيعي للثني الظهري للكاحل؟",
    back: "حوالي 0–20°",
    detail: "حسب أرقام AAOS الشائعة للمذاكرة. أقل من ١٠° وظيفيًا يقيّد المشي.",
  },
  {
    id: "c-knee-norm",
    topic: "مدى",
    front: "ثني الركبة الطبيعي التقريبي؟",
    back: "0–135°",
    detail: "صعود السلم يحتاج نحو ٩٠°، والنهوض من كرسي منخفض أكثر.",
  },
  {
    id: "c-mmt3",
    topic: "عضلة",
    front: "درجة MMT 3 تعني؟",
    back: "مدى كامل ضد الجاذبية بلا مقاومة",
    detail: "2 = مدى كامل مع إلغاء الجاذبية. 4 = مقاومة متوسطة. 5 = مقاومة قصوى.",
  },
  {
    id: "c-vmo",
    topic: "عضلة",
    front: "أي رأس من الرباعية يعبر الوركين والركبة؟",
    back: "Rectus femoris",
    detail: "منشأها AIIS. الباقي (المتسعات) أحادي المفصل ويبسط الركبة فقط.",
  },
  {
    id: "c-scm",
    topic: "عضلة",
    front: "تقلص SCM الأيمن يدوّر الوجه لأي جهة؟",
    back: "لليسار",
    detail: "الإمالة لنفس الجهة، والدوران للجهة المقابلة. التعصيب: CN XI.",
  },
  {
    id: "c-gmax-n",
    topic: "عصب",
    front: "تعصيب Gluteus maximus؟",
    back: "Inferior gluteal nerve L5–S2",
    detail: "أما Gluteus medius وminimus: Superior gluteal L4–S1.",
  },
];

export const cases: CaseStudy[] = [
  {
    id: "case-imp",
    title: "كتف يؤلم فوق الرأس",
    tag: "كتف",
    vignette:
      "طالبة ٢٣ سنة تراجع العيادة بعد شهر من ألم كتف أيمن عند تمشيط شعرها ورفع الكتب. الألم في الوجه الأمامي الوحشي، بلا تنميل في اليد. Empty can مؤلم، وHawkins إيجابي. القوة ضد المقاومة شبه كاملة.",
    question: "الأكثر اتساقًا مع الصورة الآن؟",
    choices: [
      "اصطدام تحت الأخرم مع تهيّج Supraspinatus",
      "قطع كامل للكفة المدورة",
      "متلازمة النفق الرسغي",
      "عدم ثبات حقّاني متعدد الاتجاهات",
    ],
    answer: 0,
    explain:
      "الألم مع حركات فوق الرأس واختبارا الاستثارة الإيجابيان مع قوة محفوظة يرجّحان تهيّجًا/اصطدامًا لا قطعًا كاملًا. النفق الرسغي يعطي تنميلًا في توزيع المتوسط، وعدم الثبات يظهر بخوف أو انزلاق لا بألم قوس فقط.",
    pearl: "القوة الضائعة مع Drop arm تقرّبك من القطع أكثر من الألم وحده.",
  },
  {
    id: "case-acl",
    title: "التواء في مباراة",
    tag: "ركبة",
    vignette:
      "لاعب ٢١ سنة سمع «طقة» عند تغيير الاتجاه، وانتفخت الركبة خلال ساعتين. اليوم الثالث: Lachman لين مع نهاية رخوة، والدرج الخلفي ثابت، وماكموراي بلا طقطقة واضحة.",
    question: "الرباط الأرجح إصابة؟",
    choices: ["PCL", "ACL", "MCL فقط", "LCL"],
    answer: 1,
    explain:
      "التغير المفاجئ مع صوت وانتفاخ سريع (نزيف داخل المفصل) ونهاية رخوة في Lachman صورة كلاسيكية للصليبي الأمامي. الدرج الخلفي الثابت يبعد PCL. الأربطة الجانبية تُفحص بضغط أروح/أفحس عند ٣٠°.",
    pearl: "الانتفاخ خلال ساعات يوحي بدموي المفصل؛ انتفاخ اليوم التالي أميل للانصباب الزلالي.",
  },
  {
    id: "case-l5",
    title: "ألم ينزل تحت الركبة",
    tag: "قطن",
    vignette:
      "موظف ٤٠ سنة، ألم قطني منذ أسبوعين بعد رفع صندوق، يمتد في الوجه الخلفي الوحشي للساق حتى ظهر القدم. SLR عند ٤٥° يكرر الألم المشع. الثني الظهري أضعف قليلًا من الجهة الأخرى. انعكاس أخيل محفوظ.",
    question: "الجذر الأقرب للصورة؟",
    choices: ["L3", "L4", "L5", "S1"],
    answer: 2,
    explain:
      "ألم إلى ظهر القدم مع ضعف الثني الظهري يطابق L5 غالبًا. S1 ينزل للحافة الوحشية للقدم ويضعف الثني الأخمصي وانعكاس أخيل. L4 أقرب للوجه الإنسي والانعكاس الرضفي.",
    pearl: "الألم الذي يتوقف فوق الركبة قد يكون إرجاعًا صلبيًا لا جذرًا.",
  },
  {
    id: "case-ankle",
    title: "نزول خاطئ من الرصيف",
    tag: "كاحل",
    vignette:
      "المريضة التوت كاحلها للداخل مع ثني أخمصي. ألم وتورّم أمام الكعب الوحشي. الدرج الأمامي زاد مقارنة بالجهة السليمة. تستطيع المشي أربع خطوات مع عرج. لا ألم بالعظم عند جس الكعب أو قاعدة المشط الخامس.",
    question: "البنية الأرجح، وما قرار الأشعة المبدئي حسب Ottawa؟",
    choices: [
      "ATFL، والأشعة غير مستطبة الآن",
      "وتر أخيل، وأشعة عاجلة",
      "الكعب الوحشي مكسور حتى بلا ألم عظمي",
      "CFL فقط لأن الدرج الأمامي يفحصه",
    ],
    answer: 0,
    explain:
      "الالتواء للداخل مع الثني الأخمصي وألم أمام الشظية ودرج أمامي زائد = ATFL. قواعد أوتاوا: لا ألم عظمي في المناطق المحددة مع القدرة على أربع خطوات يقلل احتمال الكسر. Thompson يفحص أخيل لا هذا السيناريو.",
    pearl: "الدرج الأمامي = ATFL. ميلان القعب (talar tilt) أقرب إلى CFL.",
  },
  {
    id: "case-cts",
    title: "تنميل ليلي في اليد",
    tag: "يد",
    vignette:
      "سيدة ٥٢ سنة تستيقظ لتنفض يدها اليمنى. التنميل في الإبهام والسبابة والوسطى. Phalen يكرر الأعراض خلال ٤٠ ثانية. العضلة الضامة للإبهام (APB) ضعيفة قليلًا. الإحساس في ظهر اليد محفوظ.",
    question: "التفسير الأدق؟",
    choices: [
      "انضغاط Median nerve داخل النفق الرسغي",
      "جذر C7 لأن الوسطى متأثرة",
      "عصب زندي في قناة غويون",
      "شظوي أصلي",
    ],
    answer: 0,
    explain:
      "التوزيع الحسي الراحي للأصابع الثلاثة ونصف، مع Phalen وضعف APB، هو النفق الرسغي. ظهر اليد يعصّبه الفرع السطحي للكعبري غالبًا فيبقى محفوظًا. الزندي يصيب الخنصر ونصف البنصر الزندي.",
    pearl: "ضعف ثم ضمور الرانفة علامة متأخرة، لا تنتظرها لتبدأ الخطة التحفظية.",
  },
  {
    id: "case-gmed",
    title: "عرج بعد مشي طويل",
    tag: "ورك",
    vignette:
      "طالبة تلاحظ أن وركها «يسقط» يمينًا حين تقف على الرجل اليسرى بعد يوم تدريب. ألم وحشي فوق المدور الكبير. قوة التبعيد يسار ٣+/٥. ثني الورك والقرفصاء غير مؤلمين.",
    question: "ما اسم العلامة، وأي عضلة؟",
    choices: [
      "Trendelenburg لضعف Gluteus medius اليسرى",
      "Thomas لقِصر Iliopsoas",
      "Ober لشد السبيل الحرقفي الظنبوبي فقط",
      "Lachman لعدم ثبات الورك",
    ],
    answer: 0,
    explain:
      "هبوط الحوض للجهة المقابلة عند الاستناد على طرف = Trendelenburg، والعضلة المسؤولة هي الألوية الوسطى (والصغرى) لذلك الطرف. Thomas يكشف قِصر المثنية لا السقوط في المشي.",
    pearl: "في المشي قد تميل الجذع نحو الطرف الضعيف لتعويض العزم — عرج تعويضي لا هبوط فقط.",
  },
];

export const quizBank: QuizItem[] = [
  {
    id: "q1",
    prompt: "التعصيب الحركي لـ Deltoid هو",
    choices: ["Axillary", "Radial", "Suprascapular", "Musculocutaneous"],
    answer: 0,
    explain: "العصب الإبطي C5–C6 يعصّب الدالية والمدورة الصغيرة.",
  },
  {
    id: "q2",
    prompt: "اندغام Supraspinatus يكون على",
    choices: ["Lesser tubercle", "Greater tubercle", "Olecranon", "Coracoid"],
    answer: 1,
    explain: "الحديبة الكبرى. الحديبة الصغرى لـ Subscapularis.",
  },
  {
    id: "q3",
    prompt: "درجة MMT التي تعني مدى كامل ضد الجاذبية بلا مقاومة",
    choices: ["2", "3", "4", "5"],
    answer: 1,
    explain: "3 Fair. الدرجة 2 تلغي الجاذبية.",
  },
  {
    id: "q4",
    prompt: "Lachman يُجرى والركبة مثنية تقريبًا",
    choices: ["0°", "20–30°", "90°", "135°"],
    answer: 1,
    explain: "عند ٢٠–٣٠° يقل توتر أوتار المأبض مقارنة بالدرج عند ٩٠°.",
  },
  {
    id: "q5",
    prompt: "هبوط القدم الكلاسيكي يتبع إصابة",
    choices: ["Tibial nerve", "Common fibular nerve", "Femoral nerve", "Obturator nerve"],
    answer: 1,
    explain: "العصب الشظوي الأصلي يمدّ الحيز الأمامي والوحشي.",
  },
  {
    id: "q6",
    prompt: "المدى الشائع لبسط الرسغ",
    choices: ["0–20", "0–45", "0–70", "0–150"],
    answer: 2,
    explain: "بسط الرسغ حوالي ٠–٧٠، والثني ٠–٨٠.",
  },
  {
    id: "q7",
    prompt: "Gluteus medius يعصّبها",
    choices: ["Inferior gluteal", "Superior gluteal", "Femoral", "Sciatic"],
    answer: 1,
    explain: "Superior gluteal L4–S1. الألوية الكبرى: Inferior gluteal.",
  },
  {
    id: "q8",
    prompt: "العضلة التي تبدأ تبعيد الكتف",
    choices: ["Deltoid", "Supraspinatus", "Pectoralis major", "Latissimus dorsi"],
    answer: 1,
    explain: "فوق الشوكة تبدأ الحركة، والدالية تكملها.",
  },
  {
    id: "q9",
    prompt: "انعكاس أخيل يفحص غالبًا الجذر",
    choices: ["L4", "L5", "S1", "C7"],
    answer: 2,
    explain: "S1. الرضفة L3–L4، وثلاثية الرؤوس C7.",
  },
  {
    id: "q10",
    prompt: "Phalen يستثير",
    choices: ["Ulnar nerve عند المرفق", "Median nerve في النفق الرسغي", "Radial nerve", "ACL"],
    answer: 1,
    explain: "ثني الرسغ الكامل يرفع الضغط على المتوسط داخل النفق.",
  },
  {
    id: "q11",
    prompt: "Rectus femoris تنشأ من",
    choices: ["Ischial tuberosity", "AIIS", "Greater trochanter", "Linea aspera فقط"],
    answer: 1,
    explain: "الشوكة الحرقفية الأمامية السفلية وحافة الحقّ.",
  },
  {
    id: "q12",
    prompt: "الثني الظهري الطبيعي للكاحل حوالي",
    choices: ["0–5°", "0–20°", "0–50°", "0–90°"],
    answer: 1,
    explain: "٠–٢٠ ظهري، و٠–٥٠ أخمصي وفق الأرقام الشائعة.",
  },
  {
    id: "q13",
    prompt: "SCM اليمنى تدير الوجه إلى",
    choices: ["اليمين", "اليسار", "لا دوران", "البسط فقط"],
    answer: 1,
    explain: "دوران للجهة المقابلة وإمالة لنفس الجهة.",
  },
  {
    id: "q14",
    prompt: "Thompson بلا حركة أخمصية يعني اشتباه",
    choices: ["قطع أخيل", "قطع ACL", "شلل شظوي", "كسر سالم"],
    answer: 0,
    explain: "عصر السمانة يجب أن يثني الكاحل أخمصيًا إن كان الوتر متصلًا.",
  },
  {
    id: "q15",
    prompt: "Brachioradialis يعصّبها",
    choices: ["Median", "Ulnar", "Radial", "Axillary"],
    answer: 2,
    explain: "استثناء مفيد: عضلة ثني يعصّبها الكعبري.",
  },
  {
    id: "q16",
    prompt: "الدرج الأمامي للكاحل يفحص",
    choices: ["ATFL", "Deltoid ligament", "Spring ligament", "PCL"],
    answer: 0,
    explain: "الرباط الكاحلي الشظوي الأمامي.",
  },
  {
    id: "q17",
    prompt: "درجة 2 في MMT تعني",
    choices: ["لا انقباض", "مدى كامل مع إلغاء الجاذبية", "مقاومة قصوى", "أثر بلا حركة"],
    answer: 1,
    explain: "Poor. الأثر بلا حركة هو الدرجة 1.",
  },
  {
    id: "q18",
    prompt: "اندغام Iliopsoas",
    choices: ["Greater trochanter", "Lesser trochanter", "Tibial tuberosity", "ASIS"],
    answer: 1,
    explain: "المدور الصغير.",
  },
];

export function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ً-ْ]/g, "")
    .trim();
}

export function shuffle<T>(items: T[], seed: number) {
  const copy = [...items];
  let state = seed || 1;
  const rand = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
