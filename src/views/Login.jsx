'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import classnames from 'classnames'
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

import { signIn } from 'next-auth/react'

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '60%',
  },
}));

const Login = ({ mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/auth-2.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  const router = useRouter()
  const { settings } = useSettings()

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleSubmit = async (e) => {

    e.preventDefault()
    let hasError = false
    if (!username) {
      setUsernameError('Username wajib diisi')
      hasError = true
    } else {
      setUsernameError('')
    }
    if (!password) {
      setPasswordError('Password wajib diisi')
      hasError = true
    } else {
      setPasswordError('')
    }
    if (hasError) return

    setIsLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password
    })
    setIsLoading(false)
    if (result.ok) {
      router.push('/dashboard')
    } else {
      alert('Login gagal')
    }
  }

  return (
    <div className='flex justify-center bs-full'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='Ilustrasi' />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Selamat datang ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Silakan masuk ke akun Anda untuk memulai</Typography>
          </div>
          <form
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}
            className='flex flex-col gap-5'
          >
            <CustomTextField
              autoFocus
              fullWidth
              label='Username/Nim/Nidn'
              placeholder='Masukkan Username Anda'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <Typography color='error'>{usernameError}</Typography>}
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {passwordError && <Typography color='error'>{passwordError}</Typography>}
            <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-1'>
              <Typography className='text-end' color='primary' component={Link}>
                Lupa Kata Sandi
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit' disabled={isLoading}>
              Login
            </Button>

            <Divider className='gap-2 text-textPrimary'>Created by devnolife</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-twitter' size='small'>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='tabler-brand-github-filled' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

