'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

import { BookLock, ChevronRight, FileTerminal, Heart, HelpCircle, Lock, LogOut, Menu, Package, PiggyBank, Search, ShoppingCart, User, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoginDialog } from '../store/slice/userSlice'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export default function Header() {

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoginOpen = useSelector((state:RootState)=> state.user.isLoginDialogOpen);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = {
    profilePicture: '', // Replace with actual user profile picture logic
    name: '',
    email: '',
  }
  const userPlaceholder = ''; // Replace with actual user placeholder logic

  const handleLoginClick = ()=>{
      dispatch(toggleLoginDialog())
      setIsDropdownOpen(false);
  };

  const handleProtectionNavigation = (href:string)=>{
      if(user){
        router.push(href);
        setIsDropdownOpen(false);
      }else{
        dispatch(toggleLoginDialog());
        setIsDropdownOpen(false);
      }
  };

  const handleLogout = ()=>{
    
  }

  const menuItems = [
    ...(user && user ? [
      {
        href: 'account/profile',
        content: (
          <div className=''>
            <Avatar>
              {user.profilePicture ? (
                <AvatarImage alt='user_image'></AvatarImage>
              ): (<AvatarFallback>{userPlaceholder}</AvatarFallback>)}
            </Avatar>
            <div className='flex flex-col'>
              <span className='text-md font-semibold text-gray-900'>
                {user.name}
              </span>
              <span className='text-xs text-gray-600'>
                {user.email}
              </span>
            </div>
          </div>
        )
      }
    ]: [
      {
        icon: <Lock className='h-5 w-5' />,
        lable: 'login/Sign up',
        onclick: handleLoginClick
      },
    ]),
    {
        icon: <User className='h-5 w-5' />,
        lable: 'My Profile',
        onclick: ()=> handleProtectionNavigation('/account/profile')
      },
      {
        icon: <Package className='h-5 w-5' />,
        lable: 'My Orders',
        onclick: ()=> handleProtectionNavigation('/account/orders')
      },
      {
        icon: <PiggyBank className='h-5 w-5' />,
        lable: 'My Selling Orders',
        onclick: ()=> handleProtectionNavigation('/account/profile')
      },
      {
        icon: <ShoppingCart className='h-5 w-5' />,
        lable: 'Cart',
        onclick: ()=> handleProtectionNavigation('/account/cart')
      },
      {
        icon: <Heart className='h-5 w-5' />,
        lable: 'My Wishlist',
        onclick: ()=> handleProtectionNavigation('/account/wishlist')
      },
      {
        icon: <User2 className='h-5 w-5' />,
        lable: 'About Us',
        href: '/about-us',
      },
      {
        icon: <FileTerminal className='h-5 w-5' />,
        lable: 'Terms & Conditions',
        href: '/terms-and-conditions',
      },
      {
        icon: <BookLock className='h-5 w-5' />,
        lable: 'Privacy Policy',
        href: '/privacy-policy'
      },
      {
        icon: <HelpCircle className='h-5 w-5' />,
        lable: 'Help',
        href: '/how-it-works'
      },
      ...(user && [
        {
          icon: <LogOut className='h-5 w-5' />,
          lable: 'Logout',
          onclick: handleLogout 
        }
      ])
  ]

  const MenuItems = ({className=''}) =>(
      <div className={className}>
        {menuItems.map((item, index) => (
          item?.href ? (
            <Link
              href={item.href}
              key={index}
              className='flex items-center gap-3 py-3 px-3 text-sm rounded-lg hover:bg-gray-200'
              onClick={() => setIsDropdownOpen(false)}
            >
              {item.icon}
              <span>{item.lable}</span>
              {item?.content && <div className='mt-1'>{item?.content}</div>}
              <ChevronRight className='h-4 w-4 ml-auto' />
            </Link>
          ) : (
            <button
              key={index}
              className='flex items-center gap-3  py-3 px-3 text-sm rounded-lg hover:bg-gray-200 w-full'
              onClick={item.onclick}
            >
             {item.icon}
              <span>{item.lable}</span>
              {item?.content && <div className='mt-1'>{item?.content}</div>}
              <ChevronRight className='h-4 w-4 ml-auto' />
            </button>
          )
        ))}
      </div>
    );
  return (
    <header className='border-b bg-white sticky top-0 z-50'>
      {/* Header content goes here, such as a logo, navigation links, etc. */}
      <div className='container w-[80%] mx-auto hidden lg:flex justify-between items-center p-4'>
        <Link href={'/'} className='flex items-center'>
        <Image
          src={'/images/web-logo.png'}
          width={450}
          height={100}
          alt='Book Kart Logo'
          className='h-15 w-auto'
        />
        
        </Link>
        {/* search input  */}
        <div className='flex flex-1 items-center justify-center max-w-xl px-4'>
          <div className='relative w-full'>
            <Input
            type='text'
            placeholder='Book Name /Author /Subject /Publisher'
            className='w-full pr-10'
            // value={''}
            // onChange={() => {}}

            />
            <Button
              size='icon'
              variant='ghost'
              className='absolute right-0 top-1/2 -translate-y-1/2'
            >
              <Search className='h-5 w-5'/>
            </Button>

          </div>
        </div>
        <div className='flex items-center gap-4'>
           <Link href='/book-sell'>
            <Button variant='secondary' className='bg-yellow-400 text-gray-900 hover:bg-yellow-500'>
              Sell Used Book
            </Button>
           </Link>

           {/* dropdown menu  */}
           <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} >
                <Avatar className='w-8 h-8 rounded-full'>
                 {user?.profilePicture ? (
                  <AvatarImage alt='user_image'></AvatarImage>)
                  : userPlaceholder ? (
                  <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  ): (<User className='ml-2 mt-2' />)}

                </Avatar>
                My Account
              </Button>
            </DropdownMenuTrigger>
              <DropdownMenuContent className='w-80 p-2'>
                <MenuItems/>
              </DropdownMenuContent>
              
           </DropdownMenu>
           <Link href={'/checkout/cart'}>
              <div className='relative'>
                  <Button variant={'ghost'} className='relative'>
                    <ShoppingCart className='h-5 w-5 mr-2' />
                    Cart
                  </Button>
                  {user && (
                    <span className='absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs'>3</span>
                  )}
              </div>
           </Link>
        </div>
      </div>

          {/* mobile header  */}
          <div className='container mx-auto lg:hidden flex items-center justify-between p-4'>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant={'ghost'} size={'icon'}>
                      <Menu className='h-6 w-6' />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side='left' className='w-80 p-0'>
                    <SheetHeader>
                      <SheetTitle className='sr-only'>

                      </SheetTitle>
                    </SheetHeader>
                    <div className='border-b p-4'>
                      <Link href={'/'}>
                        <Image
                          src={'/images/web-logo.png'}
                          width={150}
                          height={40}
                          alt='Book Kart mobile Logo'
                          className='h-10 w-auto'
                        />
                      </Link>
                    </div>
                    <MenuItems className='py-2'/>
                  </SheetContent>
                </Sheet>

                {/* copy previous header link  */}
                <Link href={'/'} className='flex items-center'>
        <Image
          src={'/images/web-logo.png'}
          width={450}
          height={100}
          alt='Book Kart Logo'
          className='h-6 md:h-10 w-20 md:w-auto'
        />
        
        </Link>
        {/* search input  */}
        <div className='flex flex-1 items-center justify-center max-w-xl px-4'>
          <div className='relative w-full'>
            <Input
            type='text'
            placeholder='search books...'
            className='w-full pr-10'
            // value={''}
            // onChange={() => {}}

            />
            <Button
              size='icon'
              variant='ghost'
              className='absolute right-0 top-1/2 -translate-y-1/2'
            >
              <Search className='h-5 w-5'/>
            </Button>

          </div>
        </div>
            <Link href={'/checkout/cart'}>
              <div className='relative'>
                  <Button variant={'ghost'} className='relative'>
                    <ShoppingCart className='h-5 w-5 mr-2' />
                    Cart
                  </Button>
                  {user && (
                    <span className='absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs'>3</span>
                  )}
              </div>
           </Link>
         </div>
    </header>
  )
}
