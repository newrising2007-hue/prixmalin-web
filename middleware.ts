import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en', 'es', 'ar', 'zh'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  localeDetection: false
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\..*).*)'  ]
};
