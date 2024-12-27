'use client'

import ActivityTimeline from '@/components/ActivityTimeline'

const data = [
  {
    title: 'Surat Pengajuan KKP telah diambil',
    date: '10 menit yang lalu',
    description: 'Surat Pengajuan KKP telah diterbitkan untuk mahasiswa.',
    color: 'primary',
    details: 'Diambil oleh: Arief Kurniawan',
    image: '/images/icons/pdf-document.png',
  },
  {
    title: 'Surat Rekomendasi Beasiswa telah diambil',
    date: '30 menit yang lalu',
    description: 'Surat Rekomendasi Beasiswa diterbitkan oleh bagian TU.',
    color: 'success',
    details: 'Diambil oleh: Nur Azizah',
    image: '/images/icons/pdf-document.png',
  },
  {
    title: 'Surat Keterangan Lulus telah diambil',
    date: '2 hari yang lalu',
    description: 'Surat Keterangan Lulus telah diterbitkan oleh bagian akademik.',
    color: 'info',
    avatars: [{ name: 'Mahasiswa', src: '/images/avatars/1.png' }],
    details: 'Diambil oleh: Dwi Santoso',
  },
]

const SuratActivityTimeline = () => {
  return <ActivityTimeline data={data} />
}

export default SuratActivityTimeline
