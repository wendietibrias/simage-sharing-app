import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { IAuthSession } from "@/interfaces/auth.interface";
import prisma from "@/lib/prisma";
import authOptions from "@/lib/auth";

export const GET = async (req : Request) => {


      try {
         const session = await getServerSession(authOptions) as IAuthSession;
         if(!session) {
            return NextResponse.json({ message:"Unauthorized" } , { status:401 });
         }

         const url = new URL(req.url);
         const searchParams = new URLSearchParams(url.search);

         const page = Number(searchParams.get("page"));
         const per_page = Number(searchParams.get("per_page"));
         const skippedPage = page === 1 ? 0 : per_page * (page-1);
      
         const countUserCollection = await prisma.images.count({
             where: {
                userId: session.user.id
               }
          });
         const maxPage = Math.ceil(countUserCollection / per_page);
         const findUserCollection = await prisma.images.findMany({
            where: {
                userId: session.user.id
            },
            take: per_page,
            skip: skippedPage
         });

         if(findUserCollection) {
            return NextResponse.json({ 
               message:`${findUserCollection.length} collections found`,
               data: findUserCollection, 
               nextPage: page < maxPage ? page + 1 : null,
               previousPage: page <= 1 ? page : (page - 1)
            }, { status:200 });
         }

      } catch(err : any) {
            return NextResponse.json({ message:"Internal Server Error" }, { status:500 });
      } 
}