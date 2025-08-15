'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Heart, Loader2, MapPin, MessageCircle, ShoppingCart, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function BooksDetailsPage() {
  const params = useParams();
  const id = params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();
  const [isAddToCart, setIsAddToCard] = useState(false);


  const book = {
      _id: "1",
      images: [
        "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwc2VsbCUyMGJvb2tzfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwc2VsbCUyMGJvb2tzfGVufDB8fDB8fHww",

      ],
      title: "The Alchemist",
      category: "Reading Books (Novels)",
      condition: "Excellent",
      classType: "B.Com",
      subject: "Fiction",
      price: 300,
      author: "Paulo Coelho",
      edition: "25th Anniversary Edition",
      description: "A philosophical book about a shepherd's journey to realize his dreams.",
      finalPrice: 250,
      shippingCharge: 50,
      paymentMode: "UPI",
      paymentDetails: {
        upiId: "example@upi"
      },
      createdAt: new Date("2024-01-01"),
      seller: { name: "John Doe", phoneNumber: "1234567890" }
  }

  const handleAddToCart =(productId:string)=> {

  }

  const handleAddToWishList = (productId:string)=>{

  };

  const bookImage = book?.images || []

  const calculateDiscount = (price: number, finalPrice: number): number => {
		if (price > finalPrice && price > 0) {
			return Math.round(((price - finalPrice) / price) * 100)
		}
		return 0;
	};

  const formatDate = (dateString:Date)=>{
      const date = new Date(dateString);
      return formatDistanceToNow(date, {addSuffix: true})
    }

  return (
	<div className='min-h-screen bg-gray-100'>
    <div className='container mx-auto px-4 py-8'>
      <nav className='mb-8 flex items-center gap-2 text-sm text-muted-foreground'>
        <Link href={'/' } className='text-primary hover:underline'>
        {''}
        Home{''}
        </Link>
        <span>/</span>
        <Link href={'/books' } className='text-primary hover:underline'>
        Books
        </Link>
        <span>/</span>
        <span className='text-gray-600'>{book.category}</span>
        <span>/</span>
        <span className='text-gray-600'>{book.title}</span>
      </nav>

      <div className='grid gap-8 md:grid-cols-2'>
        <div className='space-y-4'>
          <div className='relative h-[480px] overflow-hidden rounded-lg border bg-white shadow-md'>
            <Image
            src={bookImage[selectedImage]}
            alt={book.title}
            fill
            className='object-contain'
            />
            {calculateDiscount(book.price,book.finalPrice) > 0  && (
            <span className='absolute left-0 top-2 rounded-r-lg px-2 py-1 text-xs font-medium bg-orange-600/90 text-white hover:bg-orange-700'>
            {calculateDiscount(book.price,book.finalPrice)}%Off
            </span>
						)}
          </div>
          <div className='flex gap-2 overflow-x-auto'>
            {bookImage.map((images, index)=>(
              <button
              key={index}
              onClick={()=> setSelectedImage(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${selectedImage === index ? 'ring-2 ring-primary scale-105': 'hover:scale-105'}`}
              
              >
                <Image
                src={images}
                alt={`${book.title} ${index + 1}`}
                fill
                className='object-cover'
                />
              </button>
            ))}
          </div>
        </div>
        {/* book details  */}
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold'>{book.title}</h1>
              <p>Posted: {formatDate(book.createdAt)}</p>

            </div>
            <div className='flex gap-2'>
              <Button variant={'outline'}>
                share
              </Button>
              <Button
              variant={'outline'}
              size={'sm'}
              onClick={()=>handleAddToWishList(book._id)}
              >
                <Heart
                className={`h-4 w-4 mr-1 fill-red-500`}
                />
                <span className='hidden md:block'>Add</span>

              </Button>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-baseline gap-2'>
              <span className='text-3xl font-bold text-black'>Tk: {book.finalPrice}</span>
              {book.price && (
                <span className='text-lg text-zinc-500 line-through'>Tk: {book.price}</span>
              )}
              <Badge variant={'secondary'} className='text-green-600'>Shipping Available</Badge>
            </div>
            <Button className='w-60 py-6 bg-blue-700'>
              {isAddToCart ? (
                <>
                <Loader2 className='animate-spin mr-2' size={20} />
                Add to cart...
                </>
              ): (
                <>
                <ShoppingCart className='mr-2 h-5 w-5' /> Buy Now
                </>
              )}
            </Button>

            <Card className='border border-gray-200 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg'>Book Details</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='font-medium text-muted-foreground'>Subject/Title</div>
                  <div>{book.subject}</div>
                  <div className='font-medium text-muted-foreground'>Course</div>
                  <div>{book.classType}</div>
                  <div className='font-medium text-muted-foreground'>Category</div>
                  <div>{book.category}</div>
                  <div className='font-medium text-muted-foreground'>Author</div>
                  <div>{book.author}</div>
                  <div className='font-medium text-muted-foreground'>Edition</div>
                  <div>{book.edition}</div>
                  <div className='font-medium text-muted-foreground'>Condition</div>
                  <div>{book.condition}</div>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
        {/* bottom 2 card  */}
      <div className='mt-8 grid gap-8 md:grid-cols-2'> 
        <Card className='border-none shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg'>Description</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p>{book.description}</p>
            <div className='border-t pt-4'>
              <h3 className='font-medium mb-2'>Our Community</h3>
              <p className='text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore a officiis, voluptates molestias earum esse id hic at officia quod.</p>

            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div>Add Id: {book._id}</div>
              <div>Posted: {formatDate(book.createdAt)}</div>

            </div>

          </CardContent>

        </Card>

        {/* book seller details  */}
        <Card className='border-none shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg'>Sold By</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
             <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-full bg-blue-300 flex items-center justify-center'>
                <User2 className='h-6 w-6 text-blue-500' />
              </div>
              <div>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{book.seller.name}</span>
              <Badge variant={'secondary'} className='text-green-600'>
                <CheckCircle2 className='h-3 w-3 mr-1' />Verified
              </Badge>
              </div>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <MapPin className='h-4 w-4' />
                Mirzapur Up

              </div>
             </div>
            </div>
            </div>
            {book.seller.phoneNumber && (
              <div className='flex items-center gap-2 text-sm'>
                  <MessageCircle className='h-4 w-4 text-blue-600' />
                  <span>Contact: {book.seller.phoneNumber}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

        
        {/* how it works section  */}
        <section className='mt-16'>
          <h2 className='mb-8 text-2xl font-bold'>How does it works?</h2>
          <div className='grid gap-8 md:grid-cols-3'>
            {
            [
               {
                step: "Step 1",
                title: "Seller posts an Ad",
                description:
                  "Seller posts an ad on book kart to sell their used books.",
                image: { src: "/icons/ads.png", alt: "Post Ad" },
              },
              {
                step: "Step 2",
                title: "Buyer Pays Online",
                description:
                  "Buyer makes an online payment to book kart to buy those books.",
                image: { src: "/icons/pay_online.png", alt: "Payment" },
              },
              {
                step: "Step 3",
                title: "Seller ships the books",
                description: "Seller then ships the books to the buyer",
                image: { src: "/icons/fast-delivery.png", alt: "Shipping" },
              },
            ].map((item, index)=>(
        <Card key={index} className='border-none bg-amber-100 shadow-md'>
          <CardHeader>
            <Badge className='w-fit mb-2'>{item.step}</Badge>
            <CardTitle className='text-lg'>{item.title}</CardTitle>
            <CardDescription className=''>{item.description}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Image
            src={item.image.src}
            alt={item.image.alt}
            width={120}
            height={120}
            className='mx-auto'
            />
          </CardContent>
        </Card>
            ))
            }
          </div>
        </section>
    </div>
    
  </div>
  )
}
