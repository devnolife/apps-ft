import { useRef, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'; // Dialog import
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PerfectScrollbar from 'react-perfect-scrollbar';

import classnames from 'classnames';

import CustomAvatar from '@core/components/mui/Avatar';
import themeConfig from '@configs/themeConfig';
import { useSettings } from '@core/hooks/useSettings';
import { getInitials } from '@/utils/getInitials';
import DialogNotification from '@/components/dialog/DialogNotification';

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <div className="overflow-x-hidden max-bs-[420px]">{children}</div>;
  } else {
    return (
      <PerfectScrollbar
        className="max-bs-[420px]"
        options={{ wheelPropagation: false, suppressScrollX: true }}
      >
        {children}
      </PerfectScrollbar>
    );
  }
};

const dataDialog = {
  name: 'Komisi Pemilihan Umum - Kota Makassar',
  address: 'Jl. Perintis Kemerdekaan No.3, Makassar',
  logo: '/logo/kpu.png',
  keterangan: 'Kantor KPU Kota Makassar adalah kantor yang berada di Kota Makassar yang bertugas untuk mengatur dan melaksanakan pemilihan umum di Kota Makassar.',
};

const invitations = {
  avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
  name: 'Andi Muhammad Akbar DB',
  position: 'Ketua Kelompok',
  prodi: 'Informatika',
  nim: '105841111221',
}

const notifications = [
  {
    avatarImage: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
    title: 'Penambahan Sebagai Anggota KKP',
    subtitle: 'Anda telah ditambahkan oleh Andi Muhammad Akbar DB sebagai anggota kelompok Kuliah Kerja Profesi.',
    time: '1 jam yang lalu',
    read: false,
    dialog: true // Trigger dialog
  },
  {
    title: 'Pengajuan Surat Keterangan Aktif Kuliah',
    avatarColor: 'secondary',
    subtitle: 'Pengajuan Surat Keterangan Aktif Kuliah Anda telah disetujui oleh Ketua Program Studi Informatika.',
    time: '12 jam yang lalu',
    read: false,
    dialog: false
  },
];

const getAvatar = (params) => {
  const { avatarImage, avatarIcon, avatarText, title, avatarColor, avatarSkin } = params;

  if (avatarImage) {
    return <Avatar src={avatarImage} />;
  } else if (avatarIcon) {
    return (
      <CustomAvatar color={avatarColor} skin={avatarSkin || 'light-static'}>
        <i className={avatarIcon} />
      </CustomAvatar>
    );
  } else {
    return (
      <CustomAvatar color={avatarColor || 'info'} skin={avatarSkin || 'light-static'}>
        <i className="tabler-bell" />
      </CustomAvatar>
    );
  }
};

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for controlling the dialog
  const [dialogContent, setDialogContent] = useState({}); // Store content for the dialog
  const [notificationsState, setNotificationsState] = useState(notifications);
  const notificationCount = notificationsState.filter((notification) => !notification.read).length;
  const readAll = notificationsState.every((notification) => notification.read);
  const anchorRef = useRef(null);
  const hidden = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { settings } = useSettings();

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleReadNotification = (event, value, index) => {
    event.stopPropagation();
    const newNotifications = [...notificationsState];

    newNotifications[index].read = value;
    setNotificationsState(newNotifications);

    if (newNotifications[index].dialog) {
      // Open the dialog if 'dialog' is true
      setDialogContent(newNotifications[index]);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };

  const handleRemoveNotification = (event, index) => {
    event.stopPropagation();
    const newNotifications = [...notificationsState];

    newNotifications.splice(index, 1);
    setNotificationsState(newNotifications);
  };

  const readAllNotifications = () => {
    const newNotifications = [...notificationsState];

    newNotifications.forEach((notification) => {
      notification.read = !readAll;
    });
    setNotificationsState(newNotifications);
  };

  // Handle accepting the invitation
  const handleAccept = () => {
    console.log("Invitation accepted");
    setDialogOpen(false);
  };

  // Handle rejecting the invitation
  const handleReject = () => {
    console.log("Invitation rejected");
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} className="text-textPrimary">
        <Badge
          color="error"
          className="cursor-pointer"
          variant="dot"
          overlap="circular"
          invisible={notificationCount === 0}
          sx={{
            '& .MuiBadge-dot': { top: 6, right: 5, boxShadow: 'var(--mui-palette-background-paper) 0px 0px 0px 2px' },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <i className="tabler-bell" />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement="bottom-end"
        anchorEl={anchorRef.current}
        {...(isSmallScreen
          ? {
            className: 'is-full !mbs-3 z-[1]',
            modifiers: [
              {
                name: 'preventOverflow',
                options: {
                  padding: themeConfig.layoutPadding,
                },
              },
            ],
          }
          : { className: 'is-96 !mbs-3 z-[1]' })}
      >
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top' }}>
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <div className="flex items-center justify-between gap-2 plb-3 pli-4 is-full">
                    <Typography variant="h6" className="flex-auto">
                      Notifikasi
                    </Typography>
                    {notificationCount > 0 && (
                      <Chip size="small" variant="tonal" color="primary" label={`${notificationCount} Baru`} />
                    )}
                    <Tooltip
                      title={readAll ? 'Tandai semua belum dibaca' : 'Tandai semua sudah dibaca'}
                      placement={placement === 'bottom-end' ? 'left' : 'right'}
                    >
                      {notificationsState.length > 0 && (
                        <IconButton size="small" onClick={readAllNotifications} className="text-textPrimary">
                          <i className={readAll ? 'tabler-mail' : 'tabler-mail-opened'} />
                        </IconButton>
                      )}
                    </Tooltip>
                  </div>
                  <Divider />
                  <ScrollWrapper hidden={hidden}>
                    {notificationsState.map((notification, index) => {
                      const { title, subtitle, time, read, avatarImage, avatarIcon, avatarText, avatarColor, avatarSkin } =
                        notification;

                      return (
                        <div
                          key={index}
                          className={classnames(
                            'flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group',
                            {
                              'border-be': index !== notificationsState.length - 1,
                            }
                          )}
                          onClick={(e) => handleReadNotification(e, true, index)}
                        >
                          {getAvatar({ avatarImage, avatarIcon, title, avatarText, avatarColor, avatarSkin })}
                          <div className="flex flex-col flex-auto">
                            <Typography variant="body2" className="font-medium mbe-1" color="text.primary">
                              {title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" className="mbe-2">
                              {subtitle}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {time}
                            </Typography>
                          </div>
                        </div>
                      );
                    })}
                  </ScrollWrapper>
                  <Divider />
                  <div className="p-4">
                    <Button fullWidth variant="contained" size="small">
                      Lihat Semua Notifikasi
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      <DialogNotification
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dataDialog={dataDialog}
        onAccept={handleAccept}
        onReject={handleReject}
        inviterData={invitations}
      />
    </>
  );
};

export default NotificationDropdown;
