'use client'
import React from 'react';
import styles from './Footer.module.scss';
import { usePathname, useRouter } from 'next/navigation';

export const Footer: React.FC = () => {
const router = useRouter();
const pathname = usePathname();
  // const pathname = router.pathname; // Например: '/auth', '/home'

  if (pathname.toLowerCase() === '/auth') {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Логотип и краткое описание */}
        <div className={styles.about}>
          <h3 className={styles.logo}>MyUniversity</h3>
          <p>
            Университет передовых технологий — ваш путь к успеху! Мы готовим лучших специалистов будущего.
          </p>
        </div>

        {/* Контакты */}
        <div className={styles.contacts}>
          <h4 className={styles.title}>Контакты</h4>
          <ul>
            <li>Адрес: г. Белгород, ул. Университетская, д. 15</li>
            <li>Телефон: +7 (495) 123-45-67</li>
            <li>Email: info@myuniversity.ru</li>
          </ul>
        </div>

        {/* Полезные ссылки */}
        <div className={styles.links}>
          <h4 className={styles.title}>Полезные ссылки</h4>
          <ul>
            <li><a href="/about">О нас</a></li>
            <li><a href="/news">Новости</a></li>
            <li><a href="/support">Поддержка</a></li>
          </ul>
        </div>

        {/* Социальные сети */}
        <div className={styles.socials}>
          <h4 className={styles.title}>Социальные сети</h4>
          <div className={styles.socialIcons}>
            <a href="https://vk.com/" target="_blank" >
              <img src="/icons/socials/vk.png" alt="VK" />
            </a>
            <a href="https://t.me/" target="_blank" >
              <img src="/icons/socials/telegram.png" alt="Telegram" />
            </a>
            <a href="https://youtube.com/myuniversity" target="_blank" >
              <img src="/icons/socials/youtube.png" alt="youtube" />
            </a>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className={styles.copyright}>
        <p>&copy; 2025 MyUniversity. Все права защищены.</p>
        <p>
          Разработано с ❤️ командой{' '}
          <a href="https://vk.com" target="_blank">
            IcQxp
          </a>
        </p>
      </div>
    </footer>
  );
};   