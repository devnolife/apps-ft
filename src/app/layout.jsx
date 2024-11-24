import 'react-perfect-scrollbar/dist/css/styles.css'

import '@/app/globals.css'

import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Dashboard Fakultas Teknik',
  description:
    'Dashboard Fakultas Teknik adalah aplikasi yang digunakan untuk mengelola data mahasiswa, dosen, dan mata kuliah di Fakultas Teknik.',
}

const RootLayout = ({ children }) => {

  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex flex-col flex-auto is-full min-bs-full'>{children}</body>
    </html>
  )
}

export default RootLayout
