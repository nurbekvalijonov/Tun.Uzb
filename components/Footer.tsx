import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-tun-black text-gray-500 text-xs md:text-sm font-mono leading-relaxed w-full">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-tun-accent font-bold mb-6 uppercase tracking-widest text-base">MAXFIYLIK SIYOSATI VA FOYDALANISH SHARTLARI</h3>
        
        <div className="space-y-6">
          <div>
            <strong className="text-gray-300 block mb-2">1. LOYIHA MAQSADI VA STATUSI</strong>
            <p>Ushbu veb-sayt (bundan buyon matnda — "Platforma") professional jurnalistik faoliyat yuritish maqsadida yaratilmagan. Platforma shaxsiy portfolioni boyitish, veb-dasturlash mahoratini oshirish va AI texnologiyalarining (Lovable, Bolt, Google AI Studio) vizual imkoniyatlarini sinab ko'rish uchun yaratilgan Demo-versiya hisoblanadi.</p>
          </div>
          
          <div>
            <strong className="text-gray-300 block mb-2">2. MA'LUMOTLARNING NOANIQLIGI (DISCLAIMER)</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>To'liq uydirma: Saytda e'lon qilingan barcha yangiliklar, maqolalar, intervyular va tahlillar 100% yolg'on va uydirma hisoblanadi.</li>
              <li>AI Generatsiyasi: Ma'lumotlar sun'iy intellekt tomonidan tasodifiy generatsiya qilingan bo'lib, ular haqiqiy faktlarga asoslanmagan.</li>
              <li>Mas'uliyatni cheklash: Platforma ma'muriyati saytdagi ma'lumotlarni haqiqat deb qabul qilish natijasida kelib chiqadigan har qanday ma'naviy yoki moddiy zarar uchun javobgarlikni o'z zimmasiga olmaydi.</li>
            </ul>
          </div>

          <div>
            <strong className="text-gray-300 block mb-2">3. SHAXSIY MA'LUMOTLAR MAXFIYLIGI</strong>
            <p>Ushbu loyiha o'quv mashqi bo'lganligi sababli, foydalanuvchilarning maxfiyligini quyidagicha ta'minlaydi:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ma'lumot yig'ilmasligi: Sayt foydalanuvchilarning shaxsiy ma'lumotlarini (ism, telefon, email) yig'maydi va saqlamaydi.</li>
              <li>Cookie fayllari: Platforma faqat texnik ishlashni yaxshilash va vizual effektlarni to'g'ri ko'rsatish uchun vaqtinchalik cookie fayllaridan foydalanishi mumkin.</li>
              <li>Uchinchi tomonlar: Saytda ko'rsatilgan har qanday tashqi havolalar faqat dizayn elementi sifatida qo'shilgan va ular xavfsizligiga kafolat berilmaydi.</li>
            </ul>
          </div>

          <div>
            <strong className="text-gray-300 block mb-2">4. MUALLIFLIK HUQUQI VA INTERFEYS</strong>
            <p>Sayt dizayni va uning tuzilishi zamonaviy AI Builder platformalari yordamida yaratilgan. Ushbu loyiha kodi va dizayni faqatgina muallifning IT sohasidagi salohiyatini namoyish etish uchun xizmat qiladi.</p>
          </div>

          <div>
            <strong className="text-gray-300 block mb-2">5. TASODIFIY O'XSHASHLIKLAR</strong>
            <p>Saytdagi xayoliy qahramonlar, kompaniyalar yoki voqealarning real hayotdagi shaxslar yoki tashkilotlar bilan har qanday o'xshashligi mutlaqo tasodifiy deb hisoblanadi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
