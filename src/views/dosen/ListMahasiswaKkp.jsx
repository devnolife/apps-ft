// MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import OptionMenu from '@core/components/option-menu';
import Link from '@components/Link';

const DashboardKKP = () => {
  const data = [
    {
      extraMembers: 6,
      title: 'Komisi Pemilihan Umum - Kota Makassar',
      avatar: '/logo/kpu.png',
      avatarGroup: [
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg', name: 'Andi Muhammad Akbar DB Posgre' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg', name: 'RIZKA UTAMA' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111521.jpg', name: 'Muh. Iqbal' }
      ],
      description:
        'Kantor KPU Kota Makassar adalah kantor yang berada di Kota Makassar yang bertugas untuk mengatur dan melaksanakan pemilihan umum di Kota Makassar.',
      chips: [
        { title: 'Pemerintahan', color: 'primary' },
        { title: 'Pemilu', color: 'info' }
      ]
    },
    {
      extraMembers: 5,
      title: 'Kalla Group',
      avatar: '/logo/kalla.png',
      avatarGroup: [
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111121.jpg', name: 'Saiful' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg', name: 'Andi Muhammad Akbar DB Posgre' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg', name: 'RIZKA UTAMA' }
      ],
      description:
        'Kalla Group adalah sebuah perusahaan yang bergerak di bidang konstruksi, properti, hotel, dan lain-lain.',
      chips: [
        { title: 'Konstruksi', color: 'success' },
        { title: 'Properti', color: 'warning' }
      ]
    },
    {
      extraMembers: 1,
      title: 'PDAM Kota Makassar',
      avatar: '/logo/pdam.png',
      avatarGroup: [
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111521.jpg', name: 'Sitti Badriah' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111121.jpg', name: 'Saiful' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg', name: 'Andi Muhammad Akbar DB Posgre' }
      ],
      description:
        'PDAM Kota Makassar adalah perusahaan daerah yang bergerak di bidang penyediaan air bersih di Kota Makassar.',
      chips: [
        { title: 'Air Bersih', color: 'primary' },
        { title: 'Pelayanan Publik', color: 'info' }
      ]
    },
    {
      extraMembers: 3,
      title: 'Balai Bahasa Sulawesi Selatan',
      avatar: '/logo/balai.png',
      avatarGroup: [
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg', name: 'RIZKA UTAMA' },
      ],
      description:
        'Balai Bahasa Sulawesi Selatan adalah balai bahasa yang berada di Sulawesi Selatan.',
      chips: [
        { title: 'Bahasa', color: 'success' },
        { title: 'Pendidikan', color: 'warning' }
      ]
    },
    {
      extraMembers: 2,
      title: 'TVRI Sulawesi Selatan',
      avatar: '/logo/tvri.png',
      avatarGroup: [
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg', name: 'RIZKA UTAMA' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111321.jpg', name: 'Muh. Iqbal' }
      ],
      description:
        'TVRI Sulawesi Selatan adalah stasiun televisi yang berada di Sulawesi Selatan yang merupakan bagian dari TVRI.',
      chips: [
        { title: 'Televisi', color: 'primary' },
        { title: 'Penyiaran', color: 'error' }
      ]
    },
    {
      extraMembers: 1,
      title: 'Warkop Kopi Kenangan',
      avatar: '/logo/kopkep.png',
      avatarGroup: [
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111121.jpg', name: 'Saiful' },
        { avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg', name: 'Andi Muhammad Akbar DB Posgre' },
      ],
      description:
        'Warkop Kopi Kenangan adalah warkop yang berada di Makassar yang menyediakan berbagai macam minuman kopi.',
      chips: [
        { title: 'Kuliner', color: 'success' },
        { title: 'Kopi', color: 'info' }
      ]
    }
  ];

  return (
    <Grid container spacing={6}>
      {data.map((item, index) => (
        <Grid
          item
          key={index}
          xs={12}
          md={6}
          lg={4}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Card
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              component='img'
              src={item.avatar}
              alt={item.title}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 20,
                width: '30%',
                height: '80%',
                opacity: 0.2,
                objectFit: 'contain',
                transform: 'translateY(-50%)',
              }}
            />
            <CardContent style={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div className='flex items-center justify-between gap-2'>
                <Typography variant='h5'>{item.title}</Typography>
                <div className='flex items-center'>
                  <IconButton size='small'>
                    <i className='tabler-star text-textDisabled' />
                  </IconButton>
                  <OptionMenu
                    iconClassName='text-textDisabled'
                    options={[
                      'Rename Team',
                      'View Details',
                      'Add to Favorite',
                      { divider: true },
                      {
                        text: 'Delete Team',
                        menuItemProps: {
                          className:
                            'text-error hover:bg-[var(--mui-palette-error-lightOpacity)]',
                        },
                      },
                    ]}
                  />
                </div>
              </div>
              <Typography style={{ marginBottom: '16px' }}>{item.description}</Typography>
              <div
                className='flex flex-wrap items-center gap-4'
                style={{ marginTop: 'auto' }}
              >
                <AvatarGroup
                  total={item.extraMembers ? item.extraMembers + 3 : 3}
                  sx={{
                    '& .MuiAvatar-root': {
                      width: '2.5rem',
                      height: '2.5rem',
                      fontSize: '1rem',
                    },
                  }}
                  className='items-center pull-up'
                >
                  {item.avatarGroup.map((person, idx) => (
                    <Tooltip key={idx} title={person.name}>
                      <Avatar
                        src={person.avatar}
                        alt={person.name}
                        imgProps={{
                          style: {
                            objectFit: 'cover',
                            objectPosition: 'center',
                          },
                        }}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
                <div className='flex items-center gap-2'>
                  {item.chips.map((chip, idx) => (
                    <Link key={idx}>
                      <Chip
                        variant='tonal'
                        size='small'
                        label={chip.title}
                        color={chip.color}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardKKP;
