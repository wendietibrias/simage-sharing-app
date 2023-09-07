import { IAuthCredentialsPromise, IAuthSession } from "@/interfaces/auth.interface";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import authOptions from "@/lib/auth";

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_KEY 
});


export const POST = async (req : NextRequest) => {
    const { name,email,description,title,image } : any = await req.json();

    try {
        const session = await getServerSession(authOptions) as IAuthSession;

        if(!session) {
            return NextResponse.json({ message:"Unauthorized" } , { status:401 });
        }

        const createImage = await prisma.images.create({
             data: {
                name,
                email,
                description,
                userId: session.user.id,
                title,
                image: image
             }
        });

        if(createImage) {
            return NextResponse.json({ data:createImage,message:"successfully store the image" } , { status:200 });
        }

        return NextResponse.json({ message:"Failed to store images" }, { status:400 });

    } catch(err : any) {
        console.log(err.message);
        return NextResponse.json({ message:"Internal Server Error" }, { status:500 });
    }
}