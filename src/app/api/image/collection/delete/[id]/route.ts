import { NextResponse,NextRequest } from "next/server";
import { IAuthCredentialsPromise } from "@/interfaces/auth.interface";
import { v2 } from "cloudinary";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import authOptions from "@/lib/auth";
import cloudinaryConfig from "@/lib/cloudinary";

export const DELETE = async (req : Request ,{ params } : { params:{ id: string } }) => {
    cloudinaryConfig();

    try {
        const session = await getServerSession(authOptions) as IAuthCredentialsPromise;

        if(!session) {
            return NextResponse.json({ message:"Unauthorized" } , { status:401 });
        }

        const findImage = await prisma.images.findUnique({
             where: {
                id: params.id
             }
        });

        if(findImage) {
            const destroyCloudinaryImage = await v2.uploader.destroy(findImage?.image?.publicId);
            const deleteImage = await prisma.images.delete({
                where: {
                    id: findImage?.id
                }
            });

            return NextResponse.json({ message:"success delete image" }, { status: 200 });
        }


    } catch(err : any) {
        console.log(err.message);
        return NextResponse.json({ message:"Internal Server Error" } , { status:500 });
    }
}